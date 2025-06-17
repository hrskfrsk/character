import React from 'react';
import { CharacterData } from '../../../lib/character-calculations';

interface ExplorationSkillsProps {
  characterData: CharacterData;
  calculatedStats: any;
  handleInputChange: (field: string, value: any) => void;
  // 技能表示切替
  hideInitialSkills: boolean;
  isSkillInitialOnly: (skillName: string, initialValue?: number) => boolean;
  // 探索技能関連
  additionalExplorationSkills: Array<{ id: string, counter: number }>;
  addExplorationSkill: () => void;
  removeExplorationSkill: (id: string) => void;
}

export default function ExplorationSkills({
  characterData,
  calculatedStats,
  handleInputChange,
  hideInitialSkills,
  isSkillInitialOnly,
  additionalExplorationSkills,
  addExplorationSkill,
  removeExplorationSkill
}: ExplorationSkillsProps) {
  return (
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
  );
}