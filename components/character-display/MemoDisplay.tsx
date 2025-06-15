import React from 'react';

interface MemoDisplayProps {
  character: any;
  equipmentSections: {
    memos: boolean;
  };
  toggleEquipmentSection: (sectionId: 'weapons' | 'items' | 'disorders' | 'books' | 'spells' | 'artifacts' | 'entities' | 'memos') => void;
  secretMemoVisibility: Record<string, boolean>;
  memoPasswordStates: Record<string, { unlocked: boolean; inputPassword: string }>;
  toggleSecretMemoVisibility: (memoId: string) => void;
  handlePasswordInput: (memoId: string, password: string) => void;
  handlePasswordSubmit: (memoId: string) => void;
}

export default function MemoDisplay({
  character,
  equipmentSections,
  toggleEquipmentSection,
  secretMemoVisibility,
  memoPasswordStates,
  toggleSecretMemoVisibility,
  handlePasswordInput,
  handlePasswordSubmit
}: MemoDisplayProps) {

  const hasSecretMemos = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`memo_${i}_title`] || char[`memo_${i}_content`] || char[`secret_memo_${i}_title`] || char[`secret_memo_${i}_content`]) {
        return true;
      }
    }
    return false;
  };

  if (!hasSecretMemos(character) && !character.default_memo) {
    return null;
  }

  return (
    <div className="data-wrap">
      <h3
        onClick={() => toggleEquipmentSection('memos')}
        style={{ cursor: 'pointer', userSelect: 'none', marginTop: '5%', marginBottom: '10px' }}
      >
        <i className={`fas ${equipmentSections.memos ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
        <i className="fas fa-scroll"></i> メモ
      </h3>
      {equipmentSections.memos && (
        <div className="equipment-content">

          {/* デフォルトメモ */}
          {character.default_memo && character.default_memo.trim() && (
            <div className="o-memos" style={{ whiteSpace: 'pre-wrap', borderBottom: '1px dotted #999', paddingBottom: '25px' }}>
              <span>{character.default_memo}</span>
            </div>
          )}


          {/* 新しいメモシステム */}
          {(() => {
            const memoElements = [];
            for (let i = 1; i <= 50; i++) {
              const title = character[`memo_${i}_title`];
              const content = character[`memo_${i}_content`];
              const hidden = character[`memo_${i}_hidden`];
              const passwordProtected = character[`memo_${i}_password_protected`];

              if (title || content) {
                const memoId = `memo_${i}`;
                // デフォルトの表示状態：「隠す」がチェックされていない場合は表示
                const defaultVisible = !hidden;
                const isVisible = secretMemoVisibility[memoId] !== undefined
                  ? secretMemoVisibility[memoId]
                  : defaultVisible;

                memoElements.push(
                  <div key={memoId} className="memo-item" style={{
                    borderBottom: '1px dotted #999'
                  }}>
                    <h4
                      onClick={() => toggleSecretMemoVisibility(memoId)}
                      style={{
                        cursor: 'pointer',
                        userSelect: 'none',
                        margin: '0',
                        padding: '8px 12px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px'
                      }}
                    >
                      <i className={`fas ${isVisible ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '8px' }}></i>
                      {passwordProtected && <i className="fas fa-lock" style={{ marginRight: '5px', fontSize: '12px', opacity: 0.7 }}></i>}
                      {title || `メモ ${i}`}
                    </h4>
                    {isVisible && (
                      <div style={{
                        padding: '0 12px 8px 12px'
                      }}>
                        {passwordProtected ? (
                          memoPasswordStates[memoId]?.unlocked ? (
                            // パスワード認証済み：内容表示
                            <div className="o-memos" style={{
                              whiteSpace: 'pre-wrap'
                            }}>
                              <span>{content || '-----'}</span>
                            </div>
                          ) : (
                            // パスワード未認証：パスワード入力フィールド
                            <div style={{
                              padding: '10px',
                              backgroundColor: '#f8f9fa',
                              border: '1px solid #dee2e6',
                              borderRadius: '5px'
                            }}>
                              <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                                <i className="fas fa-lock" style={{ marginRight: '5px' }}></i>
                                このメモはパスワードで保護されています
                              </div>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <input
                                  type="password"
                                  placeholder="パスワードを入力"
                                  value={memoPasswordStates[memoId]?.inputPassword || ''}
                                  onChange={(e) => handlePasswordInput(memoId, e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handlePasswordSubmit(memoId);
                                    }
                                  }}
                                  style={{
                                    flex: 1,
                                    padding: '6px 8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '3px',
                                    fontSize: '14px'
                                  }}
                                />
                                <button
                                  onClick={() => handlePasswordSubmit(memoId)}
                                  style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                  }}
                                >
                                  <i className="fas fa-unlock" style={{ marginRight: '4px' }}></i>
                                  解除
                                </button>
                              </div>
                            </div>
                          )
                        ) : (
                          // パスワード保護なし：通常表示
                          <div className="o-memos" style={{
                            whiteSpace: 'pre-wrap'
                          }}>
                            <span>{content || '-----'}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            }
            return memoElements;
          })()}

        </div>
      )}
    </div>
  );
}