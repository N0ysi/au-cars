import React, { useState } from 'react';

export default function OtherInfo() {
    const [cars] = useState([]);

    return (
        <div className="otherInfo">
            <h2 className="title">Previous purchases:</h2>
            {cars.length > 0 ? (
                cars.map((car) => (
                    <div className="example">
                        <img src={car.imgUrl} alt={car.name} className="car_img" />
                        <p className="name">{car.name}</p>
                        <p className="specs">
                            <b>Power:</b>{car.power}<br />
                            <b>Torque:</b> {car.torque}<br />
                            <b>Transmission:</b> {car.transmission}<br />
                            <b>Vehicle type:</b> {car.type}<br />
                            <b>Price:</b> {car.price}
                        </p>
                        <button className="btn" onClick={() => window.open(car.url)}>
                            Readmore
                        </button>
                    </div>
                ))
            ) : (
                <div className="text">
                    <p>You have no cars</p>
                </div>
            )
            }
        </div>
    );
}