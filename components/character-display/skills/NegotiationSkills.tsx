import React from 'react';
import SkillDisplay from '../../SkillDisplay';

interface NegotiationSkillsProps {
  character: any;
  showAllSkills: boolean;
  displayInitial: (value: any, defaultValue: number) => string;
  isSkillInitialOnly: (skillPrefix: string) => boolean;
  handleSkillClick: (skillName: string, skillValue: number) => void;
}

export default function NegotiationSkills({
  character,
  showAllSkills,
  displayInitial,
  isSkillInitialOnly,
  handleSkillClick
}: NegotiationSkillsProps) {
  return (
    <li className="skill-group">
      <h3><i className="fas fa-comments"></i> 交渉技能</h3>
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

        {(showAllSkills || !isSkillInitialOnly('fast_talk')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">言いくるめ</div>
            <div className="total">
              <SkillDisplay
                skillName="言いくるめ"
                skillValue={character.fast_talk_total}
                skillId="fast_talk_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="fast_talk_initial">{displayInitial(character.fast_talk_initial, 5)}</span>|
              <span className="atai" id="fast_talk_job">{character.fast_talk_job || '-'}</span>|
              <span className="atai" id="fast_talk_interest">{character.fast_talk_interest || '-'}</span>|
              <span className="atai" id="fast_talk_growth">{character.fast_talk_growth || '-'}</span>|
              <span className="atai" id="fast_talk_other">{character.fast_talk_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('credit_rating')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">信用</div>
            <div className="total">
              <SkillDisplay
                skillName="信用"
                skillValue={character.credit_rating_total}
                skillId="credit_rating_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="credit_rating_initial">{displayInitial(character.credit_rating_initial, 15)}</span>|
              <span className="atai" id="credit_rating_job">{character.credit_rating_job || '-'}</span>|
              <span className="atai" id="credit_rating_interest">{character.credit_rating_interest || '-'}</span>|
              <span className="atai" id="credit_rating_growth">{character.credit_rating_growth || '-'}</span>|
              <span className="atai" id="credit_rating_other">{character.credit_rating_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('persuade')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">説得</div>
            <div className="total">
              <SkillDisplay
                skillName="説得"
                skillValue={character.persuade_total}
                skillId="persuade_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="persuade_initial">{displayInitial(character.persuade_initial, 15)}</span>|
              <span className="atai" id="persuade_job">{character.persuade_job || '-'}</span>|
              <span className="atai" id="persuade_interest">{character.persuade_interest || '-'}</span>|
              <span className="atai" id="persuade_growth">{character.persuade_growth || '-'}</span>|
              <span className="atai" id="persuade_other">{character.persuade_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('bargain')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">値切り</div>
            <div className="total">
              <SkillDisplay
                skillName="値切り"
                skillValue={character.bargain_total}
                skillId="bargain_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="bargain_initial">{displayInitial(character.bargain_initial, 5)}</span>|
              <span className="atai" id="bargain_job">{character.bargain_job || '-'}</span>|
              <span className="atai" id="bargain_interest">{character.bargain_interest || '-'}</span>|
              <span className="atai" id="bargain_growth">{character.bargain_growth || '-'}</span>|
              <span className="atai" id="bargain_other">{character.bargain_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('own_language')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">母国語</div>
            <div className="total">
              <SkillDisplay
                skillName="母国語"
                skillValue={character.own_language_total}
                skillId="own_language_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="own_language_initial">{displayInitial(character.own_language_initial, character.edu_total || 0)}</span>|
              <span className="atai" id="own_language_job">{character.own_language_job || '-'}</span>|
              <span className="atai" id="own_language_interest">{character.own_language_interest || '-'}</span>|
              <span className="atai" id="own_language_growth">{character.own_language_growth || '-'}</span>|
              <span className="atai" id="own_language_other">{character.own_language_other || '-'}</span>
            </div>
          </li>
        )}

        {/* 追加交渉技能 */}
        {(() => {
          const additionalNegotiationSkills = [];
          for (let i = 1; i <= 50; i++) {
            const skillName = character[`additional_negotiation_${i}_name`];
            if (skillName && (showAllSkills || !isSkillInitialOnly(`additional_negotiation_${i}`))) {
              additionalNegotiationSkills.push(
                <li key={i} className="d-flex skill-li skill-body">
                  <div className="title">{skillName}</div>
                  <div className="total">
                    <SkillDisplay
                      skillName={skillName}
                      skillValue={character[`additional_negotiation_${i}_total`]}
                      skillId={`additional_negotiation_${i}_total`}
                      onClick={handleSkillClick}
                    />
                  </div>
                  <div className="breakdown">
                    <span className="initial">{displayInitial(character[`additional_negotiation_${i}_initial`], 1)}</span>|
                    <span className="atai">{character[`additional_negotiation_${i}_job`] || '-'}</span>|
                    <span className="atai">{character[`additional_negotiation_${i}_interest`] || '-'}</span>|
                    <span className="atai">{character[`additional_negotiation_${i}_growth`] || '-'}</span>|
                    <span className="atai">{character[`additional_negotiation_${i}_other`] || '-'}</span>
                  </div>
                </li>
              );
            }
          }
          return additionalNegotiationSkills;
        })()}
      </ul>
    </li>
  );
}