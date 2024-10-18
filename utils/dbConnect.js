import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is undefined');
}

let isConnected; // Установлено ли соединение?

export default async function dbConnect() {
    if (isConnected) {
        // Если соединение уже установлено, ничего не делаем
        return;
    }

    // Устанавливаем новое соединение
    const db = await mongoose.connect(MONGODB_URI);

    isConnected = db.connections[0].readyState; // Устанавливаем состояние соединения
    console.log('DB connected');
}