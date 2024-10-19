import dbConnect from '../../../utils/dbConnect';
import Car from '@/models/Car';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        let { userId } = req.body;
        console.log("Received request:", { userId });
        try {
            await dbConnect();

            const existingCars = await Car.find({ userId });
            console.log("existing car (getUserCars)", existingCars);
            if (existingCars) {
                res.status(201).json({ existingCars })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'no cars'
                });
            }

        } catch (error) {
            console.error("Error during getting:", error);

            res.status(500).json({ message: error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}