import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { withRole } from '../../../utils/auth';

const handler = async (req, res) => {
    const { method } = req;

    // Подключение к базе данных
    await dbConnect();

    switch (method) {
        case 'DELETE': {
            const { userId } = req.body;

            // Проверяем наличие всех необходимых данных
            if (!userId) {
                return res.status(400).json({ message: 'Please provide a userId' });
            }

            try {
                // Ищем пользователя по userId и обновляем его роль
                const user = await User.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                await user.findByIdAndDelete(userId);

                return res.status(200).json({ message: 'User deleted successfully', user });
            } catch (error) {
                return res.status(500).json({ message: 'Error deleting user', error });
            }
        }

        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
};

// Используем middleware для проверки роли администратора
export default withRole(handler, ['admin']);