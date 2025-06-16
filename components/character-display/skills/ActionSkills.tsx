import React from 'react';
import SkillDisplay from '../../SkillDisplay';

interface ActionSkillsProps {
  character: any;
  showAllSkills: boolean;
  displayInitial: (value: any, defaultValue: number) => string;
  isSkillInitialOnly: (skillPrefix: string) => boolean;
  handleSkillClick: (skillName: string, skillValue: number) => void;
}

export default function ActionSkills({
  character,
  showAllSkills,
  displayInitial,
  isSkillInitialOnly,
  handleSkillClick
}: ActionSkillsProps) {
  return (
    <li className="skill-group">
      <h3><i className="fas fa-running"></i> 行動技能</h3>
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

        {(showAllSkills || !isSkillInitialOnly('drive_auto')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">運転</div>
            <div className="total">
              <SkillDisplay
                skillName="運転"
                skillValue={character.drive_auto_total}
                skillId="drive_auto_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="drive_auto_initial">{displayInitial(character.drive_auto_initial, 20)}</span>|
              <span className="atai" id="drive_auto_job">{character.drive_auto_job || '-'}</span>|
              <span className="atai" id="drive_auto_interest">{character.drive_auto_interest || '-'}</span>|
              <span className="atai" id="drive_auto_growth">{character.drive_auto_growth || '-'}</span>|
              <span className="atai" id="drive_auto_other">{character.drive_auto_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('mechanical_repair')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">機械修理</div>
            <div className="total">
              <SkillDisplay
                skillName="機械修理"
                skillValue={character.mechanical_repair_total}
                skillId="mechanical_repair_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="mechanical_repair_initial">{displayInitial(character.mechanical_repair_initial, 20)}</span>|
              <span className="atai" id="mechanical_repair_job">{character.mechanical_repair_job || '-'}</span>|
              <span className="atai" id="mechanical_repair_interest">{character.mechanical_repair_interest || '-'}</span>|
              <span className="atai" id="mechanical_repair_growth">{character.mechanical_repair_growth || '-'}</span>|
              <span className="atai" id="mechanical_repair_other">{character.mechanical_repair_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('operate_heavy_machine')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">重機械操作</div>
            <div className="total">
              <SkillDisplay
                skillName="重機械操作"
                skillValue={character.operate_heavy_machine_total}
                skillId="operate_heavy_machine_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="operate_heavy_machine_initial">{displayInitial(character.operate_heavy_machine_initial, 1)}</span>|
              <span className="atai" id="operate_heavy_machine_job">{character.operate_heavy_machine_job || '-'}</span>|
              <span className="atai" id="operate_heavy_machine_interest">{character.operate_heavy_machine_interest || '-'}</span>|
              <span className="atai" id="operate_heavy_machine_growth">{character.operate_heavy_machine_growth || '-'}</span>|
              <span className="atai" id="operate_heavy_machine_other">{character.operate_heavy_machine_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('ride')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">乗馬</div>
            <div className="total">
              <SkillDisplay
                skillName="乗馬"
                skillValue={character.ride_total}
                skillId="ride_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="ride_initial">{displayInitial(character.ride_initial, 5)}</span>|
              <span className="atai" id="ride_job">{character.ride_job || '-'}</span>|
              <span className="atai" id="ride_interest">{character.ride_interest || '-'}</span>|
              <span className="atai" id="ride_growth">{character.ride_growth || '-'}</span>|
              <span className="atai" id="ride_other">{character.ride_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('swim')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">水泳</div>
            <div className="total">
              <SkillDisplay
                skillName="水泳"
                skillValue={character.swim_total}
                skillId="swim_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="swim_initial">{displayInitial(character.swim_initial, 25)}</span>|
              <span className="atai" id="swim_job">{character.swim_job || '-'}</span>|
              <span className="atai" id="swim_interest">{character.swim_interest || '-'}</span>|
              <span className="atai" id="swim_growth">{character.swim_growth || '-'}</span>|
              <span className="atai" id="swim_other">{character.swim_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('craft')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">制作</div>
            <div className="total">
              <SkillDisplay
                skillName="制作"
                skillValue={character.craft_total}
                skillId="craft_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="craft_initial">{displayInitial(character.craft_initial, 5)}</span>|
              <span className="atai" id="craft_job">{character.craft_job || '-'}</span>|
              <span className="atai" id="craft_interest">{character.craft_interest || '-'}</span>|
              <span className="atai" id="craft_growth">{character.craft_growth || '-'}</span>|
              <span className="atai" id="craft_other">{character.craft_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('pilot')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">操縦</div>
            <div className="total">
              <SkillDisplay
                skillName="操縦"
                skillValue={character.pilot_total}
                skillId="pilot_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="pilot_initial">{displayInitial(character.pilot_initial, 1)}</span>|
              <span className="atai" id="pilot_job">{character.pilot_job || '-'}</span>|
              <span className="atai" id="pilot_interest">{character.pilot_interest || '-'}</span>|
              <span className="atai" id="pilot_growth">{character.pilot_growth || '-'}</span>|
              <span className="atai" id="pilot_other">{character.pilot_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('jump')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">跳躍</div>
            <div className="total">
              <SkillDisplay
                skillName="跳躍"
                skillValue={character.jump_total}
                skillId="jump_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="jump_initial">{displayInitial(character.jump_initial, 25)}</span>|
              <span className="atai" id="jump_job">{character.jump_job || '-'}</span>|
              <span className="atai" id="jump_interest">{character.jump_interest || '-'}</span>|
              <span className="atai" id="jump_growth">{character.jump_growth || '-'}</span>|
              <span className="atai" id="jump_other">{character.jump_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('electrical_repair')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">電気修理</div>
            <div className="total">
              <SkillDisplay
                skillName="電気修理"
                skillValue={character.electrical_repair_total}
                skillId="electrical_repair_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="electrical_repair_initial">{displayInitial(character.electrical_repair_initial, 10)}</span>|
              <span className="atai" id="electrical_repair_job">{character.electrical_repair_job || '-'}</span>|
              <span className="atai" id="electrical_repair_interest">{character.electrical_repair_interest || '-'}</span>|
              <span className="atai" id="electrical_repair_growth">{character.electrical_repair_growth || '-'}</span>|
              <span className="atai" id="electrical_repair_other">{character.electrical_repair_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('navigate')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">ナビゲート</div>
            <div className="total">
              <SkillDisplay
                skillName="ナビゲート"
                skillValue={character.navigate_total}
                skillId="navigate_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="navigate_initial">{displayInitial(character.navigate_initial, 10)}</span>|
              <span className="atai" id="navigate_job">{character.navigate_job || '-'}</span>|
              <span className="atai" id="navigate_interest">{character.navigate_interest || '-'}</span>|
              <span className="atai" id="navigate_growth">{character.navigate_growth || '-'}</span>|
              <span className="atai" id="navigate_other">{character.navigate_other || '-'}</span>
            </div>
          </li>
        )}

        {(showAllSkills || !isSkillInitialOnly('disguise')) && (
          <li className="d-flex skill-li skill-body">
            <div className="title">変装</div>
            <div className="total">
              <SkillDisplay
                skillName="変装"
                skillValue={character.disguise_total}
                skillId="disguise_total"
                onClick={handleSkillClick}
              />
            </div>
            <div className="breakdown">
              <span className="initial" id="disguise_initial">{displayInitial(character.disguise_initial, 1)}</span>|
              <span className="atai" id="disguise_job">{character.disguise_job || '-'}</span>|
              <span className="atai" id="disguise_interest">{character.disguise_interest || '-'}</span>|
              <span className="atai" id="disguise_growth">{character.disguise_growth || '-'}</span>|
              <span className="atai" id="disguise_other">{character.disguise_other || '-'}</span>
            </div>
          </li>
        )}

        {/* 追加行動技能 */}
        {(() => {
          const additionalActionSkills = [];
          for (let i = 1; i <= 50; i++) {
            const skillName = character[`additional_action_${i}_name`];
            if (skillName && (showAllSkills || !isSkillInitialOnly(`additional_action_${i}`))) {
              additionalActionSkills.push(
                <li key={i} className="d-flex skill-li skill-body">
                  <div className="title">{skillName}</div>
                  <div className="total">
                    <SkillDisplay
                      skillName={skillName}
                      skillValue={character[`additional_action_${i}_total`]}
                      skillId={`additional_action_${i}_total`}
                      onClick={handleSkillClick}
                    />
                  </div>
                  <div className="breakdown">
                    <span className="initial">{displayInitial(character[`additional_action_${i}_initial`], 1)}</span>|
                    <span className="atai">{character[`additional_action_${i}_job`] || '-'}</span>|
                    <span className="atai">{character[`additional_action_${i}_interest`] || '-'}</span>|
                    <span className="atai">{character[`additional_action_${i}_growth`] || '-'}</span>|
                    <span className="atai">{character[`additional_action_${i}_other`] || '-'}</span>
                  </div>
                </li>
              );
            }
          }
          return additionalActionSkills;
        })()}
      </ul>
    </li>
  );
}