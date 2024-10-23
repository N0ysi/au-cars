import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function NewCars() {
  const [cars, setCars] = useState([]);
  const { user } = useAuth();

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


  const getOurCars = async () => {
    try {
      const res = await fetch('/api/cars/getOurCars', {
        method: 'GET', // Используем метод GET
        cache: 'no-store'
      });
      const data = await res.json();
      if (res.ok) {
        if (data && Array.isArray(data.cars)) {
          setCars(data.cars);  // Присваиваем массив автомобилей из объекта
          console.log('setCars', cars);
        } else {
          console.error("Полученные данные не являются массивом:", data);
          setCars([]); // Очищаем список автомобилей в случае ошибки
        }
      } else {
        console.error("Ошибка при получении автомобилей:", data.error);
      }
    } catch (error) {
      console.error('Ошибка при запросе автомобилей:', error);
    }
  };

  useEffect(() => {
    getOurCars();
  }, []);

  return (
    <section id="section-NewCars">
      <div className="container">
        <div className="description">
          <p className="title">New interesting cars:</p>
          {cars && cars.length > 0 ? (
            cars.map((car) => (
              <div key={car._id} className="example">
                <img src={car.imgUrl} alt={car.name} />
                <p className="name">{car.name}</p>
                <p className="specs">
                  <b>Power:</b> {car.power}<br />
                  <b>Torque:</b> {car.torque}<br />
                  <b>Transmission:</b> {car.transmission}<br />
                  <b>Vehicle type:</b> {car.carType}<br />
                  <b>Price:</b> {car.price}
                </p>
                <button className="btn" onClick={() => window.open(car.url)}>
                  Read more
                </button>
                <button id={car._id} className='btn' onClick={() => buyCar(car._id)}>
                  Buy
                </button>
              </div>
            ))
          ) : (
            <div className="text">
              <p>We have no cars</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}