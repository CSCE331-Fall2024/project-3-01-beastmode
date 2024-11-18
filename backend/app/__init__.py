from flask import Flask
from flask_cors import CORS
from .config import Config
from .menu import menu_bp
from .kitchen import kitchen_bp
from .manager import manager_bp
from .kiosk import kiosk_bp
from .mobile import mobile_bp
from .pos import pos_bp
from .auth import auth_bp
from .extensions import db
import os

def register_extensions(app):
    CORS(app, origins='*')  
    db.init_app(app)      

def register_secret_key(app):
    app.secret_key = os.getenv('GOOGLE_SECRET_KEY')

def register_blueprints(app):
    app.register_blueprint(menu_bp, url_prefix='/api/menu')
    app.register_blueprint(kitchen_bp, url_prefix='/api/kitchen')
    app.register_blueprint(manager_bp, url_prefix='/api/manager')
    app.register_blueprint(kiosk_bp, url_prefix='/api/kiosk')
    app.register_blueprint(pos_bp, url_prefix='/api/pos')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(mobile_bp, url_prefix='/api/mobile')