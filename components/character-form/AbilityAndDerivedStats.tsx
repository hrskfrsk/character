import React, { useState } from 'react';
import { CharacterData } from '../../lib/character-calculations';
import { rollAllAbilities, rollSingleAbility, AbilityRollResult } from '../../lib/ability-dice';

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
  const [lastRolls, setLastRolls] = useState<{ [key: string]: AbilityRollResult } | null>(null);

  // 能力値合計を計算
  const calculateAbilityTotal = () => {
    const abilities = ['str_total', 'con_total', 'pow_total', 'dex_total', 'app_total', 'siz_total', 'int_total', 'edu_total'];
    return abilities.reduce((total, ability) => {
      const value = calculatedStats[ability];
      return total + (value && !isNaN(value) ? parseInt(value) : 0);
    }, 0);
  };

  const handleRollAllAbilities = () => {
    const rolls = rollAllAbilities();
    setLastRolls(rolls);

    // 各能力値を設定
    handleInputChange('str_base', rolls.str.total);
    handleInputChange('con_base', rolls.con.total);
    handleInputChange('pow_base', rolls.pow.total);
    handleInputChange('dex_base', rolls.dex.total);
    handleInputChange('app_base', rolls.app.total);
    handleInputChange('siz_base', rolls.siz.total);
    handleInputChange('int_base', rolls.int.total);
    handleInputChange('edu_base', rolls.edu.total);
  };

  const handleRollSingleAbility = (ability: 'str' | 'con' | 'pow' | 'dex' | 'app' | 'siz' | 'int' | 'edu') => {
    const roll = rollSingleAbility(ability);
    handleInputChange(`${ability}_base`, roll.total);

    // 個別ロール結果を保存
    setLastRolls(prev => ({
      ...prev,
      [ability]: roll
    }));
  };

  // 小さなダイスボタンコンポーネント
  const DiceButton = ({ ability, formula }: { ability: 'str' | 'con' | 'pow' | 'dex' | 'app' | 'siz' | 'int' | 'edu', formula: string }) => (
    <button
      type="button"
      onClick={() => handleRollSingleAbility(ability)}
      style={{
        marginLeft: '5px',
        padding: '2px 6px',
        fontSize: '10px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '3px',
        cursor: 'pointer',
        color: '#666'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
      title={`${formula}で振り直し`}
    >
      🎲
    </button>
  );

  return (
    <>
      {/* STATUS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0',
        borderBottom: '2px solid #ddd',
        paddingBottom: '5px',

      }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>STATUS</h2>
        <button
          type="button"
          onClick={handleRollAllAbilities}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
        >
          🎲 ALL
        </button>
      </div>

      {/* 能力値セクション */}
      <div className="scores d-flex">
        <ul className="basic-score d-flex ul-score">
          <li className="name">
            <h3>TOTAL</h3>
            <div className="score-sum">
              <input
                type="text"
                className="readonly"
                value={calculateAbilityTotal()}
                readOnly
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: '12px',
                  width: '20px'
                }}
                title="能力値合計"
              />
            </div>
            <ul className="score-detail">
              <li>基礎能力</li>
              <li className="ages">年齢修正</li>
              <li>他増減</li>
            </ul>
          </li>

          {/* STR */}
          <li className="str score-li">
            <h3>STR <DiceButton ability="str" formula="3D6" /></h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="str_total" value={calculatedStats.str_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <select
                  className="base-select"
                  id="str_base"
                  name="str_base"
                  value={characterData.str_base || ''}
                  onChange={(e) => handleInputChange('str_base', parseInt(e.target.value) || 0)}
                >
                  <option value="">-</option>
                  {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </li>
              <li className="ages">
                <input
                  type="number"
                  className="_02"
                  id="str_age_mod"
                  name="str_age_mod"
                  value={characterData.str_age_mod || ''}
                  onChange={(e) => handleInputChange('str_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
              <li>
                <input
                  type="number"
                  id="str_other_mod"
                  name="str_other_mod"
                  value={characterData.str_other_mod || ''}
                  onChange={(e) => handleInputChange('str_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          {/* CON */}
          <li className="con score-li">
            <h3>CON <DiceButton ability="con" formula="3D6" /></h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="con_total" value={calculatedStats.con_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <select
                  className="base-select"
                  id="con_base"
                  name="con_base"
                  value={characterData.con_base || ''}
                  onChange={(e) => handleInputChange('con_base', parseInt(e.target.value) || 0)}
                >
                  <option value="">-</option>
                  {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </li>
              <li className="ages">
                <input
                  type="number"
                  className="_02"
                  id="con_age_mod"
                  name="con_age_mod"
                  value={characterData.con_age_mod || ''}
                  onChange={(e) => handleInputChange('con_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
              <li>
                <input
                  type="number"
                  id="con_other_mod"
                  name="con_other_mod"
                  value={characterData.con_other_mod || ''}
                  onChange={(e) => handleInputChange('con_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          {/* POW */}
          <li className="pow score-li">
            <h3>POW <DiceButton ability="pow" formula="3D6" /></h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="pow_total" value={calculatedStats.pow_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <select
                  className="base-select"
                  id="pow_base"
                  name="pow_base"
                  value={characterData.pow_base || ''}
                  onChange={(e) => handleInputChange('pow_base', parseInt(e.target.value) || 0)}
                >
                  <option value="">-</option>
                  {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </li>
              <li className="ages">
                <input
                  type="number"
                  className="_02"
                  id="pow_age_mod"
                  name="pow_age_mod"
                  value={characterData.pow_age_mod || ''}
                  onChange={(e) => handleInputChange('pow_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
              <li>
                <input
                  type="number"
                  id="pow_other_mod"
                  name="pow_other_mod"
                  value={characterData.pow_other_mod || ''}
                  onChange={(e) => handleInputChange('pow_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          {/* DEX */}
          <li className="dex score-li">
            <h3>DEX <DiceButton ability="dex" formula="3D6" /></h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="dex_total" value={calculatedStats.dex_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <select
                  className="base-select"
                  id="dex_base"
                  name="dex_base"
                  value={characterData.dex_base || ''}
                  onChange={(e) => handleInputChange('dex_base', parseInt(e.target.value) || 0)}
                >
                  <option value="">-</option>
                  {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </li>
              <li className="ages">
                <input
                  type="number"
                  className="_02"
                  id="dex_age_mod"
                  name="dex_age_mod"
                  value={characterData.dex_age_mod || ''}
                  onChange={(e) => handleInputChange('dex_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
              <li>
                <input
                  type="number"
                  id="dex_other_mod"
                  name="dex_other_mod"
                  value={characterData.dex_other_mod || ''}
                  onChange={(e) => handleInputChange('dex_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          {/* APP */}
          <li className="app score-li">
            <h3>APP <DiceButton ability="app" formula="3D6" /></h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="app_total" value={calculatedStats.app_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <select
                  className="base-select"
                  id="app_base"
                  name="app_base"
                  value={characterData.app_base || ''}
                  onChange={(e) => handleInputChange('app_base', parseInt(e.target.value) || 0)}
                >
                  <option value="">-</option>
                  {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </li>
              <li className="ages">
                <input
                  type="number"
                  className="_02"
                  id="app_age_mod"
                  name="app_age_mod"
                  value={characterData.app_age_mod || ''}
                  onChange={(e) => handleInputChange('app_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
              <li>
                <input
                  type="number"
                  id="app_other_mod"
                  name="app_other_mod"
                  value={characterData.app_other_mod || ''}
                  onChange={(e) => handleInputChange('app_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          {/* SIZ */}
          <li className="siz score-li">
            <h3>SIZ <DiceButton ability="siz" formula="2D6+6" /></h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="siz_total" value={calculatedStats.siz_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <select
                  className="base-select"
                  id="siz_base"
                  name="siz_base"
                  value={characterData.siz_base || ''}
                  onChange={(e) => handleInputChange('siz_base', parseInt(e.target.value) || 0)}
                >
                  <option value="">-</option>
                  {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </li>
              <li className="ages">
                <input
                  type="number"
                  className="_02"
                  id="siz_age_mod"
                  name="siz_age_mod"
                  value={characterData.siz_age_mod || ''}
                  onChange={(e) => handleInputChange('siz_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
              <li>
                <input
                  type="number"
                  id="siz_other_mod"
                  name="siz_other_mod"
                  value={characterData.siz_other_mod || ''}
                  onChange={(e) => handleInputChange('siz_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          {/* INT */}
          <li className="int score-li">
            <h3>INT <DiceButton ability="int" formula="2D6+6" /></h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="int_total" value={calculatedStats.int_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <select
                  className="base-select"
                  id="int_base"
                  name="int_base"
                  value={characterData.int_base || ''}
                  onChange={(e) => handleInputChange('int_base', parseInt(e.target.value) || 0)}
                >
                  <option value="">-</option>
                  {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </li>
              <li className="ages">
                <input
                  type="number"
                  className="_02"
                  id="int_age_mod"
                  name="int_age_mod"
                  value={characterData.int_age_mod || ''}
                  onChange={(e) => handleInputChange('int_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
              <li>
                <input
                  type="number"
                  id="int_other_mod"
                  name="int_other_mod"
                  value={characterData.int_other_mod || ''}
                  onChange={(e) => handleInputChange('int_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          {/* EDU */}
          <li className="edu score-li">
            <h3>EDU <DiceButton ability="edu" formula="3D6+3" /></h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="edu_total" value={calculatedStats.edu_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <select
                  className="base-select"
                  id="edu_base"
                  name="edu_base"
                  value={characterData.edu_base || ''}
                  onChange={(e) => handleInputChange('edu_base', parseInt(e.target.value) || 0)}
                >
                  <option value="">-</option>
                  {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </li>
              <li className="ages">
                <input
                  type="number"
                  className="_02"
                  id="edu_age_mod"
                  name="edu_age_mod"
                  value={characterData.edu_age_mod || ''}
                  onChange={(e) => handleInputChange('edu_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
              <li>
                <input
                  type="number"
                  id="edu_other_mod"
                  name="edu_other_mod"
                  value={characterData.edu_other_mod || ''}
                  onChange={(e) => handleInputChange('edu_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>
        </ul>

        {/* 基礎スペック */}
        <ul className="calc-score d-flex ul-score">
          <li className="name sp-only">
            <div className="score-sum"></div>
            <ul className="score-detail">
              <li>基礎能力</li>
              <li className="ages">年齢修正</li>
              <li>他増減</li>
            </ul>
          </li>

          <li className="san score-li">
            <h3>初期SAN</h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="san_total" value={calculatedStats.san_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <input type="text" className="readonly _02" id="san_base_value" value={calculatedStats.san_base_value || ''} readOnly />
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <input
                  type="number"
                  id="san_other_mod"
                  name="san_other_mod"
                  value={characterData.san_other_mod || ''}
                  onChange={(e) => handleInputChange('san_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          <li className="hp score-li">
            <h3>HP</h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="hp_total" value={calculatedStats.hp_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <input type="text" className="readonly _02" id="hp_base_value" value={calculatedStats.hp_base_value || ''} readOnly />
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <input
                  type="number"
                  id="hp_other_mod"
                  name="hp_other_mod"
                  value={characterData.hp_other_mod || ''}
                  onChange={(e) => handleInputChange('hp_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          <li className="mp score-li">
            <h3>MP</h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="mp_total" value={calculatedStats.mp_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <input type="text" className="readonly _02" id="mp_base_value" value={calculatedStats.mp_base_value || ''} readOnly />
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <input
                  type="number"
                  id="mp_other_mod"
                  name="mp_other_mod"
                  value={characterData.mp_other_mod || ''}
                  onChange={(e) => handleInputChange('mp_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          <li className="idea score-li">
            <h3>アイデア</h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="idea_total" value={calculatedStats.idea_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <input type="text" className="readonly _02" id="idea_base_value" value={calculatedStats.idea_base_value || ''} readOnly />
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <input
                  type="number"
                  id="idea_other_mod"
                  name="idea_other_mod"
                  value={characterData.idea_other_mod || ''}
                  onChange={(e) => handleInputChange('idea_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          <li className="luck score-li">
            <h3>幸運</h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="luck_total" value={calculatedStats.luck_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <input type="text" className="readonly _02" id="luck_base_value" value={calculatedStats.luck_base_value || ''} readOnly />
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <input
                  type="number"
                  id="luck_other_mod"
                  name="luck_other_mod"
                  value={characterData.luck_other_mod || ''}
                  onChange={(e) => handleInputChange('luck_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>

          <li className="knowledge score-li">
            <h3>知識</h3>
            <div className="score-sum">
              <input type="text" className="readonly" id="knowledge_total" value={calculatedStats.knowledge_total || ''} readOnly />
            </div>
            <ul className="score-detail">
              <li>
                <input type="text" className="readonly _02" id="knowledge_base_value" value={calculatedStats.knowledge_base_value || ''} readOnly />
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <input
                  type="number"
                  id="knowledge_other_mod"
                  name="knowledge_other_mod"
                  value={characterData.knowledge_other_mod || ''}
                  onChange={(e) => handleInputChange('knowledge_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* 特徴・ベース職業セクション */}
      <div className="traits-section" style={{ marginTop: '10px' }}>
        <div className="features">
          {/* 特徴リスト */}
          <ul>
            {traits.map((trait) => (
              <li key={trait.id} className="d-flex f-list">
                <div className="f-label">
                  <span className="num">
                    <select
                      name={`${trait.id}_number`}
                      value={(characterData as any)[`${trait.id}_number`] || ''}
                      onChange={(e) => handleInputChange(`${trait.id}_number`, e.target.value)}
                      style={{ width: '7ch', border: 'none', background: 'transparent', textAlign: 'center' }}
                    >
                      <option value="">0-0</option>
                      <option value="1-1">1-1</option>
                      <option value="1-2">1-2</option>
                      <option value="1-3">1-3</option>
                      <option value="1-4">1-4</option>
                      <option value="1-5">1-5</option>
                      <option value="1-6">1-6</option>
                      <option value="1-7">1-7</option>
                      <option value="1-8">1-8</option>
                      <option value="1-9">1-9</option>
                      <option value="1-10">1-10</option>
                      <option value="">----------</option>
                      <option value="2-1">2-1</option>
                      <option value="2-2">2-2</option>
                      <option value="2-3">2-3</option>
                      <option value="2-4">2-4</option>
                      <option value="2-5">2-5</option>
                      <option value="2-6">2-6</option>
                      <option value="2-7">2-7</option>
                      <option value="2-8">2-8</option>
                      <option value="2-9">2-9</option>
                      <option value="2-10">2-10</option>
                      <option value="">----------</option>
                      <option value="3-1">3-1</option>
                      <option value="3-2">3-2</option>
                      <option value="3-3">3-3</option>
                      <option value="3-4">3-4</option>
                      <option value="3-5">3-5</option>
                      <option value="3-6">3-6</option>
                      <option value="3-7">3-7</option>
                      <option value="3-8">3-8</option>
                      <option value="3-9">3-9</option>
                      <option value="3-10">3-10</option>
                      <option value="">----------</option>
                      <option value="4-1">4-1</option>
                      <option value="4-2">4-2</option>
                      <option value="4-3">4-3</option>
                      <option value="4-4">4-4</option>
                      <option value="4-5">4-5</option>
                      <option value="4-6">4-6</option>
                      <option value="4-7">4-7</option>
                      <option value="4-8">4-8</option>
                      <option value="4-9">4-9</option>
                      <option value="4-10">4-10</option>
                      <option value="">----------</option>
                      <option value="5-1">5-1</option>
                      <option value="5-2">5-2</option>
                      <option value="5-3">5-3</option>
                      <option value="5-4">5-4</option>
                      <option value="5-5">5-5</option>
                      <option value="5-6">5-6</option>
                      <option value="5-7">5-7</option>
                      <option value="5-8">5-8</option>
                      <option value="5-9">5-9</option>
                      <option value="5-10">5-10</option>
                      <option value="">----------</option>
                      <option value="6-1">6-1</option>
                      <option value="6-2">6-2</option>
                      <option value="6-3">6-3</option>
                      <option value="6-4">6-4</option>
                      <option value="6-5">6-5</option>
                      <option value="6-6">6-6</option>
                      <option value="6-7">6-7</option>
                      <option value="6-8">6-8</option>
                      <option value="6-9">6-9</option>
                      <option value="6-10">6-10</option>
                    </select>
                  </span>
                  <span className="name" style={{ width: 'auto' }}>
                    <input
                      type="text"
                      name={`${trait.id}_name`}
                      value={(characterData as any)[`${trait.id}_name`] || ''}
                      onChange={(e) => handleInputChange(`${trait.id}_name`, e.target.value)}
                      placeholder="特徴名" />
                  </span>
                </div>
                <div className="contents">
                  <input
                    type="text"
                    name={`${trait.id}_description`}
                    value={(characterData as any)[`${trait.id}_description`] || ''}
                    onChange={(e) => handleInputChange(`${trait.id}_description`, e.target.value)}
                    placeholder="特徴表説明"
                  />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px'
                }}>
                  <button
                    type="button"
                    onClick={() => removeTrait(trait.id)}
                    className="remove-btn">
                    <i className="fas fa-minus"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* 特徴追加ボタン */}
          <button
            type="button"
            onClick={addTrait}
            className="add-btn"
            style={{ margin: '10px auto 30px' }}>
            <i className="fas fa-plus"></i> 特徴を追加
          </button>

          {/* ベース職業情報 */}
          <div className="d-flex job-base">
            <div style={{ flex: '1 1 auto' }}>
              <span>ベース</span>
              <input
                type="text"
                name="base_job"
                value={characterData.base_job || ''}
                onChange={(e) => handleInputChange('base_job', e.target.value)}
                placeholder="職業名" />
            </div>
            <div style={{ flex: '2 1 auto', marginRight: '0' }}>
              <span>特記</span>
              <input
                type="text"
                name="special_notes"
                value={characterData.special_notes || ''}
                onChange={(e) => handleInputChange('special_notes', e.target.value)}
                placeholder="特記事項" />
            </div>
          </div>
        </div>
      </div>

      {/* スペック */}
      <div className="slots d-flex">
        <div className="now-san slot">
          <h3>現在SAN値</h3>
          <div className="slot-txt">
            <span>
              <input
                type="number"
                className="current_san"
                id="current_san"
                name="current_san"
                value={characterData.current_san || 0}
                onChange={(e) => handleInputChange('current_san', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
              />
              <span>/</span>
              <input
                type="number"
                id="max_san"
                name="max_san"
                className="max_san readonly auto-resize _02"
                value={characterData.max_san || calculatedStats.max_san_value || 0}
                onChange={(e) => handleInputChange('max_san', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                style={{
                  width: `${Math.max(2, String(characterData.max_san || calculatedStats.max_san_value || 0).length)}ch`,
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  color: '#888'
                }}
              />
            </span>
          </div>
        </div>
        <div className="db slot">
          <h3>ダメ―ジボーナス</h3>
          <div className="slot-txt">
            <input type="text" className="readonly _02" id="damage_bonus" value={calculatedStats.damage_bonus || ''} readOnly />
          </div>
        </div>
        <div className="jobp slot" style={{
          backgroundColor: (characterData.job_points_used || 0) > (characterData.job_points_formula === 'manual' ? (characterData.job_points_total || 0) : (calculatedStats.job_points_total || 0)) ? '#ffe6e6' : 'inherit'
        }}>
          <h3>職業P</h3>
          <div className="slot-txt">
            <span>
              <input
                type="text"
                id="job_points_used"
                name="job_points_used"
                className="readonly auto-resize _02"
                value={characterData.job_points_used || 0}
                readOnly
                style={{
                  width: `${Math.max(2, String(characterData.job_points_used || 0).length)}ch`,
                  color: (characterData.job_points_used || 0) > (characterData.job_points_formula === 'manual' ? (characterData.job_points_total || 0) : (calculatedStats.job_points_total || 0)) ? '#d32f2f' : 'inherit'
                }}
              />
              <span>/</span>
              {characterData.job_points_formula === 'manual' ? (
                <input
                  type="number"
                  id="job_points_total_manual"
                  name="job_points_total"
                  className="readonly auto-resize _02"
                  value={characterData.job_points_total || 0}
                  onChange={(e) => handleInputChange('job_points_total', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  style={{
                    width: `${Math.max(2, String(characterData.job_points_total || 0).length)}ch`,
                    fontSize: '0.8rem',
                    fontWeight: '400',
                    color: '#888'
                  }}
                />
              ) : (
                <input
                  type="text"
                  className="readonly auto-resize _02"
                  id="job_points_total"
                  value={calculatedStats.job_points_total || 0}
                  readOnly
                  style={{
                    width: `${Math.max(2, String(calculatedStats.job_points_total || 0).length)}ch`,
                    fontSize: '0.8rem',
                    fontWeight: '400',
                    color: '#888'
                  }}
                />
              )}
            </span>
            <select
              name="job_points_formula"
              value={characterData.job_points_formula || 'edu20'}
              onChange={(e) => handleJobPointsFormulaChange(e.target.value)}
              className="job-point"
            >
              <option value="edu20">EDU×20</option>
              <option value="edu10_str10">EDU×10+STR×10</option>
              <option value="edu10_con10">EDU×10+CON×10</option>
              <option value="edu10_pow10">EDU×10+POW×10</option>
              <option value="edu10_dex10">EDU×10+DEX×10</option>
              <option value="edu10_app10">EDU×10+APP×10</option>
              <option value="edu10_siz10">EDU×10+SIZ×10</option>
              <option value="edu10_int10">EDU×10+INT×10</option>
              <option value="manual">手動入力</option>
            </select>
          </div>
        </div>
        <div className="intp slot" style={{
          backgroundColor: (characterData.interest_points_used || 0) > (calculatedStats.interest_points_total || 0) ? '#ffe6e6' : 'inherit'
        }}>
          <h3>興味P</h3>
          <div className="slot-txt">
            <span>
              <input
                type="text"
                id="interest_points_used"
                name="interest_points_used"
                className="readonly auto-resize _02"
                value={characterData.interest_points_used || 0}
                readOnly
                style={{
                  width: `${Math.max(2, String(characterData.interest_points_used || 0).length)}ch`,
                  color: (characterData.interest_points_used || 0) > (calculatedStats.interest_points_total || 0) ? '#d32f2f' : 'inherit'
                }}
              />
              <span>/</span>
              <input
                type="text"
                className="readonly auto-resize _02"
                id="interest_points_total"
                value={calculatedStats.interest_points_total || 0}
                readOnly
                style={{
                  width: `${Math.max(2, String(calculatedStats.interest_points_total || 0).length)}ch`,
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  color: '#888'
                }}
              />
            </span>
            <span className="interest-point">追加分 ：
              <input
                type="number"
                className="nterest_points_extra"
                id="interest_points_extra"
                name="interest_points_extra"
                value={characterData.interest_points_extra || ''}
                onChange={(e) => handleInputChange('interest_points_extra', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}