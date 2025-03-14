import dbConnect from '../../../utils/dbConnect';
import Car from '@/models/Car';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { carId, userId } = req.body;

        if (!carId || !userId) {
            res.status(400).json({ message: 'carId and userId are required' });
        }

        try {
            await dbConnect();

            const existingCar = await Car.findById(carId);

            if (!existingCar) {
                res.status(404).json({ message: 'Car not found' });
            }

            if((existingCar.amount - 1) >= 0){
                existingCar.amount = parseInt(existingCar.amount) - 1;
                await existingCar.save();
            }else{
                res.status(400).json({ message: "This car is not availible right now" });
            }

            const newCar = new Car({
                name: existingCar.name,
                power: existingCar.power,
                torque: existingCar.torque,
                transmission: existingCar.transmission,
                carType: existingCar.carType,
                price: existingCar.price,
                url: existingCar.url,
                imgUrl: existingCar.imgUrl,
                amount: 1,
                userId: userId, 
            });

            await newCar.save();

            res.status(201).json({
                success: true,
                data: newCar,
                message: 'Car purchased successfully',
            });

        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }

    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}