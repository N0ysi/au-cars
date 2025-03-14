import dbConnect from '../../../utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { carId, userId } = req.body;

        if (!carId || !userId) {
            res.status(400).json({ message: 'carId and userId are required' });
        }

        try {
            await dbConnect();

            const existingUser = await User.findById(userId);

            if (!existingUser) {
                res.status(404).json({ message: 'User not found' });
            }

            if (!existingUser.favoriteCars) {
                existingUser.favoriteCars = []; 
            }

            if(existingUser.favoriteCars.includes(carId)){   
                res.status(400).json({
                    success: false,
                    data: existingUser,
                    message: 'Car already in favorites',
                });
            }
            existingUser.favoriteCars.push(carId);
            existingUser.save();

            res.status(201).json({
                success: true,
                data: existingUser,
                message: 'Car added to favorites successfully',
            });

        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }

    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}