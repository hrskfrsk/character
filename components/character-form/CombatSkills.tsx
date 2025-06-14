import React from 'react';
import { CharacterData } from '../../lib/character-calculations';

interface CombatSkillsProps {
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
}

export default function CombatSkills({
  characterData,
  calculatedStats,
  handleInputChange,
  hideInitialSkills,
  isSkillInitialOnly,
  additionalCombatSkills,
  addCombatSkill,
  removeCombatSkill
}: CombatSkillsProps) {
  return (
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
            display: hideInitialSkills && isSkillInitialOnly('kick', 25) ? 'none' : 'flex'
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
            display: hideInitialSkills && isSkillInitialOnly('grapple', 25) ? 'none' : 'flex'
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
            display: hideInitialSkills && isSkillInitialOnly('punch', 50) ? 'none' : 'flex'
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
            display: hideInitialSkills && isSkillInitialOnly('headbutt', 10) ? 'none' : 'flex'
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
            display: hideInitialSkills && isSkillInitialOnly('throw', 25) ? 'none' : 'flex'
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
  );
}