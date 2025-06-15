export interface DiceRollResult {
  skillName: string;
  targetValue: number;
  diceRoll: number;
  isSuccess: boolean;
  successLevel: 'critical' | 'special' | 'regular' | 'failure' | 'fumble';
}

export function rollSkillCheck(skillName: string, targetValue: number): DiceRollResult {
  // 1d100をロール
  const diceRoll = Math.floor(Math.random() * 100) + 1;
  
  // 成功判定
  const isSuccess = diceRoll <= targetValue;
  
  // 成功レベルの判定
  let successLevel: DiceRollResult['successLevel'];
  
  if (diceRoll >= 96) {
    successLevel = 'fumble';
  } else if (diceRoll >= 1 && diceRoll <= 5) {
    successLevel = 'critical';
  } else if (isSuccess) {
    if (diceRoll <= Math.floor(targetValue / 5)) {
      successLevel = 'special';
    } else {
      successLevel = 'regular';
    }
  } else {
    successLevel = 'failure';
  }
  
  return {
    skillName,
    targetValue,
    diceRoll,
    isSuccess,
    successLevel
  };
}