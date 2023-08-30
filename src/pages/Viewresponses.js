import { React, useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Viewresponses.css'
import { auth } from '../firebase';
import MethodResponseItem from '../components/MethodResponseItem';
import { useLocation } from 'react-router-dom';



function Viewresponses() {
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const methodId = searchParams.get("methodId");
    const [methods, setMethods] = useState('');
    console.log(methodId);


    useEffect(() => {
        console.log("useeffect is")
        fetch(`http://localhost:8081/responses/${methodId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched survey data:", data); // Add this line for debugging
                setMethods(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching survey details:", error));
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can customize the loading indicator
    }


    return (
        <div className='vr-main-container'>
            <Navbar />
            <div className='vr-method-list'>
                <h2>Responses To Your Method</h2>
                {methods.map((method) => (
                    <div
                        key={method.responseid}
                        className='vr-method-item-container'
                    // onClick={() => handleMethodClick(method)}
                    >
                        <MethodResponseItem method={method} />
                    </div>
                ))}

            </div>

        </div>
    )
}


export default Viewresponses;