import React from 'react';
import './Modal.css';

function Modal({ show, onClose }) {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <p>Method has been created successfully!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
  