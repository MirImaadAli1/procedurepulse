import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Startpage.css';
import Navbar from './Navbar';
import AnimatedPage from '../components/AnimatedPage';

const Startpage = () => {
  return (
    <AnimatedPage>
      <div>
        <Navbar />
        <div className="main-container">
          <div className="description-container">
            <p className="description-text">
              ProcedurePulse is a user-owned process standardization tool and sharing website that allows you to create and distribute standard methods, 
              with responses available and accessible to you
            </p>
          </div>
          <Link to="/makeanewsur" className='make-survey-button'>Create a Method</Link>

        </div>
      </div>
    </AnimatedPage>
  );
};

export default Startpage;
