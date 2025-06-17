import React from 'react';
import SkillDisplay from '../../SkillDisplay';

interface CombatSkillsProps {
  character: any;
  showAllSkills: boolean;
  displayInitial: (value: any, defaultValue: number) => string;
  isSkillInitialOnly: (skillPrefix: string) => boolean;
  handleSkillClick: (skillName: string, skillValue: number) => void;
}

export default function CombatSkills({
  character,
  showAllSkills,
  displayInitial,
  isSkillInitialOnly,
  handleSkillClick
}: CombatSkillsProps) {
  
  const getSkillRowClass = (skillPrefix: string) => {
    return `d-flex skill-li skill-body${isSkillInitialOnly(skillPrefix) ? ' skill-initial-only' : ''}`;
  };
  return (
    <li className="skill-group">
      <h3><i className="fas fa-fist-raised"></i> 戦闘技能</h3>
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

        {(showAllSkills || !isSkillInitialOnly('dodge')) && (
          <li className={getSkillRowClass('dodge')}>
            <div className="title">回避</div>
            <div className="total">
              <SkillDisplay
                skillName="回避"
                skillValue={character.dodge_total}
                skillId="dodge_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="dodge_initial">{displayInitial(character.dodge_initial, 25)}</span>|
              <span className="atai" id="dodge_job">{character.dodge_job || '-'}</span>|
              <span className="atai" id="dodge_interest">{character.dodge_interest || '-'}</span>|
              <span className="atai" id="dodge_growth">{character.dodge_growth || '-'}</span>|
              <span className="atai" id="dodge_other">{character.dodge_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('kick')) && (
          <li className={getSkillRowClass('kick')}>
            <div className="title">キック</div>
            <div className="total">
              <SkillDisplay
                skillName="キック"
                skillValue={character.kick_total}
                skillId="kick_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="kick_initial">{displayInitial(character.kick_initial, 25)}</span>|
              <span className="atai" id="kick_job">{character.kick_job || '-'}</span>|
              <span className="atai" id="kick_interest">{character.kick_interest || '-'}</span>|
              <span className="atai" id="kick_growth">{character.kick_growth || '-'}</span>|
              <span className="atai" id="kick_other">{character.kick_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('grapple')) && (
          <li className={getSkillRowClass('grapple')}>
            <div className="title">組み付き</div>
            <div className="total">
              <SkillDisplay
                skillName="組み付き"
                skillValue={character.grapple_total}
                skillId="grapple_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="grapple_initial">{displayInitial(character.grapple_initial, 25)}</span>|
              <span className="atai" id="grapple_job">{character.grapple_job || '-'}</span>|
              <span className="atai" id="grapple_interest">{character.grapple_interest || '-'}</span>|
              <span className="atai" id="grapple_growth">{character.grapple_growth || '-'}</span>|
              <span className="atai" id="grapple_other">{character.grapple_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('punch')) && (
          <li className={getSkillRowClass('punch')}>
            <div className="title">こぶし</div>
            <div className="total">
              <SkillDisplay
                skillName="こぶし"
                skillValue={character.punch_total}
                skillId="punch_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="punch_initial">{displayInitial(character.punch_initial, 50)}</span>|
              <span className="atai" id="punch_job">{character.punch_job || '-'}</span>|
              <span className="atai" id="punch_interest">{character.punch_interest || '-'}</span>|
              <span className="atai" id="punch_growth">{character.punch_growth || '-'}</span>|
              <span className="atai" id="punch_other">{character.punch_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('headbutt')) && (
          <li className={getSkillRowClass('headbutt')}>
            <div className="title">頭突き</div>
            <div className="total">
              <SkillDisplay
                skillName="頭突き"
                skillValue={character.headbutt_total}
                skillId="headbutt_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="headbutt_initial">{displayInitial(character.headbutt_initial, 10)}</span>|
              <span className="atai" id="headbutt_job">{character.headbutt_job || '-'}</span>|
              <span className="atai" id="headbutt_interest">{character.headbutt_interest || '-'}</span>|
              <span className="atai" id="headbutt_growth">{character.headbutt_growth || '-'}</span>|
              <span className="atai" id="headbutt_other">{character.headbutt_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('throw')) && (
          <li className={getSkillRowClass('throw')}>
            <div className="title">投擲</div>
            <div className="total">
              <SkillDisplay
                skillName="投擲"
                skillValue={character.throw_total}
                skillId="throw_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="throw_initial">{displayInitial(character.throw_initial, 25)}</span>|
              <span className="atai" id="throw_job">{character.throw_job || '-'}</span>|
              <span className="atai" id="throw_interest">{character.throw_interest || '-'}</span>|
              <span className="atai" id="throw_growth">{character.throw_growth || '-'}</span>|
              <span className="atai" id="throw_other">{character.throw_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('martial_arts')) && (
          <li className={getSkillRowClass('martial_arts')}>
            <div className="title">マーシャルアーツ</div>
            <div className="total">
              <SkillDisplay
                skillName="マーシャルアーツ"
                skillValue={character.martial_arts_total}
                skillId="martial_arts_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="martial_arts_initial">{displayInitial(character.martial_arts_initial, 1)}</span>|
              <span className="atai" id="martial_arts_job">{character.martial_arts_job || '-'}</span>|
              <span className="atai" id="martial_arts_interest">{character.martial_arts_interest || '-'}</span>|
              <span className="atai" id="martial_arts_growth">{character.martial_arts_growth || '-'}</span>|
              <span className="atai" id="martial_arts_other">{character.martial_arts_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('handgun')) && (
          <li className={getSkillRowClass('handgun')}>
            <div className="title">拳銃</div>
            <div className="total">
              <SkillDisplay
                skillName="拳銃"
                skillValue={character.handgun_total}
                skillId="handgun_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="handgun_initial">{displayInitial(character.handgun_initial, 20)}</span>|
              <span className="atai" id="handgun_job">{character.handgun_job || '-'}</span>|
              <span className="atai" id="handgun_interest">{character.handgun_interest || '-'}</span>|
              <span className="atai" id="handgun_growth">{character.handgun_growth || '-'}</span>|
              <span className="atai" id="handgun_other">{character.handgun_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('submachine_gun')) && (
          <li className={getSkillRowClass('submachine_gun')}>
            <div className="title">サブマシンガン</div>
            <div className="total">
              <SkillDisplay
                skillName="サブマシンガン"
                skillValue={character.submachine_gun_total}
                skillId="submachine_gun_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="submachine_gun_initial">{displayInitial(character.submachine_gun_initial, 15)}</span>|
              <span className="atai" id="submachine_gun_job">{character.submachine_gun_job || '-'}</span>|
              <span className="atai" id="submachine_gun_interest">{character.submachine_gun_interest || '-'}</span>|
              <span className="atai" id="submachine_gun_growth">{character.submachine_gun_growth || '-'}</span>|
              <span className="atai" id="submachine_gun_other">{character.submachine_gun_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('shotgun')) && (
          <li className={getSkillRowClass('shotgun')}>
            <div className="title">ショットガン</div>
            <div className="total">
              <SkillDisplay
                skillName="ショットガン"
                skillValue={character.shotgun_total}
                skillId="shotgun_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="shotgun_initial">{displayInitial(character.shotgun_initial, 30)}</span>|
              <span className="atai" id="shotgun_job">{character.shotgun_job || '-'}</span>|
              <span className="atai" id="shotgun_interest">{character.shotgun_interest || '-'}</span>|
              <span className="atai" id="shotgun_growth">{character.shotgun_growth || '-'}</span>|
              <span className="atai" id="shotgun_other">{character.shotgun_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('machine_gun')) && (
          <li className={getSkillRowClass('machine_gun')}>
            <div className="title">マシンガン</div>
            <div className="total">
              <SkillDisplay
                skillName="マシンガン"
                skillValue={character.machine_gun_total}
                skillId="machine_gun_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="machine_gun_initial">{displayInitial(character.machine_gun_initial, 15)}</span>|
              <span className="atai" id="machine_gun_job">{character.machine_gun_job || '-'}</span>|
              <span className="atai" id="machine_gun_interest">{character.machine_gun_interest || '-'}</span>|
              <span className="atai" id="machine_gun_growth">{character.machine_gun_growth || '-'}</span>|
              <span className="atai" id="machine_gun_other">{character.machine_gun_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('rifle')) && (
          <li className={getSkillRowClass('rifle')}>
            <div className="title">ライフル</div>
            <div className="total">
              <SkillDisplay
                skillName="ライフル"
                skillValue={character.rifle_total}
                skillId="rifle_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="rifle_initial">{displayInitial(character.rifle_initial, 25)}</span>|
              <span className="atai" id="rifle_job">{character.rifle_job || '-'}</span>|
              <span className="atai" id="rifle_interest">{character.rifle_interest || '-'}</span>|
              <span className="atai" id="rifle_growth">{character.rifle_growth || '-'}</span>|
              <span className="atai" id="rifle_other">{character.rifle_other || '-'}</span>
            </div>
          </li>
        )}

        {/* 追加戦闘技能 */}
        {(() => {
          const additionalCombatSkills = [];
          for (let i = 1; i <= 50; i++) {
            const skillName = character[`additional_combat_${i}_name`];
            if (skillName && (showAllSkills || !isSkillInitialOnly(`additional_combat_${i}`))) {
              const calculatedTotal = 
                (parseInt(character[`additional_combat_${i}_initial`] as string) || 1) +
                (parseInt(character[`additional_combat_${i}_job`] as string) || 0) +
                (parseInt(character[`additional_combat_${i}_interest`] as string) || 0) +
                (parseInt(character[`additional_combat_${i}_growth`] as string) || 0) +
                (parseInt(character[`additional_combat_${i}_other`] as string) || 0);

              additionalCombatSkills.push(
                <li key={i} className={getSkillRowClass(`additional_combat_${i}`)}>
                  <div className="title">{skillName}</div>
                  <div className="total">
                    <SkillDisplay
                      skillName={skillName}
                      skillValue={calculatedTotal}
                      skillId={`additional_combat_${i}_total`}
                      onClick={handleSkillClick}
                    />
                  </div>
                  <div className="breakdown">
                    <span className="initial">{displayInitial(character[`additional_combat_${i}_initial`], 1)}</span>|
                    <span className="atai">{character[`additional_combat_${i}_job`] || '-'}</span>|
                    <span className="atai">{character[`additional_combat_${i}_interest`] || '-'}</span>|
                    <span className="atai">{character[`additional_combat_${i}_growth`] || '-'}</span>|
                    <span className="atai">{character[`additional_combat_${i}_other`] || '-'}</span>
                  </div>
                </li>
              );
            }
          }
          return additionalCombatSkills;
        })()}
      </ul>
    </li>
  );
}