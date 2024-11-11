import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '../context/AuthContext';
import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Logika pro sledování změn směru, pokud je potřeba
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <AuthProvider>
      <Analytics>
        <Component {...pageProps} />
      </Analytics>
    </AuthProvider>
  );
}

export default MyApp;