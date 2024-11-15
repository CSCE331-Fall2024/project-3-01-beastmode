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

GOOGLE_CLIENT_ID = "691942944903-g8cmnfe0iu3jujav9jpgonda6dkj9b8u.apps.googleusercontent.com"

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
    authorization_url = flow.authorization_url()
    return redirect(authorization_url)


@auth_bp.route("/callback")
def callback():
    try:
        flow = current_app.config['OAUTH_FLOW']
        flow.fetch_token(authorization_response=request.url)

        credentials = flow.credentials
        request_session = requests.session()
        cached_session = cachecontrol.CacheControl(request_session)
        token_request = google.auth.transport.requests.Request(session=cached_session)
        
        id_info = id_token.verify_oauth2_token(
            id_token=credentials._id_token,
            request=token_request,
            audience=GOOGLE_CLIENT_ID,
            clock_skew_in_seconds=6000
        )
        
        # id_token_str = credentials._id_token
        # token_parts = id_token_str.split('.')

        # payload_encoded = token_parts[1]

        # padding = '=' * (4 - len(payload_encoded) % 4)
        # payload_decoded = base64.urlsafe_b64decode(payload_encoded + padding)
        
        # payload_json = json.loads(payload_decoded)

        # email = payload_json.get("email")


        email = id_info.get("email")

        with db.session.begin():
            employee = db.session.query(Employee).filter_by(email=email).first()

        if employee:
            if employee.role == 'manager':
                re_route_link = current_app.config['base_url'] + "/manager"
            else:
                re_route_link = current_app.config['base_url'] + "/pos"
            session.clear()
            session["name"] = id_info.get("name")
            session["email"] = id_info.get("email")
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
