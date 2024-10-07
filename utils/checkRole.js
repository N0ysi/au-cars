export function checkRole(requiredRoles) {
    return (req, res, next) => {
      // Проверяем роль пользователя
      if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  }