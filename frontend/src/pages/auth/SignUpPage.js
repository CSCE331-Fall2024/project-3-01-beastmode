import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import "../../styles/signup/SignUpPage.css";
import api from '../../services/api';

//function that handles signup page logic & frontend
export default function SignUpPage() {
  //set up useState object and functions to hold current input states
  const navigate = useNavigate();

  const [signupInput, setSignUpInput] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: ""
  });

  //set up useState object and functions to hold error states
  const [signupError, setSignUpError] = useState({
    email: "",
    name: "",
    password: "",
    confirm_password: "",
    valid_email: {
      email_class: "col-sm-5 p-2 signup-input",
      isHighlighted: false
    },
    valid_first_name: {
      first_name_class: "p-2 signup-input signup-names",
      isHighlighted: false
    },
    valid_last_name: {
      last_name_class: "p-2 signup-input signup-names",
      isHighlighted: false
    } ,
    valid_password: {
      password_class: "col-sm-5 p-2 signup-input",
      isHighlighted: false
    },
    valid_confirm_password: {
      confirm_password_class: "col-sm-5 p-2 signup-input",
      isHighlighted: false
    }
  });

  const [submitClass, setSubmitClass] = useState({
    button_class: "signup-submit",
    loading_class: "spinner-border signup-spinning-loader"
  });

  //when an input is changed, set the usestate object to that state
  const handleSignUpInput = (name, value) => {
    setSignUpInput({
      ...signupInput,
      [name]: value
    });
  };

  const clear = () => {
    setSignUpInput({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: ""
    });
  }

  const createAccount = async () => {
    try {
      const response = await api.post("/auth/signup/email", signupInput.email);
      if (!response.data) { //email already exists in database
        setSignUpError({
          ...signupError,
          email: "Email already in use",
          valid_email: {
            email_class: "col-sm-5 p-2 signup-input invalid-input",
            isHighlighted: true
          }
        });
        //email exists
      }
      else { //email does not exist in database (valid email)
        const hashData = await fetch(`${process.env.REACT_APP_HASH_API_KEY}hash?plain=${signupInput.password}`);

        const hashPassword = await hashData.json();
        if (hashPassword) {
          await api.post("/auth/signup", {...signupInput, password: hashPassword["hashed"]});

          //adding to database successful
          clear();
          navigate("/auth/signup/success");
        }
        else { //hash unable to be retrieved
          clear();
          navigate("/auth/signup/error");
        }
        // await api.post("/auth/signup", signupInput);
        // clear();
        // navigate("/auth/signup/success");
      }
    } catch (error) {
      //Issue from API Call
      clear();
      navigate("/auth/signup/error");
    }
  }

  const validateSignUpInput = async (event) => {
    setSubmitClass({
      ...submitClass,
      button_class: "signup-submit signup-submission-loading",
      loading_class: "spinner-border signup-spinning-loader signup-loader-opacity"
    });

    let isInvalid = false;

    //prevents reloading the page when handling form data
    event.preventDefault();

    //tracks current error from form
    let currentError = {
      email: "",
      name: "",
      password: "",
      confirm_password: "",
      valid_email: {
        email_class: "col-sm-5 p-2 signup-input",
        isHighlighted: false
      },
      valid_first_name: {
        first_name_class: "p-2 signup-input signup-names",
        isHighlighted: false
      },
      valid_last_name: {
        last_name_class: "p-2 signup-input signup-names",
        isHighlighted: false
      } ,
      valid_password: {
        password_class: "col-sm-5 p-2 signup-input",
        isHighlighted: false
      },
      valid_confirm_password: {
        confirm_password_class: "col-sm-5 p-2 signup-input",
        isHighlighted: false
      }
    };

    if (!signupInput.email) {
      currentError.email = "Email is required";
      if (!currentError.valid_email.isHighlighted) {
        currentError.valid_email.email_class += " invalid-input";
      }
      currentError.valid_email.isHighlighted = true;
      isInvalid = true;
    }
    else if (signupInput.email.length > 50){
      currentError.email= "Email length cannot exceed 50 characters"
      if (!currentError.valid_email.isHighlighted) {
        currentError.valid_email.email_class += " invalid-input";
      }
      currentError.valid_email.isHighlighted = true;
      isInvalid = true;
    }
    else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupInput.email))){
      currentError.email = "Please enter a valid email"
      if (!currentError.valid_email.isHighlighted) {
        currentError.valid_email.email_class += " invalid-input";
      }
      currentError.valid_email.isHighlighted = true;
      isInvalid = true;
    }
    
    if (!signupInput.first_name) {
      currentError.name = "First and last name are required";
      if (!currentError.valid_first_name.isHighlighted) {
        currentError.valid_first_name.first_name_class += " invalid-input";
      }
      currentError.valid_first_name.isHighlighted = true;
      isInvalid = true;
    }
    
    if (!signupInput.last_name) {
      currentError.name = "First and last name are required";
      if (!currentError.valid_last_name.isHighlighted) {
        currentError.valid_last_name.last_name_class += " invalid-input";
      }
      currentError.valid_last_name.isHighlighted = true;
      isInvalid = true;
    }

    if (signupInput.first_name && signupInput.last_name) {
      if (signupInput.first_name.length > 50) {
        currentError.name = "Name lengths may not exceed 50 characters";
        if (!currentError.valid_first_name.isHighlighted) {
          currentError.valid_first_name.first_name_class += " invalid-input";
        }
        currentError.valid_first_name.isHighlighted = true;
        isInvalid = true;
      }
      if (signupInput.last_name.length > 50) {
        currentError.name = "Name lengths may not exceed 50 characters";
        if (!currentError.valid_last_name.isHighlighted) {
          currentError.valid_last_name.last_name_class += " invalid-input";
        }
        currentError.valid_last_name.isHighlighted = true;
        isInvalid = true;
      }
    }

    if (!signupInput.password) {
      currentError.password = "Password is required";
      if (!currentError.valid_password.isHighlighted) {
        currentError.valid_password.password_class += " invalid-input";
      }
      currentError.valid_password.isHighlighted = true;
      isInvalid = true;
    }

    if (!signupInput.confirm_password) {
      currentError.confirm_password = "Password confirmation is required";
      if (!currentError.valid_confirm_password.isHighlighted) {
        currentError.valid_confirm_password.confirm_password_class += " invalid-input";
      }
      currentError.valid_confirm_password.isHighlighted = true;
      isInvalid = true;
    }

    if (signupInput.password !== signupInput.confirm_password) {
      currentError.confirm_password = "Passwords should match";
      if (!currentError.valid_confirm_password.isHighlighted) {
        currentError.valid_confirm_password.confirm_password_class += " invalid-input";
      }
      currentError.valid_confirm_password.isHighlighted = true;
      isInvalid = true;
    }
    else if (signupInput.password && signupInput.password.length > 50) {
      currentError.password = "Password may not exceed 50 characters"
      if (!currentError.valid_password.isHighlighted) {
        currentError.valid_password.password_class += " invalid-input";
      }
      if (!currentError.valid_confirm_password.isHighlighted) {
        currentError.valid_confirm_password.confirm_password_class += " invalid-input";
      }
      currentError.valid_password.isHighlighted = true;
      currentError.valid_confirm_password.isHighlighted = true;
      isInvalid = true;
    }
    else if (signupInput.password && (!(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/.test(signupInput.password)))) {
      currentError.password = "Password must contain at least one upper case letter, one special character, and be at least 6 characters long";
      if (!currentError.valid_password.isHighlighted) {
        currentError.valid_password.password_class += " invalid-input";
      }
      if (!currentError.valid_confirm_password.isHighlighted) {
        currentError.valid_confirm_password.confirm_password_class += " invalid-input";
      }
      currentError.valid_password.isHighlighted = true;
      currentError.valid_confirm_password.isHighlighted = true;
      isInvalid = true;
    }
    
    //should only be not equal when there is an error present
    if (currentError !== signupError){ 
      setSignUpError(currentError);
    }
    
    if (!isInvalid) {
      //send request to server
      await createAccount();
    }
    setSubmitClass({
      ...submitClass,
      button_class: "signup-submit",
      loading_class: "spinner-border signup-spinning-loader"
    });
  }

  return (
    <Routes>
      <Route 
        path="/"
        element={
        <>
          <div className="signup-bg"></div>
          <div className="container-fluid signup-bg2-container">
            <div className="row signup-bg2-row justify-content-center">
              <div className="col-sm-6 signup-bg2"></div>
            </div>
          </div>
          <div className="container-fluid signup-form">
            <h1 className="text-center display-1 signup-title">Sign Up</h1>
            <form method="POST" onSubmit={validateSignUpInput}>
              <div className="row justify-content-center align-items-end">
                <label className="col-6 col-sm-2 signup-label signup-remove-padding" htmlFor="signup-email">Email:</label>
                <p className="col-6 col-sm-3 text-end signup-required-fields">*All fields are required</p>
              </div>
              <div className="row justify-content-center">
                <input value={signupInput.email} className={signupError.valid_email.email_class} id="signup-email" name="email" placeholder="Email" tabIndex="1" onChange={({ target }) => {
                  handleSignUpInput(target.name, target.value);
                }}></input>
              </div>
              <div className="row justify-content-center">
                <p className="col-sm-5 signup-remove-padding error-message">{signupError.email}</p>
              </div>
              <div className="row justify-content-center">
                <div className="col-xs-5 col-sm-2 signup-remove-padding">
                  <div>
                    <label className="signup-label" htmlFor="signup-firstname">First Name:</label>
                    <input value={signupInput.first_name} className={signupError.valid_first_name.first_name_class} id="signup-firstname" name="first_name" placeholder="First Name" tabIndex="2" onChange={({ target }) => {
                      handleSignUpInput(target.name, target.value);
                    }}></input>
                  </div>
                </div>
                <div className="col-xs-5 col-sm-3 signup-last-name">
                  <div>
                    <label className="signup-label" htmlFor="signup-lastname">Last Name:</label>
                    <input value={signupInput.last_name} className={signupError.valid_last_name.last_name_class} id="signup-lastname" name="last_name" placeholder="Last Name" tabIndex="3" onChange={({ target }) => {
                      handleSignUpInput(target.name, target.value);
                    }}></input>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <p className="col-sm-5 signup-remove-padding error-message">{signupError.name}</p>
              </div>
              <div className="row justify-content-center">
                <div className="col-xs-12 col-sm-5 signup-remove-padding">
                  <label className="text-start signup-label" htmlFor="signup-password">Password:</label>
                </div>
              </div>
              <div className="row justify-content-center">
                <input value={signupInput.password} className={signupError.valid_password.password_class} type="password" id="signup-password" name="password" placeholder="Password" tabIndex="4" onChange={({ target }) => {
                  handleSignUpInput(target.name, target.value);
                }}></input>
              </div>
              <div className="row justify-content-center">
                <p className="col-sm-5 signup-remove-padding error-message">{signupError.password}</p>
              </div>
              <div className="row justify-content-center">
                <div className="col-xs-12 col-sm-5 signup-remove-padding">
                  <label className="col-5 signup-label" htmlFor="signup-confirm-password">Confirm Password:</label>
                </div>
              </div>
              <div className="row justify-content-center">
                <input value={signupInput.confirm_password} className={signupError.valid_confirm_password.confirm_password_class} type="password" id="signup-confirm-password" name="confirm_password" placeholder="Confirm Password" tabIndex="5" onChange={({ target }) => {
                  handleSignUpInput(target.name, target.value);
                }}></input>
              </div>
              <div className="row justify-content-center">
                <p className="col-sm-5 signup-remove-padding error-message">{signupError.confirm_password}</p>
              </div>
              <div className="row justify-content-center">
                <div className="col-sm-5 text-center">
                  <p className="signup-navigate-login">
                    Already have an account? <Link to="/auth" tabIndex="6">Log in.</Link>
                  </p>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-sm-5 text-center">
                  <button type="submit" className={submitClass.button_class} tabIndex="7">
                    SUBMIT
                    <div class={submitClass.loading_class} role="status"></div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
        }
      />
    </Routes>
  );
};

