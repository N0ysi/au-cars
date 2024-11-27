import dbConnect from '../../../utils/dbConnect';
import User from '@/models/User';

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

            // Find the user by ID
            const existingUser = await User.findById(userId);

            if (!existingUser) {
                // User not found
                res.status(404).json({ message: 'User not found' });
            }

            if (!existingUser.favoriteCars) {
                existingUser.favoriteCars = []; // Инициализация, если массив отсутствует
            }

            if(existingUser.favoriteCars.includes(carId)){   
                res.status(400).json({
                    success: false,
                    data: existingUser,
                    message: 'Car already in favorites',
                });
            }
            // Update the quantity of the existing car
            existingUser.favoriteCars.push(carId);
            existingUser.save();

            console.log(existingUser, 'Existing user from addToFavorites')
            // Send a success response
            res.status(201).json({
                success: true,
                data: existingUser,
                message: 'Car added to favorites successfully',
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