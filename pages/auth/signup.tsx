import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SignUp() {
  const router = useRouter();
  const { user, loading, signUpWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const redirectTo = router.query.redirect as string || '/';
      router.push(redirectTo);
    }
  }, [user, loading, router]);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください');
      return;
    }

    setIsLoading(true);

    try {
      await signUpWithEmail(email, password);
      const redirectTo = router.query.redirect as string || '/';
      router.push(redirectTo);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('このメールアドレスは既に使用されています');
      } else if (error.code === 'auth/invalid-email') {
        setError('メールアドレスの形式が正しくありません');
      } else if (error.code === 'auth/weak-password') {
        setError('パスワードが弱すぎます');
      } else {
        setError('アカウント作成に失敗しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setIsLoading(true);

    try {
      await signInWithGoogle();
      const redirectTo = router.query.redirect as string || '/';
      router.push(redirectTo);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        setError('サインアップがキャンセルされました');
      } else {
        setError('Googleサインアップに失敗しました');
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
        <title>アカウント作成 - クトゥルフ神話TRPG第6版 キャラクターシート</title>
      </Head>

      <Header showCreateButton={false} />

      <main className="container page-with-header auth-page">
        <div className="auth-container">
          <h1>アカウント作成</h1>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSignUp} className="auth-form">
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
                placeholder="6文字以上のパスワード"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">パスワード（確認）</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="パスワードを再入力"
                className="form-input"
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? 'アカウント作成中...' : 'アカウントを作成'}
              </button>
            </div>
          </form>

          <div className="auth-divider">
            <span>または</span>
          </div>

          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="btn btn-google"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Googleでアカウント作成
          </button>

          <div className="auth-links">
            <Link href="/auth/login">
              既にアカウントをお持ちの方はこちら
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .auth-page {
          background: linear-gradient(180deg, #74cdc3 35%, transparent);
           min-height: 90vh;
          padding-top: 3%;
        }

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