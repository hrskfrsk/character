// このスクリプトは技能値表示を一括更新するためのものです
// 実際の実行は手動で行います

const skills = [
  { id: 'kick', name: 'キック' },
  { id: 'grapple', name: '組み付き' },
  { id: 'punch', name: 'こぶし' },
  { id: 'headbutt', name: '頭突き' },
  { id: 'throw', name: '投擲' },
  { id: 'martial_arts', name: 'マーシャルアーツ' },
  { id: 'handgun', name: '拳銃' },
  { id: 'submachine_gun', name: 'サブマシンガン' },
  { id: 'shotgun', name: 'ショットガン' },
  { id: 'machine_gun', name: 'マシンガン' },
  { id: 'rifle', name: 'ライフル' },
  { id: 'first_aid', name: '応急手当' },
  { id: 'locksmith', name: '鍵開け' },
  { id: 'conceal', name: '隠す' },
  { id: 'hide', name: '隠れる' },
  { id: 'listen', name: '聞き耳' },
  { id: 'sneak', name: '忍び歩き' },
  { id: 'photography', name: '写真術' },
  { id: 'psychoanalysis', name: '精神分析' },
  { id: 'track', name: '追跡' },
  { id: 'climb', name: '登攀' },
  { id: 'library_use', name: '図書館' },
  { id: 'spot_hidden', name: '目星' },
  { id: 'swim', name: '水泳' },
  { id: 'jump', name: '跳躍' },
  { id: 'electrical_repair', name: '電気修理' },
  { id: 'navigate', name: 'ナビゲート' },
  { id: 'disguise', name: '変装' },
  { id: 'fast_talk', name: '言いくるめ' },
  { id: 'credit_rating', name: '信用' },
  { id: 'persuade', name: '説得' },
  { id: 'bargain', name: '値切り' },
  { id: 'medicine', name: '医学' },
  { id: 'occult', name: 'オカルト' },
  { id: 'chemistry', name: '化学' },
  { id: 'cthulhu_mythos', name: 'クトゥルフ神話' },
  { id: 'accounting', name: '経理' },
  { id: 'archaeology', name: '考古学' },
  { id: 'computer_use', name: 'コンピューター' },
  { id: 'psychology', name: '心理学' },
  { id: 'anthropology', name: '人類学' },
  { id: 'biology', name: '生物学' },
  { id: 'geology', name: '地質学' },
  { id: 'electronics', name: '電子工学' },
  { id: 'astronomy', name: '天文学' },
  { id: 'natural_history', name: '博物学' },
  { id: 'physics', name: '物理学' },
  { id: 'law', name: '法律' },
  { id: 'pharmacy', name: '薬学' },
  { id: 'history', name: '歴史' },
  { id: 'mechanical_repair', name: '機械修理' },
  { id: 'heavy_machinery', name: '重機械操作' },
  { id: 'ride', name: '乗馬' }
];

skills.forEach(skill => {
  console.log(`
// ${skill.name}
<div className="total"><span id="${skill.id}_total">{character.${skill.id}_total || '-'}</span></div>
↓
<div className="total">
  <SkillDisplay
    skillName="${skill.name}"
    skillValue={character.${skill.id}_total}
    skillId="${skill.id}_total"
    onClick={handleSkillClick}
  />
</div>
`);
});