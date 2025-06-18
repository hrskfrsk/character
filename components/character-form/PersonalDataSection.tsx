import React, { useState, useEffect } from 'react';
import { CharacterData } from '../../lib/character-calculations';
import { AutoResizeTextarea } from '../../lib/text-utils';

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

  // その他セクション管理
  const addOtherSection = () => {
    const newSection = {
      id: `other_${Date.now()}`,
      title: '',
      content: ''
    };
    
    setCharacterData(prev => ({
      ...prev,
      other_sections: [...(prev.other_sections || []), newSection]
    }));
  };

  const removeOtherSection = (id: string) => {
    setCharacterData(prev => ({
      ...prev,
      other_sections: (prev.other_sections || []).filter(section => section.id !== id)
    }));
  };

  const updateOtherSection = (id: string, field: 'title' | 'content', value: string) => {
    setCharacterData(prev => ({
      ...prev,
      other_sections: (prev.other_sections || []).map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    }));
  };

  return (
    <section className="personal-data-section">
      <div className="playsheet-header" onClick={toggleOpen}>
        <h2>
          <i className="fas fa-user section-icon"></i> キャラクター詳細
        </h2>
        <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
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
              <AutoResizeTextarea
                id="speech_style"
                value={characterData.speech_style || ''}
                onChange={(value) => handleInputChange('speech_style', value)}
                placeholder="丁寧語、タメ語、方言など、話し方の特徴やサンプル台詞など"
                minRows={2}
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
              <AutoResizeTextarea
                id="likes"
                value={characterData.likes || ''}
                onChange={(value) => handleInputChange('likes', value)}
                placeholder="好きな食べ物、活動、場所など"
                minRows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dislikes">嫌い</label>
              <AutoResizeTextarea
                id="dislikes"
                value={characterData.dislikes || ''}
                onChange={(value) => handleInputChange('dislikes', value)}
                placeholder="嫌いな食べ物、苦手なこと、避けたいものなど"
                minRows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="hobbies">趣味</label>
              <AutoResizeTextarea
                id="hobbies"
                value={characterData.hobbies || ''}
                onChange={(value) => handleInputChange('hobbies', value)}
                placeholder="余暇の過ごし方、興味のある活動など"
                minRows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="special_skills">得意</label>
              <AutoResizeTextarea
                id="special_skills"
                value={characterData.special_skills || ''}
                onChange={(value) => handleInputChange('special_skills', value)}
                placeholder="得意なこと、人より優れている能力など"
                minRows={3}
              />
            </div>
          </div>

          {/* イメージ */}
          <div className="form-group-section">
            <h3 className="form-group-title">
              <i className="fas fa-palette"></i> イメージ
            </h3>
            
            <div className="form-group">
              <label htmlFor="theme_song">曲</label>
              <AutoResizeTextarea
                id="theme_song"
                value={characterData.theme_song || ''}
                onChange={(value) => handleInputChange('theme_song', value)}
                placeholder="テーマソング、イメージソングなど"
                minRows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="motif">モチーフ</label>
              <AutoResizeTextarea
                id="motif"
                value={characterData.motif || ''}
                onChange={(value) => handleInputChange('motif', value)}
                placeholder="キャラクターデザインの元ネタ、モチーフなど"
                minRows={3}
              />
            </div>

            {/* 動的その他セクション */}
            {characterData.other_sections && characterData.other_sections.map((section) => (
              <div key={section.id} className="form-group dynamic-section">
                <div className="form-row">
                  <div className="form-group inline">
                    <label>項目名</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateOtherSection(section.id, 'title', e.target.value)}
                      placeholder="項目名を入力"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeOtherSection(section.id)}
                    className="remove-btn"
                    title="この項目を削除"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <AutoResizeTextarea
                  value={section.content}
                  onChange={(value) => updateOtherSection(section.id, 'content', value)}
                  placeholder="内容を入力"
                  minRows={3}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addOtherSection}
              className="add-section-btn"
            >
              <i className="fas fa-plus"></i> その他項目を追加
            </button>
          </div>

          {/* 身体的特徴 */}
          <div className="form-group-section">
            <h3 className="form-group-title">
              <i className="fas fa-user-circle"></i> 身体的特徴
            </h3>
            
            <div className="form-group">
              <label htmlFor="physical_features">身体的特徴</label>
              <AutoResizeTextarea
                id="physical_features"
                value={characterData.physical_features || ''}
                onChange={(value) => handleInputChange('physical_features', value)}
                placeholder="体型、髪型、顔立ち、服装、装身具、特徴的な印・傷など"
                minRows={4}
              />
            </div>
          </div>

        </div>
      )}
    </section>
  );
};

export default PersonalDataSection;