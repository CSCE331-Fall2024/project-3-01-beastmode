import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api'; // Axios instance with base URL
import '../../styles/auth.css';
import logo from '../../assets/beast_mode_logo.png'
import google_logo from '../../assets/google_logo.png'

function AuthMain() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login/db", { username });
      if (response.data.success) {
        const hashData = await fetch(`${process.env.REACT_APP_HASH_API_KEY}validate?plain=${password}&hashed=${response.data.password}`);
        const validate = await hashData.json();
        if (validate.valid) {
          navigate(response.data.route);
        } else {
          setErrorMessage("Login failed: Incorrect username or password");
        }
      } else {
        setErrorMessage("Login failed: Incorrect username or password");
      }
    } catch (error) {
      navigate("/auth/signup/error");
    }
  };

  const isLocal = window.location.hostname === 'localhost';
  const handleGoogle = async (e) => {
    try{
      window.location.href = isLocal ? "http://127.0.0.1:5001/api/auth/signin/google" : "https://project-3-01-beastmode-1fed971de919.herokuapp.com/api/auth/signin/google";
    }catch (error) {
      navigate("/auth/signup/error");
    }
  };

  return (
    <div className="login-page">
      <div className="container-fluid d-flex vh-100 align-items-center justify-content-center">
        <div className="row justify-content-center">
          <div className="col text-center">
            <div className="login-container">
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <img src={logo} alt="Logo" className="img-fluid mb-3 w-10 h-10" />
              <h1>Welcome</h1>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control my-2"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control my-2"
                />
                <button type="submit" className="btn-primary mt-3">Login</button>
              </form>
              <h2>or</h2>
              <button type="button" onClick={handleGoogle} className="google-login-btn">
                <img src={google_logo} alt="Google logo" className="google-icon" />
                Login With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthMain;
