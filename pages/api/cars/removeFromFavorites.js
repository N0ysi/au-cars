import dbConnect from '../../../utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { carId, userId } = req.body;

        if (!carId || !userId) {
            return res.status(400).json({ message: 'carId and userId are required' });
        }

        try {
            await dbConnect();

            const existingUser = await User.findById(userId);

            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' });
            }


            if (!existingUser.favoriteCars.includes(carId)) {
                return res.status(200).json({
                    success: true,
                    data: existingUser
                });
            }
            
            existingUser.favoriteCars = existingUser.favoriteCars.filter(id => id !== carId);

            await existingUser.save();

            return res.status(200).json({
                success: true,
                data: existingUser,
                message: 'Car removed from favorites successfully',
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }

    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}