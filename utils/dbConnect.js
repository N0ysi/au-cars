import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is undefined');
}

let isConnected;

export default async function dbConnect() {
    if (isConnected) {
        return;
    }

    const db = await mongoose.connect(MONGODB_URI);

    isConnected = db.connections[0].readyState; 
}