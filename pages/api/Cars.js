import dbConnect from '../../utils/dbConnect';
import Car from '../../models/Car';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}