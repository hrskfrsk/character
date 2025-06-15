import React from 'react';
import SkillDisplay from '../SkillDisplay';

interface EquipmentDisplayProps {
  character: any;
  equipmentSections: {
    weapons: boolean;
    items: boolean;
    disorders: boolean;
    books: boolean;
    spells: boolean;
    artifacts: boolean;
    entities: boolean;
    memos: boolean;
  };
  toggleEquipmentSection: (sectionId: 'weapons' | 'items' | 'disorders' | 'books' | 'spells' | 'artifacts' | 'entities' | 'memos') => void;
  secretMemoVisibility: Record<string, boolean>;
  memoPasswordStates: Record<string, { unlocked: boolean; inputPassword: string }>;
  toggleSecretMemoVisibility: (memoId: string) => void;
  handlePasswordInput: (memoId: string, password: string) => void;
  handlePasswordSubmit: (memoId: string) => void;
  handleSkillClick: (skillName: string, skillValue: number) => void;
}

export default function EquipmentDisplay({
  character,
  equipmentSections,
  toggleEquipmentSection,
  secretMemoVisibility,
  memoPasswordStates,
  toggleSecretMemoVisibility,
  handlePasswordInput,
  handlePasswordSubmit,
  handleSkillClick
}: EquipmentDisplayProps) {

  // 各装備セクションにデータが存在するかチェックするヘルパー関数
  const hasWeapons = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`weapon_${i}_name`]) return true;
    }
    return false;
  };

  const hasItems = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`item_${i}_name`]) return true;
    }
    return false;
  };

  const hasDisorders = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`disorder_${i}_name`]) return true;
    }
    return false;
  };

  const hasBooks = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`book_${i}_name`]) return true;
    }
    return false;
  };

  const hasSpells = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`spell_${i}_name`]) return true;
    }
    return false;
  };

  const hasArtifacts = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`artifact_${i}_name`]) return true;
    }
    return false;
  };

  const hasEntities = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`entity_${i}_name`]) return true;
    }
    return false;
  };

  const hasSecretMemos = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`memo_${i}_title`] || char[`memo_${i}_content`] || char[`secret_memo_${i}_title`] || char[`secret_memo_${i}_content`]) {
        return true;
      }
    }
    return false;
  };

  const hasMemos = (char: any): boolean => {
    // デフォルトメモをチェック
    if (char?.default_memo && char.default_memo.trim()) {
      return true;
    }
    // その他メモをチェック
    if (char?.other_memo && char.other_memo.trim()) {
      return true;
    }
    // 新しいメモ形式をチェック
    for (let i = 1; i <= 50; i++) {
      if (char[`memo_${i}_title`] || char[`memo_${i}_content`]) {
        return true;
      }
    }
    // 秘匿関連もチェック
    return hasSecretMemos(char);
  };

  return (
    <>
      {/* 武器セクション */}
      {hasWeapons(character) && (
        <div className="data-wrap buki">
          <h3
            onClick={() => toggleEquipmentSection('weapons')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <i className={`fas ${equipmentSections.weapons ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
            <i className="fa-solid fa-gun"></i> 武器
          </h3>
          {equipmentSections.weapons && (
            <div className="equipment-content">
              <ul>
                {(() => {
                  const weaponElements = [];
                  // weapon_1からweapon_50まで確認して存在するもののみ表示
                  for (let i = 1; i <= 50; i++) {
                    const weaponName = character[`weapon_${i}_name`];

                    if (weaponName) {
                      weaponElements.push(
                        <li key={i} className="d-flex data-li skill-body">
                          <div className="title">
                            <span>{weaponName}</span>
                          </div>
                          <div className="ginou kazu">
                            <span className="label">成功</span>
                            <SkillDisplay
                              skillName={`${weaponName}攻撃`}
                              skillValue={character[`weapon_${i}_success`] ? parseInt(character[`weapon_${i}_success`]) : undefined}
                              skillId={`weapon_${i}_success`}
                              onClick={handleSkillClick}
                            />%
                          </div>
                          <div className="damage">
                            <span className="label">ダメ―ジ</span>
                            <span>{character[`weapon_${i}_damage`] || '--'}</span>
                          </div>
                          <div className="syatei kazu">
                            <span className="label">射程</span>
                            <span>{character[`weapon_${i}_range`] || '--'}</span>
                          </div>
                          <div className="kougekikaisu kazu">
                            <span className="label">回数</span>
                            <span>{character[`weapon_${i}_attacks`] || '--'}</span>
                          </div>
                          <div className="soudansuu kazu">
                            <span className="label">装弾</span>
                            <span>{character[`weapon_${i}_capacity`] || '--'}</span>
                          </div>
                          <div className="kosyou kazu">
                            <span className="label">故障</span>
                            <span>{character[`weapon_${i}_malfunction`] || '--'}</span>
                          </div>
                          <div className="taikyu kazu">
                            <span className="label">耐久</span>
                            <span>{character[`weapon_${i}_durability`] || '--'}</span>
                          </div>
                          <div className="memo">
                            <span className="label">詳細</span>
                            <span>{character[`weapon_${i}_details`] || '--'}</span>
                          </div>
                        </li>
                      );
                    }
                  }
                  return weaponElements.length > 0 ? weaponElements : (
                    <li className="d-flex data-li skill-body">
                      <div className="title">
                        <span>武器なし</span>
                      </div>
                      <div className="ginou kazu">
                        <span className="label">成功</span>
                        <span>--</span>%
                      </div>
                      <div className="damage">
                        <span className="label">ダメ―ジ</span>
                        <span>--</span>
                      </div>
                      <div className="syatei kazu">
                        <span className="label">射程</span>
                        <span>--</span>
                      </div>
                      <div className="kougekikaisu kazu">
                        <span className="label">回数</span>
                        <span>--</span>
                      </div>
                      <div className="soudansuu kazu">
                        <span className="label">装弾</span>
                        <span>--</span>
                      </div>
                      <div className="kosyou kazu">
                        <span className="label">故障</span>
                        <span>--</span>
                      </div>
                      <div className="taikyu kazu">
                        <span className="label">耐久</span>
                        <span>--</span>
                      </div>
                      <div className="memo">
                        <span className="label">詳細</span>
                        <span>--</span>
                      </div>
                    </li>
                  );
                })()}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 所持品セクション */}
      {hasItems(character) && (
        <div className="data-wrap item">
          <h3
            onClick={() => toggleEquipmentSection('items')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <i className={`fas ${equipmentSections.items ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
            <i className="fas fa-suitcase"></i> 所持品
          </h3>
          {equipmentSections.items && (
            <div className="equipment-content">
              <ul>
                {(() => {
                  const itemElements = [];
                  for (let i = 1; i <= 50; i++) {
                    const itemName = character[`item_${i}_name`];

                    if (itemName) {
                      itemElements.push(
                        <li key={i} className="d-flex data-li skill-body">
                          <div className="title">
                            <span>{itemName}</span>
                          </div>
                          <div className="kosu">
                            <span>{character[`item_${i}_quantity`] || '--'}</span>
                          </div>
                          <div className="content">
                            <span>{character[`item_${i}_details`] || '--'}</span>
                          </div>
                        </li>
                      );
                    }
                  }
                  return itemElements.length > 0 ? itemElements : (
                    <li className="d-flex data-li skill-body">
                      <div className="title">
                        <span>所持品なし</span>
                      </div>
                      <div className="kosu">
                        <span>--</span>
                      </div>
                      <div className="content">
                        <span>--</span>
                      </div>
                    </li>
                  );
                })()}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 不定・後遺症セクション */}
      {hasDisorders(character) && (
        <div className="data-wrap hutei">
          <h3
            onClick={() => toggleEquipmentSection('disorders')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <i className={`fas ${equipmentSections.disorders ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
            <i className="fas fa-bed"></i> 不定・後遺症
          </h3>
          {equipmentSections.disorders && (
            <div className="equipment-content">
              <ul>
                {(() => {
                  const disorderElements = [];
                  for (let i = 1; i <= 50; i++) {
                    const disorderName = character[`disorder_${i}_name`];

                    if (disorderName) {
                      disorderElements.push(
                        <li key={i} className="d-flex data-li skill-body">
                          <div className="title">
                            <span>{disorderName}</span>
                          </div>
                          <div className="term">
                            <span>{character[`disorder_${i}_period`] || '----/--/-- ～ ----/--/--'}</span>
                          </div>
                          <div className="content">
                            <span>{character[`disorder_${i}_details`] || '-'}</span>
                          </div>
                        </li>
                      );
                    }
                  }
                  return disorderElements.length > 0 ? disorderElements : (
                    <li className="d-flex data-li skill-body">
                      <div className="title">
                        <span>不定・後遺症なし</span>
                      </div>
                      <div className="term">
                        <span>----/--/-- ～ ----/--/--</span>
                      </div>
                      <div className="content">
                        <span>-</span>
                      </div>
                    </li>
                  );
                })()}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 読んだ魔導書セクション */}
      {hasBooks(character) && (
        <div className="data-wrap book">
          <h3
            onClick={() => toggleEquipmentSection('books')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <i className={`fas ${equipmentSections.books ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
            <i className="fas fa-book-dead"></i> 読んだ魔導書
          </h3>
          {equipmentSections.books && (
            <div className="equipment-content">
              <ul>
                {(() => {
                  const bookElements = [];
                  for (let i = 1; i <= 50; i++) {
                    const bookName = character[`book_${i}_name`];

                    if (bookName) {
                      bookElements.push(
                        <li key={i} className="d-flex data-li skill-body">
                          <div className="title">
                            <span>{bookName}</span>
                          </div>
                          <div className="content">
                            <span>{character[`book_${i}_details`] || '-----'}</span>
                          </div>
                        </li>
                      );
                    }
                  }
                  return bookElements.length > 0 ? bookElements : (
                    <li className="d-flex data-li skill-body">
                      <div className="title">
                        <span>魔導書なし</span>
                      </div>
                      <div className="content">
                        <span>-----</span>
                      </div>
                    </li>
                  );
                })()}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 覚えた呪文セクション */}
      {hasSpells(character) && (
        <div className="data-wrap jumon">
          <h3
            onClick={() => toggleEquipmentSection('spells')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <i className={`fas ${equipmentSections.spells ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
            <i className="fa-solid fa-hand-sparkles"></i> 覚えた呪文
          </h3>
          {equipmentSections.spells && (
            <div className="equipment-content">
              <ul>
                {(() => {
                  const spellElements = [];
                  for (let i = 1; i <= 50; i++) {
                    const spellName = character[`spell_${i}_name`];

                    if (spellName) {
                      spellElements.push(
                        <li key={i} className="d-flex data-li skill-body">
                          <div className="title">
                            <span>{spellName}</span>
                          </div>
                          <div className="content">
                            <span>{character[`spell_${i}_details`] || '-----'}</span>
                          </div>
                        </li>
                      );
                    }
                  }
                  return spellElements.length > 0 ? spellElements : (
                    <li className="d-flex data-li skill-body">
                      <div className="title">
                        <span>呪文なし</span>
                      </div>
                      <div className="content">
                        <span>-----</span>
                      </div>
                    </li>
                  );
                })()}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 所持AFセクション */}
      {hasArtifacts(character) && (
        <div className="data-wrap af">
          <h3
            onClick={() => toggleEquipmentSection('artifacts')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <i className={`fas ${equipmentSections.artifacts ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
            <i className="fa-solid fa-star-of-david"></i> 所持AF
          </h3>
          {equipmentSections.artifacts && (
            <div className="equipment-content">
              <ul>
                {(() => {
                  const artifactElements = [];
                  for (let i = 1; i <= 50; i++) {
                    const artifactName = character[`artifact_${i}_name`];

                    if (artifactName) {
                      artifactElements.push(
                        <li key={i} className="d-flex data-li skill-body">
                          <div className="title">
                            <span>{artifactName}</span>
                          </div>
                          <div className="content">
                            <span>{character[`artifact_${i}_details`] || '-----'}</span>
                          </div>
                        </li>
                      );
                    }
                  }
                  return artifactElements.length > 0 ? artifactElements : (
                    <li className="d-flex data-li skill-body">
                      <div className="title">
                        <span>AFなし</span>
                      </div>
                      <div className="content">
                        <span>-----</span>
                      </div>
                    </li>
                  );
                })()}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 遭遇した超自然の存在セクション */}
      {hasEntities(character) && (
        <div className="data-wrap cthulhu">
          <h3
            onClick={() => toggleEquipmentSection('entities')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <i className={`fas ${equipmentSections.entities ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
            <i className="fa-brands fa-octopus-deploy"></i> 遭遇した超自然の存在
          </h3>
          {equipmentSections.entities && (
            <div className="equipment-content">
              <ul>
                {(() => {
                  const entityElements = [];
                  for (let i = 1; i <= 50; i++) {
                    const entityName = character[`entity_${i}_name`];

                    if (entityName) {
                      entityElements.push(
                        <li key={i} className="d-flex data-li skill-body">
                          <div className="title">
                            <span>{entityName}</span>
                          </div>
                          <div className="content">
                            <span>{character[`entity_${i}_details`] || '-----'}</span>
                          </div>
                        </li>
                      );
                    }
                  }
                  return entityElements.length > 0 ? entityElements : (
                    <li className="d-flex data-li skill-body">
                      <div className="title">
                        <span>超自然の存在なし</span>
                      </div>
                      <div className="content">
                        <span>-----</span>
                      </div>
                    </li>
                  );
                })()}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* メモセクション */}
      {hasMemos(character) && (
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
      )}
    </>
  );
}