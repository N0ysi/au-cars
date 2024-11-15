import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function OtherInfo() {
    const { user } = useAuth();  // Получаем информацию о пользователе
    const [cars, setCars] = useState([]);  // Состояние для хранения автомобилей

    // Функция для получения автомобилей пользователя
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
                setCars(data.existingCars);  // Присваиваем массив автомобилей из объекта
                console.log('setCars', cars);
            } else {
                console.error("Полученные данные не являются массивом:", data);
                setCars([]); // Очищаем список автомобилей в случае ошибки
            }
        } catch (error) {
            console.error('Error fetching user cars:', error);
        }
    };

    useEffect(() => {
        // Проверяем, существует ли пользователь и его userId
        if (user && user.userId) {
            getUserCars(user.userId);  // Запрашиваем машины пользователя
        }
    }, [user]);  // Зависимость на user

    return (
        <div className='container'>
            <h2 className="title">Previous purchases:</h2>
            <div className="otherInfo">
                {cars && cars.length > 0 ? (
                    cars.map((car) => (
                        <div key={car._id} className="manageDiv">
                            <img src={car.imgUrl} alt={car.name} className="car_img" />
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