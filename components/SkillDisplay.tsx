import React from 'react';

interface SkillDisplayProps {
  skillName: string;
  skillValue: string | number | undefined;
  skillId: string;
  onClick: (skillName: string, skillValue: number) => void;
}

export default function SkillDisplay({ skillName, skillValue, skillId, onClick }: SkillDisplayProps) {
  const hasValue = skillValue && skillValue !== '-';
  const numericValue = hasValue ? parseInt(String(skillValue)) : 0;
  
  return (
    <span 
      id={skillId}
      onClick={() => hasValue && onClick(skillName, numericValue)}
      style={{ 
        cursor: hasValue ? 'pointer' : 'default',
        color: 'inherit',
        textDecoration: 'none',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (hasValue) {
          e.currentTarget.style.color = 'var(--ui-theme-color)';
          e.currentTarget.style.fontWeight = 'bold';
        }
      }}
      onMouseLeave={(e) => {
        if (hasValue) {
          e.currentTarget.style.color = 'inherit';
          e.currentTarget.style.fontWeight = 'normal';
        }
      }}
      title={hasValue ? `${skillName} (${numericValue}%) - クリックでダイスロール` : ''}
    >
      {skillValue || '-'}
    </span>
  );
}