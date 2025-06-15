import React, { useState, useEffect } from 'react';
import SkillDisplay from '../SkillDisplay';

interface SkillsDisplayProps {
  character: any;
  characterId: string;
  handleSkillClick: (skillName: string, skillValue: number) => void;
}

export default function SkillsDisplay({ character, characterId, handleSkillClick }: SkillsDisplayProps) {
  // 技能表示の状態（デフォルトは初期値以外のみ表示）
  const [showAllSkills, setShowAllSkills] = useState(false);

  // 初期値を表示するヘルパー関数（初期値は必ず数字を表示）
  const displayInitial = (value: any, defaultValue: number = 0): string => {
    if (value !== undefined && value !== null && value !== '') {
      return String(value);
    }
    return String(defaultValue);
  };

  // 技能が初期値のみかどうかを判定
  const isSkillInitialOnly = (skillPrefix: string): boolean => {
    // 職業、興味、成長、その他のいずれかに値があるかチェック
    const job = character[`${skillPrefix}_job`];
    const interest = character[`${skillPrefix}_interest`];
    const growth = character[`${skillPrefix}_growth`];
    const other = character[`${skillPrefix}_other`];

    return !(job || interest || growth || other);
  };

  // localStorage から UI 状態を復元（キャラクターID別）
  useEffect(() => {
    if (typeof window !== 'undefined' && characterId) {
      const savedShowAllSkills = localStorage.getItem(`character-display-showAllSkills-${characterId}`);
      if (savedShowAllSkills !== null) {
        setShowAllSkills(JSON.parse(savedShowAllSkills));
      }
    }
  }, [characterId]);

  // UI 状態を localStorage に保存（キャラクターID別）
  useEffect(() => {
    if (typeof window !== 'undefined' && characterId) {
      localStorage.setItem(`character-display-showAllSkills-${characterId}`, JSON.stringify(showAllSkills));
    }
  }, [showAllSkills, characterId]);

  return (
    <>
      {/* 技能表示切り替えボタン */}
      <div className="skill-toggle-container" style={{ textAlign: 'right', marginBottom: '10px' }}>
        <div className="segmented-toggle">
          <button
            type="button"
            className={showAllSkills ? 'active' : ''}
            onClick={() => setShowAllSkills(!showAllSkills)}
          >
            全表示
          </button>
          <button
            type="button"
            className={!showAllSkills ? 'active' : ''}
            onClick={() => setShowAllSkills(!showAllSkills)}
          >
            初期値の技能を隠す
          </button>
        </div>
      </div>

      {/* 技能セクション */}
      <div className="skill">
        <ul className="d-flex">
          {/* 戦闘技能 */}
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
                <li className="d-flex skill-li skill-body">
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
                <li className="d-flex skill-li skill-body">
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
                <li className="d-flex skill-li skill-body">
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
                <li className="d-flex skill-li skill-body">
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
                <li className="d-flex skill-li skill-body">
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
                <li className="d-flex skill-li skill-body">
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
                <li className="d-flex skill-li skill-body">
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
                <li className="d-flex skill-li skill-body">
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
                <li className="d-flex skill-li skill-body">
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
                <li className="d-flex skill-li skill-body">
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
                <li className="d-flex skill-li skill-body">
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
                <li className="d-flex skill-li skill-body">
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
                    additionalCombatSkills.push(
                      <li key={i} className="d-flex skill-li skill-body">
                        <div className="title">{skillName}</div>
                        <div className="total">
                          <SkillDisplay
                            skillName={skillName}
                            skillValue={character[`additional_combat_${i}_total`]}
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

          {/* 探索技能 */}
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

              {(showAllSkills || !isSkillInitialOnly('stealth')) && (
                <li className="d-flex skill-li skill-body">
                  <div className="title">忍び歩き</div>
                  <div className="total">
                    <SkillDisplay
                      skillName="忍び歩き"
                      skillValue={character.stealth_total}
                      skillId="stealth_total"
                      onClick={handleSkillClick}
                    />
                  </div>
                  <div className="breakdown">
                    <span className="initial" id="stealth_initial">{displayInitial(character.stealth_initial, 10)}</span>|
                    <span className="atai" id="stealth_job">{character.stealth_job || '-'}</span>|
                    <span className="atai" id="stealth_interest">{character.stealth_interest || '-'}</span>|
                    <span className="atai" id="stealth_growth">{character.stealth_growth || '-'}</span>|
                    <span className="atai" id="stealth_other">{character.stealth_other || '-'}</span>
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
                    additionalExplorationSkills.push(
                      <li key={i} className="d-flex skill-li skill-body">
                        <div className="title">{skillName}</div>
                        <div className="total">
                          <SkillDisplay
                            skillName={skillName}
                            skillValue={character[`additional_exploration_${i}_total`]}
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

          {/* 行動技能 */}
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

          {/* 交渉技能 */}
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

          {/* 知識技能 */}
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
        </ul>
      </div>
    </>
  );
}