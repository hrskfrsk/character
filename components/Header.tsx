import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;