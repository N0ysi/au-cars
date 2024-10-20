import React, { useState } from 'react';

export default function AddCar() {
    const [name, setName] = useState('');
    const [power, setPower] = useState('');
    const [torque, setTorque] = useState('');
    const [transmission, setTransmission] = useState('');
    const [price, setPrice] = useState('');
    const [carType, setCarType] = useState('');
    const [url, setUrl] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [savedCar, setSavedCar] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting registration with:", { name, power, torque, transmission, carType, price, url, imgUrl, amount }); // Логирование данных перед отправкой

        const res = await fetch('/api/cars/addCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, power, torque, transmission, carType, price, url, imgUrl, amount }),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
            console.log('success');
            setSavedCar((prevSavedCars) => [...prevSavedCars, name]);
            setTimeout(() => {
                setSavedCar((prevSavedCars) =>
                    prevSavedCars.filter((carName) => carName !== name)
                );
            }, 2000);
        } else {
            if (typeof data.message === 'object') {
                setError(JSON.stringify(data.message)); // Преобразуем объект в строку
            } else {
                setError(data.message); // Если строка — просто выводим
            }
        }
    };

    return (
        <div className="container">
            <div className="description">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p className="title">Add car:</p>
                <div className="example">
                    <form className="authForm" onSubmit={handleSubmit}>
                        <input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                        <input
                            type="text"
                            value={power}
                            onChange={(e) => setPower(e.target.value)}
                            placeholder="Power"
                            required
                        />
                        <input
                            type="text"
                            value={torque}
                            onChange={(e) => setTorque(e.target.value)}
                            placeholder="torque"
                            required
                        />
                        <input
                            type="text"
                            value={transmission}
                            onChange={(e) => setTransmission(e.target.value)}
                            placeholder="transmission"
                            required
                        />
                        <input
                            type="text"
                            value={carType}
                            onChange={(e) => setCarType(e.target.value)}
                            placeholder="carType"
                            required
                        />
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="price"
                            required
                        />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="url"
                            required
                        />
                        <input
                            type="text"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            placeholder="imgUrl"
                            required
                        />
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="amount"
                            required
                        />
                        <button className="btn" type="submit"
                            style={{ backgroundColor: savedCar.includes(name) ? 'green' : '' }}>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}