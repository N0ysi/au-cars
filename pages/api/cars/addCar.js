import dbConnect from '../../../utils/dbConnect';
import Car from '@/models/Car';
import { withRole } from '../../../utils/auth';

const handler = async (req, res) => {

    if (req.method === 'POST') {
        let { name, power, torque, transmission, carType, price, url, imgUrl, amount } = req.body;
        try {
            await dbConnect();

            const existingCar = await Car.findOne({ name });
            if (existingCar) {
                existingCar.amount = parseInt(amount) + parseInt(existingCar.amount);
                await existingCar.save();
                res.status(201).json({
                    success: true,
                    data: existingCar,
                    message: 'car already existed, amount has been changed'
                })
            } else {

                const newCar = await Car({
                    name: name,
                    power: power,
                    torque: torque,
                    transmission: transmission,
                    carType: carType,
                    price: price,
                    url: url,
                    imgUrl: imgUrl,
                    amount: parseInt(amount),
                    userId: ''
                });

                await newCar.save();

                res.status(201).json({
                    success: true,
                    data: newCar,
                    message: 'car has been added'
                });
            }

        } catch (error) {
            res.status(500).json({ message: error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default withRole(handler, ['manager']);