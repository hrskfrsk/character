import React, { useState } from 'react';
import { CharacterData } from '../../lib/character-calculations';
import { rollAllAbilities, rollSingleAbility, AbilityRollResult } from '../../lib/ability-dice';

interface AbilityScoresProps {
  characterData: CharacterData;
  calculatedStats: any;
  handleInputChange: (field: string, value: any) => void;
}

export default function AbilityScores({
  characterData,
  calculatedStats,
  handleInputChange
}: AbilityScoresProps) {
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
        padding: '2px 6px',
        fontSize: '10px',
        backgroundColor: 'var(--ui-theme-color)',
        border: '1px solid var(--ui-theme-color)',
        borderRadius: '3px',
        cursor: 'pointer',
        color: 'white'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ui-theme-color-hover)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ui-theme-color)'}
      title={`${formula}で振り直し`}
    >
      <i className="fas fa-dice"></i>
    </button>
  );

  return (
    <>
      {/* STATUS */}
      <div className="section-header" style={{ marginTop: '20px' }}>
        <h3>
          <i className="fas fa-dumbbell section-icon"></i>能力値
        </h3>
        <button
          type="button"
          onClick={handleRollAllAbilities}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--ui-theme-color)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ui-theme-color-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ui-theme-color)'}
        >
          <i className="fas fa-dice"></i> ALL
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
              <input type="text" className="readonly" id="str_total" value={calculatedStats.str_total || ''} readOnly style={{ color: '#57595d' }} />
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
              <input type="text" className="readonly" id="con_total" value={calculatedStats.con_total || ''} readOnly style={{ color: '#57595d' }} />
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
              <input type="text" className="readonly" id="pow_total" value={calculatedStats.pow_total || ''} readOnly style={{ color: '#57595d' }} />
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
              <input type="text" className="readonly" id="dex_total" value={calculatedStats.dex_total || ''} readOnly style={{ color: '#57595d' }} />
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
              <input type="text" className="readonly" id="app_total" value={calculatedStats.app_total || ''} readOnly style={{ color: '#57595d' }} />
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
              <input type="text" className="readonly" id="siz_total" value={calculatedStats.siz_total || ''} readOnly style={{ color: '#57595d' }} />
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
              <input type="text" className="readonly" id="int_total" value={calculatedStats.int_total || ''} readOnly style={{ color: '#57595d' }} />
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
              <input type="text" className="readonly" id="edu_total" value={calculatedStats.edu_total || ''} readOnly style={{ color: '#57595d' }} />
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

    </>
  );
}