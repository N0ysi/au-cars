import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // Получаем токен из заголовка авторизации
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Требуется авторизация' });
  }

  // Извлекаем токен после "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // Проверяем и декодируем JWT токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Добавляем информацию о пользователе в объект запроса (req)
    req.user = decoded;

    // Переходим к следующему middleware или обработчику маршрута
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Неверный или истекший токен' });
  }
};