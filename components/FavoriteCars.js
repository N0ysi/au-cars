import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export default function FavoriteCars() {
    const router = useRouter();
    const { user } = useAuth();  
    const [cars, setCars] = useState([]);  

    const buyCar = async (carId, price) => {
        const userId = user?.userId; 
        if (!userId || user.role == 'manager') {
            return; 
        }
        await router.push({
            pathname: '/payment',
            query: { carId, price, userId }
        });
    };

    const getFavoriteCars = async (userId) => {
        try {
            const res = await fetch(`/api/cars/getFavoriteCars`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ userId })
            });
            const data = await res.json();
            if (data && Array.isArray(data.favoriteCars)) {
                setCars(data.favoriteCars); 
            } else {
                setCars([]);
            }
        } catch (error) {
        }
    };

    const removeFromFavorites = async (carId) => {
        const userId = user?.userId;
        if (!userId) {
            return;
        }


        try {
            const res = await fetch('/api/cars/removeFromFavorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ carId, userId }),
            });

            const data = await res.json();
            if (res.ok) {
                setCars((prev) => prev.filter(car => car._id !== carId));
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        if (user && user.userId) {
            getFavoriteCars(user.userId);  
        }
    }, [user]);  

    return (
        <div className='container'>
            <h2 className="title">Favorite cars:</h2>
            <div className="description">
                {cars && cars.length > 0 ? (
                    cars.map((car) => (
                        <div key={car._id} className="example">
                            <img src={car.imgUrl} alt={car.name} className="car_img" />
                            <div className="specs">
                                <p className="name">{car.name}</p>
                                <p><b>Power:</b> {car.power}<br /></p>
                                <p><b>Torque:</b> {car.torque}<br /></p>
                                <p><b>Transmission:</b> {car.transmission}<br /></p>
                                <p><b>Vehicle type:</b> {car.carType}<br /></p>
                                <p><b>Price:</b> {car.price}</p>
                            </div>
                            <div className='buttons'>
                                <button className="btn" onClick={() => window.open(car.url)}>
                                    Read more
                                </button>
                                <button id={car._id} className='btn' onClick={() => buyCar(car._id, car.price)}>
                                    Buy
                                </button>
                                <button className="btn" onClick={() => removeFromFavorites(car._id)}>
                                    <img id='saved' src='/img/saved.png' alt="Saved" style={{ display: 'block' }} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>You have no cars</p>
                )}
            </div>
        </div>
    );
}