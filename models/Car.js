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
  carType: {
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
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: false,
    default: null
  }
});

// Exporting the Car model
export default mongoose.models.Car || mongoose.model('Car', Car);