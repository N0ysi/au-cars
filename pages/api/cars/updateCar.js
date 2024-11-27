import dbConnect from '../../../utils/dbConnect';
import Car from '../../../models/Car';
import { withRole } from '../../../utils/auth';

const handler = async (req, res) => {

    await dbConnect();

    if (req.method === 'POST') {
        const { carId, name, power, torque, transmission, carType,
            price, url, imgUrl, amount, userId } = req.body;
        console.log('update', {
            carId, name, power, torque, transmission, carType,
            price, url, imgUrl, amount, userId
        });

        if (userId != null) {
            // Проверяем наличие всех необходимых данных
            if (!userId) {
                res.status(400).json({ message: 'Please provide actual userId' });
            }
        }

        try {
            const car = await Car.findById(carId);
            if (!car) {
                res.status(404).json({ message: 'Car not found' });
            }

            console.log('car', car);

            car.name = name;
            car.power = power;
            car.torque = torque;
            car.transmission = transmission;
            car.carType = carType;
            car.price = price;
            car.url = url;
            car.imgUrl = imgUrl;
            car.amount = amount;

            await car.save();

            res.status(200).json({ message: 'Car updated successfully', car });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Error updating car', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

// Используем middleware для проверки роли администратора
export default withRole(handler, ['manager']);