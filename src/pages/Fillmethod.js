import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

import './Fillmethod.css';

function Fillmethod() {
    const [requiredMethod, setRequiredMethod] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleMethodQuery = async () => {
        console.log(requiredMethod);
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8081/methoddetails/${requiredMethod}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data); // Assuming you have state for method details
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToMethod = (method_id) => {
        window.location.href = `/method?methodId=${method_id}`;

    };

    return (
        <div className="fillmethod-main-container">
            <Navbar />
            <div className="fillmethod-container">
                <h1>Search for Desired Method</h1>
                <input
                    className='requiredmethod-input'
                    type="text"
                    id="requiredMethodName"
                    value={requiredMethod}
                    onChange={e => setRequiredMethod(e.target.value)}
                />
                <button className="requiredmethod-button" onClick={handleMethodQuery} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
        
                <div className="result-container">
                    <h1>Search Results:</h1>
                    {/* Map over the data array and render each element */}
                    {searchResults.map((element, index) => (
                        <div key={index} className="result" onClick={() => navigateToMethod(element.method_id)}>
                            {/* Replace 'property' with the actual property name you want to display */}

                            <p>Method Name:{element.method_name}</p>
                            <p>Made By:{element.method_maker_name}</p>
                            <p>Created{element.method_date}</p>
                            
                            {/* Add more properties as needed */}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Fillmethod;
