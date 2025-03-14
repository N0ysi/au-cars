import dbConnect from '../../../utils/dbConnect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "@/models/User";

export default async function handler(req, res) {

  if (req.method === 'POST') {
    let { username, email, password } = req.body;
    try {
      await dbConnect();
     
      const existingUser = await User.findOne({email});
      if (existingUser) {
        return res.status(403).json({ message: 'User already exists' });
      }

      let salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User({
        username: username,
        email: email,
        password: hashedPassword,
        role: 'user', 
        favoriteCars: []
      });

      await newUser.save();

      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({
        success: true,
        data: newUser,
        message: 'user has been registered',
        token
      });

    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}