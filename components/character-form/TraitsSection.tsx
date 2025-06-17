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

  return (
    <div className="traits-section character-section">
      <div className="section-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <h3>
          <i className="fas fa-list-alt section-icon"></i>特徴表
        </h3>
        <i className={`fas ${isCollapsed ? 'fa-chevron-up' : 'fa-chevron-down'} section-toggle-icon`}></i>
      </div>

      <div className={`section-content ${isCollapsed ? 'collapsed' : ''}`} style={{ maxHeight: isCollapsed ? '0' : '1000px' }}>
        <div className="features">
          {/* 特徴リスト */}
          <ul>
            {traits.map((trait) => (
              <li key={trait.id} className="d-flex f-list">
                <div className="f-label">
                  <span className="num">
                    <select
                      name={`${trait.id}_number`}
                      value={(characterData as any)[`${trait.id}_number`] || ''}
                      onChange={(e) => handleInputChange(`${trait.id}_number`, e.target.value)}
                      style={{ width: '7ch', border: 'none', background: '#ddd', textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.1em', fontFamily: 'monospace', borderRadius: '5px', padding: '2px 5px' }}
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
                    </select>
                  </span>
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
            style={{ margin: '-10px 0 10px auto' }}>
            <i className="fas fa-plus"></i> 特徴を追加
          </button>
        </div>
      </div>
    </div>
  );
}