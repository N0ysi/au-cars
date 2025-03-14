import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function NewCars() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const { user } = useAuth();
  const [favoriteCars, setFavoriteCars] = useState([]);

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


  const getOurCars = async () => {
    try {
      const res = await fetch('/api/cars/getOurCars', {
        method: 'GET',
        cache: 'no-store'
      });
      const data = await res.json();
      if (res.ok) {
        if (data && Array.isArray(data.cars)) {
          setCars(data.cars);  
        } else {
          setCars([]); 
        }
      }
    } catch (error) {
    }
  };

  const getFavoriteCars = async () => {
    const userId = user?.userId;
    if (!userId) return;

    try {
      const res = await fetch(`/api/cars/getFavoriteCars`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (res.ok && data && Array.isArray(data.favoriteCars)) {
        setFavoriteCars(data.favoriteCars.map(car => car._id)); 
      } else {
        setFavoriteCars([]);
      }
    } catch (error) {
    }
  };


  const toggleFavorite = async (carId) => {
    const userId = user?.userId;
    if (!userId) {
      return;
    }

    const isFavorite = favoriteCars.includes(carId);
    try {
      const res = await fetch(isFavorite ? '/api/cars/removeFromFavorites' : '/api/cars/addToFavorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carId, userId }),
      });

      const data = await res.json();
      if (res.ok) {
        if (isFavorite) {
          setFavoriteCars((prev) => prev.filter(id => id !== carId));
        } else {
          setFavoriteCars((prev) => [...prev, carId]);
        }
      }
    } catch (error) {
    }
  };


  const changeView = () => {
    const divs = Array.from(document.getElementsByClassName('example'));
    const isExpanded = divs.length === 0;

    if (isExpanded) {
      const bigDivs = Array.from(document.getElementsByClassName('exampleBig'));
      bigDivs.forEach(div => {
        div.className = 'example';
      });
      document.querySelector('.viewImg').src = '/img/view.svg';
    } else {
      divs.forEach(div => {
        div.className = 'exampleBig';
      });
      document.querySelector('.viewImg').src = '/img/large.png';
    }
  };

  useEffect(() => {
    getOurCars();
    getFavoriteCars();
  }, []);

  return (
    <section id="section-NewCars">
      <div className="container">
        <div className='view'>
          <p className="title">New interesting cars:</p>
          <button className='viewBtn' onClick={() => changeView()}>
            <img className='viewImg' src='/img/view.svg' />
          </button>
        </div>
        <div className="description">
          {cars && cars.length > 0 ? (
            cars.map((car) => (
              <div key={car._id} className="example">
                <img src={car.imgUrl} alt={car.name} />
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
                  <button id={car._id} className='buyBtn' onClick={() => buyCar(car._id, car.price)}>
                    Buy
                  </button>
                  <button className="btn" onClick={() => toggleFavorite(car._id)}>
                    {favoriteCars.includes(car._id) ? (
                      <img id='saved' src='/img/saved.png' alt="Saved" style={{ display: 'block' }} />
                    ) : (
                      <img id='notSaved' src='/img/heart.svg' alt="Not Saved" style={{ display: 'block' }} />
                    )}
                  </button>
                </div>
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