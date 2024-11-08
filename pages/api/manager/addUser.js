import dbConnect from '../../../utils/dbConnect';
import User from '@/models/User';
import { withRole } from '../../../utils/auth';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {

    if (req.method === 'POST') {
        let { username, email, password, role } = req.body;
        console.log("Received request to register:", { username, email, password, role });
        try {
            await dbConnect();

            const validRoles = ['user', 'manager'];
            if (!validRoles.includes(role)) {
                role = 'user';
            }

            const existingUser = await User.findOne({ email });
            console.log("existing car", existingUser);
            if (existingUser) {
                res.status(401).json({
                    success: false,
                    data: existingUser,
                    message: 'user already existed'
                })
            } else {

                let salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const newUser = await User({
                    username: username,
                    email: email,
                    password: hashedPassword,
                    role: role
                });

                await newUser.save();

                res.status(201).json({
                    success: true,
                    data: newUser,
                    message: 'user has been added'
                });
            }

        } catch (error) {
            console.error("Error during adding:", error);

            res.status(500).json({ message: error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default withRole(handler, ['manager']);