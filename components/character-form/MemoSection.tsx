import React from 'react';
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
                onChange={(e) => handleInputChange('default_memo', e.target.value)}
                placeholder="キャラクターに関する基本的なメモを記入してください..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  resize: 'vertical',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* 追加メモ項目 */}
            <div style={{ borderTop: '2px solid #eee', paddingTop: '20px' }}>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {secretMemos.map((memo) => (
                  <li key={memo.id} className="memo-item" style={{
                    display: 'block',
                    marginBottom: '15px',
                    padding: '15px 15px 10px',
                    boxShadow: '0 0 2px rgba(0, 0, 0, 0.5) inset',
                    borderRadius: '4px',
                  }}>
                    {/* ヘッダー：項目名と削除ボタン */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <input
                        type="text"
                        name={`${memo.id}_title`}
                        value={(characterData as any)[`${memo.id}_title`] || ''}
                        onChange={(e) => handleInputChange(`${memo.id}_title`, e.target.value)}
                        placeholder="項目名"
                        style={{
                          flex: '1',
                          padding: '6px 8px',
                          fontSize: '14px',
                          boxShadow: 'none',
                          borderBottom: '1px solid #ccc',
                          textAlign: 'left',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeSecretMemo(memo.id)}
                        className='remove-btn'
                        style={{
                          marginLeft: '8px',
                          padding: '4px 8px',
                          color: '#aaa',
                          border: 'solid 1px #aaa',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          width: 'auto',
                          height: 'auto',
                        }}
                      >
                        削除
                      </button>
                    </div>

                    {/* メモ内容 */}
                    <textarea
                      name={`${memo.id}_content`}
                      value={(characterData as any)[`${memo.id}_content`] || ''}
                      onChange={(e) => handleInputChange(`${memo.id}_content`, e.target.value)}
                      placeholder="メモの内容..."
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        resize: 'vertical',
                        fontSize: '14px',
                        boxShadow: 'none',
                        borderBottom: '1px solid #ccc',
                        textAlign: 'left',
                      }}
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
                  </li>
                ))}
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