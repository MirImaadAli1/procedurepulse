import React from 'react';
import Navbar from './Navbar';
import './filledmethods.css'
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import MethodItem from '../components/MethodItem';
import MethodSelfResponse from '../components/MethodSelfResponse';
import AnimatedPage from '../components/AnimatedPage';


function Filledmethods() {
    const [yourRespondedMethods, setYourRespondedMethods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Create an authentication state change listener
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const userId = user.uid;
                    const response = await fetch(`http://localhost:8081/yourrespondedmethods/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setYourRespondedMethods(data);
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

    console.log(yourRespondedMethods);


    return (
        <AnimatedPage>
            <div className='fm-main-container'>
                <Navbar />
                <div className='fm-method-list'>
                    <h2>Methods You Responded To</h2>
                    {yourRespondedMethods.map((method) => (
                        <div
                            key={method.methodId}
                            className='fm-method-item-container'
                        // onClick={() => handleMethodClick(method)}
                        >
                            <MethodSelfResponse method={method} />
                        </div>
                    ))}

                </div>

            </div>
        </AnimatedPage>
    )
}


export default Filledmethods;