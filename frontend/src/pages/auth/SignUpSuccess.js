import { Route, Routes, Link } from "react-router-dom";
//import { useState } from 'react';
import "../../styles/signup/SignUpSuccess.css";

export default function SignUpSuccess() {
  return (
    <Routes>
      <Route
        path="/"
        element = {
          <>
            <div className="signup-success-bg"></div>
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-sm-4 container-fluid signup-success-text">
                  <div className="row justify-content-center">
                    <div className="col-sm-8">
                      <div className="signup-success-check"></div>
                    </div> 
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-sm-9 text-center">
                      <h1 className="signup-success-title">Sign Up Success!</h1>
                      <p className="signup-success-links">
                        You can log in with your new account <Link to="/auth" tabIndex="1">here</Link>
                      </p>
                      <Link className="signup-success-links" to="/kiosk" tabIndex="2">Return to Kiosk</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </Routes>
  );
}