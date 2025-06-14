import React from 'react';
import { CharacterData } from '../../lib/character-calculations';

interface CharacterInfoProps {
  characterData: CharacterData;
  handleInputChange: (field: string, value: any) => void;
}

export default function CharacterInfo({ characterData, handleInputChange }: CharacterInfoProps) {
  return (
    <div className="character-info">
      <h2>
        <i className="fas fa-user"></i> キャラクター基本情報
      </h2>

      <div className="info-grid">
        <div className="info-item">
          <label htmlFor="character_name">キャラクター名</label>
          <input
            type="text"
            id="character_name"
            name="character_name"
            value={characterData.character_name || ''}
            onChange={(e) => handleInputChange('character_name', e.target.value)}
          />
        </div>

        <div className="info-item">
          <label htmlFor="character_name_kana">フリガナ</label>
          <input
            type="text"
            id="character_name_kana"
            name="character_name_kana"
            value={characterData.character_name_kana || ''}
            onChange={(e) => handleInputChange('character_name_kana', e.target.value)}
          />
        </div>

        <div className="info-item">
          <label htmlFor="job">職業</label>
          <input
            type="text"
            id="job"
            name="job"
            value={characterData.job || ''}
            onChange={(e) => handleInputChange('job', e.target.value)}
          />
        </div>

        <div className="info-item">
          <label htmlFor="age">年齢</label>
          <input
            type="number"
            id="age"
            name="age"
            value={characterData.age || ''}
            onChange={(e) => handleInputChange('age', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="info-item">
          <label htmlFor="sex">性別</label>
          <select
            id="sex"
            name="sex"
            value={characterData.sex || ''}
            onChange={(e) => handleInputChange('sex', e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
            <option value="その他">その他</option>
          </select>
        </div>

        <div className="info-item">
          <label htmlFor="height">身長</label>
          <input
            type="text"
            id="height"
            name="height"
            placeholder="cm"
            value={characterData.height || ''}
            onChange={(e) => handleInputChange('height', e.target.value)}
          />
        </div>

        <div className="info-item">
          <label htmlFor="weight">体重</label>
          <input
            type="text"
            id="weight"
            name="weight"
            placeholder="kg"
            value={characterData.weight || ''}
            onChange={(e) => handleInputChange('weight', e.target.value)}
          />
        </div>

        <div className="info-item full-width">
          <label htmlFor="backstory">設定・バックストーリー</label>
          <textarea
            id="backstory"
            name="backstory"
            rows={4}
            value={characterData.backstory || ''}
            onChange={(e) => handleInputChange('backstory', e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
}