import './Viewquestions.css'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';



function Viewquestion() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const methodId = searchParams.get("methodId");
    const [methodData, setMethodData] = useState('');
    console.log(methodId);


    useEffect(() => {
        fetch(`http://localhost:8081/surveydetails/${methodId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched survey data:", data); // Add this line for debugging
                setMethodData(data);
            })
            .catch((error) => console.error("Error fetching survey details:", error));
    }, []);


    console.log(methodData);

    return (
        <div className="vq-main-container">
            <Navbar />
            <div className="vqmethod-container">
                <h2>This is your method called {methodData.method_name} !</h2>
                <div className="info-container">
                    <div className="made-by">
                        <p>Made By: {methodData.method_maker_name}</p>
                    </div>
                    <div className="date">
                        <p>Date: {methodData.method_date}</p>
                    </div>
                </div>
                {methodData.questions && methodData.questions.map((questions, index) => (
                    <div key={questions.question_id} className='vqbordered-container'>
                        <p>Question {index + 1}</p>
                        <p>{questions.question_text}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}


export default Viewquestion;