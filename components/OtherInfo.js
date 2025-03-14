import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function OtherInfo() {
    const { user } = useAuth();  
    const [cars, setCars] = useState([]);  
    const getUserCars = async (userId) => {
        try {
            const res = await fetch(`/api/cars/getUserCars`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ userId })
            });
            const data = await res.json();
            console.log('User Cars:', data);
            if (data && Array.isArray(data.existingCars)) {
                setCars(data.existingCars);  
            } else {
                setCars([]); 
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        if (user && user.userId) {
            getUserCars(user.userId);
        }
    }, [user]); 

    return (
        <div className='container'>
            <h2 className="title">Previous purchases:</h2>
            <div className="otherInfo">
                {cars && cars.length > 0 ? (
                    cars.map((car) => (
                        <div key={car._id} className="example">
                            <img src={car.imgUrl} alt={car.name}/>
                            <div className="specs">
                                <p className="name">{car.name}</p>
                                <p><b>Power:</b> {car.power}<br /></p>
                                <p><b>Torque:</b> {car.torque}<br /></p>
                                <p><b>Transmission:</b> {car.transmission}<br /></p>
                                <p><b>Vehicle type:</b> {car.carType}<br /></p>
                                <p><b>Price:</b> {car.price}</p>
                            </div>
                            <button className="btn" onClick={() => window.open(car.url)}>
                                Read more
                            </button>
                        </div>
                    ))
                ) : (
                    <p>You have no cars</p>
                )}
            </div>
        </div>
    );
}