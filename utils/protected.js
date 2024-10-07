import jwt from 'jsonwebtoken';

export function withProtected(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Добавляем пользователя в запрос
      return handler(req, res); // Передаем управление следующему обработчику
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}