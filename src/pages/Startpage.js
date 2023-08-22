import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Startpage.css';
import Navbar from './Navbar';

const Startpage = () => {
  return (
    <div>
      <Navbar/>
        <div className="main-container">
          <div className="description-container">
            <p className="description-text">
              X is a method-making and sharing website that allows you to create and
              distribute method, with responses available and accessible to you.
            </p>
          </div>
          <Link to="/makeanewsur" className='make-survey-button'>Make a Survey</Link>
          <div className='signinsignup'>
            <Link to="/signup" className='signup-button'>Sign Up/Sign In</Link>
          </div>
        </div>
    </div>
  );
};

export default Startpage;
