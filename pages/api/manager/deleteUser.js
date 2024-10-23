import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { withRole } from '../../../utils/auth';

const handler = async (req, res) => {
    await dbConnect(); // Подключаемся к базе данных
    if (req.method === 'DELETE') {
        try {
            const { userId: carId } = req.body;

            if (!carId) {
                return res.status(400).json({ message: 'Please provide a carId' });
            }

            try {
                // Ищем пользователя по userId и обновляем его роль
                const user = await User.findById(carId);
                if (!user) {
                    return res.status(404).json({ message: 'Car not found' });
                }

                await user.findByIdAndDelete(carId);

                return res.status(200).json({ message: 'Car deleted successfully', user });
            } catch (error) {
                return res.status(500).json({ message: 'Error deleting car', error });
            }
        } catch (error) {

        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} is not allowed`);
    }
};

// Используем middleware для проверки роли администратора
export default withRole(handler, ['manager']);