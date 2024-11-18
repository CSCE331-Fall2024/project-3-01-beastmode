from . import auth_bp
from flask import request, jsonify, session, abort, redirect
from sqlalchemy import text
from app.extensions import db
from app.models import Customer
from app.models import Employee
import requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from flask import current_app
import base64
import json
import requests
import os

HASH_API_KEY = os.getenv('HASH_API_KEY')
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')

@auth_bp.route('/', methods=['GET'])
def auth_home():
    session.setdefault("name", None)
    session.setdefault("email", None)
    session.setdefault("state", None)
    return {"message": "Welcome to Login Page"}


@auth_bp.route('/signup', methods=['POST'])
def handle_signup():
    data = request.get_json()

    with db.session.begin():
        max_customer_id = db.session.execute(text("SELECT COALESCE(MAX(customer_id), 0) FROM customer_info;"))
        db.session.execute(text("SELECT setval('customer_info_customer_id_seq', :next_id, FALSE);"), {'next_id': max_customer_id.scalar() + 1})  

        new_customer = Customer(email=data['email'], password=data['password'], first_name=data['first_name'], last_name=data['last_name'], beast_points=0)
        db.session.add(new_customer)
        db.session.commit()

    return jsonify({"message": "Signup data received"}), 200


@auth_bp.route('/signup/email', methods=['POST'])
def emailExists():
    customerEmail = request.get_data()
    customerEmail = customerEmail.decode('utf-8')

    with db.session.begin():
        matchingEmail = db.session.query(Customer).filter_by(email=customerEmail).first()

    if (matchingEmail == None):
        return jsonify(True)
    else:
        return jsonify(False)


@auth_bp.route("/login/db", methods=["POST"])
def authenticate_db():
    data = request.get_json()
    email = data.get("username")
    with db.session.begin():
        employee = db.session.query(Employee).filter_by(email=email).first()

    if employee:
        if employee.role == 'manager':
            return jsonify({"success": True, "password": employee.password, "route": "/manager"})
        else:
            return jsonify({"success": True, "password": employee.password, "route": "/pos"})
    else:
        return jsonify({"success": False, "password": "", "route": ""})


@auth_bp.route("/signin/google", methods=["GET"])
def authenticate_google():
    flow = current_app.config['OAUTH_FLOW']
    authorization_url, state = flow.authorization_url()
    session.clear()
    session['state'] = state
    return redirect(authorization_url)


@auth_bp.route("/callback")
def callback():
    try:
        flow = current_app.config['OAUTH_FLOW']
        flow.fetch_token(authorization_response=request.url)

        credentials = flow.credentials

        id_token_str = credentials._id_token
        token_parts = id_token_str.split('.')
        payload_encoded = token_parts[1]
        padding = '=' * (4 - len(payload_encoded) % 4)
        payload_decoded = base64.urlsafe_b64decode(payload_encoded + padding)
        payload_json = json.loads(payload_decoded)
        email = payload_json.get("email")

        with db.session.begin():
            employee = db.session.query(Employee).filter_by(email=email).first()

        if employee:
            if employee.role == 'manager':
                re_route_link = current_app.config['base_url'] + "/manager"
            else:
                re_route_link = current_app.config['base_url'] + "/pos"
            session["name"] = payload_json.get("name")
            session["email"] = payload_json.get("email")
            return redirect(re_route_link)
        else:
            re_route_link = current_app.config['base_url'] + "/auth/signin/error"
            session.clear()
            return redirect(re_route_link)
    except Exception as e:
        session.clear()
        re_route_link = current_app.config['base_url'] + "/auth/signup/error"
        print(f"An error occurred: {e}")
        return redirect(re_route_link)
 
 
@auth_bp.route("/login/customer", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    input_password = data.get("password")

    with db.session.begin():
        customer = db.session.query(Customer).filter_by(email=email).first()

    if customer:
        validation_url = f"{HASH_API_KEY}validate?plain={input_password}&hashed={customer.password}"
        response = requests.get(validation_url)
        
        if response.status_code == 200:
            validation_data = response.json()
            if validation_data.get('valid'):
                return jsonify({
                    "success": True,
                    "message": "Login successful",
                    "customer_id": customer.customer_id 
                })
            else:
                return jsonify({"success": False, "message": "Incorrect password"}), 401
        else:
            return jsonify({"success": False, "message": "Error validating password"}), 500
    else:
        return jsonify({"success": False, "message": "Email account not found"}), 404


@auth_bp.route("/signup/customer", methods=["POST"])
def sign_up():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    with db.session.begin():
        existing_customer = db.session.query(Customer).filter_by(email=email).first()
        if existing_customer:
            return jsonify({"success": False, "message": "Email already registered"}), 409

    hash_url = f"{HASH_API_KEY}hash?plain={password}"
    response = requests.get(hash_url)

    if response.status_code == 200:
        hash_data = response.json()
        hashed_password = hash_data.get('hashed')

        max_customer_id_result = db.session.execute(text("SELECT COALESCE(MAX(customer_id), 0) FROM customer_info;"))
        next_customer_id = max_customer_id_result.scalar() + 1
        db.session.execute(text("SELECT setval('customer_info_customer_id_seq', :next_id, FALSE);"), {'next_id': next_customer_id})

        new_customer = Customer(
            email=data['email'],
            password=hashed_password,
            first_name=data.get('first_name'),  
            last_name=data.get('last_name'),   
            beast_points=1000
        )

        try:
            db.session.add(new_customer)
            db.session.commit()
            return jsonify({"success": True, "message": "Account created successfully"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"success": False, "message": f"Error creating account: {str(e)}"}), 500
    else:
        return jsonify({"success": False, "message": "Error hashing password"}), 500


@auth_bp.route("/login/customer/info/<int:customer_id>", methods=["GET"])
def get_customer_info(customer_id):
    try:
        customer = db.session.query(Customer).filter_by(customer_id=customer_id).first()
        if customer:
            customer_data = {
                "customer_id": customer.customer_id,
                "email": customer.email,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "beast_points": customer.beast_points,
            }
            return jsonify({"success": True, "data": customer_data}), 200
        else:
            return jsonify({"success": False, "message": "Customer not found"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
