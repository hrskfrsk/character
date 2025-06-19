// ココフォリア用のコマデータ生成機能

export interface CcfoliaCharacterData {
  kind: string;
  data: {
    name: string;
    memo: string;
    externalUrl: string;
    color: string;
    commands: string;
    initiative: number;
    status: Array<{
      label: string;
      value: number;
      max: number;
    }>;
    params: Array<{
      label: string;
      value: string;
    }>;
  };
}

export interface ExportOptions {
  skillOutput: 'all' | 'nonDefault';
  rollCommand: 'CCB' | 'CC';
  memoOptions: {
    blank: boolean;
    name: boolean;
    kana: boolean;
    job: boolean;
    sex: boolean;
    age: boolean;
    height: boolean;
    skills: boolean;
    items: boolean;
    features: boolean;
    jobSpecial: boolean;
  };
}

export function generateCcfoliaCharacterData(
  character: any,
  characterId: string,
  options?: ExportOptions
): CcfoliaCharacterData {
  // キャラクター名
  const name = character.character_name || "キャラクター";

  // デフォルトオプション
  const defaultOptions: ExportOptions = {
    skillOutput: 'all',
    rollCommand: 'CCB',
    memoOptions: {
      blank: false,
      name: true,
      kana: true,
      job: true,
      sex: true,
      age: true,
      height: true,
      skills: false,
      items: false,
      features: false,
      jobSpecial: false
    }
  };
  
  const exportOptions = options || defaultOptions;

  // メモ（基本情報）
  const generateMemo = () => {
    // 空白が選択されている場合は空文字を返す
    if (exportOptions.memoOptions.blank) {
      return '';
    }

    const parts = [];
    
    // 基本情報行
    const basicInfo = [];
    if (exportOptions.memoOptions.name && exportOptions.memoOptions.kana) {
      basicInfo.push(`${character.character_name || 'キャラクター'}(${character.character_name_kana || ''})`);
    } else if (exportOptions.memoOptions.name) {
      basicInfo.push(character.character_name || 'キャラクター');
    } else if (exportOptions.memoOptions.kana) {
      basicInfo.push(character.character_name_kana || character.character_name || 'キャラクター');
    }
    
    if (basicInfo.length > 0) {
      parts.push(basicInfo.join(''));
    }
    
    // 詳細情報行
    const details = [];
    if (exportOptions.memoOptions.job) details.push(character.job || '職業');
    if (exportOptions.memoOptions.sex) {
      // 性別の優先順位: gender_custom > sex > gender > デフォルト
      const sexValue = character.gender_custom || character.sex || character.gender || '性別';
      details.push(sexValue);
    }
    if (exportOptions.memoOptions.age) details.push(character.age || '年齢');
    if (exportOptions.memoOptions.height) details.push(character.height || '身長');
    
    if (details.length > 0) {
      parts.push(details.join(' | '));
    }
    
    parts.push(`(PL:${character.player_name || 'プレイヤー'})`);
    
    // 追加情報
    if (exportOptions.memoOptions.skills) {
      const skills: string[] = [];
      // 技能の初期値定義
      const skillInitialValues: Record<string, number> = {
        dodge: 30, grapple: 25, throw: 25, handgun: 20, submachine_gun: 15,
        shotgun: 30, machine_gun: 15, rifle: 25, martial_arts: 1, kick: 25,
        punch: 50, headbutt: 10, first_aid: 30, locksmith: 1, hide: 15,
        sneak: 10, listen: 25, photography: 10, psychoanalysis: 1, track: 10,
        climb: 40, library_use: 25, spot_hidden: 25, drive: 20, mechanical_repair: 20,
        heavy_machinery: 1, ride: 5, swim: 25, craft: 5, pilot: 1, jump: 25,
        electrical_repair: 10, navigate: 10, disguise: 1, fast_talk: 5,
        credit_rating: 15, persuade: 15, bargain: 5, mother_tongue: 0,
        medicine: 5, occult: 5, chemistry: 1, cthulhu_mythos: 0, art: 5,
        accounting: 10, archaeology: 1, computer_use: 1, psychology: 5,
        anthropology: 1, biology: 1, geology: 1, electronics: 1, astronomy: 1,
        natural_history: 10, physics: 1, law: 5, pharmacy: 1, history: 20
      };

      // 初期値以外の技能を収集
      Object.entries(skillInitialValues).forEach(([skillKey, initialValue]) => {
        const skillValue = character[`${skillKey}_total`] || 0;
        if (skillValue > initialValue) {
          const skillName = getSkillDisplayName(skillKey);
          skills.push(`${skillName}:${skillValue}%`);
        }
      });

      // 追加技能も確認
      ['combat', 'exploration', 'action', 'negotiation', 'knowledge'].forEach(category => {
        for (let i = 1; i <= 50; i++) {
          const skillName = character[`additional_${category}_${i}_name`];
          if (skillName) {
            const skillTotal =
              (parseInt(character[`additional_${category}_${i}_initial`] as string) || 1) +
              (parseInt(character[`additional_${category}_${i}_job`] as string) || 0) +
              (parseInt(character[`additional_${category}_${i}_interest`] as string) || 0) +
              (parseInt(character[`additional_${category}_${i}_growth`] as string) || 0) +
              (parseInt(character[`additional_${category}_${i}_other`] as string) || 0);
            if (skillTotal > 1) {
              skills.push(`${skillName}:${skillTotal}%`);
            }
          }
        }
      });

      if (skills.length > 0) {
        parts.push('\n【所持技能】\n' + skills.join(' | '));
      }
    }
    
    if (exportOptions.memoOptions.items) {
      const items: string[] = [];
      // 所持品を収集
      for (let i = 1; i <= 50; i++) {
        const itemName = character[`item_${i}_name`];
        const itemCount = character[`item_${i}_count`] || 1;
        if (itemName) {
          items.push(`${itemName}×${itemCount}`);
        }
      }
      if (items.length > 0) {
        parts.push('\n【所持品】\n' + items.join(', '));
      }
    }
    
    if (exportOptions.memoOptions.features) {
      const features: string[] = [];
      // trait_1_name, trait_2_name などの形式で特徴を収集
      for (let i = 1; i <= 10; i++) {
        const traitName = character[`trait_${i}_name`];
        const traitDescription = character[`trait_${i}_description`];
        const traitNumber = character[`trait_${i}_number`];
        
        if (traitName && traitName.trim() !== '') {
          let traitText = '';
          
          if (traitNumber) {
            traitText = `<${traitNumber}:${traitName}>`;
          } else {
            traitText = `<${traitName}>`;
          }
          
          if (traitDescription && traitDescription.trim() !== '') {
            traitText += `\n${traitDescription}`;
          }
          
          features.push(traitText);
        }
      }
      
      if (features.length > 0) {
        parts.push('\n【特徴表】\n' + features.join('\n'));
      }
    }
    
    if (exportOptions.memoOptions.jobSpecial) {
      const jobSpecial = character.job_special_notes || 
                        character.job_notes || 
                        character.job_special ||
                        character.occupation_notes ||
                        character.special_notes ||
                        character.job_memo ||
                        character.occupation_special;
      if (jobSpecial) {
        parts.push('\n【職業特記】\n' + jobSpecial);
      }
    }
    
    return parts.join('\n');
  };

  // 技能名の表示名を取得するヘルパー関数
  const getSkillDisplayName = (skillKey: string): string => {
    const skillNames: Record<string, string> = {
      dodge: '回避', grapple: '組み付き', throw: '投擲', handgun: '拳銃',
      submachine_gun: 'サブマシンガン', shotgun: 'ショットガン', machine_gun: 'マシンガン',
      rifle: 'ライフル', martial_arts: 'マーシャルアーツ', kick: 'キック',
      punch: 'こぶし', headbutt: '頭突き', first_aid: '応急手当', locksmith: '鍵開け',
      hide: '隠す', sneak: '隠れる', listen: '聞き耳', photography: '写真術',
      psychoanalysis: '精神分析', track: '追跡', climb: '登攀', library_use: '図書館',
      spot_hidden: '目星', drive: '運転', mechanical_repair: '機械修理',
      heavy_machinery: '重機械操作', ride: '乗馬', swim: '水泳', craft: '制作',
      pilot: '操縦', jump: '跳躍', electrical_repair: '電気修理', navigate: 'ナビゲート',
      disguise: '変装', fast_talk: '言いくるめ', credit_rating: '信用',
      persuade: '説得', bargain: '値切り', mother_tongue: '母国語',
      medicine: '医学', occult: 'オカルト', chemistry: '化学', cthulhu_mythos: 'クトゥルフ神話',
      art: '芸術', accounting: '経理', archaeology: '考古学', computer_use: 'コンピューター',
      psychology: '心理学', anthropology: '人類学', biology: '生物学', geology: '地質学',
      electronics: '電子工学', astronomy: '天文学', natural_history: '博物学',
      physics: '物理学', law: '法律', pharmacy: '薬学', history: '歴史'
    };
    return skillNames[skillKey] || skillKey;
  };
  
  const memo = generateMemo();

  // 外部URL（キャラクターシートへのリンク）
  const externalUrl = `${window.location.origin}/character/${characterId}`;

  // キャラクターカラー
  const color = character.character_color_code || character.ui_theme_color || "#22c6d8";

  // 技能の初期値定義
  const skillInitialValues: Record<string, number> = {
    dodge: 30, grapple: 25, throw: 25, handgun: 20, submachine_gun: 15,
    shotgun: 30, machine_gun: 15, rifle: 25, martial_arts: 1, kick: 25,
    punch: 50, headbutt: 10, first_aid: 30, locksmith: 1, hide: 15,
    sneak: 10, listen: 25, photography: 10, psychoanalysis: 1, track: 10,
    climb: 40, library_use: 25, spot_hidden: 25, drive: 20, mechanical_repair: 20,
    heavy_machinery: 1, ride: 5, swim: 25, craft: 5, pilot: 1, jump: 25,
    electrical_repair: 10, navigate: 10, disguise: 1, fast_talk: 5,
    credit_rating: 15, persuade: 15, bargain: 5, mother_tongue: 0,
    medicine: 5, occult: 5, chemistry: 1, cthulhu_mythos: 0, art: 5,
    accounting: 10, archaeology: 1, computer_use: 1, psychology: 5,
    anthropology: 1, biology: 1, geology: 1, electronics: 1, astronomy: 1,
    natural_history: 10, physics: 1, law: 5, pharmacy: 1, history: 20
  };

  // 技能が初期値以外かチェック
  const isSkillNonDefault = (skillName: string, skillValue: number): boolean => {
    const initialValue = skillInitialValues[skillName] || 1;
    return skillValue > initialValue;
  };

  // チャットパレット（commands）
  const generateChatPalette = () => {
    const cmd = exportOptions.rollCommand;
    let palette = `${cmd}<=
${cmd}<={SAN} SANチェック
${cmd}<=${character.idea_total || 0} アイデア
${cmd}<=${character.luck_total || 0} 幸運
${cmd}<=${character.knowledge_total || 0} 知識

▼戦闘技能-------------------------------------`;

    // 戦闘技能
    const combatSkills = [
      { name: 'dodge', value: character.dodge_total || 0, label: '回避' },
      { name: 'grapple', value: character.grapple_total || 0, label: '組み付き' },
      { name: 'throw', value: character.throw_total || 0, label: '投擲' },
      { name: 'handgun', value: character.handgun_total || 0, label: '拳銃' },
      { name: 'submachine_gun', value: character.submachine_gun_total || 0, label: 'サブマシンガン' },
      { name: 'shotgun', value: character.shotgun_total || 0, label: 'ショットガン' },
      { name: 'machine_gun', value: character.machine_gun_total || 0, label: 'マシンガン' },
      { name: 'rifle', value: character.rifle_total || 0, label: 'ライフル' },
      { name: 'martial_arts', value: character.martial_arts_total || 0, label: 'マーシャルアーツ' },
      { name: 'kick', value: character.kick_total || 0, label: 'キック' },
      { name: 'punch', value: character.punch_total || 0, label: 'こぶし' },
      { name: 'headbutt', value: character.headbutt_total || 0, label: '頭突き' }
    ];

    combatSkills.forEach(skill => {
      if (exportOptions.skillOutput === 'all' || isSkillNonDefault(skill.name, skill.value)) {
        palette += `\n${cmd}<=${skill.value} ${skill.label}`;
      }
    });

    // マーシャルアーツ組み合わせ
    if (exportOptions.skillOutput === 'all' || 
        isSkillNonDefault('kick', character.kick_total || 0) || 
        isSkillNonDefault('martial_arts', character.martial_arts_total || 0)) {
      palette += `\nCBRB(${character.kick_total || 0},${character.martial_arts_total || 0}) キック+MA`;
    }
    if (exportOptions.skillOutput === 'all' || 
        isSkillNonDefault('punch', character.punch_total || 0) || 
        isSkillNonDefault('martial_arts', character.martial_arts_total || 0)) {
      palette += `\nCBRB(${character.punch_total || 0},${character.martial_arts_total || 0}) こぶし+MA`;
    }
    if (exportOptions.skillOutput === 'all' || 
        isSkillNonDefault('headbutt', character.headbutt_total || 0) || 
        isSkillNonDefault('martial_arts', character.martial_arts_total || 0)) {
      palette += `\nCBRB(${character.headbutt_total || 0},${character.martial_arts_total || 0}) 頭突き+MA`;
    }

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
        
        if (exportOptions.skillOutput === 'all' || skillTotal > 1) {
          palette += `\n${cmd}<=${skillTotal} ${skillName}`;
        }
      }
    }

    palette += `

▼探索技能-------------------------------------`;

    // 探索技能
    const explorationSkills = [
      { name: 'first_aid', value: character.first_aid_total || 0, label: '応急手当' },
      { name: 'locksmith', value: character.locksmith_total || 0, label: '鍵開け' },
      { name: 'hide', value: character.hide_total || 0, label: '隠す' },
      { name: 'sneak', value: character.sneak_total || 0, label: '隠れる' },
      { name: 'listen', value: character.listen_total || 0, label: '聞き耳' },
      { name: 'photography', value: character.photography_total || 0, label: '写真術' },
      { name: 'psychoanalysis', value: character.psychoanalysis_total || 0, label: '精神分析' },
      { name: 'track', value: character.track_total || 0, label: '追跡' },
      { name: 'climb', value: character.climb_total || 0, label: '登攀' },
      { name: 'library_use', value: character.library_use_total || 0, label: '図書館' },
      { name: 'spot_hidden', value: character.spot_hidden_total || 0, label: '目星' }
    ];

    explorationSkills.forEach(skill => {
      if (exportOptions.skillOutput === 'all' || isSkillNonDefault(skill.name, skill.value)) {
        palette += `\n${cmd}<=${skill.value} ${skill.label}`;
      }
    });

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
        
        if (exportOptions.skillOutput === 'all' || skillTotal > 1) {
          palette += `\n${cmd}<=${skillTotal} ${skillName}`;
        }
      }
    }

    palette += `

▼行動技能-------------------------------------`;

    // 行動技能
    const actionSkills = [
      { name: 'drive', value: character.drive_total || 0, label: '運転' },
      { name: 'mechanical_repair', value: character.mechanical_repair_total || 0, label: '機械修理' },
      { name: 'heavy_machinery', value: character.heavy_machinery_total || 0, label: '重機械操作' },
      { name: 'ride', value: character.ride_total || 0, label: '乗馬' },
      { name: 'swim', value: character.swim_total || 0, label: '水泳' },
      { name: 'craft', value: character.craft_total || 0, label: '制作' },
      { name: 'pilot', value: character.pilot_total || 0, label: '操縦' },
      { name: 'jump', value: character.jump_total || 0, label: '跳躍' },
      { name: 'electrical_repair', value: character.electrical_repair_total || 0, label: '電気修理' },
      { name: 'navigate', value: character.navigate_total || 0, label: 'ナビゲート' },
      { name: 'disguise', value: character.disguise_total || 0, label: '変装' }
    ];

    actionSkills.forEach(skill => {
      if (exportOptions.skillOutput === 'all' || isSkillNonDefault(skill.name, skill.value)) {
        palette += `\n${cmd}<=${skill.value} ${skill.label}`;
      }
    });

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
        
        if (exportOptions.skillOutput === 'all' || skillTotal > 1) {
          palette += `\n${cmd}<=${skillTotal} ${skillName}`;
        }
      }
    }

    palette += `

▼交渉技能-------------------------------------`;

    // 交渉技能
    const negotiationSkills = [
      { name: 'fast_talk', value: character.fast_talk_total || 0, label: '言いくるめ' },
      { name: 'credit_rating', value: character.credit_rating_total || 0, label: '信用' },
      { name: 'persuade', value: character.persuade_total || 0, label: '説得' },
      { name: 'bargain', value: character.bargain_total || 0, label: '値切り' },
      { name: 'mother_tongue', value: character.mother_tongue_total || 0, label: '母国語' }
    ];

    negotiationSkills.forEach(skill => {
      if (exportOptions.skillOutput === 'all' || isSkillNonDefault(skill.name, skill.value)) {
        palette += `\n${cmd}<=${skill.value} ${skill.label}`;
      }
    });

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
        
        if (exportOptions.skillOutput === 'all' || skillTotal > 1) {
          palette += `\n${cmd}<=${skillTotal} ${skillName}`;
        }
      }
    }

    palette += `

▼知識技能-------------------------------------`;

    // 知識技能
    const knowledgeSkills = [
      { name: 'medicine', value: character.medicine_total || 0, label: '医学' },
      { name: 'occult', value: character.occult_total || 0, label: 'オカルト' },
      { name: 'chemistry', value: character.chemistry_total || 0, label: '化学' },
      { name: 'cthulhu_mythos', value: character.cthulhu_mythos_total || 0, label: 'クトゥルフ神話' },
      { name: 'art', value: character.art_total || 0, label: '芸術' },
      { name: 'accounting', value: character.accounting_total || 0, label: '経理' },
      { name: 'archaeology', value: character.archaeology_total || 0, label: '考古学' },
      { name: 'computer_use', value: character.computer_use_total || 0, label: 'コンピューター' },
      { name: 'psychology', value: character.psychology_total || 0, label: '心理学' },
      { name: 'anthropology', value: character.anthropology_total || 0, label: '人類学' },
      { name: 'biology', value: character.biology_total || 0, label: '生物学' },
      { name: 'geology', value: character.geology_total || 0, label: '地質学' },
      { name: 'electronics', value: character.electronics_total || 0, label: '電子工学' },
      { name: 'astronomy', value: character.astronomy_total || 0, label: '天文学' },
      { name: 'natural_history', value: character.natural_history_total || 0, label: '博物学' },
      { name: 'physics', value: character.physics_total || 0, label: '物理学' },
      { name: 'law', value: character.law_total || 0, label: '法律' },
      { name: 'pharmacy', value: character.pharmacy_total || 0, label: '薬学' },
      { name: 'history', value: character.history_total || 0, label: '歴史' }
    ];

    knowledgeSkills.forEach(skill => {
      if (exportOptions.skillOutput === 'all' || isSkillNonDefault(skill.name, skill.value)) {
        palette += `\n${cmd}<=${skill.value} ${skill.label}`;
      }
    });

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
        
        if (exportOptions.skillOutput === 'all' || skillTotal > 1) {
          palette += `\n${cmd}<=${skillTotal} ${skillName}`;
        }
      }
    }

    palette += `
▼×5-------------------------------------
${cmd}<=({STR}*5) STR*5
${cmd}<=({CON}*5) CON*5
${cmd}<=({POW}*5) POW*5
${cmd}<=({DEX}*5) DEX*5
${cmd}<=({APP}*5) APP*5
${cmd}<=({SIZ}*5) SIZ*5
${cmd}<=({INT}*5) INT*5
${cmd}<=({EDU}*5) EDU*5
▼×4-------------------------------------
${cmd}<=({STR}*4) STR*4
${cmd}<=({CON}*4) CON*4
${cmd}<=({POW}*4) POW*4
${cmd}<=({DEX}*4) DEX*4
${cmd}<=({APP}*4) APP*4
${cmd}<=({SIZ}*4) SIZ*4
${cmd}<=({INT}*4) INT*4
${cmd}<=({EDU}*4) EDU*4
▼×3-------------------------------------
${cmd}<=({STR}*3) STR*3
${cmd}<=({CON}*3) CON*3
${cmd}<=({POW}*3) POW*3
${cmd}<=({DEX}*3) DEX*3
${cmd}<=({APP}*3) APP*3
${cmd}<=({SIZ}*3) SIZ*3
${cmd}<=({INT}*3) INT*3
${cmd}<=({EDU}*3) EDU*3
▼×2-------------------------------------
${cmd}<=({STR}*2) STR*2
${cmd}<=({CON}*2) CON*2
${cmd}<=({POW}*2) POW*2
${cmd}<=({DEX}*2) DEX*2
${cmd}<=({APP}*2) APP*2
${cmd}<=({SIZ}*2) SIZ*2
${cmd}<=({INT}*2) INT*2
${cmd}<=({EDU}*2) EDU*2

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
1D3{DB} こぶしダメージ
2D3{DB} こぶし+MAダメージ
1D6{DB} キックダメージ
2D6{DB} キック+MAダメージ
1D4{DB} 頭突きダメージ
2D4{DB} 頭突き+MAダメージ
1Dn{DB}/2 投擲ダメージ`;

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

  // イニシアチブ（DEX値）
  const initiative = parseInt(character.dex_total || character.dex || "10");

  // ステータス（HP、MP、SAN）
  const status = [
    {
      label: "HP",
      value: parseInt(character.hp_total || "0"),
      max: parseInt(character.hp_total || "0"),
    },
    {
      label: "MP",
      value: parseInt(character.mp_total || "0"),
      max: parseInt(character.mp_total || "0"),
    },
    {
      label: "SAN",
      value: parseInt(character.current_san || character.max_san_value || "0"),
      max: parseInt(character.max_san_value || "0"),
    },
  ];

  // パラメータ（能力値）
  const params = [
    {
      label: "STR",
      value: String(character.str_total || character.str || "10"),
    },
    {
      label: "CON",
      value: String(character.con_total || character.con || "10"),
    },
    {
      label: "POW",
      value: String(character.pow_total || character.pow || "10"),
    },
    {
      label: "DEX",
      value: String(character.dex_total || character.dex || "10"),
    },
    {
      label: "APP",
      value: String(character.app_total || character.app || "10"),
    },
    {
      label: "SIZ",
      value: String(character.siz_total || character.siz || "10"),
    },
    {
      label: "INT",
      value: String(character.int_total || character.int || "10"),
    },
    {
      label: "EDU",
      value: String(character.edu_total || character.edu || "10"),
    },
    { label: "DB", value: String(character.damage_bonus || "0") },
  ];

  return {
    kind: "character",
    data: {
      name,
      memo,
      externalUrl,
      color,
      commands: generateChatPalette(),
      initiative,
      status,
      params,
    },
  };
}

export function exportToCcfolia(character: any, characterId: string): void {
  const ccfoliaData = generateCcfoliaCharacterData(character, characterId);

  // JSON形式でダウンロード
  const dataStr = JSON.stringify(ccfoliaData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(dataBlob);
  link.download = `${ccfoliaData.data.name}_ccfolia.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // クリーンアップ
  URL.revokeObjectURL(link.href);
}

export function copyToCcfoliaClipboard(
  character: any,
  characterId: string
): void {
  const ccfoliaData = generateCcfoliaCharacterData(character, characterId);
  const jsonString = JSON.stringify(ccfoliaData);

  navigator.clipboard.writeText(jsonString).then(
    () => {
      alert(
        "ココフォリア用のコマデータをクリップボードにコピーしました！\nココフォリアの「コマ」→「JSONインポート」で貼り付けてください。"
      );
    },
    () => {
      // フォールバック
      const textArea = document.createElement("textarea");
      textArea.value = jsonString;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert(
        "ココフォリア用のコマデータをクリップボードにコピーしました！\nココフォリアの「コマ」→「JSONインポート」で貼り付けてください。"
      );
    }
  );
}