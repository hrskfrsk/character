import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ResetPassword() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('このメールアドレスで登録されたアカウントが見つかりません');
      } else if (error.code === 'auth/invalid-email') {
        setError('メールアドレスの形式が正しくありません');
      } else {
        setError('パスワードリセットメールの送信に失敗しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Head>
          <title>パスワードリセット完了 - ChroLog</title>
        </Head>
        
        <Header showCreateButton={false} />
        
        <main className="container page-with-header auth-page">
          <div className="auth-container">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h1>メールを送信しました</h1>
            
            <div className="success-message">
              <p>
                <strong>{email}</strong> にパスワードリセット用のメールを送信しました。
              </p>
              <p>
                メール内のリンクをクリックして、新しいパスワードを設定してください。
              </p>
              <p className="note">
                ※ メールが届かない場合は、迷惑メールフォルダもご確認ください。
              </p>
            </div>

            <div className="auth-links">
              <Link href="/auth/login">
                ログインページに戻る
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
            text-align: center;
          }

          .success-icon {
            font-size: 3rem;
            color: #28a745;
            margin-bottom: 20px;
          }

          h1 {
            margin-bottom: 20px;
            color: #333;
            font-size: 24px;
          }

          .success-message {
            text-align: left;
            margin-bottom: 30px;
            padding: 20px;
            background: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 6px;
            color: #155724;
          }

          .success-message p {
            margin-bottom: 12px;
            line-height: 1.6;
          }

          .success-message p:last-child {
            margin-bottom: 0;
          }

          .note {
            font-size: 14px;
            color: #6c757d !important;
            font-style: italic;
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

  return (
    <>
      <Head>
        <title>パスワードリセット - ChroLog</title>
      </Head>
      
      <Header showCreateButton={false} />
      
      <main className="container page-with-header auth-page">
        <div className="auth-container">
          <h1>パスワードリセット</h1>
          
          <p className="description">
            登録されているメールアドレスを入力してください。<br/>
            パスワードリセット用のメールをお送りします。
          </p>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="auth-form">
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

            <div className="form-actions">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? 'メール送信中...' : 'リセットメールを送信'}
              </button>
            </div>
          </form>

          <div className="auth-links">
            <Link href="/auth/login">
              ログインページに戻る
            </Link>
            <Link href="/auth/signup">
              アカウントを作成
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
          margin-bottom: 20px;
          color: #333;
          font-size: 24px;
        }

        .description {
          text-align: center;
          margin-bottom: 30px;
          color: #666;
          font-size: 14px;
          line-height: 1.6;
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