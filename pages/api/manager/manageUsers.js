import dbConnect from '../../../utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    await dbConnect(); // Подключаемся к базе данных
    if (req.method === 'GET') { // Изменяем метод на GET
        try {
            const users = await User.find();
            res.status(200).json({ users });
        } catch (error) {
            console.error("Ошибка получения автомобилей:", error);
            res.status(500).json({ error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Метод ${req.method} не поддерживается`);
    }
}