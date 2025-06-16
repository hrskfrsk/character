import React, { useState, useEffect } from 'react';
import CombatSkills from './skills/CombatSkills';
import ExplorationSkills from './skills/ExplorationSkills';
import ActionSkills from './skills/ActionSkills';
import NegotiationSkills from './skills/NegotiationSkills';
import KnowledgeSkills from './skills/KnowledgeSkills';
import ChatPalette from './ChatPalette';

interface SkillsDisplayProps {
  character: any;
  characterId: string;
  handleSkillClick: (skillName: string, skillValue: number) => void;
}

export default function SkillsDisplay({ character, characterId, handleSkillClick }: SkillsDisplayProps) {
  // 技能表示の状態（デフォルトは初期値以外のみ表示）
  const [showAllSkills, setShowAllSkills] = useState(false);

  // 初期値を表示するヘルパー関数（初期値は必ず数字を表示）
  const displayInitial = (value: any, defaultValue: number = 0): string => {
    if (value !== undefined && value !== null && value !== '') {
      return String(value);
    }
    return String(defaultValue);
  };

  // 技能が初期値のみかどうかを判定
  const isSkillInitialOnly = (skillPrefix: string): boolean => {
    // 職業、興味、成長、その他のいずれかに値があるかチェック
    const job = character[`${skillPrefix}_job`];
    const interest = character[`${skillPrefix}_interest`];
    const growth = character[`${skillPrefix}_growth`];
    const other = character[`${skillPrefix}_other`];

    return !(job || interest || growth || other);
  };

  // localStorage から UI 状態を復元（キャラクターID別）
  useEffect(() => {
    if (typeof window !== 'undefined' && characterId) {
      const savedShowAllSkills = localStorage.getItem(`character-display-showAllSkills-${characterId}`);
      if (savedShowAllSkills !== null) {
        setShowAllSkills(JSON.parse(savedShowAllSkills));
      }
    }
  }, [characterId]);

  // UI 状態を localStorage に保存（キャラクターID別）
  useEffect(() => {
    if (typeof window !== 'undefined' && characterId) {
      localStorage.setItem(`character-display-showAllSkills-${characterId}`, JSON.stringify(showAllSkills));
    }
  }, [showAllSkills, characterId]);

  return (
    <>
      {/* 技能表示切り替えボタン */}
      <div className="skill-toggle-container" style={{ textAlign: 'right', marginBottom: '10px' }}>
        <div className="segmented-toggle">
          <button
            type="button"
            className={showAllSkills ? 'active' : ''}
            onClick={() => setShowAllSkills(!showAllSkills)}
          >
            全表示
          </button>
          <button
            type="button"
            className={!showAllSkills ? 'active' : ''}
            onClick={() => setShowAllSkills(!showAllSkills)}
          >
            初期値の技能を隠す
          </button>
        </div>
      </div>

      {/* 技能セクション */}
      <div className="skill">
        <ul className="d-flex">
          <CombatSkills
            character={character}
            showAllSkills={showAllSkills}
            displayInitial={displayInitial}
            isSkillInitialOnly={isSkillInitialOnly}
            handleSkillClick={handleSkillClick}
          />
          <ExplorationSkills
            character={character}
            showAllSkills={showAllSkills}
            displayInitial={displayInitial}
            isSkillInitialOnly={isSkillInitialOnly}
            handleSkillClick={handleSkillClick}
          />
          <ActionSkills
            character={character}
            showAllSkills={showAllSkills}
            displayInitial={displayInitial}
            isSkillInitialOnly={isSkillInitialOnly}
            handleSkillClick={handleSkillClick}
          />
          <NegotiationSkills
            character={character}
            showAllSkills={showAllSkills}
            displayInitial={displayInitial}
            isSkillInitialOnly={isSkillInitialOnly}
            handleSkillClick={handleSkillClick}
          />
          <KnowledgeSkills
            character={character}
            showAllSkills={showAllSkills}
            displayInitial={displayInitial}
            isSkillInitialOnly={isSkillInitialOnly}
            handleSkillClick={handleSkillClick}
          />
          <ChatPalette character={character} />
        </ul>
      </div>
    </>
  );
}