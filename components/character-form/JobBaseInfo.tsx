import React, { useState } from 'react';
import { CharacterData } from '../../lib/character-calculations';

interface JobBaseInfoProps {
  characterData: CharacterData;
  handleInputChange: (field: string, value: any) => void;
}

export default function JobBaseInfo({
  characterData,
  handleInputChange
}: JobBaseInfoProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="character-section">
      <div className="section-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <h2>
          <i className="fas fa-briefcase section-icon"></i>ベース職業
        </h2>
        <i className={`fas ${isCollapsed ? 'fa-chevron-up' : 'fa-chevron-down'} section-toggle-icon`}></i>
      </div>
      <div className={`section-content ${isCollapsed ? 'collapsed' : ''}`} style={{ maxHeight: isCollapsed ? '0' : '1000px' }}>
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
    </div>
  );
}