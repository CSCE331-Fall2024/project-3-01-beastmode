from flask import Flask
from app import register_extensions, register_blueprints, register_secret_key
from app.config import Config
import os
import pathlib
from google_auth_oauthlib.flow import Flow

# Initialize the Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Register extensions and blueprints
register_extensions(app)
register_blueprints(app)
register_secret_key(app)

#oauth setup
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
GOOGLE_CLIENT_ID = "691942944903-g8cmnfe0iu3jujav9jpgonda6dkj9b8u.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret_691942944903-g8cmnfe0iu3jujav9jpgonda6dkj9b8u.apps.googleusercontent.com.json")

flow = Flow.from_client_secrets_file(
        client_secrets_file=client_secrets_file,
        scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
        redirect_uri="http://127.0.0.1:5001/api/auth/callback"
)
app.config['OAUTH_FLOW'] = flow
app.config['base_url'] = "http://localhost:3000"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
