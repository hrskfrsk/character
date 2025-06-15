// 基礎能力値用のダイス機能

export interface AbilityRollResult {
  rolls: number[];
  total: number;
  formula: string;
}

// 3D6のダイスロール
export function roll3d6(): AbilityRollResult {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];
  const total = rolls.reduce((sum, roll) => sum + roll, 0);
  
  return {
    rolls,
    total,
    formula: '3D6'
  };
}

// 4D6の最高3個の合計（D&D式）
export function roll4d6DropLowest(): AbilityRollResult {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];
  
  // 最小値を除いた3個の合計
  rolls.sort((a, b) => b - a);
  const total = rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
  
  return {
    rolls,
    total,
    formula: '4D6 (最高3個)'
  };
}

// 2D6+6のダイスロール
export function roll2d6Plus6(): AbilityRollResult {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];
  const total = rolls.reduce((sum, roll) => sum + roll, 0) + 6;
  
  return {
    rolls,
    total,
    formula: '2D6+6'
  };
}

// 3D6+3のダイスロール（EDU用）
export function roll3d6Plus3(): AbilityRollResult {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];
  const total = rolls.reduce((sum, roll) => sum + roll, 0) + 3;
  
  return {
    rolls,
    total,
    formula: '3D6+3'
  };
}

// 全能力値をCoC推奨方式でロール
export function rollAllAbilities() {
  return {
    str: roll3d6(),      // STR: 3D6
    con: roll3d6(),      // CON: 3D6
    pow: roll3d6(),      // POW: 3D6
    dex: roll3d6(),      // DEX: 3D6
    app: roll3d6(),      // APP: 3D6
    siz: roll2d6Plus6(), // SIZ: 2D6+6
    int: roll2d6Plus6(), // INT: 2D6+6
    edu: roll3d6Plus3()  // EDU: 3D6+3
  };
}

// 個別能力値ロール
export function rollSingleAbility(ability: 'str' | 'con' | 'pow' | 'dex' | 'app' | 'siz' | 'int' | 'edu'): AbilityRollResult {
  switch (ability) {
    case 'str':
    case 'con':
    case 'pow':
    case 'dex':
    case 'app':
      return roll3d6();
    case 'siz':
    case 'int':
      return roll2d6Plus6();
    case 'edu':
      return roll3d6Plus3();
    default:
      return roll3d6();
  }
}