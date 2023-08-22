import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import { v4 as uuidv4 } from 'uuid';

function Makenewsur() {
    const [surveyId, setSurveyId] = useState('');
    const [surveyName, setSurveyName] = useState('');
    const [surveyMakerSignature, setSurveyMakerSignature] = useState('');
    const [creationDate, setCreationDate] = useState(new Date().toISOString().split('T')[0]);
    const [questions, setQuestions] = useState([]);

    const handleCreateSurvey = async () => {
        // Generate a unique identifier (for simplicity, using current timestamp)
        const uniqueIdentifier = uuidv4();
        let idExists = false;

        // Check if the generated ID already exists in the database
        while (idExists) {
            try {
                const response = await axios.get(`http://localhost:8081/surveys/${uniqueIdentifier}`);
                if (response.data) {
                    uniqueIdentifier = uuidv4();
                } else {
                    idExists = false;
                }
            } catch (error) {
                idExists = false;
            }
        }

        setSurveyId(uniqueIdentifier);

        // Prepare data to submit
        const surveyData = {
            surveyId: uniqueIdentifier,
            surveyName: surveyName,
            surveyMaker: surveyMakerSignature,
            creationDate: creationDate,
            questions: questions,
        };

        try {
            // Make a POST request to your backend API to create the survey
            const response = await axios.post('http://localhost:8081/surveys', surveyData);
            console.log(response.data);

            // Reset state
            setSurveyName('');
            setSurveyMakerSignature('');
            setCreationDate(new Date().toISOString().split('T')[0]);
            setQuestions([]);
        } catch (error) {
            console.error('Error creating survey:', error);
        }
    };

    const handleAddQuestion = () => {
        const questionText = document.getElementById('questionText').value;

        setQuestions(prevQuestions => [
            ...prevQuestions,
            {
                text: questionText,
            }
        ]);

        // Reset input fields
        document.getElementById('questionText').value = '';
    };

    const handleRemoveQuestion = (index) => {
        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions.splice(index, 1);
            return updatedQuestions;
        });
    };

    return (
        <div>
            <h1>Create a New Survey</h1>
            {/* Display the generated surveyId */}
            <p>Generated Survey ID: {surveyId}</p>

            <label htmlFor="surveyName">Survey Name:</label>
            <input
                type="text"
                id="surveyName"
                value={surveyName}
                onChange={e => setSurveyName(e.target.value)}
            />

            <label htmlFor="surveyMakerSignature">Survey Maker's Signature:</label>
            <input
                type="text"
                id="surveyMakerSignature"
                value={surveyMakerSignature}
                onChange={e => setSurveyMakerSignature(e.target.value)}
            />

            <label htmlFor="creationDate">Creation Date:</label>
            <input
                type="date"
                id="creationDate"
                value={creationDate}
                onChange={e => setCreationDate(e.target.value)}
            />

            <h2>Add Questions</h2>
            <label htmlFor="questionText">Question Text:</label>
            <input type="text" id="questionText" />
            <button onClick={handleAddQuestion}>Add Question</button>

            <div>
                <h2>Survey Questions</h2>
                <ul>
                    {questions.map((question, index) => (
                        <li key={index}>
                            {question.text}
                            <button onClick={() => handleRemoveQuestion(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={handleCreateSurvey}>Submit Survey</button>
        </div>
    );
}

export default Makenewsur;
