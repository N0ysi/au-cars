import dbConnect from '../../../utils/dbConnect';
import Car from '../../../models/Car';
import { withRole } from '../../../utils/auth';

const handler = async (req, res) => {
    await dbConnect();

    if (req.method === 'POST') {
        const { carId: carId } = req.body;
        console.log('delete', { carId: carId });
        if (!carId) {
            res.status(400).json({ message: 'Please provide carId' });
        }

        try {
            const result = await Car.findByIdAndDelete(carId);
  
            if(result){
                res.status(200).json({ message: 'Car has been deleted successfully', carId });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Error deleting carr', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default withRole(handler, ['manager']);