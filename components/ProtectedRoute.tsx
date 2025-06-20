import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  showLoading?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/auth/login',
  showLoading = true 
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 認証状態の確認が完了し、ユーザーがログインしていない場合はリダイレクト
    if (!loading && !user) {
      // 現在のパスを保存してログイン後にリダイレクトできるようにする
      const currentPath = router.asPath;
      const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`;
      router.push(redirectUrl);
    }
  }, [user, loading, router, redirectTo]);

  // 認証状態確認中の場合
  if (loading) {
    return showLoading ? (
      <div className="protected-route-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">認証状態を確認中...</div>
        </div>
        
        <style jsx>{`
          .protected-route-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f8f9fa;
          }

          .loading-container {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 90%;
          }

          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f0f0f0;
            border-top: 4px solid var(--ui-theme-color, #007bff);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }

          .loading-text {
            color: #666;
            font-size: 16px;
            font-family: 'Kosugi', 'Varela Round', sans-serif;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    ) : null;
  }

  // ユーザーがログインしていない場合は何も表示しない（リダイレクト処理中）
  if (!user) {
    return null;
  }

  // ユーザーがログインしている場合は子コンポーネントを表示
  return <>{children}</>;
};

export default ProtectedRoute;