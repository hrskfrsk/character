import React, { useState } from 'react';
import { CharacterData } from '../../lib/character-calculations';

interface TraitsSectionProps {
  characterData: CharacterData;
  handleInputChange: (field: string, value: any) => void;
  traits: Array<{ id: string, counter: number }>;
  addTrait: () => void;
  removeTrait: (id: string) => void;
}

export default function TraitsSection({
  characterData,
  handleInputChange,
  traits,
  addTrait,
  removeTrait
}: TraitsSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  // ダイスロール関数（1D6+1D10）
  const rollDice = () => {
    const d6 = Math.floor(Math.random() * 6) + 1; // 1-6
    const d10 = Math.floor(Math.random() * 10) + 1; // 1-10
    return `${d6}-${d10}`;
  };

  // 特定の特徴表項目にダイスロール結果を設定
  const rollForTrait = (traitId: string) => {
    const result = rollDice();
    handleInputChange(`${traitId}_number`, result);
  };

  // 興味Pボーナス用の1D6ロール
  const rollInterestBonus = () => {
    return Math.floor(Math.random() * 6) + 1; // 1-6
  };

  // 興味Pボーナスをロールして設定
  const rollForInterestBonus = (traitId: string) => {
    const result = rollInterestBonus();
    handleInputChange(`${traitId}_interest_bonus`, result);
  };

  // 4-の値かどうかを判定
  const isFourSeries = (value: string) => {
    return value && value.startsWith('4-');
  };


  return (
    <div className="traits-section character-section">
      <div className="section-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <h3>
          <i className="fas fa-list-alt section-icon"></i>特徴表
        </h3>
        <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-down'}`} style={{ marginRight: '5px' }}></i>
      </div>

      <div className={`section-content ${isCollapsed ? 'collapsed' : ''}`} style={{ maxHeight: isCollapsed ? '0' : '1000px' }}>
        <div className="features">
          {/* 特徴リスト */}
          <ul>
            {traits.map((trait) => (
              <li key={trait.id} className="d-flex f-list">
                <div className="f-label">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                    <span className="num">
                      <select
                        name={`${trait.id}_number`}
                        value={(characterData as any)[`${trait.id}_number`] || ''}
                        onChange={(e) => handleInputChange(`${trait.id}_number`, e.target.value)}
                        style={{ width: '11ch', border: 'none', background: '#ddd', textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.1em', fontFamily: 'monospace', borderRadius: '5px', padding: '2px 5px' }}
                      >
                        <option value="">0-0</option>
                        <option value="1-1">1-1</option>
                        <option value="1-2">1-2</option>
                        <option value="1-3">1-3</option>
                        <option value="1-4">1-4</option>
                        <option value="1-5">1-5</option>
                        <option value="1-6">1-6</option>
                        <option value="1-7">1-7</option>
                        <option value="1-8">1-8</option>
                        <option value="1-9">1-9</option>
                        <option value="1-10">1-10</option>
                        <option value="">----------</option>
                        <option value="2-1">2-1</option>
                        <option value="2-2">2-2</option>
                        <option value="2-3">2-3</option>
                        <option value="2-4">2-4</option>
                        <option value="2-5">2-5</option>
                        <option value="2-6">2-6</option>
                        <option value="2-7">2-7</option>
                        <option value="2-8">2-8</option>
                        <option value="2-9">2-9</option>
                        <option value="2-10">2-10</option>
                        <option value="">----------</option>
                        <option value="3-1">3-1</option>
                        <option value="3-2">3-2</option>
                        <option value="3-3">3-3</option>
                        <option value="3-4">3-4</option>
                        <option value="3-5">3-5</option>
                        <option value="3-6">3-6</option>
                        <option value="3-7">3-7</option>
                        <option value="3-8">3-8</option>
                        <option value="3-9">3-9</option>
                        <option value="3-10">3-10</option>
                        <option value="">----------</option>
                        <option value="4-1">4-1</option>
                        <option value="4-2">4-2</option>
                        <option value="4-3">4-3</option>
                        <option value="4-4">4-4</option>
                        <option value="4-5">4-5</option>
                        <option value="4-6">4-6</option>
                        <option value="4-7">4-7</option>
                        <option value="4-8">4-8</option>
                        <option value="4-9">4-9</option>
                        <option value="4-10">4-10</option>
                        <option value="">----------</option>
                        <option value="5-1">5-1</option>
                        <option value="5-2">5-2</option>
                        <option value="5-3">5-3</option>
                        <option value="5-4">5-4</option>
                        <option value="5-5">5-5</option>
                        <option value="5-6">5-6</option>
                        <option value="5-7">5-7</option>
                        <option value="5-8">5-8</option>
                        <option value="5-9">5-9</option>
                        <option value="5-10">5-10</option>
                        <option value="">----------</option>
                        <option value="6-1">6-1</option>
                        <option value="6-2">6-2</option>
                        <option value="6-3">6-3</option>
                        <option value="6-4">6-4</option>
                        <option value="6-5">6-5</option>
                        <option value="6-6">6-6</option>
                        <option value="6-7">6-7</option>
                        <option value="6-8">6-8</option>
                        <option value="6-9">6-9</option>
                        <option value="6-10">6-10</option>
                        <option value="">----------</option>
                        <option value="original">オリジナル</option>
                      </select>
                    </span>
                    <button
                      type="button"
                      onClick={() => rollForTrait(trait.id)}
                      style={{
                        background: 'linear-gradient(135deg, var(--ui-theme-color), var(--ui-theme-color-hover))',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        transition: 'all 0.2s ease',
                        minWidth: '24px',
                        height: '24px',
                        justifyContent: 'center',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(34, 198, 216, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      title="1D6+1D10でランダム決定"
                    >
                      <i className="fas fa-dice"></i>
                    </button>
                  </div>
                  <span className="name">
                    <input
                      type="text"
                      name={`${trait.id}_name`}
                      style={{ borderRadius: '5px', padding: '2px 5px' }}
                      value={(characterData as any)[`${trait.id}_name`] || ''}
                      onChange={(e) => handleInputChange(`${trait.id}_name`, e.target.value)}
                      placeholder="特徴名" />
                  </span>
                </div>
                <div className="contents">
                  <textarea
                    name={`${trait.id}_description`}
                    value={(characterData as any)[`${trait.id}_description`] || ''}
                    onChange={(e) => handleInputChange(`${trait.id}_description`, e.target.value)}
                    placeholder="特徴表説明"
                    style={{
                      width: '100%',
                      minHeight: '60px',
                      resize: 'vertical',
                      padding: '8px',
                      borderRadius: '5px',
                      fontFamily: 'inherit',
                      fontSize: 'inherit'
                    }}
                  />

                  {/* 4-の値の場合のみ興味Pボーナス項目を表示 */}
                  {isFourSeries((characterData as any)[`${trait.id}_number`]) && (
                    <div style={{
                      padding: '5px',
                      backgroundColor: 'var(--ui-theme-color-light)',
                      borderRadius: '5px',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}>
                        <label style={{
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'var(--ui-theme-color)',
                        }}>
                          追加P 1D6:
                        </label>
                        <select
                          name={`${trait.id}_interest_bonus`}
                          value={(characterData as any)[`${trait.id}_interest_bonus`] || ''}
                          onChange={(e) => handleInputChange(`${trait.id}_interest_bonus`, e.target.value)}
                          style={{
                            width: '60px',
                            borderRadius: '4px',
                            border: 'none',
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            background: '#fff'
                          }}
                        >
                          <option value="">-</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => rollForInterestBonus(trait.id)}
                          style={{
                            background: 'linear-gradient(135deg, var(--ui-theme-color), var(--ui-theme-color-hover))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            transition: 'all 0.2s ease',
                            minWidth: '24px',
                            height: '24px',
                            justifyContent: 'center',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 2px 6px rgba(34, 198, 216, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                          title="1D6でランダム決定"
                        >
                          <i className="fas fa-dice"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px'
                }}>
                  <button
                    type="button"
                    onClick={() => removeTrait(trait.id)}
                    className="remove-btn">
                    <i className="fas fa-minus"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* 特徴追加ボタン */}
          <button
            type="button"
            onClick={addTrait}
            className="add-btn"
            style={{ margin: '0 0 10px auto' }}>
            <i className="fas fa-plus"></i> 特徴を追加
          </button>
        </div>
      </div>
    </div>
  );
}