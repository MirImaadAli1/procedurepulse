import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "react-router-dom";
import './Surveydetails.css';
import Navbar from "./Navbar";
import { auth } from "../firebase";

const SurveyDetailsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const methodId = searchParams.get("methodId");
  const answersData = [];

  const [methodData, setMethodId] = useState(null);
  const [responses, setResponses] = useState([]);

  const handleResponseChange = (question_id, value) => {
    // Update the responses state based on user input
    setResponses(prevResponses => {
      const updatedResponses = [...prevResponses];
      const existingResponse = updatedResponses.find(response => response.question_id === question_id);

      if (existingResponse) {
        // Update the answer
        existingResponse.answer = value;
        console.log("Existing response updated");
      } else {
        // Initialize a new response
        updatedResponses.push({ question_id: question_id, answer: value, comments: "", photo: null });
        console.log("New response added");
      }

      return updatedResponses;
    });
  };


  const handleCommentsChange = (question_id, comments) => {
    setResponses(prevResponses => {
      const updatedResponses = prevResponses.map(response => {
        if (response.question_id === question_id) {
          return { ...response, comments: comments };
        }
        return response;
      });

      // If no existing response was found, initialize a new response
      if (!updatedResponses.some(response => response.question_id === question_id)) {
        updatedResponses.push({ question_id: question_id, answer: "", comments: comments, photo: null });
        console.log("New response added");
      }

      return updatedResponses;
    });
  };

  const handlePhotoChange = (question_id, photo) => {
    const reader = new FileReader();

    reader.onload = () => {
      const data = new Uint8Array(reader.result);

      // Convert binary data to a binary string
      const binaryString = data.reduce((str, byte) => str + String.fromCharCode(byte), '');

      setResponses(prevResponses => {
        const updatedResponses = prevResponses.map(response => {
          if (response.question_id === question_id) {
            return { ...response, photo: binaryString };
          }
          return response;
        });

        // If no existing response was found, initialize a new response
        if (!updatedResponses.some(response => response.question_id === question_id)) {
          updatedResponses.push({ question_id: question_id, answer: "", comments: "", photo: binaryString });
          console.log("New response added");
        }

        return updatedResponses;
      });
    };

    reader.readAsArrayBuffer(photo);
  };



  const handleUpdateResponses = async () => {
    try {

      const responseId = uuidv4();
      const user = auth.currentUser;
      const responderUserId = user.uid;
      const methodMakerUserId = methodData.method_maker_id;
      // const formDataResponses = responses.map(response => ({
      //   ...response,
      //   photo: response.photo || null, // Send FormData object for photo or null if not provided
      // }));

      methodData.questions.map(question => {
        const response = responses.find(response => response.question_id === question.question_id) || {};

        const answerData = {
          response_id: responseId, // Include the response ID in each answer
          question_id: question.question_id,
          question_text: question.question_text,
          answer_text: response.answer || '',
          comments: response.comments || '',
          photo_upload: response.photo || null,
        };

        answersData.push(answerData);
      });


      const additionalData = {
        responseId,
        responderUserId,
        methodMakerUserId,
        methodId,
        methodName: methodData.method_name,
        responseDate: new Date().toISOString(), // Current date and time
      };

      console.log("Data being sent to server:", { ...additionalData, responses: answersData });

      const response = await axios.post("http://localhost:8081/surveyresponses", {
        ...additionalData,
        responses: answersData,
      });

      console.log("Responses and photos updated successfully!", response.data);
    } catch (error) {
      console.error("Error updating responses and photos:", error);
    }
  };


  useEffect(() => {
    fetch(`http://localhost:8081/surveydetails/${methodId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched survey data:", data); // Add this line for debugging
        setMethodId(data);
      })
      .catch((error) => console.error("Error fetching survey details:", error));
  }, [methodId]);


  if (!methodData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="md-main-container">
      <Navbar />
      <div className="method-container">
        <h2>Welcome to {methodData.method_name}</h2>
        <div>
          <p>Made By: {methodData.method_maker_name}</p>
          {/* <p>Survey ID: {methodData.method_id}</p> */}
          <p>Date: {methodData.method_date}</p>

        </div>
        {methodData.questions.map((question) => (
          <div key={question.question_id}>
            <p>{question.question_text}</p>
            <select onChange={(e) => handleResponseChange(question.question_id, e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="N/A">N/A</option>
            </select>
            <input
              type="text"
              placeholder="Comments"
              onChange={(e) => handleCommentsChange(question.question_id, e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoChange(question.question_id, e.target.files[0])}
            />
          </div>
        ))}
        <button onClick={handleUpdateResponses} className="update-button">Update Responses</button>
      </div>

    </div>
  );
};

export default SurveyDetailsPage;
