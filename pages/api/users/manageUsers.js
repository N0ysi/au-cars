import dbConnect from '../../../utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    await dbConnect(); 
    if (req.method === 'GET') { 
        try {
            const users = await User.find();
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} is not allowed`);
    }
}