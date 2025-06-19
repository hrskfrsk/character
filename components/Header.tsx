import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  customBackUrl?: string;
  showEditButton?: boolean;
  editUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "CoC 6版 キャラクターシート", 
  showBackButton = false,
  customBackUrl,
  showEditButton = false,
  editUrl
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (customBackUrl) {
      router.push(customBackUrl);
    } else {
      router.back();
    }
  };

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
        </div>

        <div className="header-center">
          <Link href="/" className="header-title">
            <h1>
              <i className="fas fa-scroll" style={{ marginRight: '8px' }}></i>
              {title}
            </h1>
          </Link>
        </div>

        <div className="header-right">
          <nav className="header-nav">
            {showEditButton && editUrl && (
              <Link href={editUrl} className="nav-link edit-btn" title="編集">
                <i className="fas fa-edit"></i>
                <span className="nav-text">編集</span>
              </Link>
            )}
            <Link href="/create" className="nav-link" title="新規作成">
              <i className="fas fa-plus"></i>
              <span className="nav-text">作成</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;