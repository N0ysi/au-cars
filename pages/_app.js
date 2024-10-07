import '../styles/globals.css'; // Импорт глобальных стилей
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '../context/AuthContext'; // Убедитесь, что провайдер аутентификации существует


function MyApp({ Component, pageProps }) {
    const router = useRouter();
  
    useEffect(() => {
      const handleRouteChange = (url) => {
        // Логика для отслеживания маршрутов, если нужно
      };
  
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [router]);
  
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
  
  export default MyApp;