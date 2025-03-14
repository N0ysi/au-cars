import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function ManageCars() {
    const [cars, setCars] = useState([]);
    const [openedCarId, setOpenedCarId] = useState(null); 
    const [savedCars, setSavedCars] = useState([]);
    const [deletedCars, setDeletedCars] = useState([]);
    const [carHeight, setCarHeight] = useState(300);

    const formVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 }
    };

    const openCar = (carId) => {
        console.log('openCar id', carId);
        if (openedCarId === carId) {
            setOpenedCarId(null); 
            setCarHeight(300); 
        } else {
            setOpenedCarId(carId); 
            setCarHeight(650); 
        }
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
                if (res.ok) {
                    setSavedCars((prevSavedCars) => [...prevSavedCars, car._id]);
                    setTimeout(() => {
                        setSavedCars((prevSavedCars) =>
                            prevSavedCars.filter((id) => id !== car._id)
                        );
                    }, 2000);
                }
            } catch (error) {
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
                    setDeletedCars((prevSavedCars) => [...prevSavedCars, car._id]);
                    setTimeout(() => {
                        setDeletedCars((prevSavedCars) =>
                            prevSavedCars.filter((id) => id !== car._id)
                        );
                    }, 2000);
                    manageCars();
                } 
            } catch (error) {
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

            if (res.ok) {
                if (data && Array.isArray(data.cars)) {
                    setCars(data.cars);  
                    console.log('setCars', cars);
                } else {
                    console.error("not array:", cars);
                    setCars([]); 
                }
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        manageCars();
    }, [])

    return (
        <div className="container">
            <div
                id='manageCarsDiv'
                className="manage"
                style={{ maxHeight: `${carHeight}px` }} 
            >
                {cars && cars.length > 0 ? (
                    <ul className='manageUl'>

                        {cars.map((mappingCar) => (
                            <li key={mappingCar._id} className='manageLi'>
                                <div
                                    id={mappingCar._id}
                                    className="listDiv"  
                                    onClick={() => openCar(mappingCar._id)}
                                >
                                    {mappingCar.userId !== '' ?
                                        (
                                            mappingCar.name + ' (sold)'
                                        ) : (
                                            mappingCar.name
                                        )}
                                </div>
                                {openedCarId === mappingCar._id && (
                                    <form
                                        key={mappingCar._id}
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
                                        <div className='buttons'>
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
                                        </div>
                                    </form>
                                )}

                            </li>
                        ))}
                    </ul>
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