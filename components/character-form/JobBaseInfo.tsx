import React from 'react';
import { CharacterData } from '../../lib/character-calculations';

interface JobBaseInfoProps {
  characterData: CharacterData;
  handleInputChange: (field: string, value: any) => void;
}

export default function JobBaseInfo({
  characterData,
  handleInputChange
}: JobBaseInfoProps) {
  return (
    <div style={{ marginTop: '10px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
        borderBottom: '2px solid #ddd',
        paddingBottom: '5px',
      }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>技能</h2>
      </div>
      <div className="job-base-responsive">
        <div>
          <span>ベース職業</span>
          <input
            type="text"
            name="base_job"
            style={{ minHeight: '50px', borderRadius: '5px' }}
            value={characterData.base_job || ''}
            onChange={(e) => handleInputChange('base_job', e.target.value)}
            placeholder="職業名" />
        </div>
        <div>
          <span>職業特記</span>
          <textarea
            name="special_notes"
            value={characterData.special_notes || ''}
            onChange={(e) => handleInputChange('special_notes', e.target.value)}
            placeholder="特記事項"
            style={{
              width: '100%',
              minHeight: '50px',
              resize: 'vertical',
              padding: '5px',
              borderRadius: '5px',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              lineHeight: '1.4'
            }}
          />
        </div>
      </div>
    </div>
  );
}