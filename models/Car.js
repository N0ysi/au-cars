import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  name: String,
  power: String,
  torque: String,
  transmission: String,
  price: String,
  imageUrl: String,
});

export default mongoose.models.Car || mongoose.model('Car', CarSchema);