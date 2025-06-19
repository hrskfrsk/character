// ココフォリア用のコマデータ生成機能

export interface CcfoliaCharacterData {
  name: string;
  memo: string;
  initiative: number;
  externalUrl: string;
  status: Array<{
    label: string;
    value: number;
    max: number;
  }>;
  params: Array<{
    label: string;
    value: string;
  }>;
  color?: string;
}

export function generateCcfoliaCharacterData(character: any, characterId: string): CcfoliaCharacterData {
  // キャラクター名
  const name = character.character_name || 'キャラクター';
  
  // メモ（基本情報）
  const memo = `【職業】${character.job || '不明'}
【年齢】${character.age || '不明'}
【性別】${character.sex || character.gender || '不明'}
【出身】${character.birthplace || '不明'}

${character.introduction || ''}`.trim();

  // イニシアチブ（DEX値）
  const initiative = parseInt(character.dex_total || character.dex || '10');

  // 外部URL（キャラクターシートへのリンク）
  const externalUrl = `${window.location.origin}/character/${characterId}`;

  // ステータス（HP、MP、SAN）
  const status = [
    {
      label: 'HP',
      value: parseInt(character.current_hp || character.hit_points || '0'),
      max: parseInt(character.hit_points || '0')
    },
    {
      label: 'MP',
      value: parseInt(character.current_mp || character.magic_points || '0'),
      max: parseInt(character.magic_points || '0')
    },
    {
      label: 'SAN',
      value: parseInt(character.current_san || character.max_san_value || '0'),
      max: parseInt(character.max_san_value || '0')
    }
  ];

  // パラメータ（能力値）
  const params = [
    { label: 'STR', value: character.str_total || character.str || '10' },
    { label: 'CON', value: character.con_total || character.con || '10' },
    { label: 'POW', value: character.pow_total || character.pow || '10' },
    { label: 'DEX', value: character.dex_total || character.dex || '10' },
    { label: 'APP', value: character.app_total || character.app || '10' },
    { label: 'SIZ', value: character.siz_total || character.siz || '10' },
    { label: 'INT', value: character.int_total || character.int || '10' },
    { label: 'EDU', value: character.edu_total || character.edu || '10' },
    { label: 'DB', value: character.damage_bonus || '+0' },
    { label: 'MOV', value: character.move_rate || '8' }
  ];

  // キャラクターカラー
  const color = character.character_color_code || character.ui_theme_color || '#22c6d8';

  return {
    name,
    memo,
    initiative,
    externalUrl,
    status,
    params,
    color
  };
}

export function exportToCcfolia(character: any, characterId: string): void {
  const ccfoliaData = generateCcfoliaCharacterData(character, characterId);
  
  // JSON形式でダウンロード
  const dataStr = JSON.stringify(ccfoliaData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `${ccfoliaData.name}_ccfolia.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // クリーンアップ
  URL.revokeObjectURL(link.href);
}

export function copyToCcfoliaClipboard(character: any, characterId: string): void {
  const ccfoliaData = generateCcfoliaCharacterData(character, characterId);
  const jsonString = JSON.stringify(ccfoliaData);
  
  navigator.clipboard.writeText(jsonString).then(() => {
    alert('ココフォリア用のコマデータをクリップボードにコピーしました！\nココフォリアの「コマ」→「JSONインポート」で貼り付けてください。');
  }, () => {
    // フォールバック
    const textArea = document.createElement('textarea');
    textArea.value = jsonString;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('ココフォリア用のコマデータをクリップボードにコピーしました！\nココフォリアの「コマ」→「JSONインポート」で貼り付けてください。');
  });
}