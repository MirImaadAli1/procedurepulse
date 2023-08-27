import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from React Router
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };



  return (
    <div className="nav-bar">
      <div className="logo">
        <FontAwesomeIcon icon={faHome} />
      </div>
      <div className="display-menu">
        <Link className="menu" to={"/makemethod"}>Make a Method</Link>
        <Link className="menu" to={"/fillmethod"}>Fill a Method</Link>
        <div className="menu" onClick={toggleDropdown}>
          Your Methods
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to={"/mademethod"}>Methods Made by You</Link>
              <Link to={"/filledmethods"}>Methods Filled by You</Link>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}
