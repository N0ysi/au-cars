import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();

      const token = req.headers.authorization?.split(' ')[1]; // Получаем токен из заголовка
      if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}