import React, { useState } from 'react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  characterName?: string;
  expectedPassword?: string;
}

export default function PasswordModal({ isOpen, onClose, onSuccess, characterName, expectedPassword }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('パスワードを入力してください');
      return;
    }

    setIsLoading(true);
    setError('');

    // シンプルなパスワード認証
    setTimeout(() => {
      setIsLoading(false);
      
      if (password === expectedPassword) {
        onSuccess();
        setPassword('');
        setError('');
      } else {
        setError('パスワードが正しくありません');
      }
    }, 500);
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="password-modal-overlay">
      <div className="password-modal">
        <div className="password-modal-header">
          <h2>
            <i className="fas fa-lock"></i>
            パスワード保護されたページ
          </h2>
          <button 
            type="button" 
            className="password-modal-close"
            onClick={handleClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="password-modal-body">
          <p className="password-modal-description">
            <i className="fas fa-info-circle"></i>
            「{characterName || 'このキャラクター'}」の表示にはパスワードが必要です。
          </p>

          <form onSubmit={handleSubmit} className="password-modal-form">
            <div className="password-input-wrapper">
              <label htmlFor="password-input">
                <i className="fas fa-key"></i>
                パスワード
              </label>
              <input
                type="password"
                id="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワードを入力してください"
                className="password-modal-input"
                autoFocus
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="password-modal-error">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}

            <div className="password-modal-actions">
              <button
                type="button"
                onClick={handleClose}
                className="password-modal-cancel"
                disabled={isLoading}
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="password-modal-submit"
                disabled={isLoading || !password.trim()}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    認証中...
                  </>
                ) : (
                  <>
                    <i className="fas fa-unlock"></i>
                    認証
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}