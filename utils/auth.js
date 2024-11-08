import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

export function withRole(handler, roles = []) {
  return async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token; 

    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}