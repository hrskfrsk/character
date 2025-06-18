import React, { useState } from 'react';
import { CharacterData } from '../../lib/character-calculations';
import AbilityAndDerivedStats from './AbilityAndDerivedStats';
import SkillSections from './SkillSections';
import Equipment from './Equipment';
import MemoSection from './MemoSection';

interface PlaySheetProps {
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
  isSkillInitialOnly: (skillName: string, initialValue?: number) => boolean;
  // 技能セクション折りたたみ
  isSkillSectionCollapsed: boolean;
  onSkillSectionToggle: () => void;
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
  // 装備関連
  equipmentSections: any;
  toggleEquipmentSection: (section: string) => void;
  weapons: Array<{ id: string, counter: number }>;
  addWeapon: () => void;
  removeWeapon: (id: string) => void;
  items: Array<{ id: string, counter: number }>;
  addItem: () => void;
  removeItem: (id: string) => void;
  disorders: Array<{ id: string, counter: number }>;
  addDisorder: () => void;
  removeDisorder: (id: string) => void;
  books: Array<{ id: string, counter: number }>;
  addBook: () => void;
  removeBook: (id: string) => void;
  spells: Array<{ id: string, counter: number }>;
  addSpell: () => void;
  removeSpell: (id: string) => void;
  artifacts: Array<{ id: string, counter: number }>;
  addArtifact: () => void;
  removeArtifact: (id: string) => void;
  entities: Array<{ id: string, counter: number }>;
  addEntity: () => void;
  removeEntity: (id: string) => void;
  // メモ関連
  showMemoSection: boolean;
  toggleMemoSection: () => void;
  secretMemos: Array<{ id: string, counter: number }>;
  addSecretMemo: () => void;
  removeSecretMemo: (id: string) => void;
  memoOrder: string[];
  reorderMemos: (newOrder: string[]) => void;
}

export default function PlaySheet({
  characterData,
  calculatedStats,
  handleInputChange,
  handleJobPointsFormulaChange,
  traits,
  addTrait,
  removeTrait,
  hideInitialSkills,
  toggleSkillDisplay,
  isSkillInitialOnly,
  isSkillSectionCollapsed,
  onSkillSectionToggle,
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
  removeKnowledgeSkill,
  equipmentSections,
  toggleEquipmentSection,
  weapons,
  addWeapon,
  removeWeapon,
  items,
  addItem,
  removeItem,
  disorders,
  addDisorder,
  removeDisorder,
  books,
  addBook,
  removeBook,
  spells,
  addSpell,
  removeSpell,
  artifacts,
  addArtifact,
  removeArtifact,
  entities,
  addEntity,
  removeEntity,
  showMemoSection,
  toggleMemoSection,
  secretMemos,
  addSecretMemo,
  removeSecretMemo,
  memoOrder,
  reorderMemos
}: PlaySheetProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="character-name-section">
      <div className="playsheet-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <h2>
          <i className="fas fa-scroll section-icon"></i>プレイシート
        </h2>
        <i className={`fas ${isCollapsed ? 'fa-chevron-up' : 'fa-chevron-down'} section-toggle-icon ${isCollapsed ? 'collapsed' : ''}`}></i>
      </div>

      <div className={`section-content ${isCollapsed ? 'collapsed' : ''}`} style={{ maxHeight: isCollapsed ? '0' : 'none', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        {/* 能力値と導出ステータス */}
        <AbilityAndDerivedStats
          characterData={characterData}
          calculatedStats={calculatedStats}
          handleInputChange={handleInputChange}
          handleJobPointsFormulaChange={handleJobPointsFormulaChange}
          traits={traits}
          addTrait={addTrait}
          removeTrait={removeTrait}
          hideInitialSkills={hideInitialSkills}
          toggleSkillDisplay={toggleSkillDisplay}
          isSkillSectionCollapsed={isSkillSectionCollapsed}
          onSkillSectionToggle={onSkillSectionToggle}
        />

        {/* 技能セクション */}
        <SkillSections
          characterData={characterData}
          calculatedStats={calculatedStats}
          handleInputChange={handleInputChange}
          hideInitialSkills={hideInitialSkills}
          toggleSkillDisplay={toggleSkillDisplay}
          isSkillInitialOnly={isSkillInitialOnly}
          isSkillSectionCollapsed={isSkillSectionCollapsed}
          additionalCombatSkills={additionalCombatSkills}
          addCombatSkill={addCombatSkill}
          removeCombatSkill={removeCombatSkill}
          additionalExplorationSkills={additionalExplorationSkills}
          addExplorationSkill={addExplorationSkill}
          removeExplorationSkill={removeExplorationSkill}
          additionalActionSkills={additionalActionSkills}
          addActionSkill={addActionSkill}
          removeActionSkill={removeActionSkill}
          additionalNegotiationSkills={additionalNegotiationSkills}
          addNegotiationSkill={addNegotiationSkill}
          removeNegotiationSkill={removeNegotiationSkill}
          additionalKnowledgeSkills={additionalKnowledgeSkills}
          addKnowledgeSkill={addKnowledgeSkill}
          removeKnowledgeSkill={removeKnowledgeSkill}
          jobPointsUsed={Number(characterData.job_points_used) || 0}
          jobPointsTotal={Number(characterData.job_points_formula === 'manual' ? (characterData.job_points_total || 0) : (calculatedStats.job_points_total || 0))}
          interestPointsUsed={Number(characterData.interest_points_used) || 0}
          interestPointsTotal={Number(calculatedStats.interest_points_total) || 0}
        />

        {/* 装備・所持品セクション */}
        <Equipment
          characterData={characterData}
          handleInputChange={handleInputChange}
          equipmentSections={equipmentSections}
          toggleEquipmentSection={toggleEquipmentSection}
          weapons={weapons}
          addWeapon={addWeapon}
          removeWeapon={removeWeapon}
          items={items}
          addItem={addItem}
          removeItem={removeItem}
          disorders={disorders}
          addDisorder={addDisorder}
          removeDisorder={removeDisorder}
          books={books}
          addBook={addBook}
          removeBook={removeBook}
          spells={spells}
          addSpell={addSpell}
          removeSpell={removeSpell}
          artifacts={artifacts}
          addArtifact={addArtifact}
          removeArtifact={removeArtifact}
          entities={entities}
          addEntity={addEntity}
          removeEntity={removeEntity}
        />

        {/* メモセクション */}
        <MemoSection
          characterData={characterData}
          handleInputChange={handleInputChange}
          showMemoSection={showMemoSection}
          toggleMemoSection={toggleMemoSection}
          secretMemos={secretMemos}
          addSecretMemo={addSecretMemo}
          removeSecretMemo={removeSecretMemo}
          memoOrder={memoOrder}
          reorderMemos={reorderMemos}
        />
      </div>
    </div>

  );
}