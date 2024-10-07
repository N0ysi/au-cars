import bcrypt from 'bcryptjs';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      await dbConnect();

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "wrong username or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "wrong username or password" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(201).json({
        success: true,
        data: {
          user: {
            username: user.username,
            email: user.email,
            role: user.role,
          },
        },
        message: 'Successful login in',
        token
      });

    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}