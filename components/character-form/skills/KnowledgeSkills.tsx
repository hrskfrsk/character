import React from 'react';
import { CharacterData } from '../../../lib/character-calculations';

interface KnowledgeSkillsProps {
  characterData: CharacterData;
  calculatedStats: any;
  handleInputChange: (field: string, value: any) => void;
  // 技能表示切替
  hideInitialSkills: boolean;
  isSkillInitialOnly: (skillName: string, initialValue?: number) => boolean;
  // 知識技能関連
  additionalKnowledgeSkills: Array<{ id: string, counter: number }>;
  addKnowledgeSkill: () => void;
  removeKnowledgeSkill: (id: string) => void;
}

export default function KnowledgeSkills({
  characterData,
  calculatedStats,
  handleInputChange,
  hideInitialSkills,
  isSkillInitialOnly,
  additionalKnowledgeSkills,
  addKnowledgeSkill,
  removeKnowledgeSkill
}: KnowledgeSkillsProps) {
  return (
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
          <div className="title">
            芸術 <br className="sp-only" />
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
  );
}