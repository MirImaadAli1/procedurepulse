import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from React Router
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {  
  return (
    <div className="nav-bar">
      <div className="logo">
        <FontAwesomeIcon icon={faHome} />
      </div>
      <div className="display-menu">
        <Link className="menu" to={"/makemethod"}>Make a Method</Link>
        <Link className="menu" to={"/"}>Fill a Method</Link>
        <Link className="menu" to={"/"}>Your Methods</Link>
      </div>
      
      
    </div>
  );
}
