import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function ManageCars() {
    const [cars, setCars] = useState([]);
    const [openedCarId, setOpenedCarId] = useState(null); // Для отслеживания открытого пользователя
    const [savedCars, setSavedCars] = useState([]);
    const [deletedCars, setDeletedCars] = useState([]);

    const formVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 }
    };

    const openCar = (carId) => {
        console.log('openUser id', carId);
        setOpenedCarId((prevCarId) => (prevCarId === carId ? null : carId));
    };

    const handleInputChange = (e, carId, field) => {
        const { value } = e.target;
        setCars((prevUsers) =>
            prevUsers.map((user) =>
                user._id === carId ? { ...user, [field]: value } : user
            )
        );
    };

    const saveChanges = async (car) => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const res = await fetch('/api/cars/updateCar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        carId: car._id,
                        name: car.name,
                        power: car.power,
                        torque: car.torque,
                        transmission: car.transmission,
                        carType: car.carType,
                        price: car.price,
                        url: car.url,
                        imgUrl: car.imgUrl,
                        amount: car.amount
                    }),
                });
                const data = await res.json();
                console.log('saveChanges', data);
                if (res.ok) {
                    console.log('Car updated successfully');
                    // Добавляем пользователя в массив savedUsers для изменения цвета кнопки
                    setSavedCars((prevSavedCars) => [...prevSavedCars, car._id]);
                    setTimeout(() => {
                        setSavedCars((prevSavedCars) =>
                            prevSavedCars.filter((id) => id !== car._id)
                        );
                    }, 2000);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error updating car:', error);
            }
        }
    }

    const deleteCar = async (car) => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const res = await fetch('/api/cars/deleteCar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        carId: car._id
                    }),
                });
                const data = await res.json();
                console.log('deleteCar', data);
                if (res.ok) {
                    console.log('Car has been deleted successfully');
                    // Добавляем пользователя в массив savedUsers для изменения цвета кнопки
                    setDeletedCars((prevSavedCars) => [...prevSavedCars, car._id]);
                    setTimeout(() => {
                        setDeletedCars((prevSavedCars) =>
                            prevSavedCars.filter((id) => id !== car._id)
                        );
                    }, 2000);
                    manageCars();
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error deleting car:', error);
            }
        }
    }

    const manageCars = async () => {
        try {
            const res = await fetch('/api/cars/manageCars', {
                method: 'GET',
                cache: 'no-store'
            });

            const data = await res.json();

            console.log(data);
            if (res.ok) {
                if (data && Array.isArray(data.cars)) {
                    setCars(data.cars);  // Присваиваем массив автомобилей из объекта
                    console.log('setCars', cars);
                } else {
                    console.error("not array:", cars);
                    setCars([]); // Очищаем список автомобилей в случае ошибки
                }
            } else {
                console.error("Error getting cars:", data.error);
            }
        } catch (error) {
            console.error('Error getting cars:', error);
        }
    }

    useEffect(() => {
        manageCars();
    }, [])

    return (
        <div className="container">
            <div id='manageCarsDiv' className="manage">
                {cars && cars.length > 0 ? (
                    cars.map((mappingCar) => (
                        <div key={mappingCar._id}>
                            {/* Кнопка для открытия формы */}
                            <button
                                id={mappingCar._id}
                                className="manageBtn"  // Устанавливаем класс userBtn
                                onClick={() => openCar(mappingCar._id)}
                            >
                                {mappingCar.userId !== '' ?
                                    (
                                        mappingCar.name + ' (sold)'
                                    ) : (

                                        mappingCar.name
                                    )}
                            </button>
                            {openedCarId === mappingCar._id && (
                                <form
                                    key={mappingCar._id}
                                    className="authForm"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={formVariants}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img src={mappingCar.imgUrl} />
                                    <input
                                        type="name"
                                        value={mappingCar.name}
                                        onChange={(e) => handleInputChange(e, mappingCar._id, 'name')}
                                        placeholder="Name"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={mappingCar.power}
                                        onChange={(e) => handleInputChange(e, mappingCar._id, 'power')}
                                        placeholder="Power"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={mappingCar.torque}
                                        onChange={(e) => handleInputChange(e, mappingCar._id, 'torque')}
                                        placeholder="Torque"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={mappingCar.transmission}
                                        onChange={(e) => handleInputChange(e, mappingCar._id, 'transmission')}
                                        placeholder="Transmission"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={mappingCar.carType}
                                        onChange={(e) => handleInputChange(e, mappingCar._id, 'carType')}
                                        placeholder="carType"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={mappingCar.url}
                                        onChange={(e) => handleInputChange(e, mappingCar._id, 'url')}
                                        placeholder="url"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={mappingCar.imgUrl}
                                        onChange={(e) => handleInputChange(e, mappingCar._id, 'imgUrl')}
                                        placeholder="imgUrl"
                                    />
                                    <input
                                        type="text"
                                        defaultValue={mappingCar.amount}
                                        onChange={(e) => handleInputChange(e, mappingCar._id, 'amount')}
                                        placeholder="amount"
                                    />
                                    {mappingCar.userId !== '' ? (
                                        <input
                                            type="text"
                                            defaultValue={mappingCar.userId}
                                            onChange={(e) => handleInputChange(e, mappingCar._id, 'userId')}
                                            placeholder="UserId"
                                        />
                                    ) : (null)}
                                    <button className="btn" onClick={(e) => {
                                        e.preventDefault();
                                        saveChanges(mappingCar);
                                    }} style={{
                                        backgroundColor: savedCars.includes(mappingCar._id) ? 'green' : ''
                                    }}>
                                        Save changes
                                    </button>
                                    <button className="btn" onClick={(e) => {
                                        e.preventDefault();
                                        deleteCar(mappingCar);
                                    }} style={{
                                        backgroundColor: deletedCars.includes(mappingCar._id) ? 'green' : ''
                                    }}>
                                        Delete
                                    </button>
                                </form>
                            )}

                        </div>
                    ))
                ) : (
                    <div className="text">
                        <p>(if you see this, something went wrong)</p>
                        <p>We have no users</p>
                    </div>
                )}
            </div>
        </div>
    );
}