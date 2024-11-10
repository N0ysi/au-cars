import dbConnect from '../../../utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { carId, userId } = req.body;

        console.log('removeFromFavorites');

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

            // Check if the car is in the user's favorites
            if (!existingUser.favoriteCars.includes(carId)) {
                return res.status(404).json({ message: 'Car not found in favorites' });
            }

            // Remove the car from the favorites
            existingUser.favoriteCars = existingUser.favoriteCars.filter(id => id !== carId);
            existingUser.save();            

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