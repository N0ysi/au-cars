import dbConnect from '../../../utils/dbConnect';
import Car from '@/models/Car';

export default async function handler(req, res) {
    await dbConnect(); // Подключаемся к базе данных
    if (req.method === 'GET') { // Изменяем метод на GET
        try {
            const cars = await Car.find({ userId: { $exists: false } }); // Получаем все автомобили
            res.status(200).json({ cars });
        } catch (error) {
            console.error("Ошибка получения автомобилей:", error);
            res.status(500).json({ error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Метод ${req.method} не поддерживается`);
    }
}