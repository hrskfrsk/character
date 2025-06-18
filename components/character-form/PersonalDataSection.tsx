import React, { useState, useEffect } from 'react';
import { CharacterData } from '../../lib/character-calculations';

interface PersonalDataSectionProps {
  characterData: CharacterData;
  setCharacterData: React.Dispatch<React.SetStateAction<CharacterData>>;
}

const PersonalDataSection: React.FC<PersonalDataSectionProps> = ({ characterData, setCharacterData }) => {
  const [isOpen, setIsOpen] = useState(false);

  // localStorageから開閉状態を読み込む
  useEffect(() => {
    const savedState = localStorage.getItem('personalDataSectionOpen');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  // 開閉状態をlocalStorageに保存
  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('personalDataSectionOpen', JSON.stringify(newState));
  };

  const handleInputChange = (field: keyof CharacterData, value: string) => {
    setCharacterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="personal-data-section">
      <div className="playsheet-header" onClick={toggleOpen}>
        <h2>
          <i className="fas fa-user section-icon"></i> キャラクター詳細
        </h2>
        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} section-toggle-icon ${isOpen ? '' : 'collapsed'}`}></i>
      </div>

      {isOpen && (
        <div className="personal-data-content">
          {/* 話し方・言葉遣い */}
          <div className="form-group-section">
            <h3 className="form-group-title">
              <i className="fas fa-comments"></i> 話し方
            </h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_person">一人称</label>
                <input
                  type="text"
                  id="first_person"
                  value={characterData.first_person || ''}
                  onChange={(e) => handleInputChange('first_person', e.target.value)}
                  placeholder="私、僕、俺など"
                />
              </div>

              <div className="form-group">
                <label htmlFor="second_person">二人称</label>
                <input
                  type="text"
                  id="second_person"
                  value={characterData.second_person || ''}
                  onChange={(e) => handleInputChange('second_person', e.target.value)}
                  placeholder="あなた、君、お前など"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="speech_style">口調</label>
              <textarea
                id="speech_style"
                value={characterData.speech_style || ''}
                onChange={(e) => handleInputChange('speech_style', e.target.value)}
                placeholder="丁寧語、タメ語、方言など、話し方の特徴やサンプル台詞など"
                rows={2}
              />
            </div>
          </div>

          {/* 性格・嗜好 */}
          <div className="form-group-section">
            <h3 className="form-group-title">
              <i className="fas fa-heart"></i> 嗜好
            </h3>
            <div className="form-group">
              <label htmlFor="likes">好き</label>
              <textarea
                id="likes"
                value={characterData.likes || ''}
                onChange={(e) => handleInputChange('likes', e.target.value)}
                placeholder="好きな食べ物、活動、場所など"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dislikes">嫌い</label>
              <textarea
                id="dislikes"
                value={characterData.dislikes || ''}
                onChange={(e) => handleInputChange('dislikes', e.target.value)}
                placeholder="嫌いな食べ物、苦手なこと、避けたいものなど"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="hobbies">趣味</label>
              <textarea
                id="hobbies"
                value={characterData.hobbies || ''}
                onChange={(e) => handleInputChange('hobbies', e.target.value)}
                placeholder="余暇の過ごし方、興味のある活動など"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="special_skills">得意</label>
              <textarea
                id="special_skills"
                value={characterData.special_skills || ''}
                onChange={(e) => handleInputChange('special_skills', e.target.value)}
                placeholder="得意なこと、人より優れている能力など"
                rows={3}
              />
            </div>
          </div>

          {/* その他 */}
          <div className="form-group">
            <label htmlFor="other_characteristics">その他の特徴</label>
            <textarea
              id="other_characteristics"
              value={characterData.other_characteristics || ''}
              onChange={(e) => handleInputChange('other_characteristics', e.target.value)}
              placeholder="その他の性格、習慣、癖、外見的特徴など"
              rows={4}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default PersonalDataSection;