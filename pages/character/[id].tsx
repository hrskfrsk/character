import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCharacterData, getAllCharacterIds } from '../../lib/firebase-admin';

interface CharacterPageProps {
  character: any;
  characterId: string;
}

export default function CharacterPage({ character, characterId }: CharacterPageProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [secretMemoVisibility, setSecretMemoVisibility] = useState<Record<string, boolean>>({});
  
  // 装備セクションのアコーディオン状態
  const [equipmentSections, setEquipmentSections] = useState({
    weapons: true,
    items: true,
    disorders: true,
    books: true,
    spells: true,
    artifacts: true,
    entities: true,
    memos: true
  });
  
  // 技能表示の状態（デフォルトは初期値以外のみ表示）
  const [showAllSkills, setShowAllSkills] = useState(false);

  // 初期値を表示するヘルパー関数（初期値は必ず数字を表示）
  const displayInitial = (value: any, defaultValue: number = 0): string => {
    if (value !== undefined && value !== null && value !== '') {
      return String(value);
    }
    return String(defaultValue);
  };


  // 各装備セクションにデータが存在するかチェックするヘルパー関数
  const hasWeapons = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`weapon_${i}_name`]) return true;
    }
    return false;
  };

  const hasItems = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`item_${i}_name`]) return true;
    }
    return false;
  };

  const hasDisorders = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`disorder_${i}_name`]) return true;
    }
    return false;
  };

  const hasBooks = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`book_${i}_name`]) return true;
    }
    return false;
  };

  const hasSpells = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`spell_${i}_name`]) return true;
    }
    return false;
  };

  const hasArtifacts = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`artifact_${i}_name`]) return true;
    }
    return false;
  };

  const hasEntities = (char: any): boolean => {
    for (let i = 1; i <= 50; i++) {
      if (char[`entity_${i}_name`]) return true;
    }
    return false;
  };

  const hasOtherNotes = (char: any): boolean => {
    return !!(char?.other_memo && char.other_memo.trim());
  };

  const hasSecretNotes = (char: any): boolean => {
    // 従来の secret_memo フィールドをチェック
    if (char?.secret_memo && char.secret_memo.trim()) {
      return true;
    }
    // 新しい複数項目形式をチェック
    for (let i = 1; i <= 50; i++) {
      if (char[`secret_memo_${i}_title`] || char[`secret_memo_${i}_content`]) {
        return true;
      }
    }
    return false;
  };

  const hasMemos = (char: any): boolean => {
    // その他メモをチェック
    if (char?.other_memo && char.other_memo.trim()) {
      return true;
    }
    // 新しいメモ形式をチェック
    for (let i = 1; i <= 50; i++) {
      if (char[`memo_${i}_title`] || char[`memo_${i}_content`]) {
        return true;
      }
    }
    // 秘匿関連もチェック
    return hasSecretNotes(char);
  };

  // 個別の秘匿項目の表示切り替え
  const toggleSecretMemoVisibility = (memoId: string) => {
    setSecretMemoVisibility(prev => ({
      ...prev,
      [memoId]: !prev[memoId]
    }));
  };

  // 装備セクションのアコーディオン制御
  const toggleEquipmentSection = (sectionId: keyof typeof equipmentSections) => {
    setEquipmentSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!character) {
    return (
      <div>
        <Head>
          <title>キャラクターが見つかりません</title>
        </Head>
        <h1>キャラクターが見つかりません</h1>
        <p>指定されたキャラクター（ID: {characterId}）は存在しません。</p>
      </div>
    );
  }

  if (!mounted) {
    return (
      <>
        <Head>
          <title>{character.character_name || 'キャラクター'} - CoC6版キャラクターシート</title>
        </Head>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{character.character_name || 'キャラクター'} - CoC6版キャラクターシート</title>
        <meta name="description" content={`${character.character_name}のキャラクターシート`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Font Awesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Kosugi&family=Varela+Round&display=swap" 
          rel="stylesheet"
        />
      </Head>

      <div className="works-template-default single single-works postid-6531 custom-background">
        <div id="content" className="chara-coc character">
          <div id="inner-content" className="wrap cf">
            <main id="main" role="main" itemScope itemProp="mainContentOfPage" itemType="http://schema.org/Blog">
              <article id="post-6531"
                className="cf post-6531 works type-works status-publish has-post-thumbnail hentry custom_cat-character custom_cat-chara-coc custom_tag-1072"
                role="article">

                <section className="chara-seet">
                  {/* キャラクター基本情報 */}
                  <div className="character-info">
                    <h2><i className="fas fa-user"></i> キャラクター情報</h2>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>名前</label>
                        <span>{character.character_name || '未設定'}</span>
                      </div>
                      <div className="info-item">
                        <label>フリガナ</label>
                        <span>{character.character_name_kana || '未設定'}</span>
                      </div>
                      <div className="info-item">
                        <label>年齢</label>
                        <span>{character.age || '未設定'}</span>
                      </div>
                      <div className="info-item">
                        <label>性別</label>
                        <span>{character.gender || '未設定'}</span>
                      </div>
                      <div className="info-item">
                        <label>職業</label>
                        <span>{character.job || '未設定'}</span>
                      </div>
                      <div className="info-item">
                        <label>出身</label>
                        <span>{character.birthplace || '未設定'}</span>
                      </div>
                      <div className="info-item">
                        <label>学校・学位</label>
                        <span>{character.school || '未設定'}</span>
                      </div>
                      <div className="info-item full-width">
                        <label>外見・特徴</label>
                        <span>{character.appearance || '未設定'}</span>
                      </div>
                      <div className="info-item full-width">
                        <label>イデオロギー・信念</label>
                        <span>{character.ideology || '未設定'}</span>
                      </div>
                      <div className="info-item full-width">
                        <label>重要な人物</label>
                        <span>{character.important_person || '未設定'}</span>
                      </div>
                      <div className="info-item full-width">
                        <label>意味のある場所</label>
                        <span>{character.meaningful_location || '未設定'}</span>
                      </div>
                      <div className="info-item full-width">
                        <label>宝物</label>
                        <span>{character.treasure || '未設定'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 特徴セクション */}
                  <div className="features">
                    <ul>
                      {(() => {
                        const traitElements = [];
                        // trait_1からtrait_50まで確認して存在するもののみ表示
                        for (let i = 1; i <= 50; i++) {
                          const traitNumber = character[`trait_${i}_number`];
                          const traitName = character[`trait_${i}_name`];
                          const traitDescription = character[`trait_${i}_description`];
                          
                          if (traitName) {
                            traitElements.push(
                              <li key={i} className="d-flex f-list">
                                <div className="f-label">
                                  <span className="num">{traitNumber || '0-0'}</span>
                                  <span className="name">{traitName}</span>
                                </div>
                                <div className="contents">
                                  {traitDescription || '-'}
                                </div>
                              </li>
                            );
                          }
                        }
                        return traitElements.length > 0 ? traitElements : (
                          <li className="d-flex f-list">
                            <div className="f-label">
                              <span className="num">-</span>
                              <span className="name">特徴なし</span>
                            </div>
                            <div className="contents">-</div>
                          </li>
                        );
                      })()}
                    </ul>
                  </div>

                  <div className="scores d-flex">
                    {/* 能力値 */}
                    <ul className="basic-score d-flex ul-score">
                      <li className="name">
                        <div className="score-sum"></div>
                        <ul className="score-detail">
                          <li>基礎能力</li>
                          <li className="ages">年齢修正</li>
                          <li>他増減</li>
                        </ul>
                      </li>
                      
                      {/* STR */}
                      <li className="str score-li">
                        <h3>STR</h3>
                        <div className="score-sum">
                          <span id="str_total">{character.str_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span className="val" id="str_base">{character.str_base || '-'}</span>
                          </li>
                          <li className="ages">
                            <span className="val" id="str_age_mod">{character.str_age_mod || '-'}</span>
                          </li>
                          <li>
                            <span className="val" id="str_other_mod">{character.str_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      {/* CON */}
                      <li className="con score-li">
                        <h3>CON</h3>
                        <div className="score-sum">
                          <span id="con_total">{character.con_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span className="val" id="con_base">{character.con_base || '-'}</span>
                          </li>
                          <li className="ages">
                            <span className="val" id="con_age_mod">{character.con_age_mod || '-'}</span>
                          </li>
                          <li>
                            <span className="val" id="con_other_mod">{character.con_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      {/* POW */}
                      <li className="pow score-li">
                        <h3>POW</h3>
                        <div className="score-sum">
                          <span id="pow_total">{character.pow_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span className="val" id="pow_base">{character.pow_base || '-'}</span>
                          </li>
                          <li className="ages">
                            <span className="val" id="pow_age_mod">{character.pow_age_mod || '-'}</span>
                          </li>
                          <li>
                            <span className="val" id="pow_other_mod">{character.pow_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      {/* DEX */}
                      <li className="dex score-li">
                        <h3>DEX</h3>
                        <div className="score-sum">
                          <span id="dex_total">{character.dex_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span className="val" id="dex_base">{character.dex_base || '-'}</span>
                          </li>
                          <li className="ages">
                            <span className="val" id="dex_age_mod">{character.dex_age_mod || '-'}</span>
                          </li>
                          <li>
                            <span className="val" id="dex_other_mod">{character.dex_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      {/* APP */}
                      <li className="app score-li">
                        <h3>APP</h3>
                        <div className="score-sum">
                          <span id="app_total">{character.app_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span className="val" id="app_base">{character.app_base || '-'}</span>
                          </li>
                          <li className="ages">
                            <span className="val" id="app_age_mod">{character.app_age_mod || '-'}</span>
                          </li>
                          <li>
                            <span className="val" id="app_other_mod">{character.app_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      {/* SIZ */}
                      <li className="siz score-li">
                        <h3>SIZ</h3>
                        <div className="score-sum">
                          <span id="siz_total">{character.siz_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span className="val" id="siz_base">{character.siz_base || '-'}</span>
                          </li>
                          <li className="ages">
                            <span className="val" id="siz_age_mod">{character.siz_age_mod || '-'}</span>
                          </li>
                          <li>
                            <span className="val" id="siz_other_mod">{character.siz_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      {/* INT */}
                      <li className="int score-li">
                        <h3>INT</h3>
                        <div className="score-sum">
                          <span id="int_total">{character.int_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span className="val" id="int_base">{character.int_base || '-'}</span>
                          </li>
                          <li className="ages">
                            <span className="val" id="int_age_mod">{character.int_age_mod || '-'}</span>
                          </li>
                          <li>
                            <span className="val" id="int_other_mod">{character.int_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      {/* EDU */}
                      <li className="edu score-li">
                        <h3>EDU</h3>
                        <div className="score-sum">
                          <span id="edu_total">{character.edu_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span className="val" id="edu_base">{character.edu_base || '-'}</span>
                          </li>
                          <li className="ages">
                            <span className="val" id="edu_age_mod">{character.edu_age_mod || '-'}</span>
                          </li>
                          <li>
                            <span className="val" id="edu_other_mod">{character.edu_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>
                    </ul>

                    {/* 基礎スペック */}
                    <ul className="calc-score d-flex ul-score">
                      <li className="name sp-only">
                        <div className="score-sum"></div>
                        <ul className="score-detail">
                          <li>基礎能力</li>
                          <li className="ages">年齢修正</li>
                          <li>他増減</li>
                        </ul>
                      </li>
                      
                      <li className="san score-li">
                        <h3>初期SAN</h3>
                        <div className="score-sum">
                          <span id="san_total">{character.san_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span id="san_base_value">{character.san_base_value || '-'}</span>
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <span id="san_other_mod">{character.san_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      <li className="hp score-li">
                        <h3>HP</h3>
                        <div className="score-sum">
                          <span id="hp_total">{character.hp_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span id="hp_base_value">{character.hp_base_value || '-'}</span>
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <span id="hp_other_mod">{character.hp_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      <li className="mp score-li">
                        <h3>MP</h3>
                        <div className="score-sum">
                          <span id="mp_total">{character.mp_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span id="mp_base_value">{character.mp_base_value || '-'}</span>
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <span id="mp_other_mod">{character.mp_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      <li className="idea score-li">
                        <h3>アイデア</h3>
                        <div className="score-sum">
                          <span id="idea_total">{character.idea_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span id="idea_base_value">{character.idea_base_value || '-'}</span>
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <span id="idea_other_mod">{character.idea_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      <li className="luck score-li">
                        <h3>幸運</h3>
                        <div className="score-sum">
                          <span id="luck_total">{character.luck_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span id="luck_base_value">{character.luck_base_value || '-'}</span>
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <span id="luck_other_mod">{character.luck_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>

                      <li className="knowledge score-li">
                        <h3>知識</h3>
                        <div className="score-sum">
                          <span id="knowledge_total">{character.knowledge_total || '-'}</span>
                        </div>
                        <ul className="score-detail">
                          <li>
                            <span id="knowledge_base_value">{character.knowledge_base_value || '-'}</span>
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <span id="knowledge_other_mod">{character.knowledge_other_mod || '-'}</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  {/* スペック */}
                  <div className="slots d-flex">
                    <div className="now-san slot">
                      <h3>現在SAN値</h3>
                      <div className="slot-txt">
                        <span id="current_san">{character.current_san || '-'}</span>
                        <span>/
                          <span id="max_san">{character.max_san_value || '-'}</span>
                        </span>
                      </div>
                    </div>
                    <div className="db slot">
                      <h3>ダメ―ジボーナス</h3>
                      <div className="slot-txt">
                        <span id="damage_bonus">{character.damage_bonus || '-'}</span>
                      </div>
                    </div>
                    <div className="jobp slot">
                      <h3>職業P</h3>
                      <div className="slot-txt">
                        <span id="job_points_used">{character.job_points_used || '-'}</span>
                        <span>/
                          <span id="job_points_total">{character.job_points_total || '-'}</span>
                          <br className="sp-only" />
                          (
                          <span id="job_points_formula_text">
                            {(() => {
                              const formula = character.job_points_formula || 'edu20';
                              switch (formula) {
                                case 'edu20': return 'EDU×20';
                                case 'edu10_str10': return 'EDU×10+STR×10';
                                case 'edu10_con10': return 'EDU×10+CON×10';
                                case 'edu10_pow10': return 'EDU×10+POW×10';
                                case 'edu10_dex10': return 'EDU×10+DEX×10';
                                case 'edu10_app10': return 'EDU×10+APP×10';
                                case 'edu10_siz10': return 'EDU×10+SIZ×10';
                                case 'edu10_int10': return 'EDU×10+INT×10';
                                case 'manual': return '手動入力';
                                default: return 'EDU×20';
                              }
                            })()}
                          </span>
                          )</span>
                      </div>
                    </div>
                    <div className="intp slot">
                      <h3>興味P</h3>
                      <div className="slot-txt">
                        <span id="interest_points_used">{character.interest_points_used || '-'}</span>
                        <span>/
                          <span id="interest_points_total">{character.interest_points_total || '-'}</span>
                          <br className="sp-only" />
                          ( 追加分 ：
                          <span id="interest_points_extra">{character.interest_points_extra || '-'}</span>
                          )</span>
                      </div>
                    </div>
                  </div>

                  {/* 技能表示切り替えボタン */}
                  <div className="skill-toggle-container" style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <div className="segmented-toggle">
                      <button 
                        type="button" 
                        className={showAllSkills ? 'active' : ''}
                        onClick={() => setShowAllSkills(true)}
                      >
                        全表示
                      </button>
                      <button 
                        type="button" 
                        className={!showAllSkills ? 'active' : ''}
                        onClick={() => setShowAllSkills(false)}
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
                            <div className="total"><span id="dodge_total">{character.dodge_total || '-'}</span></div>
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
                            <div className="total"><span id="kick_total">{character.kick_total || '-'}</span></div>
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
                            <div className="total"><span id="grapple_total">{character.grapple_total || '-'}</span></div>
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
                            <div className="total"><span id="punch_total">{character.punch_total || '-'}</span></div>
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
                            <div className="total"><span id="headbutt_total">{character.headbutt_total || '-'}</span></div>
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
                            <div className="total"><span id="throw_total">{character.throw_total || '-'}</span></div>
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
                            <div className="total"><span id="martial_arts_total">{character.martial_arts_total || '-'}</span></div>
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
                            <div className="total"><span id="handgun_total">{character.handgun_total || '-'}</span></div>
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
                            <div className="total"><span id="submachine_gun_total">{character.submachine_gun_total || '-'}</span></div>
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
                            <div className="total"><span id="shotgun_total">{character.shotgun_total || '-'}</span></div>
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
                            <div className="total"><span id="machine_gun_total">{character.machine_gun_total || '-'}</span></div>
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
                            <div className="total"><span id="rifle_total">{character.rifle_total || '-'}</span></div>
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
                              
                              if (skillName && !isSkillInitialOnly(`additional_combat_${i}`)) {
                                additionalCombatSkills.push(
                                  <li key={`additional_combat_${i}`} className="d-flex skill-li skill-body">
                                    <div className="title">{skillName}</div>
                                    <div className="total">
                                      <span>{character[`additional_combat_${i}_total`] || '-'}</span>
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
                            <div className="total"><span id="first_aid_total">{character.first_aid_total || '-'}</span></div>
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
                            <div className="total"><span id="locksmith_total">{character.locksmith_total || '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="locksmith_initial">{displayInitial(character.locksmith_initial, 1)}</span>|
                              <span className="atai" id="locksmith_job">{character.locksmith_job || '-'}</span>|
                              <span className="atai" id="locksmith_interest">{character.locksmith_interest || '-'}</span>|
                              <span className="atai" id="locksmith_growth">{character.locksmith_growth || '-'}</span>|
                              <span className="atai" id="locksmith_other">{character.locksmith_other || '-'}</span>
                            </div>
                          </li>
                          )}

                          {(showAllSkills || !isSkillInitialOnly('conceal')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">隠す</div>
                            <div className="total"><span id="conceal_total">{character.conceal_total || '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="conceal_initial">{displayInitial(character.conceal_initial, 15)}</span>|
                              <span className="atai" id="conceal_job">{character.conceal_job || '-'}</span>|
                              <span className="atai" id="conceal_interest">{character.conceal_interest || '-'}</span>|
                              <span className="atai" id="conceal_growth">{character.conceal_growth || '-'}</span>|
                              <span className="atai" id="conceal_other">{character.conceal_other || '-'}</span>
                            </div>
                          </li>
                          )}

                          {(showAllSkills || !isSkillInitialOnly('hide')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">隠れる</div>
                            <div className="total"><span id="hide_total">{character.hide_total || '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="hide_initial">{displayInitial(character.hide_initial, 10)}</span>|
                              <span className="atai" id="hide_job">{character.hide_job || '-'}</span>|
                              <span className="atai" id="hide_interest">{character.hide_interest || '-'}</span>|
                              <span className="atai" id="hide_growth">{character.hide_growth || '-'}</span>|
                              <span className="atai" id="hide_other">{character.hide_other || '-'}</span>
                            </div>
                          </li>
                          )}

                          {(showAllSkills || !isSkillInitialOnly('listen')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">聞き耳</div>
                            <div className="total"><span id="listen_total">{character.listen_total || '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="listen_initial">{displayInitial(character.listen_initial, 25)}</span>|
                              <span className="atai" id="listen_job">{character.listen_job || '-'}</span>|
                              <span className="atai" id="listen_interest">{character.listen_interest || '-'}</span>|
                              <span className="atai" id="listen_growth">{character.listen_growth || '-'}</span>|
                              <span className="atai" id="listen_other">{character.listen_other || '-'}</span>
                            </div>
                          </li>
                          )}

                          {(showAllSkills || !isSkillInitialOnly('sneak')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">忍び歩き</div>
                            <div className="total"><span id="sneak_total">{character.sneak_total || '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="sneak_initial">{displayInitial(character.sneak_initial, 10)}</span>|
                              <span className="atai" id="sneak_job">{character.sneak_job || '-'}</span>|
                              <span className="atai" id="sneak_interest">{character.sneak_interest || '-'}</span>|
                              <span className="atai" id="sneak_growth">{character.sneak_growth || '-'}</span>|
                              <span className="atai" id="sneak_other">{character.sneak_other || '-'}</span>
                            </div>
                          </li>
                          )}

                          {(showAllSkills || !isSkillInitialOnly('photography')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">写真術</div>
                            <div className="total"><span id="photography_total">{character.photography_total || '-'}</span></div>
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
                            <div className="total"><span id="psychoanalysis_total">{character.psychoanalysis_total || '-'}</span></div>
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
                            <div className="total"><span id="track_total">{character.track_total || '-'}</span></div>
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
                            <div className="total"><span id="climb_total">{character.climb_total || '-'}</span></div>
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
                            <div className="total"><span id="library_use_total">{character.library_use_total || '-'}</span></div>
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
                            <div className="total"><span id="spot_hidden_total">{character.spot_hidden_total || '-'}</span></div>
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
                              
                              if (skillName && !isSkillInitialOnly(`additional_exploration_${i}`)) {
                                additionalExplorationSkills.push(
                                  <li key={`additional_exploration_${i}`} className="d-flex skill-li skill-body">
                                    <div className="title">{skillName}</div>
                                    <div className="total">
                                      <span>{character[`additional_exploration_${i}_total`] || '-'}</span>
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

                          {(showAllSkills || !isSkillInitialOnly('drive')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">運転({character.drive_specialty || '---'})</div>
                            <div className="total"><span id="drive_total">{character.drive_total || '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="drive_initial">{displayInitial(character.drive_initial, 20)}</span>|
                              <span className="atai" id="drive_job">{character.drive_job || '-'}</span>|
                              <span className="atai" id="drive_interest">{character.drive_interest || '-'}</span>|
                              <span className="atai" id="drive_growth">{character.drive_growth || '-'}</span>|
                              <span className="atai" id="drive_other">{character.drive_other || '-'}</span>
                            </div>
                          </li>
                          )}

                          {(showAllSkills || !isSkillInitialOnly('mechanical_repair')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">機械修理</div>
                            <div className="total"><span id="mechanical_repair_total">{character.mechanical_repair_total || '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="mechanical_repair_initial">{displayInitial(character.mechanical_repair_initial, 20)}</span>|
                              <span className="atai" id="mechanical_repair_job">{character.mechanical_repair_job || '-'}</span>|
                              <span className="atai" id="mechanical_repair_interest">{character.mechanical_repair_interest || '-'}</span>|
                              <span className="atai" id="mechanical_repair_growth">{character.mechanical_repair_growth || '-'}</span>|
                              <span className="atai" id="mechanical_repair_other">{character.mechanical_repair_other || '-'}</span>
                            </div>
                          </li>
                          )}

                          {(showAllSkills || !isSkillInitialOnly('heavy_machinery')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">重機械操作</div>
                            <div className="total"><span id="heavy_machinery_total">{character.heavy_machinery_total || '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="heavy_machinery_initial">{displayInitial(character.heavy_machinery_initial, 1)}</span>|
                              <span className="atai" id="heavy_machinery_job">{character.heavy_machinery_job || '-'}</span>|
                              <span className="atai" id="heavy_machinery_interest">{character.heavy_machinery_interest || '-'}</span>|
                              <span className="atai" id="heavy_machinery_growth">{character.heavy_machinery_growth || '-'}</span>|
                              <span className="atai" id="heavy_machinery_other">{character.heavy_machinery_other || '-'}</span>
                            </div>
                          </li>
                          )}

                          {(showAllSkills || !isSkillInitialOnly('ride')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">乗馬</div>
                            <div className="total"><span id="ride_total">{character.ride_total || '-'}</span></div>
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
                            <div className="total"><span id="swim_total">{character.swim_total || '-'}</span></div>
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
                            <div className="title">製作({character.craft_specialty || '---'})</div>
                            <div className="total"><span id="craft_total">{character.craft_total || '-'}</span></div>
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
                            <div className="title">操縦({character.pilot_specialty || '---'})</div>
                            <div className="total"><span id="pilot_total">{character.pilot_total || '-'}</span></div>
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
                            <div className="total"><span id="jump_total">{character.jump_total || '-'}</span></div>
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
                            <div className="total"><span id="electrical_repair_total">{character.electrical_repair_total || '-'}</span></div>
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
                            <div className="total"><span id="navigate_total">{character.navigate_total || '-'}</span></div>
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
                            <div className="total"><span id="disguise_total">{character.disguise_total || '-'}</span></div>
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
                              
                              if (skillName && !isSkillInitialOnly(`additional_action_${i}`)) {
                                additionalActionSkills.push(
                                  <li key={`additional_action_${i}`} className="d-flex skill-li skill-body">
                                    <div className="title">{skillName}</div>
                                    <div className="total">
                                      <span>{character[`additional_action_${i}_total`] || '-'}</span>
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
                            <div className="total"><span id="fast_talk_total">{character.fast_talk_total || '-'}</span></div>
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
                            <div className="total"><span id="credit_rating_total">{character.credit_rating_total || '-'}</span></div>
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
                            <div className="total"><span id="persuade_total">{character.persuade_total || '-'}</span></div>
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
                            <div className="total"><span id="bargain_total">{character.bargain_total || '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="bargain_initial">{displayInitial(character.bargain_initial, 5)}</span>|
                              <span className="atai" id="bargain_job">{character.bargain_job || '-'}</span>|
                              <span className="atai" id="bargain_interest">{character.bargain_interest || '-'}</span>|
                              <span className="atai" id="bargain_growth">{character.bargain_growth || '-'}</span>|
                              <span className="atai" id="bargain_other">{character.bargain_other || '-'}</span>
                            </div>
                          </li>
                          )}

                          {(showAllSkills || !isSkillInitialOnly('mother_tongue')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">母国語({character.mother_tongue_specialty || character.own_language_specialty || '---'})</div>
                            <div className="total"><span id="mother_tongue_total">{character.mother_tongue_total || '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="mother_tongue_initial">{displayInitial(character.mother_tongue_initial, 0)}</span>|
                              <span className="atai" id="mother_tongue_job">{character.mother_tongue_job || '-'}</span>|
                              <span className="atai" id="mother_tongue_interest">{character.mother_tongue_interest || '-'}</span>|
                              <span className="atai" id="mother_tongue_growth">{character.mother_tongue_growth || '-'}</span>|
                              <span className="atai" id="mother_tongue_other">{character.mother_tongue_other || '-'}</span>
                            </div>
                          </li>
                          )}

                          {/* 他の言語 */}
                          {(showAllSkills || !isSkillInitialOnly('language')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">他の言語({character.language_specialty || '---'})</div>
                            <div className="total"><span id="language_total">{character.language_total || '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="language_initial">{displayInitial(character.language_initial, 1)}</span>|
                              <span className="atai" id="language_job">{character.language_job || '-'}</span>|
                              <span className="atai" id="language_interest">{character.language_interest || '-'}</span>|
                              <span className="atai" id="language_growth">{character.language_growth || '-'}</span>|
                              <span className="atai" id="language_other">{character.language_other || '-'}</span>
                            </div>
                          </li>
                          )}

                          {/* 追加交渉技能 */}
                          {(() => {
                            const additionalNegotiationSkills = [];
                            for (let i = 1; i <= 50; i++) {
                              const skillName = character[`additional_negotiation_${i}_name`];
                              
                              if (skillName && !isSkillInitialOnly(`additional_negotiation_${i}`)) {
                                additionalNegotiationSkills.push(
                                  <li key={`additional_negotiation_${i}`} className="d-flex skill-li skill-body">
                                    <div className="title">{skillName}</div>
                                    <div className="total">
                                      <span>{character[`additional_negotiation_${i}_total`] || '-'}</span>
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
                            <div className="total"><span id="medicine_total">{character.medicine_total || '-'}</span></div>
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
                            <div className="total"><span id="occult_total">{character.occult_total || '-'}</span></div>
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
                            <div className="total"><span id="chemistry_total">{character.chemistry_total || '-'}</span></div>
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
                            <div className="total"><span id="cthulhu_mythos_total">{character.cthulhu_mythos_total !== undefined ? character.cthulhu_mythos_total : '-'}</span></div>
                            <div className="breakdown">
                              <span className="initial" id="cthulhu_mythos_initial">{displayInitial(character.cthulhu_mythos_initial, 0)}</span>|
                              <span className="atai" id="cthulhu_mythos_job">{character.cthulhu_mythos_job !== undefined ? character.cthulhu_mythos_job : '-'}</span>|
                              <span className="atai" id="cthulhu_mythos_interest">{character.cthulhu_mythos_interest !== undefined ? character.cthulhu_mythos_interest : '-'}</span>|
                              <span className="atai" id="cthulhu_mythos_growth">{character.cthulhu_mythos_growth !== undefined ? character.cthulhu_mythos_growth : '-'}</span>|
                              <span className="atai" id="cthulhu_mythos_other">{character.cthulhu_mythos_other !== undefined ? character.cthulhu_mythos_other : '-'}</span>
                            </div>
                          </li>
                          )}

                          {(showAllSkills || !isSkillInitialOnly('art')) && (
                          <li className="d-flex skill-li skill-body">
                            <div className="title">芸術({character.art_specialty || '---'})</div>
                            <div className="total"><span id="art_total">{character.art_total || '-'}</span></div>
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
                            <div className="total"><span id="accounting_total">{character.accounting_total || '-'}</span></div>
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
                            <div className="total"><span id="archaeology_total">{character.archaeology_total || '-'}</span></div>
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
                            <div className="total"><span id="computer_use_total">{character.computer_use_total || '-'}</span></div>
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
                            <div className="total"><span id="psychology_total">{character.psychology_total || '-'}</span></div>
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
                            <div className="total"><span id="anthropology_total">{character.anthropology_total || '-'}</span></div>
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
                            <div className="total"><span id="biology_total">{character.biology_total || '-'}</span></div>
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
                            <div className="total"><span id="geology_total">{character.geology_total || '-'}</span></div>
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
                            <div className="total"><span id="electronics_total">{character.electronics_total || '-'}</span></div>
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
                            <div className="total"><span id="astronomy_total">{character.astronomy_total || '-'}</span></div>
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
                            <div className="total"><span id="natural_history_total">{character.natural_history_total || '-'}</span></div>
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
                            <div className="total"><span id="physics_total">{character.physics_total || '-'}</span></div>
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
                            <div className="total"><span id="law_total">{character.law_total || '-'}</span></div>
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
                            <div className="total"><span id="pharmacy_total">{character.pharmacy_total || '-'}</span></div>
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
                            <div className="total"><span id="history_total">{character.history_total || '-'}</span></div>
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
                              
                              if (skillName && !isSkillInitialOnly(`additional_knowledge_${i}`)) {
                                additionalKnowledgeSkills.push(
                                  <li key={`additional_knowledge_${i}`} className="d-flex skill-li skill-body">
                                    <div className="title">{skillName}</div>
                                    <div className="total">
                                      <span>{character[`additional_knowledge_${i}_total`] || '-'}</span>
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

                  {/* 武器セクション */}
                  {hasWeapons(character) && (
                    <div className="data-wrap buki">
                      <h3 
                        onClick={() => toggleEquipmentSection('weapons')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className={`fas ${equipmentSections.weapons ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
                        <i className="fa-solid fa-gun"></i> 武器
                      </h3>
                      {equipmentSections.weapons && (
                      <div className="equipment-content">
                        <ul>
                          {(() => {
                            const weaponElements = [];
                            // weapon_1からweapon_50まで確認して存在するもののみ表示
                            for (let i = 1; i <= 50; i++) {
                              const weaponName = character[`weapon_${i}_name`];
                            
                            if (weaponName) {
                              weaponElements.push(
                                <li key={i} className="d-flex data-li skill-body">
                                  <div className="title">
                                    <span>{weaponName}</span>
                                  </div>
                                  <div className="ginou kazu">
                                    <span className="label">成功</span>
                                    <span>{character[`weapon_${i}_success`] || '--'}</span>%
                                  </div>
                                  <div className="damage">
                                    <span className="label">ダメ―ジ</span>
                                    <span>{character[`weapon_${i}_damage`] || '--'}</span>
                                  </div>
                                  <div className="syatei kazu">
                                    <span className="label">射程</span>
                                    <span>{character[`weapon_${i}_range`] || '--'}</span>
                                  </div>
                                  <div className="kougekikaisu kazu">
                                    <span className="label">回数</span>
                                    <span>{character[`weapon_${i}_attacks`] || '--'}</span>
                                  </div>
                                  <div className="soudansuu kazu">
                                    <span className="label">装弾</span>
                                    <span>{character[`weapon_${i}_capacity`] || '--'}</span>
                                  </div>
                                  <div className="kosyou kazu">
                                    <span className="label">故障</span>
                                    <span>{character[`weapon_${i}_malfunction`] || '--'}</span>
                                  </div>
                                  <div className="taikyu kazu">
                                    <span className="label">耐久</span>
                                    <span>{character[`weapon_${i}_durability`] || '--'}</span>
                                  </div>
                                  <div className="memo">
                                    <span className="label">詳細</span>
                                    <span>{character[`weapon_${i}_details`] || '--'}</span>
                                  </div>
                                </li>
                              );
                            }
                          }
                          return weaponElements.length > 0 ? weaponElements : (
                            <li className="d-flex data-li skill-body">
                              <div className="title">
                                <span>武器なし</span>
                              </div>
                              <div className="ginou kazu">
                                <span className="label">成功</span>
                                <span>--</span>%
                              </div>
                              <div className="damage">
                                <span className="label">ダメ―ジ</span>
                                <span>--</span>
                              </div>
                              <div className="syatei kazu">
                                <span className="label">射程</span>
                                <span>--</span>
                              </div>
                              <div className="kougekikaisu kazu">
                                <span className="label">回数</span>
                                <span>--</span>
                              </div>
                              <div className="soudansuu kazu">
                                <span className="label">装弾</span>
                                <span>--</span>
                              </div>
                              <div className="kosyou kazu">
                                <span className="label">故障</span>
                                <span>--</span>
                              </div>
                              <div className="taikyu kazu">
                                <span className="label">耐久</span>
                                <span>--</span>
                              </div>
                              <div className="memo">
                                <span className="label">詳細</span>
                                <span>--</span>
                              </div>
                            </li>
                          );
                        })()}
                      </ul>
                    </div>
                    )}
                  </div>
                  )}

                  {/* 所持品セクション */}
                  {hasItems(character) && (
                    <div className="data-wrap item">
                      <h3 
                        onClick={() => toggleEquipmentSection('items')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className={`fas ${equipmentSections.items ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
                        <i className="fas fa-suitcase"></i> 所持品
                      </h3>
                      {equipmentSections.items && (
                      <div className="equipment-content">
                        <ul>
                          {(() => {
                            const itemElements = [];
                            for (let i = 1; i <= 50; i++) {
                              const itemName = character[`item_${i}_name`];
                              
                              if (itemName) {
                                itemElements.push(
                                  <li key={i} className="d-flex data-li skill-body">
                                    <div className="title">
                                      <span>{itemName}</span>
                                    </div>
                                    <div className="kosu">
                                      <span>{character[`item_${i}_quantity`] || '--'}</span>
                                    </div>
                                    <div className="content">
                                      <span>{character[`item_${i}_details`] || '--'}</span>
                                    </div>
                                  </li>
                                );
                              }
                            }
                            return itemElements.length > 0 ? itemElements : (
                              <li className="d-flex data-li skill-body">
                                <div className="title">
                                  <span>所持品なし</span>
                                </div>
                                <div className="kosu">
                                  <span>--</span>
                                </div>
                                <div className="content">
                                  <span>--</span>
                                </div>
                              </li>
                            );
                          })()}
                        </ul>
                      </div>
                      )}
                    </div>
                  )}

                  {/* 不定・後遺症セクション */}
                  {hasDisorders(character) && (
                    <div className="data-wrap hutei">
                      <h3 
                        onClick={() => toggleEquipmentSection('disorders')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className={`fas ${equipmentSections.disorders ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
                        <i className="fas fa-bed"></i> 不定・後遺症
                      </h3>
                      {equipmentSections.disorders && (
                    <div className="equipment-content">
                      <ul>
                        {(() => {
                          const disorderElements = [];
                          for (let i = 1; i <= 50; i++) {
                            const disorderName = character[`disorder_${i}_name`];
                            
                            if (disorderName) {
                              disorderElements.push(
                                <li key={i} className="d-flex data-li skill-body">
                                  <div className="title">
                                    <span>{disorderName}</span>
                                  </div>
                                  <div className="term">
                                    <span>{character[`disorder_${i}_period`] || '----/--/-- ～ ----/--/--'}</span>
                                  </div>
                                  <div className="content">
                                    <span>{character[`disorder_${i}_details`] || '-'}</span>
                                  </div>
                                </li>
                              );
                            }
                          }
                          return disorderElements.length > 0 ? disorderElements : (
                            <li className="d-flex data-li skill-body">
                              <div className="title">
                                <span>不定・後遺症なし</span>
                              </div>
                              <div className="term">
                                <span>----/--/-- ～ ----/--/--</span>
                              </div>
                              <div className="content">
                                <span>-</span>
                              </div>
                            </li>
                          );
                        })()}
                      </ul>
                    </div>
                    )}
                    </div>
                  )}

                  {/* 読んだ魔導書セクション */}
                  {hasBooks(character) && (
                    <div className="data-wrap book">
                      <h3 
                        onClick={() => toggleEquipmentSection('books')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className={`fas ${equipmentSections.books ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
                        <i className="fas fa-book-dead"></i> 読んだ魔導書
                      </h3>
                      {equipmentSections.books && (
                    <div className="equipment-content">
                      <ul>
                        {(() => {
                          const bookElements = [];
                          for (let i = 1; i <= 50; i++) {
                            const bookName = character[`book_${i}_name`];
                            
                            if (bookName) {
                              bookElements.push(
                                <li key={i} className="d-flex data-li skill-body">
                                  <div className="title">
                                    <span>{bookName}</span>
                                  </div>
                                  <div className="content">
                                    <span>{character[`book_${i}_details`] || '-----'}</span>
                                  </div>
                                </li>
                              );
                            }
                          }
                          return bookElements.length > 0 ? bookElements : (
                            <li className="d-flex data-li skill-body">
                              <div className="title">
                                <span>魔導書なし</span>
                              </div>
                              <div className="content">
                                <span>-----</span>
                              </div>
                            </li>
                          );
                        })()}
                      </ul>
                    </div>
                    )}
                  </div>
                  )}

                  {/* 覚えた呪文セクション */}
                  {hasSpells(character) && (
                    <div className="data-wrap jumon">
                      <h3 
                        onClick={() => toggleEquipmentSection('spells')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className={`fas ${equipmentSections.spells ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
                        <i className="fa-solid fa-hand-sparkles"></i> 覚えた呪文
                      </h3>
                      {equipmentSections.spells && (
                    <div className="equipment-content">
                      <ul>
                        {(() => {
                          const spellElements = [];
                          for (let i = 1; i <= 50; i++) {
                            const spellName = character[`spell_${i}_name`];
                            
                            if (spellName) {
                              spellElements.push(
                                <li key={i} className="d-flex data-li skill-body">
                                  <div className="title">
                                    <span>{spellName}</span>
                                  </div>
                                  <div className="content">
                                    <span>{character[`spell_${i}_details`] || '-----'}</span>
                                  </div>
                                </li>
                              );
                            }
                          }
                          return spellElements.length > 0 ? spellElements : (
                            <li className="d-flex data-li skill-body">
                              <div className="title">
                                <span>呪文なし</span>
                              </div>
                              <div className="content">
                                <span>-----</span>
                              </div>
                            </li>
                          );
                        })()}
                      </ul>
                    </div>
                    )}
                    </div>
                  )}

                  {/* 所持AFセクション */}
                  {hasArtifacts(character) && (
                    <div className="data-wrap af">
                      <h3 
                        onClick={() => toggleEquipmentSection('artifacts')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className={`fas ${equipmentSections.artifacts ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
                        <i className="fa-solid fa-star-of-david"></i> 所持AF
                      </h3>
                      {equipmentSections.artifacts && (
                    <div className="equipment-content">
                      <ul>
                        {(() => {
                          const artifactElements = [];
                          for (let i = 1; i <= 50; i++) {
                            const artifactName = character[`artifact_${i}_name`];
                            
                            if (artifactName) {
                              artifactElements.push(
                                <li key={i} className="d-flex data-li skill-body">
                                  <div className="title">
                                    <span>{artifactName}</span>
                                  </div>
                                  <div className="content">
                                    <span>{character[`artifact_${i}_details`] || '-----'}</span>
                                  </div>
                                </li>
                              );
                            }
                          }
                          return artifactElements.length > 0 ? artifactElements : (
                            <li className="d-flex data-li skill-body">
                              <div className="title">
                                <span>AFなし</span>
                              </div>
                              <div className="content">
                                <span>-----</span>
                              </div>
                            </li>
                          );
                        })()}
                      </ul>
                    </div>
                    )}
                  </div>
                  )}

                  {/* 遭遇した超自然の存在セクション */}
                  {hasEntities(character) && (
                  <div className="data-wrap cthulhu">
                    <h3 
                      onClick={() => toggleEquipmentSection('entities')}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      <i className={`fas ${equipmentSections.entities ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
                      <i className="fa-brands fa-octopus-deploy"></i> 遭遇した超自然の存在
                    </h3>
                    {equipmentSections.entities && (
                    <div className="equipment-content">
                      <ul>
                        {(() => {
                          const entityElements = [];
                          for (let i = 1; i <= 50; i++) {
                            const entityName = character[`entity_${i}_name`];
                            
                            if (entityName) {
                              entityElements.push(
                                <li key={i} className="d-flex data-li skill-body">
                                  <div className="title">
                                    <span>{entityName}</span>
                                  </div>
                                  <div className="content">
                                    <span>{character[`entity_${i}_details`] || '-----'}</span>
                                  </div>
                                </li>
                              );
                            }
                          }
                          return entityElements.length > 0 ? entityElements : (
                            <li className="d-flex data-li skill-body">
                              <div className="title">
                                <span>超自然の存在なし</span>
                              </div>
                              <div className="content">
                                <span>-----</span>
                              </div>
                            </li>
                          );
                        })()}
                      </ul>
                    </div>
                    )}
                  </div>
                  )}

                  {/* メモセクション */}
                  {hasMemos(character) && (
                  <div className="data-wrap">
                    <h3 
                      onClick={() => toggleEquipmentSection('memos')}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      <i className={`fas ${equipmentSections.memos ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '5px' }}></i>
                      <i className="fas fa-sticky-note"></i> メモ
                    </h3>
                    {equipmentSections.memos && (
                    <div className="equipment-content">
                      
                      {/* その他メモ（従来形式） */}
                      {hasOtherNotes(character) && (
                      <div className="data-wrap o-memo" style={{ border: 'none', marginBottom: '20px' }}>
                        <h4 className="memo-title" style={{ fontSize: '1rem', marginBottom: '10px' }}>
                          <i className="fas fa-scroll"></i> その他メモ
                        </h4>
                        <div className="o-memos">
                          <span id="other_notes">{character.other_memo || '----'}</span>
                        </div>
                      </div>
                      )}

                      {/* 新しいメモシステム */}
                      {(() => {
                        const memoElements = [];
                        for (let i = 1; i <= 50; i++) {
                          const title = character[`memo_${i}_title`];
                          const content = character[`memo_${i}_content`];
                          const hidden = character[`memo_${i}_hidden`];
                          const passwordProtected = character[`memo_${i}_password_protected`];
                          
                          if (title || content) {
                            const memoId = `memo_${i}`;
                            // デフォルトの表示状態：「隠す」がチェックされていない場合は表示
                            const defaultVisible = !hidden;
                            const isVisible = secretMemoVisibility[memoId] !== undefined 
                              ? secretMemoVisibility[memoId] 
                              : defaultVisible;
                            
                            memoElements.push(
                              <div key={memoId} className="memo-item" style={{ 
                                borderBottom: '1px dotted #999',
                                marginBottom: '10px'
                              }}>
                                <h4 
                                  onClick={() => toggleSecretMemoVisibility(memoId)}
                                  style={{ 
                                    cursor: 'pointer', 
                                    userSelect: 'none',
                                    margin: '0',
                                    padding: '8px 12px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '14px'
                                  }}
                                >
                                  <i className={`fas ${isVisible ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '8px' }}></i>
                                  {passwordProtected && <i className="fas fa-lock" style={{ marginRight: '5px', fontSize: '12px', opacity: 0.7 }}></i>}
                                  {title || `メモ ${i}`}
                                  <span style={{ fontSize: '0.8em', marginLeft: '10px', opacity: 0.7 }}>
                                    {isVisible ? '(クリックで折りたたみ)' : '(クリックで展開)'}
                                  </span>
                                </h4>
                                {isVisible && (
                                  <div className="o-memos" style={{ 
                                    padding: '0 12px 8px 12px',
                                    whiteSpace: 'pre-wrap'
                                  }}>
                                    <span>{content || '-----'}</span>
                                  </div>
                                )}
                              </div>
                            );
                          }
                        }
                        return memoElements;
                      })()}

                    </div>
                    )}
                  </div>
                  )}

                  {/* 編集ボタン */}
                  <div className="edit-button-container" style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #ddd' }}>
                    <button 
                      type="button"
                      onClick={() => router.push(`/create?edit=${characterId}`)}
                      className="btn edit-btn"
                      style={{ 
                        marginRight: '15px', 
                        padding: '12px 30px', 
                        backgroundColor: '#2196F3', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                    >
                      <i className="fas fa-edit"></i> キャラクターを編集
                    </button>
                    <button 
                      type="button"
                      onClick={() => router.push('/create')}
                      className="btn new-btn"
                      style={{ 
                        padding: '12px 30px', 
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                    >
                      <i className="fas fa-plus"></i> 新しいキャラクター
                    </button>
                  </div>

                </section>
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

// SSG: 静的生成時に全キャラクターのパスを取得
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const paths = await getAllCharacterIds();
    
    return {
      paths,
      fallback: 'blocking' // 新しいキャラクターは動的に生成
    };
  } catch (error) {
    console.error('getStaticPaths error:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

// SSG: 各キャラクターのデータを取得
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id || typeof params.id !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const character = await getCharacterData(params.id);

    if (!character) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        character,
        characterId: params.id,
      },
      // ISRを無効化してstatic exportと互換性を保つ
      // revalidate: 3600,
    };
  } catch (error) {
    console.error('getStaticProps error:', error);
    return {
      notFound: true,
    };
  }
};