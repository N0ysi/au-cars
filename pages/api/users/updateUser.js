import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { withRole } from '../../../utils/auth';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {

    await dbConnect();

    if (req.method === 'POST') {
        const { userId, username, email, password, role } = req.body;
        if (!userId) {
            res.status(400).json({ message: 'Please provide userId' });
        }

        const validRoles = ['user', 'manager'];
        if (!validRoles.includes(role)) {
            res.status(400).json({ message: 'Invalid role specified' });
        }

        try {
            const user = await User.findById(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }

            user.username = username;
            user.email = email;
            user.role = role;
            const isMatchWithoutBcrypt = password == user.password;
            if (!isMatchWithoutBcrypt) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    let salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    user.password = hashedPassword;
                }
            }

            await user.save();

            res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Error updating User', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default withRole(handler, ['manager']);