import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  showBackButton?: boolean;
  customBackUrl?: string;
  showEditButton?: boolean;
  editUrl?: string;
  actionButtons?: React.ReactNode;
  showCreateButton?: boolean;
  showShareButton?: boolean;
  onShare?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  customBackUrl,
  showEditButton = false,
  editUrl,
  actionButtons,
  showCreateButton = true,
  showShareButton = false,
  onShare
}) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのマウント後に判定
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    setMounted(true);
    setCurrentPage(router.pathname);
  }, [router.pathname]);

  // 現在のページを判定（クライアントサイドでのみ）
  const isLoginPage = mounted && currentPage === '/auth/login';
  const isSignupPage = mounted && currentPage === '/auth/signup';
  const isResetPasswordPage = mounted && currentPage === '/auth/reset-password';

  const handleBackClick = () => {
    if (customBackUrl) {
      router.push(customBackUrl);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="back-button"
              title="戻る"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          )}
          <Link href="/" className="header-title">
            <h1>
              <img src="/images/logo.svg" alt="ChroLog" style={{ width: '100%', height: 'auto' }} />
            </h1>
          </Link>
        </div>

        <div className="header-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <nav className="header-nav">
            {actionButtons}
            {showShareButton && onShare && (
              <button
                type="button"
                className="nav-link"
                onClick={onShare}
                title="共有"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-share-alt"></i>
                <span className="nav-text">共有</span>
              </button>
            )}
            {showEditButton && editUrl && (
              <Link href={editUrl} className="nav-link edit-btn" title="編集">
                <i className="fas fa-edit"></i>
                <span className="nav-text">編集</span>
              </Link>
            )}
            {showCreateButton && (
              <Link href="/create" className="nav-link" title="新規作成">
                <i className="fas fa-plus"></i>
                <span className="nav-text">新規</span>
              </Link>
            )}
            
            {user ? (
              <div className="user-menu" style={{ position: 'relative' }} ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="nav-link user-button"
                  title="ユーザーメニュー"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <i className="fas fa-user"></i>
                  <span className="nav-text">ユーザー</span>
                </button>
                
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <small>{user.email}</small>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="logout-button"
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px 12px',
                        textAlign: 'left'
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      ログアウト
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {mounted && isLoginPage ? (
                  <Link href="/auth/signup" className="nav-link" title="アカウント作成">
                    <i className="fas fa-user-plus"></i>
                    <span className="nav-text">アカウント登録</span>
                  </Link>
                ) : mounted && isSignupPage ? (
                  <Link href="/auth/login" className="nav-link" title="ログイン">
                    <i className="fas fa-sign-in-alt"></i>
                    <span className="nav-text">ログイン</span>
                  </Link>
                ) : mounted && isResetPasswordPage ? (
                  <Link href="/auth/login" className="nav-link" title="ログイン">
                    <i className="fas fa-sign-in-alt"></i>
                    <span className="nav-text">ログイン</span>
                  </Link>
                ) : !mounted ? (
                  // SSR時はデフォルト表示
                  <>
                    <Link href="/auth/signup" className="nav-link" title="アカウント作成">
                      <i className="fas fa-user-plus"></i>
                      <span className="nav-text">登録</span>
                    </Link>
                    <Link href="/auth/login" className="nav-link" title="ログイン">
                      <i className="fas fa-sign-in-alt"></i>
                      <span className="nav-text">ログイン</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signup" className="nav-link" title="アカウント作成">
                      <i className="fas fa-user-plus"></i>
                      <span className="nav-text">登録</span>
                    </Link>
                    <Link href="/auth/login" className="nav-link" title="ログイン">
                      <i className="fas fa-sign-in-alt"></i>
                      <span className="nav-text">ログイン</span>
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      </div>

      <style jsx>{`
        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          min-width: 180px;
          z-index: 1000;
          margin-top: 4px;
        }

        .user-info {
          padding: 12px;
          border-bottom: 1px solid #eee;
          background: #f8f9fa;
          border-radius: 6px 6px 0 0;
        }

        .user-info small {
          color: #666;
          font-size: 12px;
          word-break: break-all;
        }

        .logout-button {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          font-size: 14px !important;
          color: #dc3545 !important;
          transition: background-color 0.2s ease !important;
        }

        .logout-button:hover {
          background: #f8f9fa !important;
        }

        .logout-button i {
          width: 14px;
        }
      `}</style>
    </header>
  );
};

export default Header;