import dbConnect from '../../../utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { carId, userId } = req.body;

        console.log('removeFromFavorites');

        // Validate input
        if (!carId || !userId) {
            return res.status(400).json({ message: 'carId and userId are required' });
        }

        try {
            // Connect to the database
            await dbConnect();

            // Find the user by ID
            const existingUser = await User.findById(userId);

            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' });
            }


            // Check if the car is in the user's favorites
            if (!existingUser.favoriteCars.includes(carId)) {
                return res.status(200).json({
                    success: true,
                    data: existingUser
                });
            }
            
            // Remove the car from the favorites
            existingUser.favoriteCars = existingUser.favoriteCars.filter(id => id !== carId);

            // Save changes
            await existingUser.save();

            // Send success response
            return res.status(200).json({
                success: true,
                data: existingUser,
                message: 'Car removed from favorites successfully',
            });

        } catch (error) {
            console.error("Error during removeFromFavorites:", error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }

    } else {
        // Method not allowed
        res.status(405).json({ message: 'Method not allowed' });
    }
}