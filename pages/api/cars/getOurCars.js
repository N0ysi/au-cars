import dbConnect from '../../../utils/dbConnect';
import Car from '@/models/Car';

export default async function handler(req, res) {
    await dbConnect(); 
    if (req.method === 'GET') { 
        try {
            const cars = await Car.find({ userId: '' }); 
            res.status(200).json({ cars });
        } catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} is not allowed`);
    }
}