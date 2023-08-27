import React from 'react';
import './MethodSelfResponse.css';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from 'react';

function MethodSelfResponse({ method }) {
  const [respondedToUsername, setRespondedToUsername] = useState('')

  const handleViewAnswers = (method) => {
    window.location.href = `/viewyouranswers?responseId=${method.responseid}`;

  };

  const handleViewQuestions = (method) => {
    window.location.href = `/viewquestions?methodId=${method.methodId}`;

  };


  console.log(method.respondedUserId);

  const docRef = doc(db, 'Users', method.respondedUserId); // Replace with the actual field name for user ID
  getDoc(docRef)
      .then((docSnapshot) => {
          if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              const fetchedUsername = data.username;
              console.log("Responder's Username:", fetchedUsername);
              setRespondedToUsername(fetchedUsername);
          } else {
              console.log("Document does not exist.");
          }
      })
      .catch((error) => {
          console.error("Error fetching document:", error);
      });
  return (
    <div className="ymr-method-item">
      <h3>Method Name: {method.methodName}</h3>
      <p>Created by: {respondedToUsername}</p>
      <p>Created On: {method.responseDate}</p>
      {/* Add other details you want to display */}

      <div className='ymr-action-buttons'>
        <span className="ymr-clickable-text" onClick={() => handleViewQuestions(method)}>View The Method Questions</span>
        <span className="ymr-clickable-text" onClick={() => handleViewAnswers(method)}>View Your Answer</span>
      </div>
    </div>
  );
}

export default MethodSelfResponse;
