import { React, useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Mademethods.css'
import { auth } from '../firebase';
import MethodItem from '../components/MethodItem';




function Mademethods() {
    const [methods, setMethods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Create an authentication state change listener
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const userId = user.uid;
                    const response = await fetch(`http://localhost:8081/methods/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setMethods(data);
                    } else {
                        console.error('Error fetching data:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false); // Set loading to false once the data is fetched or in case of an error
                }
            } else {
                setLoading(false); // Set loading to false if the user is not authenticated
            }
        });

        // Clean up the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can customize the loading indicator
    }

    return (
        <div className='mm-main-container'>
            <Navbar />
            <div className='method-list'>
                <h2>Your Methods</h2>
                {methods.map((method) => (
                    <div
                        key={method.methodId}
                        className='method-item-container'
                    // onClick={() => handleMethodClick(method)}
                    >
                        <MethodItem method={method} />
                    </div>
                ))}

            </div>

        </div>
    )
}


export default Mademethods;