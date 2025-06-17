import React from 'react';
import SkillDisplay from '../../SkillDisplay';

interface ExplorationSkillsProps {
  character: any;
  showAllSkills: boolean;
  displayInitial: (value: any, defaultValue: number) => string;
  isSkillInitialOnly: (skillPrefix: string) => boolean;
  handleSkillClick: (skillName: string, skillValue: number) => void;
}

export default function ExplorationSkills({
  character,
  showAllSkills,
  displayInitial,
  isSkillInitialOnly,
  handleSkillClick
}: ExplorationSkillsProps) {
  return (
    <li className="skill-group">
      <h3><i className="fas fa-search"></i> 探索技能</h3>
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

        {(showAllSkills || !isSkillInitialOnly('first_aid')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">応急手当</div>
            <div className="total">
              <SkillDisplay
                skillName="応急手当"
                skillValue={character.first_aid_total}
                skillId="first_aid_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="first_aid_initial">{displayInitial(character.first_aid_initial, 30)}</span>|
              <span className="atai" id="first_aid_job">{character.first_aid_job || '-'}</span>|
              <span className="atai" id="first_aid_interest">{character.first_aid_interest || '-'}</span>|
              <span className="atai" id="first_aid_growth">{character.first_aid_growth || '-'}</span>|
              <span className="atai" id="first_aid_other">{character.first_aid_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('locksmith')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">鍵開け</div>
            <div className="total">
              <SkillDisplay
                skillName="鍵開け"
                skillValue={character.locksmith_total}
                skillId="locksmith_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="locksmith_initial">{displayInitial(character.locksmith_initial, 1)}</span>|
              <span className="atai" id="locksmith_job">{character.locksmith_job || '-'}</span>|
              <span className="atai" id="locksmith_interest">{character.locksmith_interest || '-'}</span>|
              <span className="atai" id="locksmith_growth">{character.locksmith_growth || '-'}</span>|
              <span className="atai" id="locksmith_other">{character.locksmith_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('hide')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">隠す</div>
            <div className="total">
              <SkillDisplay
                skillName="隠す"
                skillValue={character.hide_total}
                skillId="hide_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="hide_initial">{displayInitial(character.hide_initial, 15)}</span>|
              <span className="atai" id="hide_job">{character.hide_job || '-'}</span>|
              <span className="atai" id="hide_interest">{character.hide_interest || '-'}</span>|
              <span className="atai" id="hide_growth">{character.hide_growth || '-'}</span>|
              <span className="atai" id="hide_other">{character.hide_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('sneak')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">隠れる</div>
            <div className="total">
              <SkillDisplay
                skillName="隠れる"
                skillValue={character.sneak_total}
                skillId="sneak_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="sneak_initial">{displayInitial(character.sneak_initial, 10)}</span>|
              <span className="atai" id="sneak_job">{character.sneak_job || '-'}</span>|
              <span className="atai" id="sneak_interest">{character.sneak_interest || '-'}</span>|
              <span className="atai" id="sneak_growth">{character.sneak_growth || '-'}</span>|
              <span className="atai" id="sneak_other">{character.sneak_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('listen')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">聞き耳</div>
            <div className="total">
              <SkillDisplay
                skillName="聞き耳"
                skillValue={character.listen_total}
                skillId="listen_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="listen_initial">{displayInitial(character.listen_initial, 25)}</span>|
              <span className="atai" id="listen_job">{character.listen_job || '-'}</span>|
              <span className="atai" id="listen_interest">{character.listen_interest || '-'}</span>|
              <span className="atai" id="listen_growth">{character.listen_growth || '-'}</span>|
              <span className="atai" id="listen_other">{character.listen_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('sneak')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">忍び歩き</div>
            <div className="total">
              <SkillDisplay
                skillName="忍び歩き"
                skillValue={character.sneak_total}
                skillId="sneak_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="sneak_initial">{displayInitial(character.sneak_initial, 10)}</span>|
              <span className="atai" id="sneak_job">{character.sneak_job || '-'}</span>|
              <span className="atai" id="sneak_interest">{character.sneak_interest || '-'}</span>|
              <span className="atai" id="sneak_growth">{character.sneak_growth || '-'}</span>|
              <span className="atai" id="sneak_other">{character.sneak_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('photography')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">写真術</div>
            <div className="total">
              <SkillDisplay
                skillName="写真術"
                skillValue={character.photography_total}
                skillId="photography_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="photography_initial">{displayInitial(character.photography_initial, 10)}</span>|
              <span className="atai" id="photography_job">{character.photography_job || '-'}</span>|
              <span className="atai" id="photography_interest">{character.photography_interest || '-'}</span>|
              <span className="atai" id="photography_growth">{character.photography_growth || '-'}</span>|
              <span className="atai" id="photography_other">{character.photography_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('psychoanalysis')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">精神分析</div>
            <div className="total">
              <SkillDisplay
                skillName="精神分析"
                skillValue={character.psychoanalysis_total}
                skillId="psychoanalysis_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="psychoanalysis_initial">{displayInitial(character.psychoanalysis_initial, 1)}</span>|
              <span className="atai" id="psychoanalysis_job">{character.psychoanalysis_job || '-'}</span>|
              <span className="atai" id="psychoanalysis_interest">{character.psychoanalysis_interest || '-'}</span>|
              <span className="atai" id="psychoanalysis_growth">{character.psychoanalysis_growth || '-'}</span>|
              <span className="atai" id="psychoanalysis_other">{character.psychoanalysis_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('track')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">追跡</div>
            <div className="total">
              <SkillDisplay
                skillName="追跡"
                skillValue={character.track_total}
                skillId="track_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="track_initial">{displayInitial(character.track_initial, 10)}</span>|
              <span className="atai" id="track_job">{character.track_job || '-'}</span>|
              <span className="atai" id="track_interest">{character.track_interest || '-'}</span>|
              <span className="atai" id="track_growth">{character.track_growth || '-'}</span>|
              <span className="atai" id="track_other">{character.track_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('climb')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">登攀</div>
            <div className="total">
              <SkillDisplay
                skillName="登攀"
                skillValue={character.climb_total}
                skillId="climb_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="climb_initial">{displayInitial(character.climb_initial, 40)}</span>|
              <span className="atai" id="climb_job">{character.climb_job || '-'}</span>|
              <span className="atai" id="climb_interest">{character.climb_interest || '-'}</span>|
              <span className="atai" id="climb_growth">{character.climb_growth || '-'}</span>|
              <span className="atai" id="climb_other">{character.climb_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('library_use')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">図書館</div>
            <div className="total">
              <SkillDisplay
                skillName="図書館"
                skillValue={character.library_use_total}
                skillId="library_use_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="library_use_initial">{displayInitial(character.library_use_initial, 25)}</span>|
              <span className="atai" id="library_use_job">{character.library_use_job || '-'}</span>|
              <span className="atai" id="library_use_interest">{character.library_use_interest || '-'}</span>|
              <span className="atai" id="library_use_growth">{character.library_use_growth || '-'}</span>|
              <span className="atai" id="library_use_other">{character.library_use_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('spot_hidden')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">目星</div>
            <div className="total">
              <SkillDisplay
                skillName="目星"
                skillValue={character.spot_hidden_total}
                skillId="spot_hidden_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="spot_hidden_initial">{displayInitial(character.spot_hidden_initial, 25)}</span>|
              <span className="atai" id="spot_hidden_job">{character.spot_hidden_job || '-'}</span>|
              <span className="atai" id="spot_hidden_interest">{character.spot_hidden_interest || '-'}</span>|
              <span className="atai" id="spot_hidden_growth">{character.spot_hidden_growth || '-'}</span>|
              <span className="atai" id="spot_hidden_other">{character.spot_hidden_other || '-'}</span>
            </div>
          </li>
        )}

        {/* 追加探索技能 */}
        {(() => {
          const additionalExplorationSkills = [];
          for (let i = 1; i <= 50; i++) {
            const skillName = character[`additional_exploration_${i}_name`];
            if (skillName && (showAllSkills || !isSkillInitialOnly(`additional_exploration_${i}`))) {
              const calculatedTotal = 
                (parseInt(character[`additional_exploration_${i}_initial`] as string) || 1) +
                (parseInt(character[`additional_exploration_${i}_job`] as string) || 0) +
                (parseInt(character[`additional_exploration_${i}_interest`] as string) || 0) +
                (parseInt(character[`additional_exploration_${i}_growth`] as string) || 0) +
                (parseInt(character[`additional_exploration_${i}_other`] as string) || 0);

              additionalExplorationSkills.push(
                <li key={i} className="d-flex skill-li skill-body">
                  <div className="title">{skillName}</div>
                  <div className="total">
                    <SkillDisplay
                      skillName={skillName}
                      skillValue={calculatedTotal}
                      skillId={`additional_exploration_${i}_total`}
                      onClick={handleSkillClick}
                    />
                  </div>
                  <div className="breakdown">
                    <span className="initial">{displayInitial(character[`additional_exploration_${i}_initial`], 1)}</span>|
                    <span className="atai">{character[`additional_exploration_${i}_job`] || '-'}</span>|
                    <span className="atai">{character[`additional_exploration_${i}_interest`] || '-'}</span>|
                    <span className="atai">{character[`additional_exploration_${i}_growth`] || '-'}</span>|
                    <span className="atai">{character[`additional_exploration_${i}_other`] || '-'}</span>
                  </div>
                </li>
              );
            }
          }
          return additionalExplorationSkills;
        })()}
      </ul>
    </li>
  );
}