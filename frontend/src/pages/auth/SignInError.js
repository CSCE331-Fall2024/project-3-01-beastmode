import { Route, Routes } from "react-router-dom";
//import { useState } from 'react';
import "../../styles/signup/SignUpError.css";

export default function SignInError() {
  return (
    <Routes>
      <Route
        path="/"
        element = {
          <>
            <div className="signup-error-bg"></div>
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-sm-4 container-fluid signup-error-container">
                  <div className="row justify-content-center">
                    <h1 className="col-sm-8 text-center signup-error-title">
                      Oh no!
                    </h1>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-sm-8">
                      <div className="signup-error-image"></div>
                    </div> 
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-sm-9 text-center">
                      <p className="signup-error-text">
                        Your Account was not found.
                      </p>
                      <p className="signup-error-text">
                        Please talk to your manager to register an account with us
                      </p>
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