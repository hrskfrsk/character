import React, { useState, useEffect } from 'react';
import { CharacterData } from '../../lib/character-calculations';

interface PersonalDataDisplayProps {
  characterData: CharacterData;
}

const PersonalDataDisplay: React.FC<PersonalDataDisplayProps> = ({ characterData }) => {
  const [isOpen, setIsOpen] = useState(false);

  // localStorageから開閉状態を読み込む
  useEffect(() => {
    const savedState = localStorage.getItem('personalDataDisplayOpen');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  // 開閉状態をlocalStorageに保存
  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('personalDataDisplayOpen', JSON.stringify(newState));
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
    characterData.other_characteristics;

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
        パーソナルデータ {isOpen ? '▼' : '▶'}
      </h3>
      
      {isOpen && (
        <div className="personal-data-content">
          {characterData.first_person && (
            <div className="data-item">
              <span className="data-label">一人称:</span>
              <span className="data-value">{characterData.first_person}</span>
            </div>
          )}
          
          {characterData.second_person && (
            <div className="data-item">
              <span className="data-label">二人称:</span>
              <span className="data-value">{characterData.second_person}</span>
            </div>
          )}
          
          {characterData.speech_style && (
            <div className="data-item">
              <span className="data-label">口調:</span>
              <div className="data-value-block">{characterData.speech_style}</div>
            </div>
          )}
          
          {characterData.likes && (
            <div className="data-item">
              <span className="data-label">好きなもの:</span>
              <div className="data-value-block">{characterData.likes}</div>
            </div>
          )}
          
          {characterData.dislikes && (
            <div className="data-item">
              <span className="data-label">嫌いなもの:</span>
              <div className="data-value-block">{characterData.dislikes}</div>
            </div>
          )}
          
          {characterData.hobbies && (
            <div className="data-item">
              <span className="data-label">趣味:</span>
              <div className="data-value-block">{characterData.hobbies}</div>
            </div>
          )}
          
          {characterData.special_skills && (
            <div className="data-item">
              <span className="data-label">特技:</span>
              <div className="data-value-block">{characterData.special_skills}</div>
            </div>
          )}
          
          {characterData.other_characteristics && (
            <div className="data-item">
              <span className="data-label">その他の特徴:</span>
              <div className="data-value-block">{characterData.other_characteristics}</div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default PersonalDataDisplay;