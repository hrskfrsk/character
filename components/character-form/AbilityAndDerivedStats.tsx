import React from 'react';
import { CharacterData } from '../../lib/character-calculations';
import AbilityScores from './AbilityScores';
import TraitsSection from './TraitsSection';
import JobBaseInfo from './JobBaseInfo';
import StatusSlots from './StatusSlots';

interface AbilityAndDerivedStatsProps {
  characterData: CharacterData;
  calculatedStats: any;
  handleInputChange: (field: string, value: any) => void;
  handleJobPointsFormulaChange: (formula: string) => void;
  // 特徴関連
  traits: Array<{ id: string, counter: number }>;
  addTrait: () => void;
  removeTrait: (id: string) => void;
  // 技能表示切替
  hideInitialSkills: boolean;
  toggleSkillDisplay: () => void;
}

export default function AbilityAndDerivedStats({
  characterData,
  calculatedStats,
  handleInputChange,
  handleJobPointsFormulaChange,
  traits,
  addTrait,
  removeTrait,
  hideInitialSkills,
  toggleSkillDisplay
}: AbilityAndDerivedStatsProps) {
  return (
    <>
      <AbilityScores 
        characterData={characterData}
        calculatedStats={calculatedStats}
        handleInputChange={handleInputChange}
      />
      
      <TraitsSection 
        characterData={characterData}
        handleInputChange={handleInputChange}
        traits={traits}
        addTrait={addTrait}
        removeTrait={removeTrait}
      />
      
      <JobBaseInfo 
        characterData={characterData}
        handleInputChange={handleInputChange}
      />
      
      <StatusSlots 
        characterData={characterData}
        calculatedStats={calculatedStats}
        handleInputChange={handleInputChange}
        handleJobPointsFormulaChange={handleJobPointsFormulaChange}
      />
    </>
  );
}