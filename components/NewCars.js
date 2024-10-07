import React from 'react';

export default function NewCars() {
  return (
    <section id="section-NewCars">
      <div className="container">
        <div className="description">
          <p className="title">New interesting cars:</p>
          <div className="example">
            <img src="/img/audi rs7.jpeg" alt="Audi RS7" className="carImg" />
            <p className="name">Audi RS7 2024:</p>
            <p className="specs">
              <b>Power:</b> 591 hp/6250 rpm<br />
              <b>Torque:</b> 800 nm/2050 rpm<br />
              <b>Transmission:</b> 8-speed automatic<br />
              <b>Vehicle type:</b> All-wheel-drive, 4-door hatchback<br />
              <b>Price:</b> $150,000
            </p>
            <button className="btn" onClick={() => window.open('https://www.caranddriver.com/audi/rs7')}>Read more</button>
          </div>
          <div className="example">
            <img src="/img/panamera1.jpeg" alt="Porsche Panamera" className="carImg" />
            <p className="name">Porsche Panamera Turbo S 2024:</p>
            <p className="specs">
              <b>Power:</b> 680 hp/6000 rpm<br />
              <b>Torque:</b> 930 nm/2330 - 4000 rpm<br />
              <b>Transmission:</b> Dual-clutch, 8-speed<br />
              <b>Price:</b> $192,995
            </p>
            <button className="btn" onClick={() => window.open('https://www.caranddriver.com/porsche/panamera-turbo-turbo-s')}>Read more</button>
          </div>
        </div>
      </div>
    </section>
  );
}