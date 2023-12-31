import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AnimatedPage from '../components/AnimatedPage';
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null); // Store the reCAPTCHA value
  const navigate = useNavigate();

  const submitDetails = (e) => {
    e.preventDefault();


    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        // Check if the user exists and their email is verified
        if (user && user.emailVerified) {
          navigate("/");
        } else if (user && !user.emailVerified) {
          console.log("Please verify your email before logging in.");
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };


  return (
    <AnimatedPage>
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
              <button className="si-button" type="submit">Log In</button>
              <Link className="forgot-password-text-right" to={'/forgot'}>Forgot Password ?</Link>

            </form>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default Login;
