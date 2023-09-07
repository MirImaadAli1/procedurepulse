import Navbar from './Navbar';
import './Viewanswers.css'
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from 'react';
import AnimatedPage from '../components/AnimatedPage';

function Viewanswers() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const responseId = searchParams.get("responseId");
    const [answerData, setAnswerData] = useState('');
    const [responderUsername, setResponderUsername] = useState('')

    useEffect(() => {
        fetch(`http://localhost:8081/answers/${responseId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched survey data:", data); // Add this line for debugging
                setAnswerData(data);
                const responderUserId = data[0].responderid; // Assuming it's the first item
                fetchResponderUsername(responderUserId);

            })
            .catch((error) => console.error("Error fetching survey details:", error));
    }, []);

    const fetchResponderUsername = (responderUserId) => {
        const docRef = doc(db, 'Users', responderUserId); // Replace with the actual field name for user ID
        getDoc(docRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const fetchedUsername = data.username;
                    console.log("Responder's Username:", fetchedUsername);
                    setResponderUsername(fetchedUsername);
                } else {
                    console.log("Document does not exist.");
                }
            })
            .catch((error) => {
                console.error("Error fetching document:", error);
            });
    };

    return (
        <AnimatedPage>
            <div className="va-main-container">
                <Navbar />
                <div className="va-method-container">
                    <h2>These are {responderUsername}'s Answers!</h2>
                    {answerData && answerData.map((question, index) => (
                        <div key={answerData.question_id} className='va-bordered-container'>
                            <p>Question {index + 1} </p>
                            <p className='question-class'>{question.question}</p>
                            <p>Answer : {question.answer}</p>
                            <p>Comments : {question.comments}</p>
                            <p>Photo : {question.photo}</p>
                        </div>
                    ))}
                </div>

            </div>
        </AnimatedPage>
    )
}

export default Viewanswers;