import React from 'react';
import SkillDisplay from '../../SkillDisplay';

interface KnowledgeSkillsProps {
  character: any;
  showAllSkills: boolean;
  displayInitial: (value: any, defaultValue: number) => string;
  isSkillInitialOnly: (skillPrefix: string) => boolean;
  handleSkillClick: (skillName: string, skillValue: number) => void;
}

export default function KnowledgeSkills({
  character,
  showAllSkills,
  displayInitial,
  isSkillInitialOnly,
  handleSkillClick
}: KnowledgeSkillsProps) {
  return (
    <li className="skill-group">
      <h3><i className="fas fa-book"></i> 知識技能</h3>
      <ul>
        <li className="d-flex skill-li skill-head">
          <div className="title">技能名</div>
          <div className="total">-合計<span className="pc-only">値</span></div>
          <div className="breakdown">
            <span className="pc-only">初期値</span><span className="sp-only">初期</span>|
            <span className="pc-only">職業P</span><span className="sp-only">職業</span>|
            <span className="pc-only">興味P</span><span className="sp-only">興味</span>|
            <span>成長</span>|
            <span className="pc-only">その他</span><span className="sp-only">他</span>
          </div>
        </li>

        {(showAllSkills || !isSkillInitialOnly('medicine')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">医学</div>
            <div className="total">
              <SkillDisplay
                skillName="医学"
                skillValue={character.medicine_total}
                skillId="medicine_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="medicine_initial">{displayInitial(character.medicine_initial, 5)}</span>|
              <span className="atai" id="medicine_job">{character.medicine_job || '-'}</span>|
              <span className="atai" id="medicine_interest">{character.medicine_interest || '-'}</span>|
              <span className="atai" id="medicine_growth">{character.medicine_growth || '-'}</span>|
              <span className="atai" id="medicine_other">{character.medicine_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('occult')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">オカルト</div>
            <div className="total">
              <SkillDisplay
                skillName="オカルト"
                skillValue={character.occult_total}
                skillId="occult_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="occult_initial">{displayInitial(character.occult_initial, 5)}</span>|
              <span className="atai" id="occult_job">{character.occult_job || '-'}</span>|
              <span className="atai" id="occult_interest">{character.occult_interest || '-'}</span>|
              <span className="atai" id="occult_growth">{character.occult_growth || '-'}</span>|
              <span className="atai" id="occult_other">{character.occult_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('chemistry')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">化学</div>
            <div className="total">
              <SkillDisplay
                skillName="化学"
                skillValue={character.chemistry_total}
                skillId="chemistry_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="chemistry_initial">{displayInitial(character.chemistry_initial, 1)}</span>|
              <span className="atai" id="chemistry_job">{character.chemistry_job || '-'}</span>|
              <span className="atai" id="chemistry_interest">{character.chemistry_interest || '-'}</span>|
              <span className="atai" id="chemistry_growth">{character.chemistry_growth || '-'}</span>|
              <span className="atai" id="chemistry_other">{character.chemistry_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('cthulhu_mythos')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">クトゥルフ神話</div>
            <div className="total">
              <SkillDisplay
                skillName="クトゥルフ神話"
                skillValue={character.cthulhu_mythos_total}
                skillId="cthulhu_mythos_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="cthulhu_mythos_initial">{displayInitial(character.cthulhu_mythos_initial, 0)}</span>|
              <span className="atai" id="cthulhu_mythos_job">{character.cthulhu_mythos_job || '-'}</span>|
              <span className="atai" id="cthulhu_mythos_interest">{character.cthulhu_mythos_interest || '-'}</span>|
              <span className="atai" id="cthulhu_mythos_growth">{character.cthulhu_mythos_growth || '-'}</span>|
              <span className="atai" id="cthulhu_mythos_other">{character.cthulhu_mythos_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('art')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">芸術</div>
            <div className="total">
              <SkillDisplay
                skillName="芸術"
                skillValue={character.art_total}
                skillId="art_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="art_initial">{displayInitial(character.art_initial, 5)}</span>|
              <span className="atai" id="art_job">{character.art_job || '-'}</span>|
              <span className="atai" id="art_interest">{character.art_interest || '-'}</span>|
              <span className="atai" id="art_growth">{character.art_growth || '-'}</span>|
              <span className="atai" id="art_other">{character.art_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('accounting')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">経理</div>
            <div className="total">
              <SkillDisplay
                skillName="経理"
                skillValue={character.accounting_total}
                skillId="accounting_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="accounting_initial">{displayInitial(character.accounting_initial, 10)}</span>|
              <span className="atai" id="accounting_job">{character.accounting_job || '-'}</span>|
              <span className="atai" id="accounting_interest">{character.accounting_interest || '-'}</span>|
              <span className="atai" id="accounting_growth">{character.accounting_growth || '-'}</span>|
              <span className="atai" id="accounting_other">{character.accounting_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('archaeology')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">考古学</div>
            <div className="total">
              <SkillDisplay
                skillName="考古学"
                skillValue={character.archaeology_total}
                skillId="archaeology_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="archaeology_initial">{displayInitial(character.archaeology_initial, 1)}</span>|
              <span className="atai" id="archaeology_job">{character.archaeology_job || '-'}</span>|
              <span className="atai" id="archaeology_interest">{character.archaeology_interest || '-'}</span>|
              <span className="atai" id="archaeology_growth">{character.archaeology_growth || '-'}</span>|
              <span className="atai" id="archaeology_other">{character.archaeology_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('computer_use')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">コンピューター</div>
            <div className="total">
              <SkillDisplay
                skillName="コンピューター"
                skillValue={character.computer_use_total}
                skillId="computer_use_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="computer_use_initial">{displayInitial(character.computer_use_initial, 1)}</span>|
              <span className="atai" id="computer_use_job">{character.computer_use_job || '-'}</span>|
              <span className="atai" id="computer_use_interest">{character.computer_use_interest || '-'}</span>|
              <span className="atai" id="computer_use_growth">{character.computer_use_growth || '-'}</span>|
              <span className="atai" id="computer_use_other">{character.computer_use_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('psychology')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">心理学</div>
            <div className="total">
              <SkillDisplay
                skillName="心理学"
                skillValue={character.psychology_total}
                skillId="psychology_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="psychology_initial">{displayInitial(character.psychology_initial, 5)}</span>|
              <span className="atai" id="psychology_job">{character.psychology_job || '-'}</span>|
              <span className="atai" id="psychology_interest">{character.psychology_interest || '-'}</span>|
              <span className="atai" id="psychology_growth">{character.psychology_growth || '-'}</span>|
              <span className="atai" id="psychology_other">{character.psychology_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('anthropology')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">人類学</div>
            <div className="total">
              <SkillDisplay
                skillName="人類学"
                skillValue={character.anthropology_total}
                skillId="anthropology_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="anthropology_initial">{displayInitial(character.anthropology_initial, 1)}</span>|
              <span className="atai" id="anthropology_job">{character.anthropology_job || '-'}</span>|
              <span className="atai" id="anthropology_interest">{character.anthropology_interest || '-'}</span>|
              <span className="atai" id="anthropology_growth">{character.anthropology_growth || '-'}</span>|
              <span className="atai" id="anthropology_other">{character.anthropology_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('biology')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">生物学</div>
            <div className="total">
              <SkillDisplay
                skillName="生物学"
                skillValue={character.biology_total}
                skillId="biology_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="biology_initial">{displayInitial(character.biology_initial, 1)}</span>|
              <span className="atai" id="biology_job">{character.biology_job || '-'}</span>|
              <span className="atai" id="biology_interest">{character.biology_interest || '-'}</span>|
              <span className="atai" id="biology_growth">{character.biology_growth || '-'}</span>|
              <span className="atai" id="biology_other">{character.biology_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('geology')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">地質学</div>
            <div className="total">
              <SkillDisplay
                skillName="地質学"
                skillValue={character.geology_total}
                skillId="geology_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="geology_initial">{displayInitial(character.geology_initial, 1)}</span>|
              <span className="atai" id="geology_job">{character.geology_job || '-'}</span>|
              <span className="atai" id="geology_interest">{character.geology_interest || '-'}</span>|
              <span className="atai" id="geology_growth">{character.geology_growth || '-'}</span>|
              <span className="atai" id="geology_other">{character.geology_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('electronics')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">電子工学</div>
            <div className="total">
              <SkillDisplay
                skillName="電子工学"
                skillValue={character.electronics_total}
                skillId="electronics_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="electronics_initial">{displayInitial(character.electronics_initial, 1)}</span>|
              <span className="atai" id="electronics_job">{character.electronics_job || '-'}</span>|
              <span className="atai" id="electronics_interest">{character.electronics_interest || '-'}</span>|
              <span className="atai" id="electronics_growth">{character.electronics_growth || '-'}</span>|
              <span className="atai" id="electronics_other">{character.electronics_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('astronomy')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">天文学</div>
            <div className="total">
              <SkillDisplay
                skillName="天文学"
                skillValue={character.astronomy_total}
                skillId="astronomy_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="astronomy_initial">{displayInitial(character.astronomy_initial, 1)}</span>|
              <span className="atai" id="astronomy_job">{character.astronomy_job || '-'}</span>|
              <span className="atai" id="astronomy_interest">{character.astronomy_interest || '-'}</span>|
              <span className="atai" id="astronomy_growth">{character.astronomy_growth || '-'}</span>|
              <span className="atai" id="astronomy_other">{character.astronomy_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('natural_history')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">博物学</div>
            <div className="total">
              <SkillDisplay
                skillName="博物学"
                skillValue={character.natural_history_total}
                skillId="natural_history_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="natural_history_initial">{displayInitial(character.natural_history_initial, 10)}</span>|
              <span className="atai" id="natural_history_job">{character.natural_history_job || '-'}</span>|
              <span className="atai" id="natural_history_interest">{character.natural_history_interest || '-'}</span>|
              <span className="atai" id="natural_history_growth">{character.natural_history_growth || '-'}</span>|
              <span className="atai" id="natural_history_other">{character.natural_history_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('physics')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">物理学</div>
            <div className="total">
              <SkillDisplay
                skillName="物理学"
                skillValue={character.physics_total}
                skillId="physics_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="physics_initial">{displayInitial(character.physics_initial, 1)}</span>|
              <span className="atai" id="physics_job">{character.physics_job || '-'}</span>|
              <span className="atai" id="physics_interest">{character.physics_interest || '-'}</span>|
              <span className="atai" id="physics_growth">{character.physics_growth || '-'}</span>|
              <span className="atai" id="physics_other">{character.physics_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('law')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">法律</div>
            <div className="total">
              <SkillDisplay
                skillName="法律"
                skillValue={character.law_total}
                skillId="law_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="law_initial">{displayInitial(character.law_initial, 5)}</span>|
              <span className="atai" id="law_job">{character.law_job || '-'}</span>|
              <span className="atai" id="law_interest">{character.law_interest || '-'}</span>|
              <span className="atai" id="law_growth">{character.law_growth || '-'}</span>|
              <span className="atai" id="law_other">{character.law_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('pharmacy')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">薬学</div>
            <div className="total">
              <SkillDisplay
                skillName="薬学"
                skillValue={character.pharmacy_total}
                skillId="pharmacy_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="pharmacy_initial">{displayInitial(character.pharmacy_initial, 1)}</span>|
              <span className="atai" id="pharmacy_job">{character.pharmacy_job || '-'}</span>|
              <span className="atai" id="pharmacy_interest">{character.pharmacy_interest || '-'}</span>|
              <span className="atai" id="pharmacy_growth">{character.pharmacy_growth || '-'}</span>|
              <span className="atai" id="pharmacy_other">{character.pharmacy_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('history')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">歴史</div>
            <div className="total">
              <SkillDisplay
                skillName="歴史"
                skillValue={character.history_total}
                skillId="history_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="history_initial">{displayInitial(character.history_initial, 20)}</span>|
              <span className="atai" id="history_job">{character.history_job || '-'}</span>|
              <span className="atai" id="history_interest">{character.history_interest || '-'}</span>|
              <span className="atai" id="history_growth">{character.history_growth || '-'}</span>|
              <span className="atai" id="history_other">{character.history_other || '-'}</span>
            </div>
          </li>
        )}

        {/* 追加知識技能 */}
        {(() => {
          const additionalKnowledgeSkills = [];
          for (let i = 1; i <= 50; i++) {
            const skillName = character[`additional_knowledge_${i}_name`];
            if (skillName && (showAllSkills || !isSkillInitialOnly(`additional_knowledge_${i}`))) {
              additionalKnowledgeSkills.push(
                <li key={i} className="d-flex skill-li skill-body">
                  <div className="title">{skillName}</div>
                  <div className="total">
                    <SkillDisplay
                      skillName={skillName}
                      skillValue={character[`additional_knowledge_${i}_total`]}
                      skillId={`additional_knowledge_${i}_total`}
                      onClick={handleSkillClick}
                    />
                  </div>
                  <div className="breakdown">
                    <span className="initial">{displayInitial(character[`additional_knowledge_${i}_initial`], 1)}</span>|
                    <span className="atai">{character[`additional_knowledge_${i}_job`] || '-'}</span>|
                    <span className="atai">{character[`additional_knowledge_${i}_interest`] || '-'}</span>|
                    <span className="atai">{character[`additional_knowledge_${i}_growth`] || '-'}</span>|
                    <span className="atai">{character[`additional_knowledge_${i}_other`] || '-'}</span>
                  </div>
                </li>
              );
            }
          }
          return additionalKnowledgeSkills;
        })()}
      </ul>
    </li>
  );
}