import React from 'react';
import './Updatemodal.css';

function Updatemodal({ show, onClose }) {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <p>Response has been sent successfully!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Updatemodal;
  