import React, { useState } from 'react';
import { CharacterData } from '../../lib/character-calculations';

interface MemoSectionProps {
  characterData: CharacterData;
  handleInputChange: (field: string, value: any) => void;
  // メモセクション表示状態
  showMemoSection: boolean;
  toggleMemoSection: () => void;
  // 秘匿メモ関連
  secretMemos: Array<{ id: string, counter: number }>;
  addSecretMemo: () => void;
  removeSecretMemo: (id: string) => void;
}

export default function MemoSection({
  characterData,
  handleInputChange,
  showMemoSection,
  toggleMemoSection,
  secretMemos,
  addSecretMemo,
  removeSecretMemo
}: MemoSectionProps) {

  // 各メモ項目の開閉状態を管理
  const [memoCollapsedStates, setMemoCollapsedStates] = useState<Record<string, boolean>>({});

  // メモ項目のトグル関数
  const toggleMemoItem = (memoId: string) => {
    setMemoCollapsedStates(prev => ({
      ...prev,
      [memoId]: !prev[memoId]
    }));
  };

  // テキストエリアの高さを自動調整する関数
  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(textarea.scrollHeight, 60)}px`; // 最小高さ60px
  };

  // テキストエリアの変更ハンドラー
  const handleTextareaChange = (memoId: string, value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(`${memoId}_content`, value);
    adjustTextareaHeight(e.target);
  };

  // デフォルトメモの変更ハンドラー
  const handleDefaultMemoChange = (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange('default_memo', value);
    adjustTextareaHeight(e.target);
  };

  // パスワード保護の変更ハンドラー
  const handlePasswordProtectedChange = (memoId: string, checked: boolean) => {
    handleInputChange(`${memoId}_password_protected`, checked);
    // パスワード保護にチェックを入れた場合、自動的に「隠す」にもチェックを入れる
    if (checked) {
      handleInputChange(`${memoId}_hidden`, true);
    }
  };

  return (
    <div className="memo-section" style={{ marginTop: '30px' }}>
      {/* 統合メモシステム */}
      <div className="data-wrap">
        <h3
          className="memo-title"
          onClick={toggleMemoSection}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <i className={`fas ${showMemoSection ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
          <i className="fas fa-scroll" style={{ marginRight: '5px' }}></i> メモ
        </h3>
        {showMemoSection && (
          <div className="equipment-content" style={{ padding: '10px 0' }}>
            {/* デフォルトメモ（テキストエリアのみ） */}
            <div>
              <textarea
                name="default_memo"
                value={characterData.default_memo || ''}
                onChange={(e) => handleDefaultMemoChange(e.target.value, e)}
                placeholder="キャラクターに関する基本的なメモを記入してください..."
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  resize: 'none', // 自動リサイズのため手動リサイズを無効化
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  minHeight: '80px', // デフォルトメモは少し高めに
                  overflow: 'hidden' // スクロールバーを隠す
                }}
                onInput={(e) => adjustTextareaHeight(e.target as HTMLTextAreaElement)}
              />
            </div>

            {/* 追加メモ項目 */}
            <div style={{ borderTop: '2px solid #eee', paddingTop: '20px' }}>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {secretMemos.map((memo) => {
                  const isCollapsed = memoCollapsedStates[memo.id];

                  return (
                    <li key={memo.id} className="memo-item" style={{
                      display: 'block',
                      marginBottom: '15px',
                      padding: '15px',
                      boxShadow: '0 0 2px rgba(0, 0, 0, 0.5) inset',
                      borderRadius: '4px',
                    }}>
                      {/* トグルヘッダー */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: isCollapsed ? '0' : '5px'
                      }}>
                        <i
                          className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-down'}`}
                          style={{
                            marginRight: '8px',
                            fontSize: '12px',
                            color: '#666',
                            cursor: 'pointer',
                            userSelect: 'none'
                          }}
                          onClick={() => toggleMemoItem(memo.id)}
                        />
                        <input
                          type="text"
                          name={`${memo.id}_title`}
                          value={(characterData as any)[`${memo.id}_title`] || ''}
                          onChange={(e) => handleInputChange(`${memo.id}_title`, e.target.value)}
                          placeholder="項目名"
                          style={{
                            flex: '1',
                            padding: '4px 6px',
                            fontSize: '14px',
                            fontWeight: '500',
                            fontFamily: 'inherit',
                            border: 'none',
                            background: 'transparent',
                            color: '#333',
                            outline: 'none',
                            boxShadow: 'none',
                            textAlign: 'left',
                          }}
                          onBlur={(e) => e.target.style.background = 'transparent'}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSecretMemo(memo.id);
                          }}
                          className='remove-btn'
                          style={{
                            marginLeft: '8px',
                            padding: '4px 8px',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            width: 'auto',
                            height: 'auto'
                          }}
                        >
                          削除
                        </button>
                      </div>

                      {/* 折りたたみ可能なコンテンツ */}
                      {!isCollapsed && (
                        <div>
                          {/* メモ内容 */}
                          <textarea
                            name={`${memo.id}_content`}
                            value={(characterData as any)[`${memo.id}_content`] || ''}
                            onChange={(e) => handleTextareaChange(memo.id, e.target.value, e)}
                            placeholder="メモの内容..."
                            style={{
                              width: '100%',
                              padding: '10px 8px 6px',
                              resize: 'none', // 自動リサイズのため手動リサイズを無効化
                              fontSize: '14px',
                              fontFamily: 'inherit',
                              boxShadow: 'none',
                              borderBottom: '1px solid #ccc',
                              borderTop: '1px solid #ccc',
                              textAlign: 'left',
                              marginBottom: '0',
                              borderRadius: '0',
                              minHeight: '60px',
                              overflow: 'hidden' // スクロールバーを隠す
                            }}
                            onInput={(e) => adjustTextareaHeight(e.target as HTMLTextAreaElement)}
                          />

                          {/* 設定 */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                            <label style={{ display: 'flex', alignItems: 'center' }}>
                              <input
                                type="checkbox"
                                name={`${memo.id}_hidden`}
                                checked={(characterData as any)[`${memo.id}_hidden`] || false}
                                onChange={(e) => handleInputChange(`${memo.id}_hidden`, e.target.checked)}
                                style={{ marginRight: '4px', boxShadow: 'none', height: '16px', width: '16px' }}
                              />
                              閉じておく
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center' }}>
                              <input
                                type="checkbox"
                                name={`${memo.id}_password_protected`}
                                checked={(characterData as any)[`${memo.id}_password_protected`] || false}
                                onChange={(e) => handlePasswordProtectedChange(memo.id, e.target.checked)}
                                style={{ marginRight: '4px', boxShadow: 'none', height: '16px', width: '16px' }}
                              />
                              パスワード保護
                            </label>

                            {(characterData as any)[`${memo.id}_password_protected`] && (
                              <input
                                type="password"
                                name={`${memo.id}_password`}
                                value={(characterData as any)[`${memo.id}_password`] || ''}
                                onChange={(e) => handleInputChange(`${memo.id}_password`, e.target.value)}
                                placeholder="パスワード"
                                style={{
                                  padding: '4px 6px',
                                  borderRadius: '3px',
                                  fontSize: '13px',
                                  width: '150px'
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                onClick={addSecretMemo}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: '#f8f9fa',
                  color: '#333',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <i className="fas fa-plus"></i>
                新しいメモを追加
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}