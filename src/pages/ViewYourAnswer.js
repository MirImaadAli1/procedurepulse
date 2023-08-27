import Navbar from './Navbar';
import './ViewYourAnswers.css'
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from 'react';

function ViewYourAnswer() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const responseId = searchParams.get("responseId");
    const [answerData, setAnswerData] = useState('');

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


    return (
        <div className="vya-main-container">
            <Navbar />
            <div className="vya-method-container">
                <h2>These are Your Answers!</h2>
                {answerData && answerData.map((question, index) => (
                    <div key={answerData.question_id} className='vya-bordered-container'>
                        <p>Question {index + 1} </p>
                        <p className='question-class'>{question.question}</p>
                        <p>Your Answer : {question.answer}</p>
                        <p>Your Comments : {question.comments}</p>
                        <p>Photo : {question.photo}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ViewYourAnswer;