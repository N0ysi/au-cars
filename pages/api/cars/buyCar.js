import dbConnect from '../../../utils/dbConnect';
import Car from '@/models/Car';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const { carId, userId } = req.body;
        console.log("Received request to buy:", userId);
        if (!userId) {
            try {
                await dbConnect();

                const existingCar = await Car.findOne(carId);
                console.log("existing car", existingCar);

                if (existingCar) {
                    existingCar.amount = parseInt(existingCar.amount) - parseInt(1);
                    existingCar.save();
                    const newCar = await new Car(
                        {
                            userId: userId,
                            name: existingCar.name,
                            power: existingCar.power,
                            torque: existingCar.torque,
                            transmission: existingCar.transmission,
                            type: existingCar.type,
                            price: existingCar.price,
                            url: existingCar.url,
                            imgUrl: existingCar.imgUrl,
                            amount: 1
                        });
                    await newCar.save();
                    console.log('newCar: ', newCar)
                    res.status(201).json({
                        success: true,
                        data: newCar,
                        message: 'success'
                    })
                } else {
                    console.error("Error during buying");
                    res.status(404).json({ message: "Error during buying" });
                }

            } catch (error) {
                console.error("Error during adding:", error);

                res.status(500).json({ message: error });
            }
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}