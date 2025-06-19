import React, { useState, useEffect } from 'react';
import { CharacterData } from '../../lib/character-calculations';
import { linkifyText } from '../../lib/text-utils';

interface PersonalDataDisplayProps {
  characterData: CharacterData;
}

const PersonalDataDisplay: React.FC<PersonalDataDisplayProps> = ({ characterData }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [speechSectionOpen, setSpeechSectionOpen] = useState(true);
  const [preferencesSectionOpen, setPreferencesSectionOpen] = useState(true);
  const [imageSectionOpen, setImageSectionOpen] = useState(true);
  const [customSectionsOpen, setCustomSectionsOpen] = useState<{ [key: string]: boolean }>({});

  // localStorageから開閉状態を読み込む
  useEffect(() => {
    const savedState = localStorage.getItem('personalDataDisplayOpen');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }

    // 各セクションの開閉状態も読み込み
    const speechState = localStorage.getItem('speechDisplaySectionOpen');
    if (speechState !== null) setSpeechSectionOpen(JSON.parse(speechState));

    const preferencesState = localStorage.getItem('preferencesDisplaySectionOpen');
    if (preferencesState !== null) setPreferencesSectionOpen(JSON.parse(preferencesState));

    const imageState = localStorage.getItem('imageDisplaySectionOpen');
    if (imageState !== null) setImageSectionOpen(JSON.parse(imageState));

    // 自由入力セクションの状態を読み込み
    const customSectionsState = localStorage.getItem('customSectionsDisplayOpen');
    if (customSectionsState !== null) {
      setCustomSectionsOpen(JSON.parse(customSectionsState));
    } else {
      // デフォルトで全セクションを開いた状態で初期化
      const defaultSectionsOpen: { [key: string]: boolean } = {};
      if (characterData.custom_sections) {
        characterData.custom_sections.forEach(section => {
          defaultSectionsOpen[section.id] = true;
        });
      }
      setCustomSectionsOpen(defaultSectionsOpen);
    }
  }, [characterData.custom_sections]);

  // 開閉状態をlocalStorageに保存
  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('personalDataDisplayOpen', JSON.stringify(newState));
  };

  // 自由入力セクションのトグル
  const toggleCustomSection = (sectionId: string) => {
    const currentState = customSectionsOpen[sectionId] !== false; // デフォルトでtrue
    const newState = !currentState;
    const newSectionsOpen = { ...customSectionsOpen, [sectionId]: newState };

    setCustomSectionsOpen(newSectionsOpen);
    localStorage.setItem('customSectionsDisplayOpen', JSON.stringify(newSectionsOpen));
  };

  // データが存在するかチェック
  const hasPersonalData =
    characterData.first_person ||
    characterData.second_person ||
    characterData.speech_style ||
    characterData.likes ||
    characterData.dislikes ||
    characterData.hobbies ||
    characterData.special_skills ||
    characterData.theme_song ||
    characterData.motif ||
    (characterData.other_sections && characterData.other_sections.length > 0) ||
    (characterData.custom_sections && characterData.custom_sections.length > 0);

  // データがない場合は表示しない
  if (!hasPersonalData) {
    return null;
  }

  return (
    <section className="personal-data-display">
      <h3
        onClick={toggleOpen}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
        キャラクター詳細
      </h3>

      {isOpen && (
        <div className="personal-data-content">
          {/* 話し方グループ */}
          {(characterData.first_person || characterData.second_person || characterData.speech_style) && (
            <div className={`data-group ${!speechSectionOpen ? 'collapsed' : ''}`}>
              <h4 className="data-group-title" onClick={() => {
                const newState = !speechSectionOpen;
                setSpeechSectionOpen(newState);
                localStorage.setItem('speechDisplaySectionOpen', JSON.stringify(newState));
              }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span><i className="fas fa-comments"></i> 話し方</span>
                <i className={`fas ${speechSectionOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ fontSize: '12px' }}></i>
              </h4>
              {speechSectionOpen && (
                <>

                  {/* 一人称・二人称を横並び */}
                  {(characterData.first_person || characterData.second_person) && (
                    <div className="data-row">
                      {characterData.first_person && (
                        <div className="data-item inline">
                          <span className="data-label">一人称</span>
                          <span className="data-value">{characterData.first_person}</span>
                        </div>
                      )}

                      {characterData.second_person && (
                        <div className="data-item inline">
                          <span className="data-label">二人称</span>
                          <span className="data-value">{characterData.second_person}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {characterData.speech_style && (
                    <div className="data-item">
                      <span className="data-label">口調</span>
                      <div className="data-value-block linkified-text">{linkifyText(characterData.speech_style)}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* 嗜好グループ */}
          {(characterData.likes || characterData.dislikes || characterData.hobbies || characterData.special_skills) && (
            <div className={`data-group ${!preferencesSectionOpen ? 'collapsed' : ''}`}>
              <h4 className="data-group-title" onClick={() => {
                const newState = !preferencesSectionOpen;
                setPreferencesSectionOpen(newState);
                localStorage.setItem('preferencesDisplaySectionOpen', JSON.stringify(newState));
              }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span><i className="fas fa-heart"></i> 嗜好</span>
                <i className={`fas ${preferencesSectionOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ fontSize: '12px' }}></i>
              </h4>
              {preferencesSectionOpen && (
                <>
                  {characterData.likes && (
                    <div className="data-item">
                      <span className="data-label">好き</span>
                      <div className="data-value-block linkified-text">{linkifyText(characterData.likes)}</div>
                    </div>
                  )}

                  {characterData.dislikes && (
                    <div className="data-item">
                      <span className="data-label">嫌い</span>
                      <div className="data-value-block linkified-text">{linkifyText(characterData.dislikes)}</div>
                    </div>
                  )}

                  {characterData.hobbies && (
                    <div className="data-item">
                      <span className="data-label">趣味</span>
                      <div className="data-value-block linkified-text">{linkifyText(characterData.hobbies)}</div>
                    </div>
                  )}

                  {characterData.special_skills && (
                    <div className="data-item">
                      <span className="data-label">得意</span>
                      <div className="data-value-block linkified-text">{linkifyText(characterData.special_skills)}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* イメージグループ */}
          {(characterData.theme_song || characterData.motif || (characterData.other_sections && characterData.other_sections.length > 0)) && (
            <div className={`data-group ${!imageSectionOpen ? 'collapsed' : ''}`}>
              <h4 className="data-group-title" onClick={() => {
                const newState = !imageSectionOpen;
                setImageSectionOpen(newState);
                localStorage.setItem('imageDisplaySectionOpen', JSON.stringify(newState));
              }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span><i className="fas fa-palette"></i> イメージ</span>
                <i className={`fas ${imageSectionOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ fontSize: '12px' }}></i>
              </h4>
              {imageSectionOpen && (
                <>
                  {characterData.theme_song && (
                    <div className="data-item">
                      <span className="data-label">曲</span>
                      <div className="data-value-block linkified-text">{linkifyText(characterData.theme_song)}</div>
                    </div>
                  )}

                  {characterData.motif && (
                    <div className="data-item">
                      <span className="data-label">モチーフ</span>
                      <div className="data-value-block linkified-text">{linkifyText(characterData.motif)}</div>
                    </div>
                  )}

                  {/* 動的その他セクション */}
                  {characterData.other_sections && characterData.other_sections.map((section) => (
                    <div key={section.id} className="data-item">
                      <span className="data-label">{section.title}</span>
                      <div className="data-value-block linkified-text">{linkifyText(section.content)}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}


          {/* 自由入力セクション */}
          {characterData.custom_sections && characterData.custom_sections.map((section) => {
            const isOpen = customSectionsOpen[section.id] !== false; // デフォルトで開いている

            return (
              <div key={section.id} className={`data-group ${!isOpen ? 'collapsed' : ''}`}>
                <h4 className="data-group-title" onClick={() => toggleCustomSection(section.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span><i className="fas fa-cogs"></i> {section.section_title || '無題のセクション'}</span>
                  <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ fontSize: '12px' }}></i>
                </h4>
                {isOpen && (
                  <>
                    {/* セクション内の項目 */}
                    {section.fields.map((field) => (
                      <div key={field.id} className="data-item">
                        <span className="data-label">{field.title}</span>
                        <div className="data-value-block linkified-text">{linkifyText(field.content)}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

// 記録セクション用のコンポーネント
interface RecordSectionDisplayProps {
  characterData: CharacterData;
}

const RecordSectionDisplay: React.FC<RecordSectionDisplayProps> = ({ characterData }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [recordSectionsOpen, setRecordSectionsOpen] = useState<{ [key: string]: boolean }>({});
  const [memoContentOpen, setMemoContentOpen] = useState<{ [key: string]: boolean }>({});
  const [passwordInputs, setPasswordInputs] = useState<{ [key: string]: string }>({});
  const [passwordAuthenticated, setPasswordAuthenticated] = useState<{ [key: string]: boolean }>({});

  // localStorageから開閉状態を読み込む
  useEffect(() => {
    const savedState = localStorage.getItem('recordSectionDisplayOpen');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }

    // 記録セクションの状態を読み込み
    const recordSectionsState = localStorage.getItem('recordSectionsDisplayOpen');
    if (recordSectionsState !== null) {
      setRecordSectionsOpen(JSON.parse(recordSectionsState));
    } else {
      // デフォルトで全セクションを開いた状態で初期化
      const defaultRecordSectionsOpen: { [key: string]: boolean } = {};
      if (characterData.record_sections) {
        characterData.record_sections.forEach(section => {
          defaultRecordSectionsOpen[section.id] = true;
        });
      }
      setRecordSectionsOpen(defaultRecordSectionsOpen);
    }

    // memo-contentの状態を読み込み（キャラクターデータの設定を反映）
    const defaultMemoContentOpen: { [key: string]: boolean } = {};
    if (characterData.record_sections) {
      characterData.record_sections.forEach(section => {
        section.fields.forEach(field => {
          // open_by_default が true の場合は開いた状態、それ以外は閉じた状態
          defaultMemoContentOpen[field.id] = !!(field as any).open_by_default;
        });
      });
    }

    const memoContentState = localStorage.getItem('recordMemoContentOpen');
    if (memoContentState !== null) {
      const savedState = JSON.parse(memoContentState);
      // 保存された状態とデフォルト状態をマージ（新しいフィールドに対応）
      const mergedState = { ...defaultMemoContentOpen, ...savedState };
      setMemoContentOpen(mergedState);
    } else {
      setMemoContentOpen(defaultMemoContentOpen);
    }
  }, [characterData.record_sections]);

  // 開閉状態をlocalStorageに保存
  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('recordSectionDisplayOpen', JSON.stringify(newState));
  };

  // 記録セクションのトグル
  const toggleRecordSection = (sectionId: string) => {
    const currentState = recordSectionsOpen[sectionId] !== false; // デフォルトでtrue
    const newState = !currentState;
    const newSectionsOpen = { ...recordSectionsOpen, [sectionId]: newState };

    setRecordSectionsOpen(newSectionsOpen);
    localStorage.setItem('recordSectionsDisplayOpen', JSON.stringify(newSectionsOpen));
  };

  // memo-contentのトグル
  const toggleMemoContent = (fieldId: string) => {
    const currentState = memoContentOpen[fieldId] === true; // デフォルトでfalse
    const newState = !currentState;
    const newMemoContentOpen = { ...memoContentOpen, [fieldId]: newState };

    setMemoContentOpen(newMemoContentOpen);
    localStorage.setItem('recordMemoContentOpen', JSON.stringify(newMemoContentOpen));
  };

  // パスワード認証
  const handlePasswordSubmit = (fieldId: string, field: any) => {
    const inputPassword = passwordInputs[fieldId] || '';
    if (inputPassword === field.password) {
      setPasswordAuthenticated(prev => ({ ...prev, [fieldId]: true }));
      setPasswordInputs(prev => ({ ...prev, [fieldId]: '' }));
    } else {
      alert('パスワードが正しくありません');
    }
  };

  // データが存在するかチェック
  const hasRecordData = characterData.record_sections && characterData.record_sections.length > 0;

  // データがない場合は表示しない
  if (!hasRecordData) {
    return null;
  }

  return (
    <section className="record-section-display">
      <h3
        onClick={toggleOpen}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
        記録
      </h3>

      {isOpen && (
        <div className="record-section-content">
          {/* 記録セクション */}
          {characterData.record_sections && characterData.record_sections.map((section) => {
            const isOpen = recordSectionsOpen[section.id] !== false; // デフォルトで開いている

            return (
              <div key={section.id} className="memo-item">
                <h4 onClick={() => toggleRecordSection(section.id)} className='data-group-title' style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>
                    <i className="fas fa-clipboard"></i>
                    {section.section_title || '無題の記録'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`/record/${section.id}`, '_blank');
                      }}
                      style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        backgroundColor: 'var(--ui-theme-color, #2196F3)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                      className='o-memos-single-button'
                    >
                      個別ページ <i className="fas fa-external-link-alt" style={{ marginLeft: '5px', marginRight: '0', color: '#fff' }}></i>
                    </button>
                    <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ fontSize: '12px' }}></i>
                  </div>
                </h4>
                {isOpen && (
                  <div className='memo-content'>
                    {/* セクション内の項目 */}
                    {section.fields.map((field) => {
                      const fieldData = field as any;
                      const isMemoContentOpen = memoContentOpen[field.id] === true; // デフォルトで閉じている
                      const isPasswordProtected = fieldData.password_protected;
                      const isAuthenticated = passwordAuthenticated[field.id] || false;
                      const shouldShowContent = !isPasswordProtected || isAuthenticated;

                      return (
                        <div key={field.id} className="memo-field">
                          {field.title && (
                            <h5
                              style={{
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                              onClick={() => toggleMemoContent(field.id)}
                            >
                              <i className={`fas ${isMemoContentOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ fontSize: '12px', marginRight: '5px' }}></i>
                              {isPasswordProtected && (
                                <i className="fas fa-lock" style={{ fontSize: '12px', marginRight: '5px', opacity: '0.7' }}></i>
                              )}
                              <span>{field.title}</span>

                            </h5>
                          )}
                          {isMemoContentOpen && (
                            <div className="o-memos">
                              {isPasswordProtected && !isAuthenticated ? (
                                <div style={{ padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px', border: '1px solid #ddd' }}>
                                  <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
                                    <i className="fas fa-lock" style={{ marginRight: '5px' }}></i>
                                    このコンテンツはパスワードで保護されています
                                  </p>
                                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <input
                                      type="password"
                                      value={passwordInputs[field.id] || ''}
                                      onChange={(e) => setPasswordInputs(prev => ({ ...prev, [field.id]: e.target.value }))}
                                      placeholder="パスワードを入力"
                                      style={{
                                        padding: '6px 8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '3px',
                                        fontSize: '14px',
                                        flex: 1
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handlePasswordSubmit(field.id, fieldData);
                                        }
                                      }}
                                    />
                                    <button
                                      onClick={() => handlePasswordSubmit(field.id, fieldData)}
                                      style={{
                                        padding: '6px 12px',
                                        backgroundColor: 'var(--ui-theme-color, #2196F3)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '3px',
                                        fontSize: '14px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <i className="fas fa-unlock" style={{ marginRight: '4px' }}></i>解除
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                shouldShowContent && linkifyText(field.content)
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default PersonalDataDisplay;
export { RecordSectionDisplay };