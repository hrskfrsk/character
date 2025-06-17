import React from 'react';
import { CharacterData } from '../../../lib/character-calculations';

interface NegotiationSkillsProps {
  characterData: CharacterData;
  calculatedStats: any;
  handleInputChange: (field: string, value: any) => void;
  // 技能表示切替
  hideInitialSkills: boolean;
  isSkillInitialOnly: (skillName: string, initialValue?: number) => boolean;
  // 交渉技能関連
  additionalNegotiationSkills: Array<{ id: string, counter: number }>;
  addNegotiationSkill: () => void;
  removeNegotiationSkill: (id: string) => void;
}

export default function NegotiationSkills({
  characterData,
  calculatedStats,
  handleInputChange,
  hideInitialSkills,
  isSkillInitialOnly,
  additionalNegotiationSkills,
  addNegotiationSkill,
  removeNegotiationSkill
}: NegotiationSkillsProps) {
  return (
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
          <div className="title">
            母国語 <br className="sp-only" />
            <input
              type="text"
              name="mother_tongue_specialty"
              value={characterData.mother_tongue_specialty || ''}
              onChange={(e) => handleInputChange('mother_tongue_specialty', e.target.value)}
              className='free'
              placeholder=""
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
          <div className="title">
            他の言語 <br className="sp-only" />
            <input
              type="text"
              name="language_specialty"
              value={characterData.language_specialty || ''}
              onChange={(e) => handleInputChange('language_specialty', e.target.value)}
              placeholder=""
              className='free'
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
  );
}