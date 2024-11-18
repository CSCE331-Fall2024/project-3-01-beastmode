from . import mobile_bp

@mobile_bp.route('/', methods=['GET'])
def mobile_home():
    return {"message": "Welcome to Login Page"}
