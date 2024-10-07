import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { withRole } from '../../../utils/auth';

const handler = async (req, res) => {
    const { method } = req;

    // Подключение к базе данных
    await dbConnect();

    switch (method) {
        case 'PUT': {
            const { userId, newRole } = req.body;

            // Проверяем наличие всех необходимых данных
            if (!userId || !newRole) {
                return res.status(400).json({ message: 'Please provide userId and newRole' });
            }

            // Проверяем, что роль корректная (user, manager, admin)
            const validRoles = ['user', 'manager', 'admin'];
            if (!validRoles.includes(newRole)) {
                return res.status(400).json({ message: 'Invalid role specified' });
            }

            try {
                // Ищем пользователя по userId и обновляем его роль
                const user = await User.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                user.role = newRole;
                await user.save();

                return res.status(200).json({ message: 'Role updated successfully', user });
            } catch (error) {
                return res.status(500).json({ message: 'Error updating role', error });
            }
        }

        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
};

// Используем middleware для проверки роли администратора
export default withRole(handler, ['admin']);