// キャラクターシート計算ロジック

export interface CharacterData {
  // キャラクター基本情報
  character_name?: string;
  character_name_kana?: string;
  is_lost?: boolean;
  job?: string;
  age?: number | string;
  sex?: string;
  gender?: string;
  height?: string;
  weight?: string;
  backstory?: string;
  occupation?: string;
  birthplace?: string;
  era?: string;
  birthday?: string;
  zodiac_sign?: string;
  blood_type?: string;
  
  // カラー設定
  ui_theme_color?: string;
  character_color?: string;
  character_color_code?: string;
  hair_color?: string;
  hair_color_code?: string;
  eye_color?: string;
  eye_color_code?: string;
  skin_color?: string;
  skin_color_code?: string;
  
  // 画像
  character_image_url?: string;
  image_aspect_ratio?: string;
  
  // 説明文
  introduction?: string;
  secret_information?: string;
  special_notes?: string;
  
  // 特徴
  trait_1_number?: string;
  trait_1_name?: string;
  trait_1_description?: string;
  trait_2_number?: string;
  trait_2_name?: string;
  trait_2_description?: string;
  trait_3_number?: string;
  trait_3_name?: string;
  trait_3_description?: string;
  trait_4_number?: string;
  trait_4_name?: string;
  trait_4_description?: string;
  trait_5_number?: string;
  trait_5_name?: string;
  trait_5_description?: string;
  // 必要に応じて trait_6〜trait_50 も追加可能
  [key: `trait_${number}_number`]: string | undefined;
  [key: `trait_${number}_name`]: string | undefined;
  [key: `trait_${number}_description`]: string | undefined;
  
  // 基礎能力値
  str_base?: number | string;
  con_base?: number | string;
  pow_base?: number | string;
  dex_base?: number | string;
  app_base?: number | string;
  siz_base?: number | string;
  int_base?: number | string;
  edu_base?: number | string;
  
  // 年齢修正
  str_age_mod?: number | string;
  con_age_mod?: number | string;
  pow_age_mod?: number | string;
  dex_age_mod?: number | string;
  app_age_mod?: number | string;
  siz_age_mod?: number | string;
  int_age_mod?: number | string;
  edu_age_mod?: number | string;
  
  // 他増減
  str_other_mod?: number | string;
  con_other_mod?: number | string;
  pow_other_mod?: number | string;
  dex_other_mod?: number | string;
  app_other_mod?: number | string;
  siz_other_mod?: number | string;
  int_other_mod?: number | string;
  edu_other_mod?: number | string;
  
  // 他の値
  san_other_mod?: number | string;
  hp_other_mod?: number | string;
  mp_other_mod?: number | string;
  idea_other_mod?: number | string;
  luck_other_mod?: number | string;
  knowledge_other_mod?: number | string;
  
  // スロット値
  current_san?: number | string;
  max_san?: number | string;
  
  // 職業・興味ポイント
  job_points_used?: number | string;
  job_points_formula?: string;
  job_points_total?: number | string; // 手動入力用
  interest_points_used?: number | string;
  interest_points_extra?: number | string;
  
  // 戦闘技能
  dodge_initial?: number | string;
  dodge_job?: number | string;
  dodge_interest?: number | string;
  dodge_growth?: number | string;
  dodge_other?: number | string;
  dodge_total?: number | string;
  
  kick_initial?: number | string;
  kick_job?: number | string;
  kick_interest?: number | string;
  kick_growth?: number | string;
  kick_other?: number | string;
  kick_total?: number | string;
  
  grapple_initial?: number | string;
  grapple_job?: number | string;
  grapple_interest?: number | string;
  grapple_growth?: number | string;
  grapple_other?: number | string;
  grapple_total?: number | string;
  
  punch_initial?: number | string;
  punch_job?: number | string;
  punch_interest?: number | string;
  punch_growth?: number | string;
  punch_other?: number | string;
  punch_total?: number | string;
  
  headbutt_initial?: number | string;
  headbutt_job?: number | string;
  headbutt_interest?: number | string;
  headbutt_growth?: number | string;
  headbutt_other?: number | string;
  headbutt_total?: number | string;
  
  throw_initial?: number | string;
  throw_job?: number | string;
  throw_interest?: number | string;
  throw_growth?: number | string;
  throw_other?: number | string;
  throw_total?: number | string;
  
  martial_arts_initial?: number | string;
  martial_arts_job?: number | string;
  martial_arts_interest?: number | string;
  martial_arts_growth?: number | string;
  martial_arts_other?: number | string;
  martial_arts_total?: number | string;
  
  handgun_initial?: number | string;
  handgun_job?: number | string;
  handgun_interest?: number | string;
  handgun_growth?: number | string;
  handgun_other?: number | string;
  handgun_total?: number | string;
  
  submachine_gun_initial?: number | string;
  submachine_gun_job?: number | string;
  submachine_gun_interest?: number | string;
  submachine_gun_growth?: number | string;
  submachine_gun_other?: number | string;
  submachine_gun_total?: number | string;
  
  shotgun_initial?: number | string;
  shotgun_job?: number | string;
  shotgun_interest?: number | string;
  shotgun_growth?: number | string;
  shotgun_other?: number | string;
  shotgun_total?: number | string;
  
  machine_gun_initial?: number | string;
  machine_gun_job?: number | string;
  machine_gun_interest?: number | string;
  machine_gun_growth?: number | string;
  machine_gun_other?: number | string;
  machine_gun_total?: number | string;
  
  rifle_initial?: number | string;
  rifle_job?: number | string;
  rifle_interest?: number | string;
  rifle_growth?: number | string;
  rifle_other?: number | string;
  rifle_total?: number | string;
  
  // 探索技能
  first_aid_initial?: number | string;
  first_aid_job?: number | string;
  first_aid_interest?: number | string;
  first_aid_growth?: number | string;
  first_aid_other?: number | string;
  first_aid_total?: number | string;
  
  locksmith_initial?: number | string;
  locksmith_job?: number | string;
  locksmith_interest?: number | string;
  locksmith_growth?: number | string;
  locksmith_other?: number | string;
  locksmith_total?: number | string;
  
  conceal_initial?: number | string;
  conceal_job?: number | string;
  conceal_interest?: number | string;
  conceal_growth?: number | string;
  conceal_other?: number | string;
  conceal_total?: number | string;
  
  hide_initial?: number | string;
  hide_job?: number | string;
  hide_interest?: number | string;
  hide_growth?: number | string;
  hide_other?: number | string;
  hide_total?: number | string;
  
  listen_initial?: number | string;
  listen_job?: number | string;
  listen_interest?: number | string;
  listen_growth?: number | string;
  listen_other?: number | string;
  listen_total?: number | string;
  
  sneak_initial?: number | string;
  sneak_job?: number | string;
  sneak_interest?: number | string;
  sneak_growth?: number | string;
  sneak_other?: number | string;
  sneak_total?: number | string;
  
  photography_initial?: number | string;
  photography_job?: number | string;
  photography_interest?: number | string;
  photography_growth?: number | string;
  photography_other?: number | string;
  photography_total?: number | string;
  
  psychoanalysis_initial?: number | string;
  psychoanalysis_job?: number | string;
  psychoanalysis_interest?: number | string;
  psychoanalysis_growth?: number | string;
  psychoanalysis_other?: number | string;
  psychoanalysis_total?: number | string;
  
  track_initial?: number | string;
  track_job?: number | string;
  track_interest?: number | string;
  track_growth?: number | string;
  track_other?: number | string;
  track_total?: number | string;
  
  climb_initial?: number | string;
  climb_job?: number | string;
  climb_interest?: number | string;
  climb_growth?: number | string;
  climb_other?: number | string;
  climb_total?: number | string;
  
  library_use_initial?: number | string;
  library_use_job?: number | string;
  library_use_interest?: number | string;
  library_use_growth?: number | string;
  library_use_other?: number | string;
  library_use_total?: number | string;
  
  spot_hidden_initial?: number | string;
  spot_hidden_job?: number | string;
  spot_hidden_interest?: number | string;
  spot_hidden_growth?: number | string;
  spot_hidden_other?: number | string;
  spot_hidden_total?: number | string;
  
  // 行動技能
  drive_specialty?: string;
  drive_initial?: number | string;
  drive_job?: number | string;
  drive_interest?: number | string;
  drive_growth?: number | string;
  drive_other?: number | string;
  drive_total?: number | string;
  
  mechanical_repair_initial?: number | string;
  mechanical_repair_job?: number | string;
  mechanical_repair_interest?: number | string;
  mechanical_repair_growth?: number | string;
  mechanical_repair_other?: number | string;
  mechanical_repair_total?: number | string;
  
  heavy_machinery_initial?: number | string;
  heavy_machinery_job?: number | string;
  heavy_machinery_interest?: number | string;
  heavy_machinery_growth?: number | string;
  heavy_machinery_other?: number | string;
  heavy_machinery_total?: number | string;
  
  ride_initial?: number | string;
  ride_job?: number | string;
  ride_interest?: number | string;
  ride_growth?: number | string;
  ride_other?: number | string;
  ride_total?: number | string;
  
  swim_initial?: number | string;
  swim_job?: number | string;
  swim_interest?: number | string;
  swim_growth?: number | string;
  swim_other?: number | string;
  swim_total?: number | string;
  
  craft_specialty?: string;
  craft_initial?: number | string;
  craft_job?: number | string;
  craft_interest?: number | string;
  craft_growth?: number | string;
  craft_other?: number | string;
  craft_total?: number | string;
  
  pilot_specialty?: string;
  pilot_initial?: number | string;
  pilot_job?: number | string;
  pilot_interest?: number | string;
  pilot_growth?: number | string;
  pilot_other?: number | string;
  pilot_total?: number | string;
  
  jump_initial?: number | string;
  jump_job?: number | string;
  jump_interest?: number | string;
  jump_growth?: number | string;
  jump_other?: number | string;
  jump_total?: number | string;
  
  electrical_repair_initial?: number | string;
  electrical_repair_job?: number | string;
  electrical_repair_interest?: number | string;
  electrical_repair_growth?: number | string;
  electrical_repair_other?: number | string;
  electrical_repair_total?: number | string;
  
  navigate_initial?: number | string;
  navigate_job?: number | string;
  navigate_interest?: number | string;
  navigate_growth?: number | string;
  navigate_other?: number | string;
  navigate_total?: number | string;
  
  disguise_initial?: number | string;
  disguise_job?: number | string;
  disguise_interest?: number | string;
  disguise_growth?: number | string;
  disguise_other?: number | string;
  disguise_total?: number | string;
  
  // 交渉技能
  fast_talk_initial?: number | string;
  fast_talk_job?: number | string;
  fast_talk_interest?: number | string;
  fast_talk_growth?: number | string;
  fast_talk_other?: number | string;
  fast_talk_total?: number | string;
  
  persuade_initial?: number | string;
  persuade_job?: number | string;
  persuade_interest?: number | string;
  persuade_growth?: number | string;
  persuade_other?: number | string;
  persuade_total?: number | string;
  
  credit_rating_initial?: number | string;
  credit_rating_job?: number | string;
  credit_rating_interest?: number | string;
  credit_rating_growth?: number | string;
  credit_rating_other?: number | string;
  credit_rating_total?: number | string;
  
  bargain_initial?: number | string;
  bargain_job?: number | string;
  bargain_interest?: number | string;
  bargain_growth?: number | string;
  bargain_other?: number | string;
  bargain_total?: number | string;
  
  mother_tongue_specialty?: string;
  mother_tongue_initial?: number | string;
  mother_tongue_job?: number | string;
  mother_tongue_interest?: number | string;
  mother_tongue_growth?: number | string;
  mother_tongue_other?: number | string;
  mother_tongue_total?: number | string;
  
  language_specialty?: string;
  language_initial?: number | string;
  language_job?: number | string;
  language_interest?: number | string;
  language_growth?: number | string;
  language_other?: number | string;
  language_total?: number | string;
  
  // 知識技能
  medicine_initial?: number | string;
  medicine_job?: number | string;
  medicine_interest?: number | string;
  medicine_growth?: number | string;
  medicine_other?: number | string;
  medicine_total?: number | string;
  
  occult_initial?: number | string;
  occult_job?: number | string;
  occult_interest?: number | string;
  occult_growth?: number | string;
  occult_other?: number | string;
  occult_total?: number | string;
  
  chemistry_initial?: number | string;
  chemistry_job?: number | string;
  chemistry_interest?: number | string;
  chemistry_growth?: number | string;
  chemistry_other?: number | string;
  chemistry_total?: number | string;
  
  cthulhu_mythos_initial?: number | string;
  cthulhu_mythos_job?: number | string;
  cthulhu_mythos_interest?: number | string;
  cthulhu_mythos_growth?: number | string;
  cthulhu_mythos_other?: number | string;
  cthulhu_mythos_total?: number | string;
  
  art_specialty?: string;
  art_initial?: number | string;
  art_job?: number | string;
  art_interest?: number | string;
  art_growth?: number | string;
  art_other?: number | string;
  art_total?: number | string;
  
  accounting_initial?: number | string;
  accounting_job?: number | string;
  accounting_interest?: number | string;
  accounting_growth?: number | string;
  accounting_other?: number | string;
  accounting_total?: number | string;
  
  archaeology_initial?: number | string;
  archaeology_job?: number | string;
  archaeology_interest?: number | string;
  archaeology_growth?: number | string;
  archaeology_other?: number | string;
  archaeology_total?: number | string;
  
  computer_use_initial?: number | string;
  computer_use_job?: number | string;
  computer_use_interest?: number | string;
  computer_use_growth?: number | string;
  computer_use_other?: number | string;
  computer_use_total?: number | string;
  
  psychology_initial?: number | string;
  psychology_job?: number | string;
  psychology_interest?: number | string;
  psychology_growth?: number | string;
  psychology_other?: number | string;
  psychology_total?: number | string;
  
  anthropology_initial?: number | string;
  anthropology_job?: number | string;
  anthropology_interest?: number | string;
  anthropology_growth?: number | string;
  anthropology_other?: number | string;
  anthropology_total?: number | string;
  
  biology_initial?: number | string;
  biology_job?: number | string;
  biology_interest?: number | string;
  biology_growth?: number | string;
  biology_other?: number | string;
  biology_total?: number | string;
  
  geology_initial?: number | string;
  geology_job?: number | string;
  geology_interest?: number | string;
  geology_growth?: number | string;
  geology_other?: number | string;
  geology_total?: number | string;
  
  electronics_initial?: number | string;
  electronics_job?: number | string;
  electronics_interest?: number | string;
  electronics_growth?: number | string;
  electronics_other?: number | string;
  electronics_total?: number | string;
  
  astronomy_initial?: number | string;
  astronomy_job?: number | string;
  astronomy_interest?: number | string;
  astronomy_growth?: number | string;
  astronomy_other?: number | string;
  astronomy_total?: number | string;
  
  natural_history_initial?: number | string;
  natural_history_job?: number | string;
  natural_history_interest?: number | string;
  natural_history_growth?: number | string;
  natural_history_other?: number | string;
  natural_history_total?: number | string;
  
  physics_initial?: number | string;
  physics_job?: number | string;
  physics_interest?: number | string;
  physics_growth?: number | string;
  physics_other?: number | string;
  physics_total?: number | string;
  
  law_initial?: number | string;
  law_job?: number | string;
  law_interest?: number | string;
  law_growth?: number | string;
  law_other?: number | string;
  law_total?: number | string;
  
  pharmacy_initial?: number | string;
  pharmacy_job?: number | string;
  pharmacy_interest?: number | string;
  pharmacy_growth?: number | string;
  pharmacy_other?: number | string;
  pharmacy_total?: number | string;
  
  history_initial?: number | string;
  history_job?: number | string;
  history_interest?: number | string;
  history_growth?: number | string;
  history_other?: number | string;
  history_total?: number | string;
  
  // メモフィールド
  default_memo?: string;
  other_memo?: string;
  secret_memo?: string;
  
  // 特徴・ベース職業フィールド
  base_job?: string;
  special_notes?: string;
}

// 年齢による能力値修正を計算
export function calculateAgeModifications(age: number) {
  const modifications = {
    str_age_mod: 0,
    con_age_mod: 0,
    pow_age_mod: 0,
    dex_age_mod: 0,
    app_age_mod: 0,
    siz_age_mod: 0,
    int_age_mod: 0,
    edu_age_mod: 0,
  };

  if (age >= 20 && age <= 39) {
    // 20-39歳: 修正なし
    modifications.edu_age_mod = 5; // EDUのみ+5
  } else if (age >= 40 && age <= 49) {
    // 40-49歳
    modifications.str_age_mod = -5;
    modifications.con_age_mod = -5;
    modifications.app_age_mod = -5;
    modifications.edu_age_mod = 10;
  } else if (age >= 50 && age <= 59) {
    // 50-59歳
    modifications.str_age_mod = -10;
    modifications.con_age_mod = -10;
    modifications.dex_age_mod = -5;
    modifications.app_age_mod = -10;
    modifications.edu_age_mod = 15;
  } else if (age >= 60 && age <= 69) {
    // 60-69歳
    modifications.str_age_mod = -20;
    modifications.con_age_mod = -20;
    modifications.dex_age_mod = -10;
    modifications.app_age_mod = -15;
    modifications.edu_age_mod = 20;
  } else if (age >= 70 && age <= 79) {
    // 70-79歳
    modifications.str_age_mod = -40;
    modifications.con_age_mod = -40;
    modifications.dex_age_mod = -20;
    modifications.app_age_mod = -20;
    modifications.edu_age_mod = 25;
  } else if (age >= 80) {
    // 80歳以上
    modifications.str_age_mod = -80;
    modifications.con_age_mod = -80;
    modifications.dex_age_mod = -40;
    modifications.app_age_mod = -25;
    modifications.edu_age_mod = 30;
  }

  return modifications;
}

// 数値変換ヘルパー
function toNumber(value: number | string | undefined): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value !== '') return parseInt(value) || 0;
  return 0;
}

// 能力値合計を計算
export function calculateAbilityTotal(base: number | string, ageMod: number | string, otherMod: number | string): number {
  return toNumber(base) + toNumber(ageMod) + toNumber(otherMod);
}

// 基礎スペックを計算
export function calculateDerivedStats(data: CharacterData) {
  const str_total = calculateAbilityTotal(data.str_base || '', data.str_age_mod || '', data.str_other_mod || '');
  const con_total = calculateAbilityTotal(data.con_base || '', data.con_age_mod || '', data.con_other_mod || '');
  const pow_total = calculateAbilityTotal(data.pow_base || '', data.pow_age_mod || '', data.pow_other_mod || '');
  const dex_total = calculateAbilityTotal(data.dex_base || '', data.dex_age_mod || '', data.dex_other_mod || '');
  const app_total = calculateAbilityTotal(data.app_base || '', data.app_age_mod || '', data.app_other_mod || '');
  const siz_total = calculateAbilityTotal(data.siz_base || '', data.siz_age_mod || '', data.siz_other_mod || '');
  const int_total = calculateAbilityTotal(data.int_base || '', data.int_age_mod || '', data.int_other_mod || '');
  const edu_total = calculateAbilityTotal(data.edu_base || '', data.edu_age_mod || '', data.edu_other_mod || '');

  // SAN値 = POW × 5
  const san_base_value = pow_total * 5;
  const san_total = san_base_value + toNumber(data.san_other_mod);

  // HP = (CON + SIZ) ÷ 2 (端数切り上げ)
  const hp_base_value = Math.ceil((con_total + siz_total) / 2);
  const hp_total = hp_base_value + toNumber(data.hp_other_mod);

  // MP = POW
  const mp_base_value = pow_total;
  const mp_total = mp_base_value + toNumber(data.mp_other_mod);

  // アイデア = INT × 5
  const idea_base_value = int_total * 5;
  const idea_total = idea_base_value + toNumber(data.idea_other_mod);

  // 幸運 = POW × 5
  const luck_base_value = pow_total * 5;
  const luck_total = luck_base_value + toNumber(data.luck_other_mod);

  // 知識 = EDU × 5
  const knowledge_base_value = edu_total * 5;
  const knowledge_total = knowledge_base_value + toNumber(data.knowledge_other_mod);

  // ダメージボーナス
  const db_base = str_total + siz_total;
  let damage_bonus = '';
  if (db_base <= 12) {
    damage_bonus = '-1D6';
  } else if (db_base <= 16) {
    damage_bonus = '-1D4';
  } else if (db_base <= 24) {
    damage_bonus = '0';
  } else if (db_base <= 32) {
    damage_bonus = '+1D4';
  } else {
    damage_bonus = '+1D6';
  }

  // 職業ポイント計算（公式に基づく）
  let job_points_total = 0;
  const formula = data.job_points_formula || 'edu20';
  
  switch (formula) {
    case 'edu20':
      job_points_total = edu_total * 20;
      break;
    case 'edu10_str10':
      job_points_total = edu_total * 10 + str_total * 10;
      break;
    case 'edu10_con10':
      job_points_total = edu_total * 10 + con_total * 10;
      break;
    case 'edu10_pow10':
      job_points_total = edu_total * 10 + pow_total * 10;
      break;
    case 'edu10_dex10':
      job_points_total = edu_total * 10 + dex_total * 10;
      break;
    case 'edu10_app10':
      job_points_total = edu_total * 10 + app_total * 10;
      break;
    case 'edu10_siz10':
      job_points_total = edu_total * 10 + siz_total * 10;
      break;
    case 'edu10_int10':
      job_points_total = edu_total * 10 + int_total * 10;
      break;
    case 'manual':
      // 手動入力の場合は職業ポイント合計を直接使用
      job_points_total = toNumber(data.job_points_total) || 0;
      break;
    default:
      job_points_total = edu_total * 20;
  }

  // 興味ポイント計算 (INT × 10 + 追加分)
  const interest_points_total = int_total * 10 + toNumber(data.interest_points_extra);

  return {
    str_total,
    con_total,
    pow_total,
    dex_total,
    app_total,
    siz_total,
    int_total,
    edu_total,
    san_base_value,
    san_total,
    hp_base_value,
    hp_total,
    mp_base_value,
    mp_total,
    idea_base_value,
    idea_total,
    luck_base_value,
    luck_total,
    knowledge_base_value,
    knowledge_total,
    damage_bonus,
    job_points_total,
    interest_points_total,
  };
}

// 技能合計値を計算
export function calculateSkillTotal(
  initial: number | string, 
  job: number | string, 
  interest: number | string, 
  growth: number | string, 
  other: number | string
): number {
  return toNumber(initial) + toNumber(job) + toNumber(interest) + toNumber(growth) + toNumber(other);
}

// 全技能の計算
export function calculateAllSkills(data: CharacterData) {
  const dex_total = calculateAbilityTotal(data.dex_base || '', data.dex_age_mod || '', data.dex_other_mod || '');
  const edu_total = calculateAbilityTotal(data.edu_base || '', data.edu_age_mod || '', data.edu_other_mod || '');
  
  return {
    // 戦闘技能（回避は DEX×2）
    dodge_initial: dex_total * 2,
    dodge_total: calculateSkillTotal(dex_total * 2, data.dodge_job || '', data.dodge_interest || '', data.dodge_growth || '', data.dodge_other || ''),
    
    kick_initial: 25,
    kick_total: calculateSkillTotal(25, data.kick_job || '', data.kick_interest || '', data.kick_growth || '', data.kick_other || ''),
    
    grapple_initial: 25,
    grapple_total: calculateSkillTotal(25, data.grapple_job || '', data.grapple_interest || '', data.grapple_growth || '', data.grapple_other || ''),
    
    punch_initial: 50,
    punch_total: calculateSkillTotal(50, data.punch_job || '', data.punch_interest || '', data.punch_growth || '', data.punch_other || ''),
    
    headbutt_initial: 10,
    headbutt_total: calculateSkillTotal(10, data.headbutt_job || '', data.headbutt_interest || '', data.headbutt_growth || '', data.headbutt_other || ''),
    
    throw_initial: 25,
    throw_total: calculateSkillTotal(25, data.throw_job || '', data.throw_interest || '', data.throw_growth || '', data.throw_other || ''),
    
    martial_arts_initial: 1,
    martial_arts_total: calculateSkillTotal(1, data.martial_arts_job || '', data.martial_arts_interest || '', data.martial_arts_growth || '', data.martial_arts_other || ''),
    
    handgun_initial: 20,
    handgun_total: calculateSkillTotal(20, data.handgun_job || '', data.handgun_interest || '', data.handgun_growth || '', data.handgun_other || ''),
    
    submachine_gun_initial: 15,
    submachine_gun_total: calculateSkillTotal(15, data.submachine_gun_job || '', data.submachine_gun_interest || '', data.submachine_gun_growth || '', data.submachine_gun_other || ''),
    
    shotgun_initial: 30,
    shotgun_total: calculateSkillTotal(30, data.shotgun_job || '', data.shotgun_interest || '', data.shotgun_growth || '', data.shotgun_other || ''),
    
    machine_gun_initial: 15,
    machine_gun_total: calculateSkillTotal(15, data.machine_gun_job || '', data.machine_gun_interest || '', data.machine_gun_growth || '', data.machine_gun_other || ''),
    
    rifle_initial: 25,
    rifle_total: calculateSkillTotal(25, data.rifle_job || '', data.rifle_interest || '', data.rifle_growth || '', data.rifle_other || ''),
    
    // 探索技能
    first_aid_initial: 30,
    first_aid_total: calculateSkillTotal(30, data.first_aid_job || '', data.first_aid_interest || '', data.first_aid_growth || '', data.first_aid_other || ''),
    
    locksmith_initial: 1,
    locksmith_total: calculateSkillTotal(1, data.locksmith_job || '', data.locksmith_interest || '', data.locksmith_growth || '', data.locksmith_other || ''),
    
    conceal_initial: 15,
    conceal_total: calculateSkillTotal(15, data.conceal_job || '', data.conceal_interest || '', data.conceal_growth || '', data.conceal_other || ''),
    
    hide_initial: 10,
    hide_total: calculateSkillTotal(10, data.hide_job || '', data.hide_interest || '', data.hide_growth || '', data.hide_other || ''),
    
    listen_initial: 25,
    listen_total: calculateSkillTotal(25, data.listen_job || '', data.listen_interest || '', data.listen_growth || '', data.listen_other || ''),
    
    sneak_initial: 10,
    sneak_total: calculateSkillTotal(10, data.sneak_job || '', data.sneak_interest || '', data.sneak_growth || '', data.sneak_other || ''),
    
    photography_initial: 10,
    photography_total: calculateSkillTotal(10, data.photography_job || '', data.photography_interest || '', data.photography_growth || '', data.photography_other || ''),
    
    psychoanalysis_initial: 1,
    psychoanalysis_total: calculateSkillTotal(1, data.psychoanalysis_job || '', data.psychoanalysis_interest || '', data.psychoanalysis_growth || '', data.psychoanalysis_other || ''),
    
    track_initial: 10,
    track_total: calculateSkillTotal(10, data.track_job || '', data.track_interest || '', data.track_growth || '', data.track_other || ''),
    
    climb_initial: 40,
    climb_total: calculateSkillTotal(40, data.climb_job || '', data.climb_interest || '', data.climb_growth || '', data.climb_other || ''),
    
    library_use_initial: 25,
    library_use_total: calculateSkillTotal(25, data.library_use_job || '', data.library_use_interest || '', data.library_use_growth || '', data.library_use_other || ''),
    
    spot_hidden_initial: 25,
    spot_hidden_total: calculateSkillTotal(25, data.spot_hidden_job || '', data.spot_hidden_interest || '', data.spot_hidden_growth || '', data.spot_hidden_other || ''),
    
    // 行動技能
    drive_initial: 20,
    drive_total: calculateSkillTotal(20, data.drive_job || '', data.drive_interest || '', data.drive_growth || '', data.drive_other || ''),
    
    mechanical_repair_initial: 20,
    mechanical_repair_total: calculateSkillTotal(20, data.mechanical_repair_job || '', data.mechanical_repair_interest || '', data.mechanical_repair_growth || '', data.mechanical_repair_other || ''),
    
    heavy_machinery_initial: 1,
    heavy_machinery_total: calculateSkillTotal(1, data.heavy_machinery_job || '', data.heavy_machinery_interest || '', data.heavy_machinery_growth || '', data.heavy_machinery_other || ''),
    
    ride_initial: 5,
    ride_total: calculateSkillTotal(5, data.ride_job || '', data.ride_interest || '', data.ride_growth || '', data.ride_other || ''),
    
    swim_initial: 25,
    swim_total: calculateSkillTotal(25, data.swim_job || '', data.swim_interest || '', data.swim_growth || '', data.swim_other || ''),
    
    craft_initial: 5,
    craft_total: calculateSkillTotal(5, data.craft_job || '', data.craft_interest || '', data.craft_growth || '', data.craft_other || ''),
    
    pilot_initial: 1,
    pilot_total: calculateSkillTotal(1, data.pilot_job || '', data.pilot_interest || '', data.pilot_growth || '', data.pilot_other || ''),
    
    jump_initial: 25,
    jump_total: calculateSkillTotal(25, data.jump_job || '', data.jump_interest || '', data.jump_growth || '', data.jump_other || ''),
    
    electrical_repair_initial: 10,
    electrical_repair_total: calculateSkillTotal(10, data.electrical_repair_job || '', data.electrical_repair_interest || '', data.electrical_repair_growth || '', data.electrical_repair_other || ''),
    
    navigate_initial: 10,
    navigate_total: calculateSkillTotal(10, data.navigate_job || '', data.navigate_interest || '', data.navigate_growth || '', data.navigate_other || ''),
    
    disguise_initial: 1,
    disguise_total: calculateSkillTotal(1, data.disguise_job || '', data.disguise_interest || '', data.disguise_growth || '', data.disguise_other || ''),
    
    // 交渉技能（母国語は EDU×5）
    fast_talk_initial: 5,
    fast_talk_total: calculateSkillTotal(5, data.fast_talk_job || '', data.fast_talk_interest || '', data.fast_talk_growth || '', data.fast_talk_other || ''),
    
    persuade_initial: 15,
    persuade_total: calculateSkillTotal(15, data.persuade_job || '', data.persuade_interest || '', data.persuade_growth || '', data.persuade_other || ''),
    
    credit_rating_initial: 15,
    credit_rating_total: calculateSkillTotal(15, data.credit_rating_job || '', data.credit_rating_interest || '', data.credit_rating_growth || '', data.credit_rating_other || ''),
    
    bargain_initial: 5,
    bargain_total: calculateSkillTotal(5, data.bargain_job || '', data.bargain_interest || '', data.bargain_growth || '', data.bargain_other || ''),
    
    mother_tongue_initial: edu_total * 5,
    mother_tongue_total: calculateSkillTotal(edu_total * 5, data.mother_tongue_job || '', data.mother_tongue_interest || '', data.mother_tongue_growth || '', data.mother_tongue_other || ''),
    
    language_initial: 1,
    language_total: calculateSkillTotal(1, data.language_job || '', data.language_interest || '', data.language_growth || '', data.language_other || ''),
    
    // 知識技能
    medicine_initial: 5,
    medicine_total: calculateSkillTotal(5, data.medicine_job || '', data.medicine_interest || '', data.medicine_growth || '', data.medicine_other || ''),
    
    occult_initial: 5,
    occult_total: calculateSkillTotal(5, data.occult_job || '', data.occult_interest || '', data.occult_growth || '', data.occult_other || ''),
    
    chemistry_initial: 1,
    chemistry_total: calculateSkillTotal(1, data.chemistry_job || '', data.chemistry_interest || '', data.chemistry_growth || '', data.chemistry_other || ''),
    
    cthulhu_mythos_initial: 0,
    cthulhu_mythos_total: calculateSkillTotal(0, data.cthulhu_mythos_job || '', data.cthulhu_mythos_interest || '', data.cthulhu_mythos_growth || '', data.cthulhu_mythos_other || ''),
    
    art_initial: 5,
    art_total: calculateSkillTotal(5, data.art_job || '', data.art_interest || '', data.art_growth || '', data.art_other || ''),
    
    accounting_initial: 10,
    accounting_total: calculateSkillTotal(10, data.accounting_job || '', data.accounting_interest || '', data.accounting_growth || '', data.accounting_other || ''),
    
    archaeology_initial: 1,
    archaeology_total: calculateSkillTotal(1, data.archaeology_job || '', data.archaeology_interest || '', data.archaeology_growth || '', data.archaeology_other || ''),
    
    computer_use_initial: 1,
    computer_use_total: calculateSkillTotal(1, data.computer_use_job || '', data.computer_use_interest || '', data.computer_use_growth || '', data.computer_use_other || ''),
    
    psychology_initial: 5,
    psychology_total: calculateSkillTotal(5, data.psychology_job || '', data.psychology_interest || '', data.psychology_growth || '', data.psychology_other || ''),
    
    anthropology_initial: 1,
    anthropology_total: calculateSkillTotal(1, data.anthropology_job || '', data.anthropology_interest || '', data.anthropology_growth || '', data.anthropology_other || ''),
    
    biology_initial: 1,
    biology_total: calculateSkillTotal(1, data.biology_job || '', data.biology_interest || '', data.biology_growth || '', data.biology_other || ''),
    
    geology_initial: 1,
    geology_total: calculateSkillTotal(1, data.geology_job || '', data.geology_interest || '', data.geology_growth || '', data.geology_other || ''),
    
    electronics_initial: 1,
    electronics_total: calculateSkillTotal(1, data.electronics_job || '', data.electronics_interest || '', data.electronics_growth || '', data.electronics_other || ''),
    
    astronomy_initial: 1,
    astronomy_total: calculateSkillTotal(1, data.astronomy_job || '', data.astronomy_interest || '', data.astronomy_growth || '', data.astronomy_other || ''),
    
    natural_history_initial: 10,
    natural_history_total: calculateSkillTotal(10, data.natural_history_job || '', data.natural_history_interest || '', data.natural_history_growth || '', data.natural_history_other || ''),
    
    physics_initial: 1,
    physics_total: calculateSkillTotal(1, data.physics_job || '', data.physics_interest || '', data.physics_growth || '', data.physics_other || ''),
    
    law_initial: 5,
    law_total: calculateSkillTotal(5, data.law_job || '', data.law_interest || '', data.law_growth || '', data.law_other || ''),
    
    pharmacy_initial: 1,
    pharmacy_total: calculateSkillTotal(1, data.pharmacy_job || '', data.pharmacy_interest || '', data.pharmacy_growth || '', data.pharmacy_other || ''),
    
    history_initial: 20,
    history_total: calculateSkillTotal(20, data.history_job || '', data.history_interest || '', data.history_growth || '', data.history_other || ''),
  };
}

// 全ての計算を実行
export function calculateAllStats(data: CharacterData) {
  // 年齢による自動修正は行わず、手動入力を優先
  // const ageModifications = data.age ? calculateAgeModifications(toNumber(data.age)) : {};
  
  // 基礎スペックを計算（手動入力された年齢修正を使用）
  const derivedStats = calculateDerivedStats(data);
  
  // 技能値を計算
  const skillStats = calculateAllSkills(data);

  // 最大SAN値 = SAN値 - クトゥルフ神話技能の合計値
  const max_san_value = derivedStats.san_total - skillStats.cthulhu_mythos_total;

  return {
    ...data,
    ...derivedStats,
    ...skillStats,
    max_san_value,
  };
}