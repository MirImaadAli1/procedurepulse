import Navbar from './Navbar';
import './ViewYourAnswers.css';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from 'react';
import AnimatedPage from '../components/AnimatedPage';

function ViewYourAnswer() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const responseId = searchParams.get("responseId");
    const [answerData, setAnswerData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/answers/${responseId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched survey data:", data);
                setAnswerData(data);
            })
            .catch((error) => console.error("Error fetching survey details:", error));
    }, [responseId]);

    function arrayBufferToBase64(arrayBuffer) {
        const binaryArray = new Uint8Array(arrayBuffer);
        const base64String = btoa(String.fromCharCode.apply(null, binaryArray));
        return base64String;
    }

    // console.log("photodata", answerData[0].photo);

    return (
        <AnimatedPage>
            <div className="vya-main-container">
                <Navbar />
                <div className="vya-method-container">
                    <h2>These are Your Answers!</h2>
                    {answerData.map((response, index) => (
                        <div key={index} className='vya-bordered-container'>
                            <p>Question {index + 1}</p>
                            <p className='question-class'>{response.question}</p>
                            <p>Your Answer: {response.answer}</p>
                            <p>Your Comments: {response.comments}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedPage>
    )
}
// function createImageURL(bufferData) {
//     const blob = new Blob([Buffer.from(bufferData)], { type: 'image/jpeg' }); // Specify the correct image type (e.g., 'image/jpeg')
//     return URL.createObjectURL(blob);
// }

export default ViewYourAnswer;
