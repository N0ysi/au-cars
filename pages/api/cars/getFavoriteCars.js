import dbConnect from '../../../utils/dbConnect';
import Car from '@/models/Car';
import User from '@/models/User'

export default async function handler(req, res) {

    if (req.method === 'POST') {
        let { userId } = req.body;
        try {
            await dbConnect();

            const user = await User.findById(userId);

            const favoriteCars = user.favoriteCars;

            const cars = await Promise.all(favoriteCars.map(carId => Car.findById(carId)));

            if (cars) {
                res.status(201).json({ favoriteCars: cars })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'no cars'
                });
            }

        } catch (error) {
            res.status(500).json({ message: error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}