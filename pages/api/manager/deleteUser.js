import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { withRole } from '../../../utils/auth';

const handler = async (req, res) => {
    await dbConnect();
    if (req.method === 'POST') {
        const { userId: userId } = req.body;
        console.log('delete', { userId: userId });
        if (!userId) {
            res.status(400).json({ message: 'Please provide userId' });
        }

        try {
            const result = await User.findByIdAndDelete(userId);
  
            if(result){
                res.status(200).json({ message: 'User has been deleted successfully', userId });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Error deleting user', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

// Используем middleware для проверки роли администратора
export default withRole(handler, ['manager']);