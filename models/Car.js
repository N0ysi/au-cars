import mongoose from 'mongoose';

const Car = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },
  torque: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  amount: {
    type: Number, // assuming it's a number indicating the amount of cars available
    required: true,
  },
  email: {
    type: String,
    default: null
  },
});

// Exporting the Car model
export default mongoose.models.Car || mongoose.model('Car', Car);