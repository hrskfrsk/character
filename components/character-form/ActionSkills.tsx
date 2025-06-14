import React from 'react';
import { CharacterData } from '../../lib/character-calculations';

interface ActionSkillsProps {
  characterData: CharacterData;
  calculatedStats: any;
  handleInputChange: (field: string, value: any) => void;
  // 技能表示切替
  hideInitialSkills: boolean;
  isSkillInitialOnly: (skillName: string, initialValue?: number) => boolean;
  // 行動技能関連
  additionalActionSkills: Array<{ id: string, counter: number }>;
  addActionSkill: () => void;
  removeActionSkill: (id: string) => void;
}

export default function ActionSkills({
  characterData,
  calculatedStats,
  handleInputChange,
  hideInitialSkills,
  isSkillInitialOnly,
  additionalActionSkills,
  addActionSkill,
  removeActionSkill
}: ActionSkillsProps) {
  return (
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
          <div className="title">
            運転 <br className="sp-only" />
            <input
              type="text"
              name="drive_specialty"
              value={characterData.drive_specialty || ''}
              className="free"
              onChange={(e) => handleInputChange('drive_specialty', e.target.value)}
              placeholder=""
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
          <div className="title">
            製作 <br className="sp-only" />
            <input
              type="text"
              name="craft_specialty"
              value={characterData.craft_specialty || ''}
              onChange={(e) => handleInputChange('craft_specialty', e.target.value)}
              placeholder=""
              className="free"
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
          <div className="title">
            操縦 <br className="sp-only" />
            <input
              type="text"
              name="pilot_specialty"
              value={characterData.pilot_specialty || ''}
              onChange={(e) => handleInputChange('pilot_specialty', e.target.value)}
              placeholder=""
              className="free"
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
  );
}