import React from 'react';
import { CharacterData } from '../../lib/character-calculations';

interface SkillSectionsProps {
  characterData: CharacterData;
  calculatedStats: any;
  handleInputChange: (field: string, value: any) => void;
  // 技能表示切替
  hideInitialSkills: boolean;
  isSkillInitialOnly: (skillName: string, initialValue?: number) => boolean;
  // 戦闘技能関連
  additionalCombatSkills: Array<{ id: string, counter: number }>;
  addCombatSkill: () => void;
  removeCombatSkill: (id: string) => void;
  // 探索技能関連
  additionalExplorationSkills: Array<{ id: string, counter: number }>;
  addExplorationSkill: () => void;
  removeExplorationSkill: (id: string) => void;
  // 行動技能関連
  additionalActionSkills: Array<{ id: string, counter: number }>;
  addActionSkill: () => void;
  removeActionSkill: (id: string) => void;
  // 交渉技能関連
  additionalNegotiationSkills: Array<{ id: string, counter: number }>;
  addNegotiationSkill: () => void;
  removeNegotiationSkill: (id: string) => void;
  // 知識技能関連
  additionalKnowledgeSkills: Array<{ id: string, counter: number }>;
  addKnowledgeSkill: () => void;
  removeKnowledgeSkill: (id: string) => void;
}

export default function SkillSections({
  characterData,
  calculatedStats,
  handleInputChange,
  hideInitialSkills,
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
    <div className="skill d-flex">
      {/* 戦闘技能 */}
      <div className="skill-group">
        <h3><i className="fas fa-fist-raised"></i> 戦闘技能</h3>

        <ul>
          <li className="d-flex skill-li skill-head">
            <div className="growth">成長</div>
            <div className="title">技能名</div>
            <div className="total">合計<span className="pc-only">値</span></div>
            <div className="breakdown">
              <span className="pc-only">初期値</span><span className="sp-only">初期</span>|
              <span className="pc-only">職業P</span><span className="sp-only">職業</span>|
              <span className="pc-only">興味P</span><span className="sp-only">興味</span>|
              <span>成長</span>|
              <span className="pc-only">その他</span><span className="sp-only">他</span>
            </div>
          </li>

          {/* 回避 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('dodge', calculatedStats.dodge_initial || 0) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">回避</div>
            <div className="total">
              <input
                type="number"
                name="dodge_total"
                className="readonly _02"
                value={calculatedStats.dodge_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="dodge_initial"
                  className="readonly _02"
                  value={calculatedStats.dodge_initial || 0}
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="dodge_job"
                  value={characterData.dodge_job || ''}
                  onChange={(e) => handleInputChange('dodge_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="dodge_interest"
                  value={characterData.dodge_interest || ''}
                  onChange={(e) => handleInputChange('dodge_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="dodge_growth"
                  value={characterData.dodge_growth || ''}
                  onChange={(e) => handleInputChange('dodge_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="dodge_other"
                  value={characterData.dodge_other || ''}
                  onChange={(e) => handleInputChange('dodge_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* キック */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('kick') ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">キック</div>
            <div className="total">
              <input
                type="number"
                name="kick_total"
                className="readonly _02"
                value={calculatedStats.kick_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="kick_initial"
                  className="readonly _02"
                  value="25"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="kick_job"
                  value={characterData.kick_job || ''}
                  onChange={(e) => handleInputChange('kick_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="kick_interest"
                  value={characterData.kick_interest || ''}
                  onChange={(e) => handleInputChange('kick_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="kick_growth"
                  value={characterData.kick_growth || ''}
                  onChange={(e) => handleInputChange('kick_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="kick_other"
                  value={characterData.kick_other || ''}
                  onChange={(e) => handleInputChange('kick_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 組み付き */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('grapple') ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">組み付き</div>
            <div className="total">
              <input
                type="number"
                name="grapple_total"
                className="readonly _02"
                value={calculatedStats.grapple_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="grapple_initial"
                  className="readonly _02"
                  value="25"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="grapple_job"
                  value={characterData.grapple_job || ''}
                  onChange={(e) => handleInputChange('grapple_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="grapple_interest"
                  value={characterData.grapple_interest || ''}
                  onChange={(e) => handleInputChange('grapple_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="grapple_growth"
                  value={characterData.grapple_growth || ''}
                  onChange={(e) => handleInputChange('grapple_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="grapple_other"
                  value={characterData.grapple_other || ''}
                  onChange={(e) => handleInputChange('grapple_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* こぶし */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('punch') ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">こぶし</div>
            <div className="total">
              <input
                type="number"
                name="punch_total"
                className="readonly _02"
                value={calculatedStats.punch_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="punch_initial"
                  className="readonly _02"
                  value="50"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="punch_job"
                  value={characterData.punch_job || ''}
                  onChange={(e) => handleInputChange('punch_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="punch_interest"
                  value={characterData.punch_interest || ''}
                  onChange={(e) => handleInputChange('punch_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="punch_growth"
                  value={characterData.punch_growth || ''}
                  onChange={(e) => handleInputChange('punch_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="punch_other"
                  value={characterData.punch_other || ''}
                  onChange={(e) => handleInputChange('punch_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 頭突き */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('headbutt') ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">頭突き</div>
            <div className="total">
              <input
                type="number"
                name="headbutt_total"
                className="readonly _02"
                value={calculatedStats.headbutt_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="headbutt_initial"
                  className="readonly _02"
                  value="10"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="headbutt_job"
                  value={characterData.headbutt_job || ''}
                  onChange={(e) => handleInputChange('headbutt_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="headbutt_interest"
                  value={characterData.headbutt_interest || ''}
                  onChange={(e) => handleInputChange('headbutt_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="headbutt_growth"
                  value={characterData.headbutt_growth || ''}
                  onChange={(e) => handleInputChange('headbutt_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="headbutt_other"
                  value={characterData.headbutt_other || ''}
                  onChange={(e) => handleInputChange('headbutt_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 投擲 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('throw') ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">投擲</div>
            <div className="total">
              <input
                type="number"
                name="throw_total"
                className="readonly _02"
                value={calculatedStats.throw_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="throw_initial"
                  className="readonly _02"
                  value="25"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="throw_job"
                  value={characterData.throw_job || ''}
                  onChange={(e) => handleInputChange('throw_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="throw_interest"
                  value={characterData.throw_interest || ''}
                  onChange={(e) => handleInputChange('throw_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="throw_growth"
                  value={characterData.throw_growth || ''}
                  onChange={(e) => handleInputChange('throw_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="throw_other"
                  value={characterData.throw_other || ''}
                  onChange={(e) => handleInputChange('throw_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* マーシャルアーツ */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('martial_arts', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">マーシャルアーツ</div>
            <div className="total">
              <input
                type="number"
                name="martial_arts_total"
                className="readonly _02"
                value={calculatedStats.martial_arts_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="martial_arts_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="martial_arts_job"
                  value={characterData.martial_arts_job || ''}
                  onChange={(e) => handleInputChange('martial_arts_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="martial_arts_interest"
                  value={characterData.martial_arts_interest || ''}
                  onChange={(e) => handleInputChange('martial_arts_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="martial_arts_growth"
                  value={characterData.martial_arts_growth || ''}
                  onChange={(e) => handleInputChange('martial_arts_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="martial_arts_other"
                  value={characterData.martial_arts_other || ''}
                  onChange={(e) => handleInputChange('martial_arts_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 拳銃 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('handgun', 20) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">拳銃</div>
            <div className="total">
              <input
                type="number"
                name="handgun_total"
                className="readonly _02"
                value={calculatedStats.handgun_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="handgun_initial"
                  className="readonly _02"
                  value="20"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="handgun_job"
                  value={characterData.handgun_job || ''}
                  onChange={(e) => handleInputChange('handgun_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="handgun_interest"
                  value={characterData.handgun_interest || ''}
                  onChange={(e) => handleInputChange('handgun_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="handgun_growth"
                  value={characterData.handgun_growth || ''}
                  onChange={(e) => handleInputChange('handgun_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="handgun_other"
                  value={characterData.handgun_other || ''}
                  onChange={(e) => handleInputChange('handgun_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* サブマシンガン */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('submachine_gun', 15) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">サブマシンガン</div>
            <div className="total">
              <input
                type="number"
                name="submachine_gun_total"
                className="readonly _02"
                value={calculatedStats.submachine_gun_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="submachine_gun_initial"
                  className="readonly _02"
                  value="15"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="submachine_gun_job"
                  value={characterData.submachine_gun_job || ''}
                  onChange={(e) => handleInputChange('submachine_gun_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="submachine_gun_interest"
                  value={characterData.submachine_gun_interest || ''}
                  onChange={(e) => handleInputChange('submachine_gun_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="submachine_gun_growth"
                  value={characterData.submachine_gun_growth || ''}
                  onChange={(e) => handleInputChange('submachine_gun_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="submachine_gun_other"
                  value={characterData.submachine_gun_other || ''}
                  onChange={(e) => handleInputChange('submachine_gun_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* ショットガン */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('shotgun', 30) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">ショットガン</div>
            <div className="total">
              <input
                type="number"
                name="shotgun_total"
                className="readonly _02"
                value={calculatedStats.shotgun_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="shotgun_initial"
                  className="readonly _02"
                  value="30"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="shotgun_job"
                  value={characterData.shotgun_job || ''}
                  onChange={(e) => handleInputChange('shotgun_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="shotgun_interest"
                  value={characterData.shotgun_interest || ''}
                  onChange={(e) => handleInputChange('shotgun_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="shotgun_growth"
                  value={characterData.shotgun_growth || ''}
                  onChange={(e) => handleInputChange('shotgun_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="shotgun_other"
                  value={characterData.shotgun_other || ''}
                  onChange={(e) => handleInputChange('shotgun_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* マシンガン */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('machine_gun', 15) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">マシンガン</div>
            <div className="total">
              <input
                type="number"
                name="machine_gun_total"
                className="readonly _02"
                value={calculatedStats.machine_gun_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="machine_gun_initial"
                  className="readonly _02"
                  value="15"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="machine_gun_job"
                  value={characterData.machine_gun_job || ''}
                  onChange={(e) => handleInputChange('machine_gun_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="machine_gun_interest"
                  value={characterData.machine_gun_interest || ''}
                  onChange={(e) => handleInputChange('machine_gun_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="machine_gun_growth"
                  value={characterData.machine_gun_growth || ''}
                  onChange={(e) => handleInputChange('machine_gun_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="machine_gun_other"
                  value={characterData.machine_gun_other || ''}
                  onChange={(e) => handleInputChange('machine_gun_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* ライフル */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('rifle', 25) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">ライフル</div>
            <div className="total">
              <input
                type="number"
                name="rifle_total"
                className="readonly _02"
                value={calculatedStats.rifle_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="rifle_initial"
                  className="readonly _02"
                  value="25"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="rifle_job"
                  value={characterData.rifle_job || ''}
                  onChange={(e) => handleInputChange('rifle_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="rifle_interest"
                  value={characterData.rifle_interest || ''}
                  onChange={(e) => handleInputChange('rifle_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="rifle_growth"
                  value={characterData.rifle_growth || ''}
                  onChange={(e) => handleInputChange('rifle_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="rifle_other"
                  value={characterData.rifle_other || ''}
                  onChange={(e) => handleInputChange('rifle_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 追加戦闘技能 */}
          {additionalCombatSkills.map((skill) => (
            <li key={skill.id} className="d-flex skill-li skill-body add-slill-li">
              <input type="checkbox" name="check-growth" className="check-growth" />
              <div className="title">
                <input
                  type="text"
                  name={`${skill.id}_name`}
                  value={(characterData as any)[`${skill.id}_name`] || ''}
                  onChange={(e) => handleInputChange(`${skill.id}_name`, e.target.value)}
                  placeholder="技能名"
                  style={{
                    width: '85%',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeCombatSkill(skill.id)}
                  className="remove-btn"
                >
                  <i className="fas fa-minus"></i>
                </button>
              </div>
              <div className="total">
                <input
                  type="number"
                  name={`${skill.id}_total`}
                  className="readonly _02"
                  value={
                    (parseInt((characterData as any)[`${skill.id}_initial`] as string) || 1) +
                    (parseInt((characterData as any)[`${skill.id}_job`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_interest`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_growth`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_other`] as string) || 0)
                  }
                  readOnly
                />
              </div>
              <div className="breakdown">
                <span className="initial">
                  <input
                    type="number"
                    name={`${skill.id}_initial`}
                    className="_02"
                    value={(characterData as any)[`${skill.id}_initial`] || 1}
                    onChange={(e) => handleInputChange(`${skill.id}_initial`, e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_job`}
                    value={(characterData as any)[`${skill.id}_job`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_job`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_interest`}
                    value={(characterData as any)[`${skill.id}_interest`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_interest`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_growth`}
                    value={(characterData as any)[`${skill.id}_growth`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_growth`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_other`}
                    value={(characterData as any)[`${skill.id}_other`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_other`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* 戦闘技能追加ボタン */}
        <button
          type="button"
          onClick={addCombatSkill}
          className="add-btn"
        >
          <i className="fas fa-plus"></i> 戦闘技能を追加
        </button>
      </div>

      {/* 探索技能 */}
      <div className="skill-group">
        <h3><i className="fas fa-search"></i> 探索技能</h3>

        <ul>
          <li className="d-flex skill-li skill-head">
            <div className="growth">成長</div>
            <div className="title">技能名</div>
            <div className="total">合計<span className="pc-only">値</span></div>
            <div className="breakdown">
              <span className="pc-only">初期値</span><span className="sp-only">初期</span>|
              <span className="pc-only">職業P</span><span className="sp-only">職業</span>|
              <span className="pc-only">興味P</span><span className="sp-only">興味</span>|
              <span>成長</span>|
              <span className="pc-only">その他</span><span className="sp-only">他</span>
            </div>
          </li>

          {/* 応急手当 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('first_aid', 30) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">応急手当</div>
            <div className="total">
              <input
                type="number"
                name="first_aid_total"
                className="readonly _02"
                value={calculatedStats.first_aid_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="first_aid_initial"
                  className="readonly _02"
                  value="30"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="first_aid_job"
                  value={characterData.first_aid_job || ''}
                  onChange={(e) => handleInputChange('first_aid_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="first_aid_interest"
                  value={characterData.first_aid_interest || ''}
                  onChange={(e) => handleInputChange('first_aid_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="first_aid_growth"
                  value={characterData.first_aid_growth || ''}
                  onChange={(e) => handleInputChange('first_aid_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="first_aid_other"
                  value={characterData.first_aid_other || ''}
                  onChange={(e) => handleInputChange('first_aid_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 鍵開け */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('locksmith', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">鍵開け</div>
            <div className="total">
              <input
                type="number"
                name="locksmith_total"
                className="readonly _02"
                value={calculatedStats.locksmith_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="locksmith_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="locksmith_job"
                  value={characterData.locksmith_job || ''}
                  onChange={(e) => handleInputChange('locksmith_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="locksmith_interest"
                  value={characterData.locksmith_interest || ''}
                  onChange={(e) => handleInputChange('locksmith_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="locksmith_growth"
                  value={characterData.locksmith_growth || ''}
                  onChange={(e) => handleInputChange('locksmith_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="locksmith_other"
                  value={characterData.locksmith_other || ''}
                  onChange={(e) => handleInputChange('locksmith_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 隠す */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('conceal', 15) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">隠す</div>
            <div className="total">
              <input
                type="number"
                name="conceal_total"
                className="readonly _02"
                value={calculatedStats.conceal_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="conceal_initial"
                  className="readonly _02"
                  value="15"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="conceal_job"
                  value={characterData.conceal_job || ''}
                  onChange={(e) => handleInputChange('conceal_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="conceal_interest"
                  value={characterData.conceal_interest || ''}
                  onChange={(e) => handleInputChange('conceal_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="conceal_growth"
                  value={characterData.conceal_growth || ''}
                  onChange={(e) => handleInputChange('conceal_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="conceal_other"
                  value={characterData.conceal_other || ''}
                  onChange={(e) => handleInputChange('conceal_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 隠れる */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('hide', 10) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">隠れる</div>
            <div className="total">
              <input
                type="number"
                name="hide_total"
                className="readonly _02"
                value={calculatedStats.hide_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="hide_initial"
                  className="readonly _02"
                  value="10"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="hide_job"
                  value={characterData.hide_job || ''}
                  onChange={(e) => handleInputChange('hide_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="hide_interest"
                  value={characterData.hide_interest || ''}
                  onChange={(e) => handleInputChange('hide_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="hide_growth"
                  value={characterData.hide_growth || ''}
                  onChange={(e) => handleInputChange('hide_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="hide_other"
                  value={characterData.hide_other || ''}
                  onChange={(e) => handleInputChange('hide_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 聞き耳 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('listen', 25) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">聞き耳</div>
            <div className="total">
              <input
                type="number"
                name="listen_total"
                className="readonly _02"
                value={calculatedStats.listen_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="listen_initial"
                  className="readonly _02"
                  value="25"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="listen_job"
                  value={characterData.listen_job || ''}
                  onChange={(e) => handleInputChange('listen_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="listen_interest"
                  value={characterData.listen_interest || ''}
                  onChange={(e) => handleInputChange('listen_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="listen_growth"
                  value={characterData.listen_growth || ''}
                  onChange={(e) => handleInputChange('listen_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="listen_other"
                  value={characterData.listen_other || ''}
                  onChange={(e) => handleInputChange('listen_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 忍び歩き */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('sneak', 10) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">忍び歩き</div>
            <div className="total">
              <input
                type="number"
                name="sneak_total"
                className="readonly _02"
                value={calculatedStats.sneak_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="sneak_initial"
                  className="readonly _02"
                  value="10"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="sneak_job"
                  value={characterData.sneak_job || ''}
                  onChange={(e) => handleInputChange('sneak_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="sneak_interest"
                  value={characterData.sneak_interest || ''}
                  onChange={(e) => handleInputChange('sneak_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="sneak_growth"
                  value={characterData.sneak_growth || ''}
                  onChange={(e) => handleInputChange('sneak_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="sneak_other"
                  value={characterData.sneak_other || ''}
                  onChange={(e) => handleInputChange('sneak_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 写真術 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('photography', 10) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">写真術</div>
            <div className="total">
              <input
                type="number"
                name="photography_total"
                className="readonly _02"
                value={calculatedStats.photography_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="photography_initial"
                  className="readonly _02"
                  value="10"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="photography_job"
                  value={characterData.photography_job || ''}
                  onChange={(e) => handleInputChange('photography_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="photography_interest"
                  value={characterData.photography_interest || ''}
                  onChange={(e) => handleInputChange('photography_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="photography_growth"
                  value={characterData.photography_growth || ''}
                  onChange={(e) => handleInputChange('photography_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="photography_other"
                  value={characterData.photography_other || ''}
                  onChange={(e) => handleInputChange('photography_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 精神分析 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('psychoanalysis', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">精神分析</div>
            <div className="total">
              <input
                type="number"
                name="psychoanalysis_total"
                className="readonly _02"
                value={calculatedStats.psychoanalysis_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="psychoanalysis_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="psychoanalysis_job"
                  value={characterData.psychoanalysis_job || ''}
                  onChange={(e) => handleInputChange('psychoanalysis_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="psychoanalysis_interest"
                  value={characterData.psychoanalysis_interest || ''}
                  onChange={(e) => handleInputChange('psychoanalysis_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="psychoanalysis_growth"
                  value={characterData.psychoanalysis_growth || ''}
                  onChange={(e) => handleInputChange('psychoanalysis_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="psychoanalysis_other"
                  value={characterData.psychoanalysis_other || ''}
                  onChange={(e) => handleInputChange('psychoanalysis_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 追跡 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('track', 10) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">追跡</div>
            <div className="total">
              <input
                type="number"
                name="track_total"
                className="readonly _02"
                value={calculatedStats.track_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="track_initial"
                  className="readonly _02"
                  value="10"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="track_job"
                  value={characterData.track_job || ''}
                  onChange={(e) => handleInputChange('track_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="track_interest"
                  value={characterData.track_interest || ''}
                  onChange={(e) => handleInputChange('track_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="track_growth"
                  value={characterData.track_growth || ''}
                  onChange={(e) => handleInputChange('track_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="track_other"
                  value={characterData.track_other || ''}
                  onChange={(e) => handleInputChange('track_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 登攀 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('climb', 40) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">登攀</div>
            <div className="total">
              <input
                type="number"
                name="climb_total"
                className="readonly _02"
                value={calculatedStats.climb_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="climb_initial"
                  className="readonly _02"
                  value="40"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="climb_job"
                  value={characterData.climb_job || ''}
                  onChange={(e) => handleInputChange('climb_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="climb_interest"
                  value={characterData.climb_interest || ''}
                  onChange={(e) => handleInputChange('climb_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="climb_growth"
                  value={characterData.climb_growth || ''}
                  onChange={(e) => handleInputChange('climb_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="climb_other"
                  value={characterData.climb_other || ''}
                  onChange={(e) => handleInputChange('climb_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 図書館 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('library_use', 25) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">図書館</div>
            <div className="total">
              <input
                type="number"
                name="library_use_total"
                className="readonly _02"
                value={calculatedStats.library_use_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="library_use_initial"
                  className="readonly _02"
                  value="25"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="library_use_job"
                  value={characterData.library_use_job || ''}
                  onChange={(e) => handleInputChange('library_use_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="library_use_interest"
                  value={characterData.library_use_interest || ''}
                  onChange={(e) => handleInputChange('library_use_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="library_use_growth"
                  value={characterData.library_use_growth || ''}
                  onChange={(e) => handleInputChange('library_use_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="library_use_other"
                  value={characterData.library_use_other || ''}
                  onChange={(e) => handleInputChange('library_use_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 目星 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('spot_hidden', 25) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">目星</div>
            <div className="total">
              <input
                type="number"
                name="spot_hidden_total"
                className="readonly _02"
                value={calculatedStats.spot_hidden_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="spot_hidden_initial"
                  className="readonly _02"
                  value="25"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="spot_hidden_job"
                  value={characterData.spot_hidden_job || ''}
                  onChange={(e) => handleInputChange('spot_hidden_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="spot_hidden_interest"
                  value={characterData.spot_hidden_interest || ''}
                  onChange={(e) => handleInputChange('spot_hidden_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="spot_hidden_growth"
                  value={characterData.spot_hidden_growth || ''}
                  onChange={(e) => handleInputChange('spot_hidden_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="spot_hidden_other"
                  value={characterData.spot_hidden_other || ''}
                  onChange={(e) => handleInputChange('spot_hidden_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 追加探索技能 */}
          {additionalExplorationSkills.map((skill) => (
            <li key={skill.id} className="d-flex skill-li skill-body add-slill-li">
              <input type="checkbox" name="check-growth" className="check-growth" />
              <div className="title">
                <input
                  type="text"
                  name={`${skill.id}_name`}
                  value={(characterData as any)[`${skill.id}_name`] || ''}
                  onChange={(e) => handleInputChange(`${skill.id}_name`, e.target.value)}
                  placeholder="技能名"
                  style={{
                    width: '85%',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeExplorationSkill(skill.id)}
                  className="remove-btn"
                >
                  <i className="fas fa-minus"></i>
                </button>
              </div>
              <div className="total">
                <input
                  type="number"
                  name={`${skill.id}_total`}
                  className="readonly _02"
                  value={
                    (parseInt((characterData as any)[`${skill.id}_initial`] as string) || 1) +
                    (parseInt((characterData as any)[`${skill.id}_job`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_interest`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_growth`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_other`] as string) || 0)
                  }
                  readOnly
                />
              </div>
              <div className="breakdown">
                <span className="initial">
                  <input
                    type="number"
                    name={`${skill.id}_initial`}
                    className="_02"
                    value={(characterData as any)[`${skill.id}_initial`] || 1}
                    onChange={(e) => handleInputChange(`${skill.id}_initial`, e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_job`}
                    value={(characterData as any)[`${skill.id}_job`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_job`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_interest`}
                    value={(characterData as any)[`${skill.id}_interest`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_interest`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_growth`}
                    value={(characterData as any)[`${skill.id}_growth`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_growth`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_other`}
                    value={(characterData as any)[`${skill.id}_other`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_other`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* 探索技能追加ボタン */}
        <button
          type="button"
          onClick={addExplorationSkill}
          className="add-btn"
        >
          <i className="fas fa-plus"></i> 探索技能を追加
        </button>
      </div>

      {/* 行動技能 */}
      <div className="skill-group">
        <h3><i className="fas fa-running"></i> 行動技能</h3>

        <ul>
          <li className="d-flex skill-li skill-head">
            <div className="growth">成長</div>
            <div className="title">技能名</div>
            <div className="total">合計<span className="pc-only">値</span></div>
            <div className="breakdown">
              <span className="pc-only">初期値</span><span className="sp-only">初期</span>|
              <span className="pc-only">職業P</span><span className="sp-only">職業</span>|
              <span className="pc-only">興味P</span><span className="sp-only">興味</span>|
              <span>成長</span>|
              <span className="pc-only">その他</span><span className="sp-only">他</span>
            </div>
          </li>

          {/* 運転 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('drive', 20) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">運転<br className="sp-only" />
              <input
                type="text"
                name="drive_specialty"
                placeholder=""
                className="free"
                value={characterData.drive_specialty || ''}
                onChange={(e) => handleInputChange('drive_specialty', e.target.value)}
              />
            </div>
            <div className="total">
              <input
                type="number"
                name="drive_total"
                className="readonly _02"
                value={calculatedStats.drive_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="drive_initial"
                  className="readonly _02"
                  value="20"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="drive_job"
                  value={characterData.drive_job || ''}
                  onChange={(e) => handleInputChange('drive_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="drive_interest"
                  value={characterData.drive_interest || ''}
                  onChange={(e) => handleInputChange('drive_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="drive_growth"
                  value={characterData.drive_growth || ''}
                  onChange={(e) => handleInputChange('drive_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="drive_other"
                  value={characterData.drive_other || ''}
                  onChange={(e) => handleInputChange('drive_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 機械修理 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('mechanical_repair', 20) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">機械修理</div>
            <div className="total">
              <input
                type="number"
                name="mechanical_repair_total"
                className="readonly _02"
                value={calculatedStats.mechanical_repair_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="mechanical_repair_initial"
                  className="readonly _02"
                  value="20"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="mechanical_repair_job"
                  value={characterData.mechanical_repair_job || ''}
                  onChange={(e) => handleInputChange('mechanical_repair_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="mechanical_repair_interest"
                  value={characterData.mechanical_repair_interest || ''}
                  onChange={(e) => handleInputChange('mechanical_repair_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="mechanical_repair_growth"
                  value={characterData.mechanical_repair_growth || ''}
                  onChange={(e) => handleInputChange('mechanical_repair_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="mechanical_repair_other"
                  value={characterData.mechanical_repair_other || ''}
                  onChange={(e) => handleInputChange('mechanical_repair_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 重機械操作 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('heavy_machinery', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">重機械操作</div>
            <div className="total">
              <input
                type="number"
                name="heavy_machinery_total"
                className="readonly _02"
                value={calculatedStats.heavy_machinery_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="heavy_machinery_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="heavy_machinery_job"
                  value={characterData.heavy_machinery_job || ''}
                  onChange={(e) => handleInputChange('heavy_machinery_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="heavy_machinery_interest"
                  value={characterData.heavy_machinery_interest || ''}
                  onChange={(e) => handleInputChange('heavy_machinery_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="heavy_machinery_growth"
                  value={characterData.heavy_machinery_growth || ''}
                  onChange={(e) => handleInputChange('heavy_machinery_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="heavy_machinery_other"
                  value={characterData.heavy_machinery_other || ''}
                  onChange={(e) => handleInputChange('heavy_machinery_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 乗馬 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('ride', 5) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">乗馬</div>
            <div className="total">
              <input
                type="number"
                name="ride_total"
                className="readonly _02"
                value={calculatedStats.ride_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="ride_initial"
                  className="readonly _02"
                  value="5"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="ride_job"
                  value={characterData.ride_job || ''}
                  onChange={(e) => handleInputChange('ride_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="ride_interest"
                  value={characterData.ride_interest || ''}
                  onChange={(e) => handleInputChange('ride_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="ride_growth"
                  value={characterData.ride_growth || ''}
                  onChange={(e) => handleInputChange('ride_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="ride_other"
                  value={characterData.ride_other || ''}
                  onChange={(e) => handleInputChange('ride_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 水泳 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('swim', 25) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">水泳</div>
            <div className="total">
              <input
                type="number"
                name="swim_total"
                className="readonly _02"
                value={calculatedStats.swim_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="swim_initial"
                  className="readonly _02"
                  value="25"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="swim_job"
                  value={characterData.swim_job || ''}
                  onChange={(e) => handleInputChange('swim_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="swim_interest"
                  value={characterData.swim_interest || ''}
                  onChange={(e) => handleInputChange('swim_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="swim_growth"
                  value={characterData.swim_growth || ''}
                  onChange={(e) => handleInputChange('swim_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="swim_other"
                  value={characterData.swim_other || ''}
                  onChange={(e) => handleInputChange('swim_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 製作 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('craft', 5) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">製作<br className="sp-only" />
              <input
                type="text"
                name="craft_specialty"
                placeholder=""
                className="free"
                value={characterData.craft_specialty || ''}
                onChange={(e) => handleInputChange('craft_specialty', e.target.value)}
              />
            </div>
            <div className="total">
              <input
                type="number"
                name="craft_total"
                className="readonly _02"
                value={calculatedStats.craft_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="craft_initial"
                  className="readonly _02"
                  value="5"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="craft_job"
                  value={characterData.craft_job || ''}
                  onChange={(e) => handleInputChange('craft_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="craft_interest"
                  value={characterData.craft_interest || ''}
                  onChange={(e) => handleInputChange('craft_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="craft_growth"
                  value={characterData.craft_growth || ''}
                  onChange={(e) => handleInputChange('craft_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="craft_other"
                  value={characterData.craft_other || ''}
                  onChange={(e) => handleInputChange('craft_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 操縦 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('pilot', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">操縦 <br className="sp-only" />
              <input
                type="text"
                name="pilot_specialty"
                placeholder=""
                className="free"
                value={characterData.pilot_specialty || ''}
                onChange={(e) => handleInputChange('pilot_specialty', e.target.value)}
              />
            </div>
            <div className="total">
              <input
                type="number"
                name="pilot_total"
                className="readonly _02"
                value={calculatedStats.pilot_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="pilot_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="pilot_job"
                  value={characterData.pilot_job || ''}
                  onChange={(e) => handleInputChange('pilot_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="pilot_interest"
                  value={characterData.pilot_interest || ''}
                  onChange={(e) => handleInputChange('pilot_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="pilot_growth"
                  value={characterData.pilot_growth || ''}
                  onChange={(e) => handleInputChange('pilot_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="pilot_other"
                  value={characterData.pilot_other || ''}
                  onChange={(e) => handleInputChange('pilot_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 跳躍 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('jump', 25) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">跳躍</div>
            <div className="total">
              <input
                type="number"
                name="jump_total"
                className="readonly _02"
                value={calculatedStats.jump_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="jump_initial"
                  className="readonly _02"
                  value="25"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="jump_job"
                  value={characterData.jump_job || ''}
                  onChange={(e) => handleInputChange('jump_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="jump_interest"
                  value={characterData.jump_interest || ''}
                  onChange={(e) => handleInputChange('jump_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="jump_growth"
                  value={characterData.jump_growth || ''}
                  onChange={(e) => handleInputChange('jump_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="jump_other"
                  value={characterData.jump_other || ''}
                  onChange={(e) => handleInputChange('jump_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 電気修理 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('electrical_repair', 10) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">電気修理</div>
            <div className="total">
              <input
                type="number"
                name="electrical_repair_total"
                className="readonly _02"
                value={calculatedStats.electrical_repair_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="electrical_repair_initial"
                  className="readonly _02"
                  value="10"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="electrical_repair_job"
                  value={characterData.electrical_repair_job || ''}
                  onChange={(e) => handleInputChange('electrical_repair_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="electrical_repair_interest"
                  value={characterData.electrical_repair_interest || ''}
                  onChange={(e) => handleInputChange('electrical_repair_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="electrical_repair_growth"
                  value={characterData.electrical_repair_growth || ''}
                  onChange={(e) => handleInputChange('electrical_repair_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="electrical_repair_other"
                  value={characterData.electrical_repair_other || ''}
                  onChange={(e) => handleInputChange('electrical_repair_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* ナビゲート */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('navigate', 10) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">ナビゲート</div>
            <div className="total">
              <input
                type="number"
                name="navigate_total"
                className="readonly _02"
                value={calculatedStats.navigate_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="navigate_initial"
                  className="readonly _02"
                  value="10"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="navigate_job"
                  value={characterData.navigate_job || ''}
                  onChange={(e) => handleInputChange('navigate_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="navigate_interest"
                  value={characterData.navigate_interest || ''}
                  onChange={(e) => handleInputChange('navigate_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="navigate_growth"
                  value={characterData.navigate_growth || ''}
                  onChange={(e) => handleInputChange('navigate_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="navigate_other"
                  value={characterData.navigate_other || ''}
                  onChange={(e) => handleInputChange('navigate_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 変装 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('disguise', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">変装</div>
            <div className="total">
              <input
                type="number"
                name="disguise_total"
                className="readonly _02"
                value={calculatedStats.disguise_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="disguise_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="disguise_job"
                  value={characterData.disguise_job || ''}
                  onChange={(e) => handleInputChange('disguise_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="disguise_interest"
                  value={characterData.disguise_interest || ''}
                  onChange={(e) => handleInputChange('disguise_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="disguise_growth"
                  value={characterData.disguise_growth || ''}
                  onChange={(e) => handleInputChange('disguise_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="disguise_other"
                  value={characterData.disguise_other || ''}
                  onChange={(e) => handleInputChange('disguise_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 追加行動技能 */}
          {additionalActionSkills.map((skill) => (
            <li key={skill.id} className="d-flex skill-li skill-body add-slill-li">
              <input type="checkbox" name="check-growth" className="check-growth" />
              <div className="title">
                <input
                  type="text"
                  name={`${skill.id}_name`}
                  value={(characterData as any)[`${skill.id}_name`] || ''}
                  onChange={(e) => handleInputChange(`${skill.id}_name`, e.target.value)}
                  placeholder="技能名"
                  style={{
                    width: '85%',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeActionSkill(skill.id)}
                  className="remove-btn"
                >
                  <i className="fas fa-minus"></i>
                </button>
              </div>
              <div className="total">
                <input
                  type="number"
                  name={`${skill.id}_total`}
                  className="readonly _02"
                  value={
                    (parseInt((characterData as any)[`${skill.id}_initial`] as string) || 1) +
                    (parseInt((characterData as any)[`${skill.id}_job`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_interest`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_growth`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_other`] as string) || 0)
                  }
                  readOnly
                />
              </div>
              <div className="breakdown">
                <span className="initial">
                  <input
                    type="number"
                    name={`${skill.id}_initial`}
                    className="_02"
                    value={(characterData as any)[`${skill.id}_initial`] || 1}
                    onChange={(e) => handleInputChange(`${skill.id}_initial`, e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_job`}
                    value={(characterData as any)[`${skill.id}_job`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_job`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_interest`}
                    value={(characterData as any)[`${skill.id}_interest`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_interest`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_growth`}
                    value={(characterData as any)[`${skill.id}_growth`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_growth`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_other`}
                    value={(characterData as any)[`${skill.id}_other`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_other`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* 行動技能追加ボタン */}
        <button
          type="button"
          onClick={addActionSkill}
          className="add-btn"
        >
          <i className="fas fa-plus"></i> 行動技能を追加
        </button>
      </div>

      {/* 交渉技能 */}
      <div className="skill-group">
        <h3><i className="fas fa-handshake"></i> 交渉技能</h3>

        <ul>
          <li className="d-flex skill-li skill-head">
            <div className="growth">成長</div>
            <div className="title">技能名</div>
            <div className="total">合計<span className="pc-only">値</span></div>
            <div className="breakdown">
              <span className="pc-only">初期値</span><span className="sp-only">初期</span>|
              <span className="pc-only">職業P</span><span className="sp-only">職業</span>|
              <span className="pc-only">興味P</span><span className="sp-only">興味</span>|
              <span>成長</span>|
              <span className="pc-only">その他</span><span className="sp-only">他</span>
            </div>
          </li>

          {/* 言いくるめ */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('fast_talk', 5) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">言いくるめ</div>
            <div className="total">
              <input
                type="number"
                name="fast_talk_total"
                className="readonly _02"
                value={calculatedStats.fast_talk_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="fast_talk_initial"
                  className="readonly _02"
                  value="5"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="fast_talk_job"
                  value={characterData.fast_talk_job || ''}
                  onChange={(e) => handleInputChange('fast_talk_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="fast_talk_interest"
                  value={characterData.fast_talk_interest || ''}
                  onChange={(e) => handleInputChange('fast_talk_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="fast_talk_growth"
                  value={characterData.fast_talk_growth || ''}
                  onChange={(e) => handleInputChange('fast_talk_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="fast_talk_other"
                  value={characterData.fast_talk_other || ''}
                  onChange={(e) => handleInputChange('fast_talk_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 説得 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('persuade', 15) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">説得</div>
            <div className="total">
              <input
                type="number"
                name="persuade_total"
                className="readonly _02"
                value={calculatedStats.persuade_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="persuade_initial"
                  className="readonly _02"
                  value="15"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="persuade_job"
                  value={characterData.persuade_job || ''}
                  onChange={(e) => handleInputChange('persuade_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="persuade_interest"
                  value={characterData.persuade_interest || ''}
                  onChange={(e) => handleInputChange('persuade_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="persuade_growth"
                  value={characterData.persuade_growth || ''}
                  onChange={(e) => handleInputChange('persuade_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="persuade_other"
                  value={characterData.persuade_other || ''}
                  onChange={(e) => handleInputChange('persuade_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 信用 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('credit_rating', 15) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">信用</div>
            <div className="total">
              <input
                type="number"
                name="credit_rating_total"
                className="readonly _02"
                value={calculatedStats.credit_rating_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="credit_rating_initial"
                  className="readonly _02"
                  value="15"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="credit_rating_job"
                  value={characterData.credit_rating_job || ''}
                  onChange={(e) => handleInputChange('credit_rating_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="credit_rating_interest"
                  value={characterData.credit_rating_interest || ''}
                  onChange={(e) => handleInputChange('credit_rating_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="credit_rating_growth"
                  value={characterData.credit_rating_growth || ''}
                  onChange={(e) => handleInputChange('credit_rating_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="credit_rating_other"
                  value={characterData.credit_rating_other || ''}
                  onChange={(e) => handleInputChange('credit_rating_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 値切り */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('bargain', 5) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">値切り</div>
            <div className="total">
              <input
                type="number"
                name="bargain_total"
                className="readonly _02"
                value={calculatedStats.bargain_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="bargain_initial"
                  className="readonly _02"
                  value="5"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="bargain_job"
                  value={characterData.bargain_job || ''}
                  onChange={(e) => handleInputChange('bargain_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="bargain_interest"
                  value={characterData.bargain_interest || ''}
                  onChange={(e) => handleInputChange('bargain_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="bargain_growth"
                  value={characterData.bargain_growth || ''}
                  onChange={(e) => handleInputChange('bargain_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="bargain_other"
                  value={characterData.bargain_other || ''}
                  onChange={(e) => handleInputChange('bargain_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 母国語 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('mother_tongue', calculatedStats.mother_tongue_initial || 0) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">母国語<br className="sp-only" />
              <input
                type="text"
                name="mother_tongue_specialty"
                placeholder=""
                className="free"
                value={characterData.mother_tongue_specialty || ''}
                onChange={(e) => handleInputChange('mother_tongue_specialty', e.target.value)}
              />
            </div>
            <div className="total">
              <input
                type="number"
                name="mother_tongue_total"
                className="readonly _02"
                value={calculatedStats.mother_tongue_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="mother_tongue_initial"
                  className="readonly _02"
                  value={calculatedStats.mother_tongue_initial || 0}
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="mother_tongue_job"
                  value={characterData.mother_tongue_job || ''}
                  onChange={(e) => handleInputChange('mother_tongue_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="mother_tongue_interest"
                  value={characterData.mother_tongue_interest || ''}
                  onChange={(e) => handleInputChange('mother_tongue_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="mother_tongue_growth"
                  value={characterData.mother_tongue_growth || ''}
                  onChange={(e) => handleInputChange('mother_tongue_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="mother_tongue_other"
                  value={characterData.mother_tongue_other || ''}
                  onChange={(e) => handleInputChange('mother_tongue_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 他の言語 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('language', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">他の言語<br className="sp-only" />
              <input
                type="text"
                name="language_specialty"
                placeholder=""
                className="free"
                value={characterData.language_specialty || ''}
                onChange={(e) => handleInputChange('language_specialty', e.target.value)}
              />
            </div>
            <div className="total">
              <input
                type="number"
                name="language_total"
                className="readonly _02"
                value={calculatedStats.language_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="language_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="language_job"
                  value={characterData.language_job || ''}
                  onChange={(e) => handleInputChange('language_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="language_interest"
                  value={characterData.language_interest || ''}
                  onChange={(e) => handleInputChange('language_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="language_growth"
                  value={characterData.language_growth || ''}
                  onChange={(e) => handleInputChange('language_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="language_other"
                  value={characterData.language_other || ''}
                  onChange={(e) => handleInputChange('language_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 追加交渉技能 */}
          {additionalNegotiationSkills.map((skill) => (
            <li key={skill.id} className="d-flex skill-li skill-body add-slill-li">
              <input type="checkbox" name="check-growth" className="check-growth" />
              <div className="title">
                <input
                  type="text"
                  name={`${skill.id}_name`}
                  value={(characterData as any)[`${skill.id}_name`] || ''}
                  onChange={(e) => handleInputChange(`${skill.id}_name`, e.target.value)}
                  placeholder="技能名"
                  style={{
                    width: '85%',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeNegotiationSkill(skill.id)}
                  className="remove-btn"
                >
                  <i className="fas fa-minus"></i>
                </button>
              </div>
              <div className="total">
                <input
                  type="number"
                  name={`${skill.id}_total`}
                  className="readonly _02"
                  value={
                    (parseInt((characterData as any)[`${skill.id}_initial`] as string) || 1) +
                    (parseInt((characterData as any)[`${skill.id}_job`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_interest`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_growth`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_other`] as string) || 0)
                  }
                  readOnly
                />
              </div>
              <div className="breakdown">
                <span className="initial">
                  <input
                    type="number"
                    name={`${skill.id}_initial`}
                    className="_02"
                    value={(characterData as any)[`${skill.id}_initial`] || 1}
                    onChange={(e) => handleInputChange(`${skill.id}_initial`, e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_job`}
                    value={(characterData as any)[`${skill.id}_job`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_job`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_interest`}
                    value={(characterData as any)[`${skill.id}_interest`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_interest`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_growth`}
                    value={(characterData as any)[`${skill.id}_growth`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_growth`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_other`}
                    value={(characterData as any)[`${skill.id}_other`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_other`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* 交渉技能追加ボタン */}
        <button
          type="button"
          onClick={addNegotiationSkill}
          className="add-btn"
        >
          <i className="fas fa-plus"></i> 交渉技能を追加
        </button>
      </div>

      {/* 知識技能 */}
      <div className="skill-group">
        <h3><i className="fas fa-book"></i> 知識技能</h3>

        <ul>
          <li className="d-flex skill-li skill-head">
            <div className="growth">成長</div>
            <div className="title">技能名</div>
            <div className="total">合計<span className="pc-only">値</span></div>
            <div className="breakdown">
              <span className="pc-only">初期値</span><span className="sp-only">初期</span>|
              <span className="pc-only">職業P</span><span className="sp-only">職業</span>|
              <span className="pc-only">興味P</span><span className="sp-only">興味</span>|
              <span>成長</span>|
              <span className="pc-only">その他</span><span className="sp-only">他</span>
            </div>
          </li>

          {/* 医学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('medicine', 5) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">医学</div>
            <div className="total">
              <input
                type="number"
                name="medicine_total"
                className="readonly _02"
                value={calculatedStats.medicine_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="medicine_initial"
                  className="readonly _02"
                  value="5"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="medicine_job"
                  value={characterData.medicine_job || ''}
                  onChange={(e) => handleInputChange('medicine_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="medicine_interest"
                  value={characterData.medicine_interest || ''}
                  onChange={(e) => handleInputChange('medicine_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="medicine_growth"
                  value={characterData.medicine_growth || ''}
                  onChange={(e) => handleInputChange('medicine_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="medicine_other"
                  value={characterData.medicine_other || ''}
                  onChange={(e) => handleInputChange('medicine_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* オカルト */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('occult', 5) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">オカルト</div>
            <div className="total">
              <input
                type="number"
                name="occult_total"
                className="readonly _02"
                value={calculatedStats.occult_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="occult_initial"
                  className="readonly _02"
                  value="5"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="occult_job"
                  value={characterData.occult_job || ''}
                  onChange={(e) => handleInputChange('occult_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="occult_interest"
                  value={characterData.occult_interest || ''}
                  onChange={(e) => handleInputChange('occult_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="occult_growth"
                  value={characterData.occult_growth || ''}
                  onChange={(e) => handleInputChange('occult_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="occult_other"
                  value={characterData.occult_other || ''}
                  onChange={(e) => handleInputChange('occult_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 化学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('chemistry', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">化学</div>
            <div className="total">
              <input
                type="number"
                name="chemistry_total"
                className="readonly _02"
                value={calculatedStats.chemistry_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="chemistry_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="chemistry_job"
                  value={characterData.chemistry_job || ''}
                  onChange={(e) => handleInputChange('chemistry_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="chemistry_interest"
                  value={characterData.chemistry_interest || ''}
                  onChange={(e) => handleInputChange('chemistry_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="chemistry_growth"
                  value={characterData.chemistry_growth || ''}
                  onChange={(e) => handleInputChange('chemistry_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="chemistry_other"
                  value={characterData.chemistry_other || ''}
                  onChange={(e) => handleInputChange('chemistry_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* クトゥルフ神話 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('cthulhu_mythos', 0) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">クトゥルフ神話</div>
            <div className="total">
              <input
                type="number"
                name="cthulhu_mythos_total"
                className="readonly _02"
                value={calculatedStats.cthulhu_mythos_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="cthulhu_mythos_initial"
                  className="readonly _02"
                  value="0"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="cthulhu_mythos_job"
                  value={characterData.cthulhu_mythos_job || ''}
                  onChange={(e) => handleInputChange('cthulhu_mythos_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="cthulhu_mythos_interest"
                  value={characterData.cthulhu_mythos_interest || ''}
                  onChange={(e) => handleInputChange('cthulhu_mythos_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="cthulhu_mythos_growth"
                  value={characterData.cthulhu_mythos_growth || ''}
                  onChange={(e) => handleInputChange('cthulhu_mythos_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="cthulhu_mythos_other"
                  value={characterData.cthulhu_mythos_other || ''}
                  onChange={(e) => handleInputChange('cthulhu_mythos_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 芸術 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('art', 5) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">芸術 <br className="sp-only" />
              <input
                type="text"
                name="art_specialty"
                placeholder=""
                className="free"
                value={characterData.art_specialty || ''}
                onChange={(e) => handleInputChange('art_specialty', e.target.value)}
              />
            </div>
            <div className="total">
              <input
                type="number"
                name="art_total"
                className="readonly _02"
                value={calculatedStats.art_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="art_initial"
                  className="readonly _02"
                  value="5"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="art_job"
                  value={characterData.art_job || ''}
                  onChange={(e) => handleInputChange('art_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="art_interest"
                  value={characterData.art_interest || ''}
                  onChange={(e) => handleInputChange('art_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="art_growth"
                  value={characterData.art_growth || ''}
                  onChange={(e) => handleInputChange('art_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="art_other"
                  value={characterData.art_other || ''}
                  onChange={(e) => handleInputChange('art_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 経理 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('accounting', 10) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">経理</div>
            <div className="total">
              <input
                type="number"
                name="accounting_total"
                className="readonly _02"
                value={calculatedStats.accounting_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="accounting_initial"
                  className="readonly _02"
                  value="10"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="accounting_job"
                  value={characterData.accounting_job || ''}
                  onChange={(e) => handleInputChange('accounting_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="accounting_interest"
                  value={characterData.accounting_interest || ''}
                  onChange={(e) => handleInputChange('accounting_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="accounting_growth"
                  value={characterData.accounting_growth || ''}
                  onChange={(e) => handleInputChange('accounting_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="accounting_other"
                  value={characterData.accounting_other || ''}
                  onChange={(e) => handleInputChange('accounting_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 考古学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('archaeology', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">考古学</div>
            <div className="total">
              <input
                type="number"
                name="archaeology_total"
                className="readonly _02"
                value={calculatedStats.archaeology_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="archaeology_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="archaeology_job"
                  value={characterData.archaeology_job || ''}
                  onChange={(e) => handleInputChange('archaeology_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="archaeology_interest"
                  value={characterData.archaeology_interest || ''}
                  onChange={(e) => handleInputChange('archaeology_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="archaeology_growth"
                  value={characterData.archaeology_growth || ''}
                  onChange={(e) => handleInputChange('archaeology_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="archaeology_other"
                  value={characterData.archaeology_other || ''}
                  onChange={(e) => handleInputChange('archaeology_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* コンピューター */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('computer_use', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">コンピューター</div>
            <div className="total">
              <input
                type="number"
                name="computer_use_total"
                className="readonly _02"
                value={calculatedStats.computer_use_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="computer_use_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="computer_use_job"
                  value={characterData.computer_use_job || ''}
                  onChange={(e) => handleInputChange('computer_use_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="computer_use_interest"
                  value={characterData.computer_use_interest || ''}
                  onChange={(e) => handleInputChange('computer_use_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="computer_use_growth"
                  value={characterData.computer_use_growth || ''}
                  onChange={(e) => handleInputChange('computer_use_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="computer_use_other"
                  value={characterData.computer_use_other || ''}
                  onChange={(e) => handleInputChange('computer_use_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 心理学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('psychology', 5) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">心理学</div>
            <div className="total">
              <input
                type="number"
                name="psychology_total"
                className="readonly _02"
                value={calculatedStats.psychology_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="psychology_initial"
                  className="readonly _02"
                  value="5"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="psychology_job"
                  value={characterData.psychology_job || ''}
                  onChange={(e) => handleInputChange('psychology_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="psychology_interest"
                  value={characterData.psychology_interest || ''}
                  onChange={(e) => handleInputChange('psychology_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="psychology_growth"
                  value={characterData.psychology_growth || ''}
                  onChange={(e) => handleInputChange('psychology_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="psychology_other"
                  value={characterData.psychology_other || ''}
                  onChange={(e) => handleInputChange('psychology_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 人類学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('anthropology', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">人類学</div>
            <div className="total">
              <input
                type="number"
                name="anthropology_total"
                className="readonly _02"
                value={calculatedStats.anthropology_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="anthropology_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="anthropology_job"
                  value={characterData.anthropology_job || ''}
                  onChange={(e) => handleInputChange('anthropology_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="anthropology_interest"
                  value={characterData.anthropology_interest || ''}
                  onChange={(e) => handleInputChange('anthropology_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="anthropology_growth"
                  value={characterData.anthropology_growth || ''}
                  onChange={(e) => handleInputChange('anthropology_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="anthropology_other"
                  value={characterData.anthropology_other || ''}
                  onChange={(e) => handleInputChange('anthropology_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 生物学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('biology', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">生物学</div>
            <div className="total">
              <input
                type="number"
                name="biology_total"
                className="readonly _02"
                value={calculatedStats.biology_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="biology_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="biology_job"
                  value={characterData.biology_job || ''}
                  onChange={(e) => handleInputChange('biology_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="biology_interest"
                  value={characterData.biology_interest || ''}
                  onChange={(e) => handleInputChange('biology_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="biology_growth"
                  value={characterData.biology_growth || ''}
                  onChange={(e) => handleInputChange('biology_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="biology_other"
                  value={characterData.biology_other || ''}
                  onChange={(e) => handleInputChange('biology_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 地質学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('geology', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">地質学</div>
            <div className="total">
              <input
                type="number"
                name="geology_total"
                className="readonly _02"
                value={calculatedStats.geology_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="geology_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="geology_job"
                  value={characterData.geology_job || ''}
                  onChange={(e) => handleInputChange('geology_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="geology_interest"
                  value={characterData.geology_interest || ''}
                  onChange={(e) => handleInputChange('geology_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="geology_growth"
                  value={characterData.geology_growth || ''}
                  onChange={(e) => handleInputChange('geology_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="geology_other"
                  value={characterData.geology_other || ''}
                  onChange={(e) => handleInputChange('geology_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 電子工学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('electronics', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">電子工学</div>
            <div className="total">
              <input
                type="number"
                name="electronics_total"
                className="readonly _02"
                value={calculatedStats.electronics_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="electronics_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="electronics_job"
                  value={characterData.electronics_job || ''}
                  onChange={(e) => handleInputChange('electronics_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="electronics_interest"
                  value={characterData.electronics_interest || ''}
                  onChange={(e) => handleInputChange('electronics_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="electronics_growth"
                  value={characterData.electronics_growth || ''}
                  onChange={(e) => handleInputChange('electronics_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="electronics_other"
                  value={characterData.electronics_other || ''}
                  onChange={(e) => handleInputChange('electronics_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 天文学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('astronomy', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">天文学</div>
            <div className="total">
              <input
                type="number"
                name="astronomy_total"
                className="readonly _02"
                value={calculatedStats.astronomy_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="astronomy_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="astronomy_job"
                  value={characterData.astronomy_job || ''}
                  onChange={(e) => handleInputChange('astronomy_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="astronomy_interest"
                  value={characterData.astronomy_interest || ''}
                  onChange={(e) => handleInputChange('astronomy_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="astronomy_growth"
                  value={characterData.astronomy_growth || ''}
                  onChange={(e) => handleInputChange('astronomy_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="astronomy_other"
                  value={characterData.astronomy_other || ''}
                  onChange={(e) => handleInputChange('astronomy_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 博物学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('natural_history', 10) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">博物学</div>
            <div className="total">
              <input
                type="number"
                name="natural_history_total"
                className="readonly _02"
                value={calculatedStats.natural_history_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="natural_history_initial"
                  className="readonly _02"
                  value="10"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="natural_history_job"
                  value={characterData.natural_history_job || ''}
                  onChange={(e) => handleInputChange('natural_history_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="natural_history_interest"
                  value={characterData.natural_history_interest || ''}
                  onChange={(e) => handleInputChange('natural_history_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="natural_history_growth"
                  value={characterData.natural_history_growth || ''}
                  onChange={(e) => handleInputChange('natural_history_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="natural_history_other"
                  value={characterData.natural_history_other || ''}
                  onChange={(e) => handleInputChange('natural_history_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 物理学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('physics', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">物理学</div>
            <div className="total">
              <input
                type="number"
                name="physics_total"
                className="readonly _02"
                value={calculatedStats.physics_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="physics_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="physics_job"
                  value={characterData.physics_job || ''}
                  onChange={(e) => handleInputChange('physics_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="physics_interest"
                  value={characterData.physics_interest || ''}
                  onChange={(e) => handleInputChange('physics_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="physics_growth"
                  value={characterData.physics_growth || ''}
                  onChange={(e) => handleInputChange('physics_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="physics_other"
                  value={characterData.physics_other || ''}
                  onChange={(e) => handleInputChange('physics_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 法律 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('law', 5) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">法律</div>
            <div className="total">
              <input
                type="number"
                name="law_total"
                className="readonly _02"
                value={calculatedStats.law_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="law_initial"
                  className="readonly _02"
                  value="5"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="law_job"
                  value={characterData.law_job || ''}
                  onChange={(e) => handleInputChange('law_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="law_interest"
                  value={characterData.law_interest || ''}
                  onChange={(e) => handleInputChange('law_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="law_growth"
                  value={characterData.law_growth || ''}
                  onChange={(e) => handleInputChange('law_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="law_other"
                  value={characterData.law_other || ''}
                  onChange={(e) => handleInputChange('law_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 薬学 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('pharmacy', 1) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">薬学</div>
            <div className="total">
              <input
                type="number"
                name="pharmacy_total"
                className="readonly _02"
                value={calculatedStats.pharmacy_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="pharmacy_initial"
                  className="readonly _02"
                  value="1"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="pharmacy_job"
                  value={characterData.pharmacy_job || ''}
                  onChange={(e) => handleInputChange('pharmacy_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="pharmacy_interest"
                  value={characterData.pharmacy_interest || ''}
                  onChange={(e) => handleInputChange('pharmacy_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="pharmacy_growth"
                  value={characterData.pharmacy_growth || ''}
                  onChange={(e) => handleInputChange('pharmacy_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="pharmacy_other"
                  value={characterData.pharmacy_other || ''}
                  onChange={(e) => handleInputChange('pharmacy_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 歴史 */}
          <li
            className="d-flex skill-li skill-body"
            style={{
              display: hideInitialSkills && isSkillInitialOnly('history', 20) ? 'none' : 'flex'
            }}
          >
            <input type="checkbox" name="check-growth" className="check-growth" />
            <div className="title">歴史</div>
            <div className="total">
              <input
                type="number"
                name="history_total"
                className="readonly _02"
                value={calculatedStats.history_total || 0}
                readOnly
              />
            </div>
            <div className="breakdown">
              <span className="initial">
                <input
                  type="number"
                  name="history_initial"
                  className="readonly _02"
                  value="20"
                  readOnly
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="history_job"
                  value={characterData.history_job || ''}
                  onChange={(e) => handleInputChange('history_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="history_interest"
                  value={characterData.history_interest || ''}
                  onChange={(e) => handleInputChange('history_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="history_growth"
                  value={characterData.history_growth || ''}
                  onChange={(e) => handleInputChange('history_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>|<span className="atai">
                <input
                  type="number"
                  name="history_other"
                  value={characterData.history_other || ''}
                  onChange={(e) => handleInputChange('history_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                />
              </span>
            </div>
          </li>

          {/* 追加知識技能 */}
          {additionalKnowledgeSkills.map((skill) => (
            <li key={skill.id} className="d-flex skill-li skill-body add-slill-li">
              <input type="checkbox" name="check-growth" className="check-growth" />
              <div className="title">
                <input
                  type="text"
                  name={`${skill.id}_name`}
                  value={(characterData as any)[`${skill.id}_name`] || ''}
                  onChange={(e) => handleInputChange(`${skill.id}_name`, e.target.value)}
                  placeholder="技能名"
                  style={{
                    width: '85%',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeKnowledgeSkill(skill.id)}
                  className="remove-btn"
                >
                  <i className="fas fa-minus"></i>
                </button>
              </div>
              <div className="total">
                <input
                  type="number"
                  name={`${skill.id}_total`}
                  className="readonly _02"
                  value={
                    (parseInt((characterData as any)[`${skill.id}_initial`] as string) || 1) +
                    (parseInt((characterData as any)[`${skill.id}_job`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_interest`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_growth`] as string) || 0) +
                    (parseInt((characterData as any)[`${skill.id}_other`] as string) || 0)
                  }
                  readOnly
                />
              </div>
              <div className="breakdown">
                <span className="initial">
                  <input
                    type="number"
                    name={`${skill.id}_initial`}
                    className="_02"
                    value={(characterData as any)[`${skill.id}_initial`] || 1}
                    onChange={(e) => handleInputChange(`${skill.id}_initial`, e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_job`}
                    value={(characterData as any)[`${skill.id}_job`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_job`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_interest`}
                    value={(characterData as any)[`${skill.id}_interest`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_interest`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_growth`}
                    value={(characterData as any)[`${skill.id}_growth`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_growth`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>|<span className="atai">
                  <input
                    type="number"
                    name={`${skill.id}_other`}
                    value={(characterData as any)[`${skill.id}_other`] || ''}
                    onChange={(e) => handleInputChange(`${skill.id}_other`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* 知識技能追加ボタン */}
        <button
          type="button"
          onClick={addKnowledgeSkill}
          className="add-btn"
        >
          <i className="fas fa-plus"></i> 知識技能を追加
        </button>
      </div>
    </div>
  );
}