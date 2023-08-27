import React from 'react';
import './MethodItem.css';

function MethodItem({ method }) {

  const handleViewQuestions = (method) => {
    window.location.href = `/viewquestions?methodId=${method.methodId}`;

  };

  const handleViewResponses = (method) => {
    window.location.href = `/viewresponses?methodId=${method.methodId}`;

  };
  return (
    <div className="method-item">
      <h3>Method Name: {method.methodName}</h3>
      <p>Created On: {method.methodDate}</p>
      {/* Add other details you want to display */}

      <div className='action-buttons'>
        <span className="clickable-text" onClick={() => handleViewQuestions(method)}>View Questions</span>
        <span className="clickable-text" onClick={() => handleViewResponses(method)}>View Responses</span>
      </div>
    </div>
  );
}

export default MethodItem;
