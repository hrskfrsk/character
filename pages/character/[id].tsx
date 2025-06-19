import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useLayoutEffect } from 'react';
import { getCharacterData, getAllCharacterIds } from '../../lib/firebase-admin';
import DiceRollPopup from '../../components/DiceRollPopup';
import { rollSkillCheck, DiceRollResult } from '../../lib/dice-roller';
import SkillDisplay from '../../components/SkillDisplay';
import CharacterHeader from '../../components/character-display/CharacterHeader';
import EquipmentDisplay from '../../components/character-display/EquipmentDisplay';
import StatDisplay from '../../components/character-display/StatDisplay';
import MemoDisplay from '../../components/character-display/MemoDisplay';
import SkillsDisplay from '../../components/character-display/SkillsDisplay';
import BasicDataDisplay from '../../components/character-display/BasicDataDisplay';
import PersonalDataDisplay, { RecordSectionDisplay } from '../../components/character-display/PersonalDataDisplay';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingActionButtons from '../../components/FloatingActionButtons';
import CcfoliaExportModal from '../../components/CcfoliaExportModal';
import PasswordModal from '../../components/PasswordModal';
import { copyToCcfoliaClipboard } from '../../lib/ccfolia-exporter';

interface CharacterPageProps {
  character: any;
  characterId: string;
}

export default function CharacterPage({ character, characterId }: CharacterPageProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [secretMemoVisibility, setSecretMemoVisibility] = useState<Record<string, boolean>>({});
  const [memoPasswordStates, setMemoPasswordStates] = useState<Record<string, { unlocked: boolean; inputPassword: string }>>({});
  const [diceRollResult, setDiceRollResult] = useState<DiceRollResult | null>(null);
  const [showCcfoliaModal, setShowCcfoliaModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 色の明度を調整する関数
  const adjustBrightness = (hex: string, percent: number): string => {
    // #を取り除く
    const cleanHex = hex.replace('#', '');

    // RGB値に変換
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // 明度調整
    const adjustedR = Math.max(0, Math.min(255, r + (r * percent / 100)));
    const adjustedG = Math.max(0, Math.min(255, g + (g * percent / 100)));
    const adjustedB = Math.max(0, Math.min(255, b + (b * percent / 100)));

    // 16進数に戻す
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
    return `#${toHex(adjustedR)}${toHex(adjustedG)}${toHex(adjustedB)}`;
  };

  // HEXカラーをRGBAに変換する関数
  const hexToRgba = (hex: string, alpha: number): string => {
    // #を取り除く
    const cleanHex = hex.replace('#', '');

    // RGB値に変換
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };


  // 装備セクションのアコーディオン状態
  const [equipmentSections, setEquipmentSections] = useState({
    weapons: false,
    items: false,
    disorders: false,
    books: false,
    spells: false,
    artifacts: false,
    entities: false,
    memos: false
  });

  // キャラクター表示セクションの開閉状態
  const [characterDisplayOpen, setCharacterDisplayOpen] = useState(true);

  // プレイシートセクションの開閉状態
  const [isCollapsed, setIsCollapsed] = useState(false);


  // 初期値を表示するヘルパー関数（初期値は必ず数字を表示）
  const displayInitial = (value: any, defaultValue: number = 0): string => {
    if (value !== undefined && value !== null && value !== '') {
      return String(value);
    }
    return String(defaultValue);
  };

  // 能力値合計を計算
  const calculateAbilityTotal = () => {
    const abilities = ['str_total', 'con_total', 'pow_total', 'dex_total', 'app_total', 'siz_total', 'int_total', 'edu_total'];
    return abilities.reduce((total, ability) => {
      const value = character[ability];
      return total + (value && !isNaN(value) ? parseInt(value) : 0);
    }, 0);
  };




  // 個別の秘匿項目の表示切り替え
  const toggleSecretMemoVisibility = (memoId: string) => {
    setSecretMemoVisibility(prev => ({
      ...prev,
      [memoId]: !prev[memoId]
    }));
  };

  // パスワード入力の処理
  const handlePasswordInput = (memoId: string, inputPassword: string) => {
    setMemoPasswordStates(prev => ({
      ...prev,
      [memoId]: {
        ...prev[memoId],
        inputPassword
      }
    }));
  };

  // パスワード認証の処理
  const handlePasswordSubmit = (memoId: string) => {
    const savedPassword = character[`${memoId}_password`];
    const inputPassword = memoPasswordStates[memoId]?.inputPassword || '';

    if (inputPassword === savedPassword) {
      setMemoPasswordStates(prev => ({
        ...prev,
        [memoId]: {
          ...prev[memoId],
          unlocked: true
        }
      }));
    } else {
      alert('パスワードが正しくありません');
    }
  };

  // 技能値をクリックしてダイスロール
  const handleSkillClick = (skillName: string, skillValue: number) => {
    const result = rollSkillCheck(skillName, skillValue);
    setDiceRollResult(result);
  };


  // 装備セクションのアコーディオン制御
  const toggleEquipmentSection = (sectionId: keyof typeof equipmentSections) => {
    setEquipmentSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };



  // UIテーマカラーの動的適用
  useEffect(() => {
    if (character?.ui_theme_color && typeof window !== 'undefined') {
      const color = character.ui_theme_color;
      const hoverColor = adjustBrightness(color, -20);
      const lightColor = hexToRgba(color, 0.15);
      const mediumColor = hexToRgba(color, 0.4);
      const darkColor = hexToRgba(color, 0.7);

      document.documentElement.style.setProperty('--ui-theme-color', color);
      document.documentElement.style.setProperty('--ui-theme-color-hover', hoverColor);
      document.documentElement.style.setProperty('--ui-theme-color-light', lightColor);
      document.documentElement.style.setProperty('--ui-theme-color-medium', mediumColor);
      document.documentElement.style.setProperty('--ui-theme-color-dark', darkColor);
    }
  }, [character?.ui_theme_color]);

  // パスワード認証チェック
  useEffect(() => {
    if (character?.page_password_enabled && character?.page_password) {
      // セッションストレージから認証状態をチェック
      const authKey = `auth-${characterId}`;
      const isAuthenticatedSession = sessionStorage.getItem(authKey);
      
      if (!isAuthenticatedSession) {
        setShowPasswordModal(true);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(true);
    }
  }, [character?.page_password_enabled, character?.page_password, characterId]);

  useEffect(() => {
    setMounted(true);

    // localStorage から UI 状態を復元（キャラクターID別）
    if (typeof window !== 'undefined' && characterId) {
      const savedEquipmentSections = localStorage.getItem(`character-display-equipmentSections-${characterId}-v3`);
      const savedCharacterDisplayState = localStorage.getItem(`character-display-main-section-${characterId}`);
      const savedPlaysheetState = localStorage.getItem(`character-display-playsheet-${characterId}`);

      if (savedEquipmentSections !== null) {
        const parsed = JSON.parse(savedEquipmentSections);
        // 新しいデフォルト値とマージして、保存されていないキーはデフォルト値を使用
        setEquipmentSections({
          weapons: parsed.weapons !== undefined ? parsed.weapons : false,
          items: parsed.items !== undefined ? parsed.items : false,
          disorders: parsed.disorders !== undefined ? parsed.disorders : false,
          books: parsed.books !== undefined ? parsed.books : false,
          spells: parsed.spells !== undefined ? parsed.spells : false,
          artifacts: parsed.artifacts !== undefined ? parsed.artifacts : false,
          entities: parsed.entities !== undefined ? parsed.entities : false,
          memos: parsed.memos !== undefined ? parsed.memos : false,
        });
      }

      if (savedCharacterDisplayState !== null) {
        setCharacterDisplayOpen(JSON.parse(savedCharacterDisplayState));
      }

      if (savedPlaysheetState !== null) {
        setIsCollapsed(JSON.parse(savedPlaysheetState));
      }
    }
  }, [characterId]);


  useEffect(() => {
    if (typeof window !== 'undefined' && characterId && mounted) {
      localStorage.setItem(`character-display-equipmentSections-${characterId}-v3`, JSON.stringify(equipmentSections));
    }
  }, [equipmentSections, characterId, mounted]);

  useEffect(() => {
    if (typeof window !== 'undefined' && characterId) {
      localStorage.setItem(`character-display-main-section-${characterId}`, JSON.stringify(characterDisplayOpen));
    }
  }, [characterDisplayOpen, characterId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && characterId) {
      localStorage.setItem(`character-display-playsheet-${characterId}`, JSON.stringify(isCollapsed));
    }
  }, [isCollapsed, characterId]);

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

  const pageTitle = `${character.character_name || 'キャラクター'} - CoC6版キャラクターシート`;

  const handleCcfoliaExport = () => {
    setShowCcfoliaModal(true);
  };

  // パスワード認証成功時の処理
  const handlePasswordSuccess = () => {
    const authKey = `auth-${characterId}`;
    sessionStorage.setItem(authKey, 'true');
    setIsAuthenticated(true);
    setShowPasswordModal(false);
  };

  // パスワードモーダルを閉じる（認証なし）
  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    router.push('/'); // ホームページにリダイレクト
  };

  // テーマカラーのスタイルを事前計算
  const getThemeStyles = () => {
    if (!character?.ui_theme_color) return '';
    
    const color = character.ui_theme_color;
    const hoverColor = adjustBrightness(color, -20);
    const lightColor = hexToRgba(color, 0.15);
    const mediumColor = hexToRgba(color, 0.4);
    const darkColor = hexToRgba(color, 0.7);
    
    return `
      :root {
        --ui-theme-color: ${color} !important;
        --ui-theme-color-hover: ${hoverColor} !important;
        --ui-theme-color-light: ${lightColor} !important;
        --ui-theme-color-medium: ${mediumColor} !important;
        --ui-theme-color-dark: ${darkColor} !important;
      }
    `;
  };


  // パスワード保護されている且つ認証されていない場合は、認証待ち状態を表示
  if (character?.page_password_enabled && character?.page_password && !isAuthenticated) {
    return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={`${character.character_name}のキャラクターシート`} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Header 
          showBackButton={true}
          customBackUrl="/"
        />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          padding: '20px'
        }}>
          <div>
            <i className="fas fa-lock" style={{ fontSize: '3rem', color: '#ccc', marginBottom: '20px' }}></i>
            <h2 style={{ color: '#666', marginBottom: '10px' }}>パスワード保護されたページ</h2>
            <p style={{ color: '#888' }}>このページを表示するには認証が必要です。</p>
          </div>
        </div>

        <PasswordModal
          isOpen={showPasswordModal}
          onClose={handlePasswordModalClose}
          onSuccess={handlePasswordSuccess}
          characterName={character.character_name}
          expectedPassword={character.page_password}
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`${character.character_name}のキャラクターシート`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header 
        showBackButton={true}
        customBackUrl="/"
        showEditButton={true}
        editUrl={`/create?edit=${characterId}`}
      />

      <FloatingActionButtons
        onCcfoliaExport={handleCcfoliaExport}
      />

      <div className="works-template-default single single-works postid-6531 custom-background">
        <div id="content" className={`chara-coc character page-with-header ${character?.is_lost ? 'is-lost' : ''}`}>
          <div id="inner-content" className="wrap cf">
            <main id="main" role="main" itemScope itemProp="mainContentOfPage" itemType="http://schema.org/Blog">
              <article id="post-6531"
                className="cf post-6531 works type-works status-publish has-post-thumbnail hentry custom_cat-character custom_cat-chara-coc custom_tag-1072"
                role="article">
                {/* 基本データ */}
                <BasicDataDisplay character={character} />

                <section className="chara-seet character-display">
                  <div className="data-wrap" style={{ margin: '10px 0' }}>
                    <div className="playsheet-header" onClick={() => setIsCollapsed(!isCollapsed)}>
                      <h2>
                        <i className="fas fa-scroll section-icon"></i> Character Sheet
                      </h2>
                      <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-down'}`} style={{ marginRight: '5px' }}></i>
                    </div>
                    {!isCollapsed && (
                      <div className="equipment-content">
                        <CharacterHeader
                          character={character}
                          calculateAbilityTotal={calculateAbilityTotal}
                        />

                        {/* プレイシートセクション */}
                        <div className="character-info character-name-section">
                          {/* スペック */}
                          <StatDisplay character={character} />

                          {/* 技能セクション */}
                          <SkillsDisplay
                            character={character}
                            characterId={characterId}
                            handleSkillClick={handleSkillClick}
                            onCcfoliaExport={handleCcfoliaExport}
                          />

                          {/* 装備表示コンポーネント */}
                          <EquipmentDisplay
                            character={character}
                            equipmentSections={equipmentSections}
                            toggleEquipmentSection={toggleEquipmentSection}
                            handleSkillClick={handleSkillClick}
                          />

                          <MemoDisplay
                            character={character}
                            equipmentSections={equipmentSections}
                            toggleEquipmentSection={toggleEquipmentSection}
                            secretMemoVisibility={secretMemoVisibility}
                            memoPasswordStates={memoPasswordStates}
                            toggleSecretMemoVisibility={toggleSecretMemoVisibility}
                            handlePasswordInput={handlePasswordInput}
                            handlePasswordSubmit={handlePasswordSubmit}
                          />
                        </div>
                      </div>


                    )}
                  </div>

                </section>

                {/* パーソナルデータ表示 */}
                <PersonalDataDisplay
                  characterData={character}
                />

                {/* 記録セクション表示 */}
                <RecordSectionDisplay
                  characterData={character}
                />


              </article>
            </main>
          </div>
        </div>
      </div>

      {/* ダイスロール結果ポップアップ */}
      <DiceRollPopup
        result={diceRollResult}
        onClose={() => setDiceRollResult(null)}
      />

      {/* ココフォリア出力モーダル */}
      <CcfoliaExportModal
        isOpen={showCcfoliaModal}
        onClose={() => setShowCcfoliaModal(false)}
        character={character}
        characterId={characterId}
      />

      <Footer />
    </>
  );
}

// SSG: 静的生成時に全キャラクターのパスを取得
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Firebase Admin初期化チェック
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn('Firebase environment variables missing, using empty paths');
      return {
        paths: [],
        fallback: 'blocking'
      };
    }

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
    // Firebase Admin初期化チェック
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn('Firebase environment variables missing, redirecting to 404');
      return {
        notFound: true,
      };
    }

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
    };
  } catch (error) {
    console.error('getStaticProps error:', error);
    return {
      notFound: true,
    };
  }
};

