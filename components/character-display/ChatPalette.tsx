import React from 'react';

interface ChatPaletteProps {
  character: any;
}

export default function ChatPalette({ character }: ChatPaletteProps) {
  const generateChatPalette = () => {
    let palette = `CCB<=
CCB<=${character.current_san || character.max_san_value || 0} SANチェック
CCB<=${character.idea_total || 0} アイデア
CCB<=${character.luck_total || 0} 幸運
CCB<=${character.knowledge_total || 0} 知識

▼戦闘技能-------------------------------------
CCB<=${character.dodge_total || 0} 回避
CCB<=${character.grapple_total || 0} 組み付き
CCB<=${character.throw_total || 0} 投擲
CCB<=${character.handgun_total || 0} 拳銃
CCB<=${character.submachine_gun_total || 0} サブマシンガン
CCB<=${character.shotgun_total || 0} ショットガン
CCB<=${character.machine_gun_total || 0} マシンガン
CCB<=${character.rifle_total || 0} ライフル
CCB<=${character.martial_arts_total || 0} マーシャルアーツ
CCB<=${character.kick_total || 0} キック
CBRB(${character.kick_total || 0},${character.martial_arts_total || 0}) キック+MA
CCB<=${character.punch_total || 0} こぶし
CBRB(${character.punch_total || 0},${character.martial_arts_total || 0}) こぶし+MA
CCB<=${character.headbutt_total || 0} 頭突き
CBRB(${character.headbutt_total || 0},${character.martial_arts_total || 0}) 頭突き+MA`;

    // 追加戦闘技能
    for (let i = 1; i <= 50; i++) {
      const skillName = character[`additional_combat_${i}_name`];
      if (skillName) {
        const skillTotal =
          (parseInt(character[`additional_combat_${i}_initial`] as string) || 1) +
          (parseInt(character[`additional_combat_${i}_job`] as string) || 0) +
          (parseInt(character[`additional_combat_${i}_interest`] as string) || 0) +
          (parseInt(character[`additional_combat_${i}_growth`] as string) || 0) +
          (parseInt(character[`additional_combat_${i}_other`] as string) || 0);
        palette += `\nCCB<=${skillTotal} ${skillName}`;
      }
    }

    palette += `

▼探索技能-------------------------------------
CCB<=${character.first_aid_total || 0} 応急手当
CCB<=${character.locksmith_total || 0} 鍵開け
CCB<=${character.hide_total || 0} 隠す
CCB<=${character.sneak_total || 0} 隠れる
CCB<=${character.listen_total || 0} 聞き耳
CCB<=${character.sneak_total || 0} 忍び歩き
CCB<=${character.photography_total || 0} 写真術
CCB<=${character.psychoanalysis_total || 0} 精神分析
CCB<=${character.track_total || 0} 追跡
CCB<=${character.climb_total || 0} 登攀
CCB<=${character.library_use_total || 0} 図書館
CCB<=${character.spot_hidden_total || 0} 目星`;

    // 追加探索技能
    for (let i = 1; i <= 50; i++) {
      const skillName = character[`additional_exploration_${i}_name`];
      if (skillName) {
        const skillTotal =
          (parseInt(character[`additional_exploration_${i}_initial`] as string) || 1) +
          (parseInt(character[`additional_exploration_${i}_job`] as string) || 0) +
          (parseInt(character[`additional_exploration_${i}_interest`] as string) || 0) +
          (parseInt(character[`additional_exploration_${i}_growth`] as string) || 0) +
          (parseInt(character[`additional_exploration_${i}_other`] as string) || 0);
        palette += `\nCCB<=${skillTotal} ${skillName}`;
      }
    }

    palette += `

▼行動技能-------------------------------------
CCB<=${character.drive_total || 0} 運転
CCB<=${character.mechanical_repair_total || 0} 機械修理
CCB<=${character.heavy_machinery_total || 0} 重機械操作
CCB<=${character.ride_total || 0} 乗馬
CCB<=${character.swim_total || 0} 水泳
CCB<=${character.craft_total || 0} 制作
CCB<=${character.pilot_total || 0} 操縦
CCB<=${character.jump_total || 0} 跳躍
CCB<=${character.electrical_repair_total || 0} 電気修理
CCB<=${character.navigate_total || 0} ナビゲート
CCB<=${character.disguise_total || 0} 変装`;

    // 追加行動技能
    for (let i = 1; i <= 50; i++) {
      const skillName = character[`additional_action_${i}_name`];
      if (skillName) {
        const skillTotal =
          (parseInt(character[`additional_action_${i}_initial`] as string) || 1) +
          (parseInt(character[`additional_action_${i}_job`] as string) || 0) +
          (parseInt(character[`additional_action_${i}_interest`] as string) || 0) +
          (parseInt(character[`additional_action_${i}_growth`] as string) || 0) +
          (parseInt(character[`additional_action_${i}_other`] as string) || 0);
        palette += `\nCCB<=${skillTotal} ${skillName}`;
      }
    }

    palette += `

▼交渉技能-------------------------------------
CCB<=${character.fast_talk_total || 0} 言いくるめ
CCB<=${character.credit_rating_total || 0} 信用
CCB<=${character.persuade_total || 0} 説得
CCB<=${character.bargain_total || 0} 値切り
CCB<=${character.mother_tongue_total || 0} 母国語`;

    // 追加交渉技能
    for (let i = 1; i <= 50; i++) {
      const skillName = character[`additional_negotiation_${i}_name`];
      if (skillName) {
        const skillTotal =
          (parseInt(character[`additional_negotiation_${i}_initial`] as string) || 1) +
          (parseInt(character[`additional_negotiation_${i}_job`] as string) || 0) +
          (parseInt(character[`additional_negotiation_${i}_interest`] as string) || 0) +
          (parseInt(character[`additional_negotiation_${i}_growth`] as string) || 0) +
          (parseInt(character[`additional_negotiation_${i}_other`] as string) || 0);
        palette += `\nCCB<=${skillTotal} ${skillName}`;
      }
    }

    palette += `

▼知識技能-------------------------------------
CCB<=${character.medicine_total || 0} 医学
CCB<=${character.occult_total || 0} オカルト
CCB<=${character.chemistry_total || 0} 化学
CCB<=${character.cthulhu_mythos_total || 0} クトゥルフ神話
CCB<=${character.art_total || 0} 芸術
CCB<=${character.accounting_total || 0} 経理
CCB<=${character.archaeology_total || 0} 考古学
CCB<=${character.computer_use_total || 0} コンピューター
CCB<=${character.psychology_total || 0} 心理学
CCB<=${character.anthropology_total || 0} 人類学
CCB<=${character.biology_total || 0} 生物学
CCB<=${character.geology_total || 0} 地質学
CCB<=${character.electronics_total || 0} 電子工学
CCB<=${character.astronomy_total || 0} 天文学
CCB<=${character.natural_history_total || 0} 博物学
CCB<=${character.physics_total || 0} 物理学
CCB<=${character.law_total || 0} 法律
CCB<=${character.pharmacy_total || 0} 薬学
CCB<=${character.history_total || 0} 歴史`;

    // 追加知識技能
    for (let i = 1; i <= 50; i++) {
      const skillName = character[`additional_knowledge_${i}_name`];
      if (skillName) {
        const skillTotal =
          (parseInt(character[`additional_knowledge_${i}_initial`] as string) || 1) +
          (parseInt(character[`additional_knowledge_${i}_job`] as string) || 0) +
          (parseInt(character[`additional_knowledge_${i}_interest`] as string) || 0) +
          (parseInt(character[`additional_knowledge_${i}_growth`] as string) || 0) +
          (parseInt(character[`additional_knowledge_${i}_other`] as string) || 0);
        palette += `\nCCB<=${skillTotal} ${skillName}`;
      }
    }

    palette += `
▼×5-------------------------------------
CCB<=({STR}*5) STR*5
CCB<=({CON}*5) CON*5
CCB<=({POW}*5) POW*5
CCB<=({DEX}*5) DEX*5
CCB<=({APP}*5) APP*5
CCB<=({SIZ}*5) SIZ*5
CCB<=({INT}*5) INT*5
CCB<=({EDU}*5) EDU*5
▼×4-------------------------------------
CCB<=({STR}*4) STR*4
CCB<=({CON}*4) CON*4
CCB<=({POW}*4) POW*4
CCB<=({DEX}*4) DEX*4
CCB<=({APP}*4) APP*4
CCB<=({SIZ}*4) SIZ*4
CCB<=({INT}*4) INT*4
CCB<=({EDU}*4) EDU*4
▼×3-------------------------------------
CCB<=({STR}*3) STR*3
CCB<=({CON}*3) CON*3
CCB<=({POW}*3) POW*3
CCB<=({DEX}*3) DEX*3
CCB<=({APP}*3) APP*3
CCB<=({SIZ}*3) SIZ*3
CCB<=({INT}*3) INT*3
CCB<=({EDU}*3) EDU*3
▼×2-------------------------------------
CCB<=({STR}*2) STR*2
CCB<=({CON}*2) CON*2
CCB<=({POW}*2) POW*2
CCB<=({DEX}*2) DEX*2
CCB<=({APP}*2) APP*2
CCB<=({SIZ}*2) SIZ*2
CCB<=({INT}*2) INT*2
CCB<=({EDU}*2) EDU*2

▼対抗-------------------------------------
RESB({STR}-対抗値) STR対抗
RESB({CON}-対抗値) CON対抗
RESB({POW}-対抗値) POW対抗
RESB({DEX}-対抗値) DEX対抗
RESB({APP}-対抗値) APP対抗
RESB({SIZ}-対抗値) SIZ対抗
RESB({INT}-対抗値) INT対抗
RESB({EDU}-対抗値) EDU対抗

▼ダメ―ジ-------------------------------------
1D3${character.damage_bonus === '0' ? '+{DB}' : '{DB}'} こぶしダメージ
2D3${character.damage_bonus === '0' ? '+{DB}' : '{DB}'} こぶし+MAダメージ
1D6${character.damage_bonus === '0' ? '+{DB}' : '{DB}'} キックダメージ
2D6${character.damage_bonus === '0' ? '+{DB}' : '{DB}'} キック+MAダメージ
1D4${character.damage_bonus === '0' ? '+{DB}' : '{DB}'} 頭突きダメージ
2D4${character.damage_bonus === '0' ? '+{DB}' : '{DB}'} 頭突き+MAダメージ
1Dn${character.damage_bonus === '0' ? '+{DB}' : '{DB}'}/2 投擲ダメージ`;

    // 武器ダメージ
    for (let i = 1; i <= 50; i++) {
      const weaponName = character[`weapon_${i}_name`];
      const weaponDamage = character[`weapon_${i}_damage`];
      if (weaponName && weaponDamage) {
        palette += `\n${weaponDamage} ${weaponName} ダメ―ジ`;
      }
    }

    palette += `

▼回復-------------------------------------
1D3応急手当回復
1D3 SAN回復

▼コマンド-------------------------------------
:SAN+
:SAN-
:HP+
:HP-
:MP+
:MP-`;

    return palette;
  };

  const copyToClipboard = () => {
    const palette = generateChatPalette();
    navigator.clipboard.writeText(palette).then(() => {
      alert('ココフォリアのチャットパレットをクリップボードにコピーしました！');
    }, () => {
      // フォールバック：テキストエリアを作成してコピー
      const textArea = document.createElement('textarea');
      textArea.value = palette;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('ココフォリアのチャットパレットをクリップボードにコピーしました！');
    });
  };

  return (
    <li className="skill-group">
      <textarea
        readOnly
        value={generateChatPalette()}
      />
      <button
        onClick={copyToClipboard}
        style={{
          marginTop: '5px',
          padding: '5px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        <i className="fas fa-copy" style={{ marginRight: '5px' }}></i>
        チャットパレットをコピー
      </button>
    </li>
  );
}