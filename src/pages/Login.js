import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ReCAPTCHA from "react-google-recaptcha"; // Import the ReCAPTCHA component
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null); // Store the reCAPTCHA value
  const navigate = useNavigate();

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const submitDetails = (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      console.log("Please complete the reCAPTCHA");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        // Check if the user exists and their email is verified
        if (user && user.emailVerified) {
          navigate("/home");
        } else if (user && !user.emailVerified) {
          console.log("Please verify your email before logging in.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigateToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="si-main-background">
      <div className="sign-in-background">
        <div className="sign-in-container">
          <form onSubmit={submitDetails}>
            <h1>Log in to your Account</h1>
            <input
              type="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Enter your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <ReCAPTCHA
              sitekey="6LcDm6wnAAAAALVjPYwb3YiLiCnyhvmfhFv2zZ8c" // Replace with your reCAPTCHA site key
              onChange={handleRecaptchaChange}
            />
            <button className="si-button" type="submit" onClick={navigateToHome}>Log In</button>
            <Link className="forgot-password-text-right"to={'/forgot'}>Forgot Password ?</Link>
         
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
