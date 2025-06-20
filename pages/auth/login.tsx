import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Login() {
  const router = useRouter();
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      router.push('/');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('ユーザーが見つかりません');
      } else if (error.code === 'auth/wrong-password') {
        setError('パスワードが間違っています');
      } else if (error.code === 'auth/invalid-email') {
        setError('メールアドレスの形式が正しくありません');
      } else {
        setError('ログインに失敗しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      await signInWithGoogle();
      router.push('/');
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        setError('ログインがキャンセルされました');
      } else {
        setError('Googleログインに失敗しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>ログイン - クトゥルフ神話TRPG第6版 キャラクターシート</title>
      </Head>
      
      <Header />
      
      <main className="container page-with-header">
        <div className="auth-container">
          <h1>ログイン</h1>
          
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">メールアドレス</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">パスワード</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="パスワードを入力"
                className="form-input"
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? 'ログイン中...' : 'ログイン'}
              </button>
            </div>
          </form>

          <div className="auth-divider">
            <span>または</span>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="btn btn-google"
          >
            <i className="fab fa-google"></i>
            Googleでログイン
          </button>

          <div className="auth-links">
            <Link href="/auth/signup">
              アカウントをお持ちでない方はこちら
            </Link>
            <Link href="/auth/reset-password">
              パスワードを忘れた方はこちら
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />

      <style jsx>{`
        .auth-container {
          max-width: 400px;
          margin: 40px auto;
          padding: 30px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
          font-size: 24px;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 12px 16px;
          border-radius: 6px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .auth-form {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          color: #495057;
          font-size: 14px;
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--ui-theme-color);
          box-shadow: 0 0 0 2px var(--ui-theme-color-light);
        }

        .form-actions {
          margin-top: 24px;
        }

        .btn {
          width: 100%;
          padding: 12px 20px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background: var(--ui-theme-color);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--ui-theme-color-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .btn-google {
          background: white;
          color: #333;
          border: 1px solid #ddd;
        }

        .btn-google:hover:not(:disabled) {
          background: #f8f9fa;
          border-color: #ccc;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .auth-divider {
          text-align: center;
          margin: 24px 0;
          position: relative;
        }

        .auth-divider span {
          background: white;
          padding: 0 16px;
          color: #6c757d;
          font-size: 14px;
          position: relative;
        }

        .auth-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e9ecef;
          z-index: -1;
        }

        .auth-links {
          margin-top: 24px;
          text-align: center;
        }

        .auth-links a {
          display: block;
          color: var(--ui-theme-color);
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }

        .auth-links a:hover {
          color: var(--ui-theme-color-hover);
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .auth-container {
            margin: 20px;
            padding: 24px;
          }

          h1 {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
}