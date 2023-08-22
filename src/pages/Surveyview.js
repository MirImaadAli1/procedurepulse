import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Surveyview({ match }) {
    const [surveyData, setSurveyData] = useState(null);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/surveys/${match.params.surveyId}`);
                setSurveyData(response.data);
            } catch (error) {
                console.error('Error fetching survey data:', error);
            }
        };

        fetchSurveyData();
    }, [match.params.surveyId]);

    return (
        <div>
            {surveyData ? (
                <div>
                    <h1>{surveyData.surveyName}</h1>
                    {/* Display survey questions here */}
                </div>
            ) : (
                <p>Loading survey data...</p>
            )}
        </div>
    );
}

export default Surveyview;
