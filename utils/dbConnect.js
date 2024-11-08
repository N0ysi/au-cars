import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is undefined');
}

let isConnected; // Je připojení navázáno?

export default async function dbConnect() {
    if (isConnected) {
        // Pokud je připojení již navázáno, nic neděláme
        return;
    }

    // Устанавливаем новое соединение
    const db = await mongoose.connect(MONGODB_URI);

    isConnected = db.connections[0].readyState; //  Nastavení stavu připojení
    console.log('DB connected');
}