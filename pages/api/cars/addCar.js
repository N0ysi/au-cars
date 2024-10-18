import dbConnect from '../../../utils/dbConnect';
import Car from '@/models/Car';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        let { name, power, torque, transmission, price, url, imgUrl,amount } = req.body;
        console.log("Received request to register:", { name, power, torque, transmission, price, url, imgUrl, amount });
        try {
            await dbConnect();

            const existingCar = await Car.findOne({ name });
            console.log("existing car", existingCar);
            if (existingCar) {
                existingCar.amount += amount;
                await existingCar.save();
                res.status(201).json({
                    success: true,
                    data: existingCar,
                    message: 'car already existed, amount has been changed'
                })
            } else {

                // Создаем нового пользователя
                const newCar = await Car({
                    name: name,
                    power: power,
                    torque: torque,
                    transmission: transmission,
                    price: price,
                    url: url,
                    imgUrl: imgUrl,
                    amount: amount
                });

                await newCar.save();

                res.status(201).json({
                    success: true,
                    data: newCar,
                    message: 'car has been added'
                });
            }

        } catch (error) {
            console.error("Error during adding:", error);

            res.status(500).json({ message: error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}