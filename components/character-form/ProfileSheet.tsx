import React from 'react';
import { CharacterData } from '../../lib/character-calculations';
import CharacterInfo from './CharacterInfo';
import PersonalDataSection from './PersonalDataSection';

interface ProfileSheetProps {
  characterData: CharacterData;
  handleInputChange: (field: string, value: any) => void;
}

export default function ProfileSheet({
  characterData,
  handleInputChange
}: ProfileSheetProps) {
  return (
    <div className="profile-sheet-wrapper">
      <div className="profile-sheet-section">
        <div className="playsheet-header">
          <h2>
            <i className="fas fa-user-circle section-icon"></i>プロフィールシート
          </h2>
        </div>

        <div className="section-content">
          <CharacterInfo
            characterData={characterData}
            handleInputChange={handleInputChange}
          />
          
          <PersonalDataSection
            characterData={characterData}
            setCharacterData={(updater) => {
              if (typeof updater === 'function') {
                const newData = updater(characterData);
                Object.keys(newData).forEach(key => {
                  if (newData[key] !== characterData[key]) {
                    handleInputChange(key, newData[key]);
                  }
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}