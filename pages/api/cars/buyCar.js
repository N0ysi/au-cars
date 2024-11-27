import dbConnect from '../../../utils/dbConnect';
import Car from '@/models/Car';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { carId, userId } = req.body;

        // Check for required data
        if (!carId || !userId) {
            res.status(400).json({ message: 'carId and userId are required' });
        }

        try {
            // Connect to the database
            await dbConnect();

            // Find the car by ID
            const existingCar = await Car.findById(carId);

            if (!existingCar) {
                // Car not found
                res.status(404).json({ message: 'Car not found' });
            }

            // Update the quantity of the existing car
            if((existingCar.amount - 1) >= 0){
                existingCar.amount = parseInt(existingCar.amount) - 1;
                await existingCar.save();
            }else{
                res.status(400).json({ message: "We don't have enough cars right now" });
            }

            // Create a new car entry with the userId
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
                userId: userId, // Важно, чтобы здесь был userId, а не email
            });

            // Save the new car in the database
            await newCar.save();

            // Send a success response
            res.status(201).json({
                success: true,
                data: newCar,
                message: 'Car purchased successfully',
            });

        } catch (error) {
            // Handle errors
            console.error("Error during adding:", error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }

    } else {
        // Method not allowed
        res.status(405).json({ message: 'Method not allowed' });
    }
}