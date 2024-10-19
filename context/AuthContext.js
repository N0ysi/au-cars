import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState(null); // Состояние для списка автомобилей
  const router = useRouter();

  // Асинхронную функцию лучше вынести из useEffect
  const checkUserAndFetchCars = async () => {
    const token = Cookies.get('token'); // Извлечение токена из cookies
    if (token) {
      try {
        const decodedUser = jwt.decode(token); // Декодируем токен
        console.log("Decoded user:", decodedUser); // Логирование декодированного пользователя
        if (decodedUser) {
          setUser(decodedUser); // Устанавливаем пользователя
          await getUserCars(decodedUser.userId); // Запрашиваем автомобили
        }
      } catch (error) {
        console.error("Ошибка при декодировании токена:", error);
      }
    }
  };

  const fetchUser = async () => {
    const token = Cookies.get('token'); // Извлечение токена из cookies
    if (token) {
      try {
        const decodedUser = jwt.decode(token); // Декодируем токен
        console.log("Decoded user:", decodedUser); // Логирование декодированного пользователя
        if (decodedUser) {
          setUser(decodedUser); // Устанавливаем пользователя
        }
      } catch (error) {
        console.error("Ошибка при декодировании токена:", error);
      }
    }
  }

  useEffect(() => {
    fetchUser();
    checkUserAndFetchCars();
  }, []);

  // Функция для получения автомобилей
  const getUserCars = async (userId) => {
    if (!userId) {
      try {
        const res = await fetch('/api/cars/getUserCars', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        const data = await res.json();
        if (data && data.cars) {
          setCars(data.cars); // Сохраняем список автомобилей в состояние
        } else {
          console.error("Автомобили не получены:", data);
        }
      } catch (error) {
        console.error('Ошибка при запросе автомобилей:', error);
      }
    } else {
      setCars(null);
    }
  };

  // Функция для авторизации пользователя
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
        await getUserCars(decodedUser.userId); // Получаем список автомобилей после авторизации
        router.push('/'); // Перенаправляем на главную страницу
      } else {
        console.error("Токен не получен:", data);
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      throw new Error('Login error');
    }
  };

  // Функция для выхода пользователя
  const logout = () => {
    Cookies.remove('token'); // Удаляем токен из cookies
    setUser(null); // Сбрасываем состояние пользователя
    setCars(null); // Очищаем автомобили
    router.push('/login'); // Перенаправляем на страницу логина
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, cars, getCars: getUserCars }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};