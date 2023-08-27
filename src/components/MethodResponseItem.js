import React, { useEffect, useState } from 'react';
import './MethodResponseItem.css';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

function MethodResponseItem({ method }) {
    const [username, setUsername] = useState('');
 
  const handleViewAnswers = (method) => {
    window.location.href = `/viewanswers?responseId=${method.responseid}`;

  };

  useEffect(() => {
    const docRef = doc(db, 'Users', method.responderId);

    // Fetch the document
    getDoc(docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const fetchedUsername = data.username;
          console.log('Document data:', data);

          setUsername(fetchedUsername);
        } else {
          console.log('Document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error fetching document:', error);
      });
  }, [method.responderId]); // Include uid as a dependency to run the effect when it changes

  return (
    <div className="mr-method-item">
      <h3>Responded By : {username}</h3>
      <p>Responded On : {method.responseDate}</p>
      {/* Add other details you want to display */}

      <div className='mr-action-buttons'>
        <span className="mr-clickable-text" onClick={() => handleViewAnswers(method)}>View Answers</span>
      </div>
    </div>
  );
}

export default MethodResponseItem;
