import { withRole } from '../../../utils/auth';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});
        return res.status(200).json(users);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching users', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default withRole(handler, ['manager']);