import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token'); // Извлечение токена из cookies
    if (token) {
      try {
        const decodedUser = jwt.decode(token); // Декодируем токен
        console.log("Decoded user:", decodedUser); // Логирование декодированного пользователя
        if (decodedUser) {
          setUser(decodedUser); // Устанавливаем пользователя
        }
      } catch (error) {
        console.error("Decoding error:", error);
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.token) {
        Cookies.set('token', data.token, { expires: 1 }); // Устанавливаем токен в cookies на 1 день
        const decodedUser = jwt.decode(data.token); // Декодируем токен
        setUser(decodedUser); // Устанавливаем информацию о пользователе
        router.push('/'); // Перенаправляем на главную страницу
      } else {
        console.error("Token was not recieved:", data);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login error');
    }
  };
  const logout = () => {
    Cookies.remove('token'); // Удаляем токен из cookies
    setUser(null); // Сбрасываем состояние пользователя
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};