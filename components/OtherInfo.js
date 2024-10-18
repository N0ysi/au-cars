import React from "react";
import { useAuth } from '../context/AuthContext';


export default function OtherInfo() {
const { cars } = useAuth();
return (
    <div className="otherInfo">
        <h2 className="title">Previous purchases:</h2>
        <div className="example">
            <img src="/img/audi rs7.jpeg" alt="Audi RS7" className="car_img" />
            <p className="name">Audi RS7 2024:</p>
            <p className="specs">
                <b>Power:</b> 591 hp / 6250 rpm<br />
                <b>Torque:</b> 800 nm / 2050 rpm<br />
                <b>Transmission:</b> 8-speed automatic<br />
                <b>Vehicle type:</b> All-wheel-drive, 4-door hatchback<br />
                <b>Price:</b> $150,000
            </p>
            <button className="btn" onClick={()=> window.open('https://www.caranddriver.com/audi/rs7')}>
                Readmore
            </button>
        </div>
        <div className="example">
            <img src="/img/panamera1.jpeg" alt="Porsche Panamera" className="car_img" />
            <p className="name">Porsche Panamera Turbo S 2024:</p>
            <p className="specs">
                <b>Power:</b> 680 hp/6000 rpm<br />
                <b>Torque:</b> 930 nm/2330 - 4000 rpm<br />
                <b>Transmission:</b> Dual-clutch, 8-speed<br />
                <b>Price:</b> $192,995
            </p>
            <button className="btn" onClick={()=>
                window.open('https://www.caranddriver.com/porsche/panamera-turbo-turbo-s')}>
                Read more
            </button>
        </div>
    </div>
    );
}