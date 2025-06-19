import React, { useState, useEffect } from 'react';

interface CcfoliaExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: any;
  characterId: string;
}

interface ExportOptions {
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

const CcfoliaExportModal: React.FC<CcfoliaExportModalProps> = ({
  isOpen,
  onClose,
  character,
  characterId
}) => {
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<ExportOptions>({
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
  });

  const generateMemoPreview = () => {
    // 空白が選択されている場合は空文字を返す
    if (options.memoOptions.blank) {
      return '';
    }

    const parts = [];
    
    // 基本情報行
    const basicInfo = [];
    if (options.memoOptions.name && options.memoOptions.kana) {
      basicInfo.push(`${character.character_name || 'キャラクター'}(${character.character_name_kana || ''})`);
    } else if (options.memoOptions.name) {
      basicInfo.push(character.character_name || 'キャラクター');
    } else if (options.memoOptions.kana) {
      basicInfo.push(character.character_name_kana || character.character_name || 'キャラクター');
    }
    
    if (basicInfo.length > 0) {
      parts.push(basicInfo.join(''));
    }
    
    // 詳細情報行
    const details = [];
    if (options.memoOptions.job) details.push(character.job || '職業');
    if (options.memoOptions.sex) {
      // 性別の優先順位: gender_custom > sex > gender > デフォルト
      const sexValue = character.gender_custom || character.sex || character.gender || '性別';
      details.push(sexValue);
    }
    if (options.memoOptions.age) details.push(character.age || '年齢');
    if (options.memoOptions.height) details.push(character.height || '身長');
    
    if (details.length > 0) {
      parts.push(details.join(' | '));
    }
    
    parts.push(`(PL:${character.player_name || 'プレイヤー'})`);
    
    // 実際の技能データを表示
    if (options.memoOptions.skills) {
      const skills = [];
      // 技能の初期値定義
      const skillInitialValues = {
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

      const skillNames = {
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

      // 初期値以外の技能を収集
      Object.entries(skillInitialValues).forEach(([skillKey, initialValue]) => {
        const skillValue = character[`${skillKey}_total`] || 0;
        if (skillValue > initialValue) {
          const skillName = skillNames[skillKey] || skillKey;
          skills.push(`${skillName}:${skillValue}%`);
        }
      });

      // 追加技能も確認
      ['combat', 'exploration', 'action', 'negotiation', 'knowledge'].forEach(category => {
        for (let i = 1; i <= 50; i++) {
          const skillName = character[`additional_${category}_${i}_name`];
          if (skillName) {
            const skillTotal =
              (parseInt(character[`additional_${category}_${i}_initial`]) || 1) +
              (parseInt(character[`additional_${category}_${i}_job`]) || 0) +
              (parseInt(character[`additional_${category}_${i}_interest`]) || 0) +
              (parseInt(character[`additional_${category}_${i}_growth`]) || 0) +
              (parseInt(character[`additional_${category}_${i}_other`]) || 0);
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
    
    // 実際の所持品データを表示
    if (options.memoOptions.items) {
      const items = [];
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
    
    // 実際の特徴表データを表示
    if (options.memoOptions.features) {
      const features = [];
      
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
    
    // 実際の職業特記データを表示
    if (options.memoOptions.jobSpecial) {
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

  const handleExport = () => {
    // Import the export function dynamically to avoid circular dependencies
    import('../lib/ccfolia-exporter').then(({ generateCcfoliaCharacterData }) => {
      // Generate data with options
      const ccfoliaData = generateCcfoliaCharacterData(character, characterId, options);
      const jsonString = JSON.stringify(ccfoliaData);
      
      navigator.clipboard.writeText(jsonString).then(
        () => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            onClose();
          }, 2000);
        },
        () => {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = jsonString;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            onClose();
          }, 2000);
        }
      );
    });
  };

  // モーダルが閉じる時にコピー状態をリセット
  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container ccfolia-export-modal">
        <div className="modal-content">
          <h2 className="modal-title">
            <i className="fas fa-download"></i> ココフォリア用コマ出力
          </h2>
          
          <p className="modal-description">
            コピーした内容をココフォリア上でペーストすると、探索者コマが作成されます。
          </p>

          <div className="export-options">
            <div className="option-group">
              <h3>出力する技能</h3>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="skillOutput"
                    value="all"
                    checked={options.skillOutput === 'all'}
                    onChange={(e) => setOptions({...options, skillOutput: 'all'})}
                  />
                  全て
                </label>
                <label>
                  <input
                    type="radio"
                    name="skillOutput"
                    value="nonDefault"
                    checked={options.skillOutput === 'nonDefault'}
                    onChange={(e) => setOptions({...options, skillOutput: 'nonDefault'})}
                  />
                  初期値以外の技能のみ
                </label>
              </div>
            </div>

            <div className="option-group">
              <h3>ロールコマンド</h3>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="rollCommand"
                    value="CCB"
                    checked={options.rollCommand === 'CCB'}
                    onChange={(e) => setOptions({...options, rollCommand: 'CCB'})}
                  />
                  CCB
                </label>
                <label>
                  <input
                    type="radio"
                    name="rollCommand"
                    value="CC"
                    checked={options.rollCommand === 'CC'}
                    onChange={(e) => setOptions({...options, rollCommand: 'CC'})}
                  />
                  CC
                </label>
              </div>
            </div>

            <div className="option-group">
              <h3>キャラクターメモ</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={options.memoOptions.blank}
                    onChange={(e) => {
                      if (e.target.checked) {
                        // 空白をチェックしたら他のチェックを全て外す
                        setOptions({
                          ...options,
                          memoOptions: {
                            blank: true,
                            name: false,
                            kana: false,
                            job: false,
                            sex: false,
                            age: false,
                            height: false,
                            skills: false,
                            items: false,
                            features: false,
                            jobSpecial: false
                          }
                        });
                      } else {
                        setOptions({
                          ...options,
                          memoOptions: {...options.memoOptions, blank: false}
                        });
                      }
                    }}
                  />
                  空白
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={options.memoOptions.name}
                    onChange={(e) => setOptions({
                      ...options,
                      memoOptions: {...options.memoOptions, name: e.target.checked, blank: e.target.checked ? false : options.memoOptions.blank}
                    })}
                  />
                  名前
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={options.memoOptions.kana}
                    onChange={(e) => setOptions({
                      ...options,
                      memoOptions: {...options.memoOptions, kana: e.target.checked, blank: e.target.checked ? false : options.memoOptions.blank}
                    })}
                  />
                  よみがな
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={options.memoOptions.job}
                    onChange={(e) => setOptions({
                      ...options,
                      memoOptions: {...options.memoOptions, job: e.target.checked, blank: e.target.checked ? false : options.memoOptions.blank}
                    })}
                  />
                  職業
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={options.memoOptions.sex}
                    onChange={(e) => setOptions({
                      ...options,
                      memoOptions: {...options.memoOptions, sex: e.target.checked, blank: e.target.checked ? false : options.memoOptions.blank}
                    })}
                  />
                  性別
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={options.memoOptions.age}
                    onChange={(e) => setOptions({
                      ...options,
                      memoOptions: {...options.memoOptions, age: e.target.checked, blank: e.target.checked ? false : options.memoOptions.blank}
                    })}
                  />
                  年齢
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={options.memoOptions.height}
                    onChange={(e) => setOptions({
                      ...options,
                      memoOptions: {...options.memoOptions, height: e.target.checked, blank: e.target.checked ? false : options.memoOptions.blank}
                    })}
                  />
                  身長
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={options.memoOptions.skills}
                    onChange={(e) => setOptions({
                      ...options,
                      memoOptions: {...options.memoOptions, skills: e.target.checked, blank: e.target.checked ? false : options.memoOptions.blank}
                    })}
                  />
                  所持技能
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={options.memoOptions.items}
                    onChange={(e) => setOptions({
                      ...options,
                      memoOptions: {...options.memoOptions, items: e.target.checked, blank: e.target.checked ? false : options.memoOptions.blank}
                    })}
                  />
                  所持品
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={options.memoOptions.features}
                    onChange={(e) => setOptions({
                      ...options,
                      memoOptions: {...options.memoOptions, features: e.target.checked, blank: e.target.checked ? false : options.memoOptions.blank}
                    })}
                  />
                  特徴表
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={options.memoOptions.jobSpecial}
                    onChange={(e) => setOptions({
                      ...options,
                      memoOptions: {...options.memoOptions, jobSpecial: e.target.checked, blank: e.target.checked ? false : options.memoOptions.blank}
                    })}
                  />
                  職業特記
                </label>
              </div>
            </div>

            <div className="memo-preview">
              <h4>キャラクターメモのプレビュー</h4>
              <pre>{generateMemoPreview()}</pre>
            </div>
          </div>

          <div className="modal-buttons">
            <button className="modal-button cancel" onClick={onClose}>
              閉じる
            </button>
            {copied ? (
              <span style={{ color: '#4caf50', fontWeight: 'bold' }}>
                <i className="fas fa-check"></i> コピーしました
              </span>
            ) : (
              <button className="modal-button confirm" onClick={handleExport}>
                <i className="fas fa-copy"></i> コピー
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CcfoliaExportModal;