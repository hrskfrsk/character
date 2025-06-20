import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Hot reload 無限ループ防止
    const handleBeforeUnload = () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}