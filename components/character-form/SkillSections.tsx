import React from 'react';
import { CharacterData } from '../../lib/character-calculations';
import CombatSkills from './CombatSkills';
import ExplorationSkills from './ExplorationSkills';
import ActionSkills from './ActionSkills';
import NegotiationSkills from './NegotiationSkills';
import KnowledgeSkills from './KnowledgeSkills';

interface SkillSectionsProps {
  characterData: CharacterData;
  calculatedStats: any;
  handleInputChange: (field: string, value: any) => void;
  // 技能表示切替
  hideInitialSkills: boolean;
  toggleSkillDisplay: () => void;
  isSkillInitialOnly: (skillName: string, initialValue?: number) => boolean;
  // 戦闘技能
  additionalCombatSkills: Array<{ id: string, counter: number }>;
  addCombatSkill: () => void;
  removeCombatSkill: (id: string) => void;
  // 探索技能
  additionalExplorationSkills: Array<{ id: string, counter: number }>;
  addExplorationSkill: () => void;
  removeExplorationSkill: (id: string) => void;
  // 行動技能
  additionalActionSkills: Array<{ id: string, counter: number }>;
  addActionSkill: () => void;
  removeActionSkill: (id: string) => void;
  // 交渉技能
  additionalNegotiationSkills: Array<{ id: string, counter: number }>;
  addNegotiationSkill: () => void;
  removeNegotiationSkill: (id: string) => void;
  // 知識技能
  additionalKnowledgeSkills: Array<{ id: string, counter: number }>;
  addKnowledgeSkill: () => void;
  removeKnowledgeSkill: (id: string) => void;
}

export default function SkillSections({
  characterData,
  calculatedStats,
  handleInputChange,
  hideInitialSkills,
  toggleSkillDisplay,
  isSkillInitialOnly,
  additionalCombatSkills,
  addCombatSkill,
  removeCombatSkill,
  additionalExplorationSkills,
  addExplorationSkill,
  removeExplorationSkill,
  additionalActionSkills,
  addActionSkill,
  removeActionSkill,
  additionalNegotiationSkills,
  addNegotiationSkill,
  removeNegotiationSkill,
  additionalKnowledgeSkills,
  addKnowledgeSkill,
  removeKnowledgeSkill
}: SkillSectionsProps) {
  return (
    <>
      {/* 技能表示切替ボタン */}
      <div className="skill-toggle-container" style={{ textAlign: 'right', marginBottom: '10px' }}>
        <div className="segmented-toggle">
          <button 
            type="button" 
            className={!hideInitialSkills ? 'active' : ''}
            onClick={toggleSkillDisplay}
          >
            全表示
          </button>
          <button 
            type="button" 
            className={hideInitialSkills ? 'active' : ''}
            onClick={toggleSkillDisplay}
          >
            初期値の技能を隠す
          </button>
        </div>
      </div>

      <div className="skill">
        <CombatSkills
          characterData={characterData}
          calculatedStats={calculatedStats}
          handleInputChange={handleInputChange}
          hideInitialSkills={hideInitialSkills}
          isSkillInitialOnly={isSkillInitialOnly}
          additionalCombatSkills={additionalCombatSkills}
          addCombatSkill={addCombatSkill}
          removeCombatSkill={removeCombatSkill}
        />

        <ExplorationSkills
          characterData={characterData}
          calculatedStats={calculatedStats}
          handleInputChange={handleInputChange}
          hideInitialSkills={hideInitialSkills}
          isSkillInitialOnly={isSkillInitialOnly}
          additionalExplorationSkills={additionalExplorationSkills}
          addExplorationSkill={addExplorationSkill}
          removeExplorationSkill={removeExplorationSkill}
        />

        <ActionSkills
          characterData={characterData}
          calculatedStats={calculatedStats}
          handleInputChange={handleInputChange}
          hideInitialSkills={hideInitialSkills}
          isSkillInitialOnly={isSkillInitialOnly}
          additionalActionSkills={additionalActionSkills}
          addActionSkill={addActionSkill}
          removeActionSkill={removeActionSkill}
        />

        <NegotiationSkills
          characterData={characterData}
          calculatedStats={calculatedStats}
          handleInputChange={handleInputChange}
          hideInitialSkills={hideInitialSkills}
          isSkillInitialOnly={isSkillInitialOnly}
          additionalNegotiationSkills={additionalNegotiationSkills}
          addNegotiationSkill={addNegotiationSkill}
          removeNegotiationSkill={removeNegotiationSkill}
        />

        <KnowledgeSkills
          characterData={characterData}
          calculatedStats={calculatedStats}
          handleInputChange={handleInputChange}
          hideInitialSkills={hideInitialSkills}
          isSkillInitialOnly={isSkillInitialOnly}
          additionalKnowledgeSkills={additionalKnowledgeSkills}
          addKnowledgeSkill={addKnowledgeSkill}
          removeKnowledgeSkill={removeKnowledgeSkill}
        />
      </div>
    </>
  );
}