from flask import Flask
from app import register_extensions, register_blueprints, register_secret_key
from app.config import Config
import os
import pathlib
from google_auth_oauthlib.flow import Flow
import json
from dotenv import load_dotenv
import tempfile

# Initialize the Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Register extensions and blueprints
register_extensions(app)
register_blueprints(app)
register_secret_key(app)

#oauth setup
load_dotenv()
GOOGLE_CONFIG = json.loads(os.environ.get('GOOGLE_CONFIG'))
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')

with tempfile.NamedTemporaryFile('w', delete=False) as temp_file:
    json.dump(GOOGLE_CONFIG, temp_file)
    temp_file_path = temp_file.name

flow = Flow.from_client_secrets_file(
        client_secrets_file=temp_file_path,
        scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
        redirect_uri="http://127.0.0.1:5001/api/auth/callback"
)
app.config['OAUTH_FLOW'] = flow
app.config['base_url'] = "http://localhost:3000"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
