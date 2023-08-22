import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';


function Forgotpass() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const methods = await fetchSignInMethodsForEmail(auth, email);

            if (methods.length > 0) {
                // Send password reset email
                await sendPasswordResetEmail(auth, email);
                setSuccessMessage('Password reset email sent successfully');
            } else {
                setError('Email not found in Firebase authentication database');
            }
        } catch (error) {
            console.error('Error checking email', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="forgotpass-container">
            <form onSubmit={handleSubmit}>
                <h3>Forgot Password</h3>
                <input
                    type="email"
                    placeholder="Enter your email here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-primary btn-block" type="submit">
                    Submit
                </button>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <p className="back-to-login">
                <Link to = {'/login'}>Back to Log In</Link>
                </p>
            </form>
        </div>
    );
}

export default Forgotpass;
