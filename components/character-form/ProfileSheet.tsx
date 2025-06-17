import React from 'react';
import { CharacterData } from '../../lib/character-calculations';
import CharacterInfo from './CharacterInfo';

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
        </div>
      </div>
    </div>
  );
}