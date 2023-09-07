import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Navbar from './Navbar';
import './Makenewsur.css';
import AnimatedPage from '../components/AnimatedPage';
import Modal from '../components/Modal';


function Makenewsur() {
    const [showModal, setShowModal] = useState(false);
    const [methodId, setMethodId] = useState('');
    const [methodName, setMethodName] = useState('');
    const [surveyMakerSignature, setSurveyMakerSignature] = useState('');
    const [creationDate, setCreationDate] = useState(new Date().toISOString().split('T')[0]);
    const [questions, setQuestions] = useState([]);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state



    useEffect(() => {
        // Create an authentication state change listener
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            // if (user) {
            //     try {
            //         const userId = user.uid;
            //         const response = await fetch(`http://localhost:8081/methods/${userId}`);
            //         if (response.ok) {
            //             const data = await response.json();
            //             setMethods(data);
            //         } else {
            //             console.error('Error fetching data:', response.statusText);
            //         }
            //     } catch (error) {
            //         console.error('Error fetching data:', error);
            //     } finally {
            //         setLoading(false); // Set loading to false once the data is fetched or in case of an error
            //     }

            // Fetch the username when the user is authenticated
            const uid = user.uid;
            const docRef = doc(db, "Users", uid);

            try {
                // Fetch the document
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const fetchedUsername = data.username;
                    console.log("Document data:", data);

                    // Set the username here
                    setUsername(fetchedUsername);
                    setLoading(false);
                } else {
                    setLoading(false);
                    console.log("Document does not exist.");
                }
            } catch (error) {
                setLoading(false);
                console.error("Error fetching document:", error);
            }
            // } else {
            //     setLoading(false); // Set loading to false if the user is not authenticated
            // }
        });

        // Clean up the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);


    if (loading) {
        // Show a loading indicator until the username is fetched
        return <div>Loading...</div>;
    }


    const handleCreateSurvey = async () => {
        // Generate a unique identifier (for simplicity, using current timestamp)
        const user = auth.currentUser;
        const uniqueIdentifier = uuidv4();
        const uid = user.uid;

        let idExists = false;

        // Check if the generated ID already exists in the database
        while (idExists) {
            try {
                const response = await axios.get(`http://localhost:8081/methods/${uniqueIdentifier}`);
                if (response.data) {
                    uniqueIdentifier = uuidv4();
                } else {
                    idExists = false;
                }
            } catch (error) {
                idExists = false;
            }
        }

        setMethodId(uniqueIdentifier);

        // Prepare data to submit
        const surveyData = {
            methodId: uniqueIdentifier,
            userId: uid,
            methodMaker: username,
            methodName: methodName,
            creationDate: creationDate,
            questions: questions,
        };

        try {
            // Make a POST request to your backend API to create the survey
            const response = await axios.post('http://localhost:8081/methods', surveyData);
            console.log(response.data);
            setShowModal(true);
            // Reset state
            setMethodName('');
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

    console.log("this username", username)

    return (
        <AnimatedPage>
            <div className='mn-main-container'>
                <Navbar />
                <div className='mn-container'>

                    <h1>Create a New Method</h1>
                    {/* Display the generated methodId */}

                    <label htmlFor="methodName">Method Name:</label>
                    <input className='makemethod-input'
                        type="text"
                        id="methodName"
                        value={methodName}
                        onChange={e => setMethodName(e.target.value)}
                    />

                    {/* <label htmlFor="surveyMakerSignature">Survey Maker's Signature:</label>
            <input
                type="text"
                id="surveyMakerSignature"
                value={surveyMakerSignature}
                onChange={e => setSurveyMakerSignature(e.target.value)}
            /> */}

                    <label htmlFor="creationDate">Creation Date:</label>
                    <input className='makemethod-input'
                        type="date"
                        id="creationDate"
                        value={creationDate}
                        onChange={e => setCreationDate(e.target.value)}
                    />

                    <h2>Add Questions</h2>
                    <label htmlFor="questionText">Question Text:</label>
                    <input type="text" id="questionText" className='makemethod-input' />
                    <button onClick={handleAddQuestion} className='add-question-button'>Add Question</button>

                    <div>
                        <h2>Method Questions</h2>
                        <ul className='list-questions'>
                            {questions.map((question, index) => (
                                <li key={index} className='makemethod-li'>
                                    {question.text}
                                    <button onClick={() => handleRemoveQuestion(index)} className='add-question-button'>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button onClick={handleCreateSurvey} className='submit-button'>Submit Method</button>
                    <Modal show={showModal} onClose={() => setShowModal(false)} />
                </div>
            </div>
        </AnimatedPage>
    );
}

export default Makenewsur;
