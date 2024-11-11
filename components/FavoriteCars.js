import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function FavoriteCars() {
    const { user } = useAuth();  // Получаем информацию о пользователе
    const [cars, setCars] = useState([]);  // Состояние для хранения автомобилей

    const buyCar = async (carId) => {
        const userId = user?.userId; // Или user?.userId в зависимости от структуры
        if (!userId) {
            console.error("User ID is missing!");
            return; // Остановим выполнение, если userId нет
        }

        console.log(`Buying car with ID: carId: ${carId} | userId: ${userId}`);
        try {
            const res = await fetch('/api/cars/buyCar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ carId, userId }),
            });

            const data = await res.json();
            console.log('data', data);

            if (res.ok) {
                var button = document.getElementById(carId);
                button.textContent = 'bought';
                button.style.background = 'green';
            } else {
                console.error("Error purchasing car:", data.error);
            }
        } catch (error) {
            console.error('Error purchasing car:', error);
        }
    };

    // Функция для получения автомобилей пользователя
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
            console.log('Favorite Cars:', data);
            if (data && Array.isArray(data.favoriteCars)) {
                setCars(data.favoriteCars);  // Присваиваем массив автомобилей из объекта
                console.log('setCars', cars);
            } else {
                console.error("Полученные данные не являются массивом:", data);
                setCars([]); // Очищаем список автомобилей в случае ошибки
            }
        } catch (error) {
            console.error('Error fetching user cars:', error);
        }
    };

    const removeFromFavorites = async (carId) => {
        const userId = user?.userId;
        if (!userId) {
            console.error("User ID is missing!");
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
                // Удаляем автомобиль из избранного
                setCars((prev) => prev.filter(car => car._id !== carId));
            } else {
                console.error(`Error removing car from favorites:`, data.error);
            }
        } catch (error) {
            console.error(`Error removing car from favorites:`, error);
        }
    };

    useEffect(() => {
        // Проверяем, существует ли пользователь и его userId
        if (user && user.userId) {
            getFavoriteCars(user.userId);  // Запрашиваем машины пользователя
        }
    }, [user]);  // Зависимость на user

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
                                <button id={car._id} className='btn' onClick={() => buyCar(car._id)}>
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