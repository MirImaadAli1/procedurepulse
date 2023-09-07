import React, { useState } from "react";
import { auth } from "../firebase"; // Import the 'auth' object from your firebase module
import AnimatedPage from "../components/AnimatedPage";

function PasswordReset() {
  const [resetEmail, setResetEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log("Forgot Password link clicked");

    try {
      // Check if email exists in Firebase
      const userCredential = await auth.fetchSignInMethodsForEmail(resetEmail);

      if (userCredential && userCredential.length > 0) {
        // Email exists in Firebase
        // Send password reset email
        await auth.sendPasswordResetEmail(resetEmail);
        setEmailSent(true); // Set the state to indicate that the email was sent
        console.log("Password reset email sent");
      } else {
        console.log("Email does not exist");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <AnimatedPage>
      <div>
        <h1>Password Reset</h1>
        {emailSent ? (
          <p>Password reset email sent. Check your inbox.</p>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Enter your email here"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button type="submit">Send Password Reset Email</button>
          </form>
        )}
      </div>
    </AnimatedPage>
  );
}

export default PasswordReset;
