import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { auth ,db  } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const [isMethodsDropdownOpen, setIsMethodsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username , setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
 

  const toggleMethodsDropdown = () => {
    setIsMethodsDropdownOpen(!isMethodsDropdownOpen);
    // Close the user dropdown if it's open
    if (isUserDropdownOpen) {
      setIsUserDropdownOpen(false);
    }
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    // Close the methods dropdown if it's open
    if (isMethodsDropdownOpen) {
      setIsMethodsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Check Firebase Authentication state when the component mounts
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        const docRef = doc(db, 'Users', user.uid);
  
        // Fetch the document
        getDoc(docRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              const fetchedUsername = data.username;
              console.log('Document data:', data);
              const fetchedEmail = user.email; // Get the email from Firebase user object
  
              setUsername(fetchedUsername);
              setEmail(fetchedEmail);
            } else {
              console.log('Document does not exist.');
            }
          })
          .catch((error) => {
            console.error('Error fetching document:', error);
          });
      } else {
        setIsAuthenticated(false);
        setUsername(''); // Reset the username and email
        setEmail('');
      }
  
      if (user) {
        console.log("User is logged in. UID:", user.uid);
      } else {
        console.log("User is not logged in.");
      }
    });
  
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Redirect or perform any other actions after logout
        navigate("/"); // Redirect to the home page or another appropriate page
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };


  const handleLinkClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      if (window.confirm('You must sign in to access this page. Do you want to sign in now?')) {
        navigate("/signup");
      }
    }
  };

  function navigateToHome() {
    window.location.href = '/'; // Replace '/' with the URL of your home page
  }

  return (
    <div className="nav-bar">
      <div className="logo" onClick={navigateToHome}>
        <FontAwesomeIcon icon={faHome}/>
      </div>
      <div className="display-menu">
        <div className="menu" onClick={() => handleLinkClick("/makemethod")}>Make a Method</div>
        <div className="menu" onClick={() => handleLinkClick("/fillmethod")}>Fill a Method</div>
        <div className="menu" onClick={toggleMethodsDropdown}>
          Your Methods
          {isMethodsDropdownOpen && (
            <div className="dropdown-content">
              <div onClick={() => handleLinkClick("/mademethod")} className="dropdown-item">Created By Me</div>
              <div onClick={() => handleLinkClick("/filledmethods")} className="dropdown-item">My Responses</div>
            </div>
          )}
        </div>
        <div className='signinsignup'>
          {isAuthenticated ? (
            <div className="dropdown">
              <button onClick={toggleUserDropdown} className="user-logo">
                <FontAwesomeIcon icon={faUser} />
              </button>
              {isUserDropdownOpen && (
                <div className="acc-dropdown-content">
                  <div className="dropdown-item">Username: {username}</div>
                  <div className="dropdown-item">Email: {email}</div>
                  <button onClick={handleLogout} className="dropdown-item-button">Log Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup" className='signup-button'>
              <FontAwesomeIcon icon={faUser} className="user-icon"/> Sign Up/Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
