import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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

export default function CharacterPreview() {
  const router = useRouter();
  const [character, setCharacter] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [secretMemoVisibility, setSecretMemoVisibility] = useState<Record<string, boolean>>({});
  const [memoPasswordStates, setMemoPasswordStates] = useState<Record<string, { unlocked: boolean; inputPassword: string }>>({});
  const [diceRollResult, setDiceRollResult] = useState<DiceRollResult | null>(null);

  // 色の明度を調整する関数
  const adjustBrightness = (hex: string, percent: number): string => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    const adjustedR = Math.max(0, Math.min(255, r + (r * percent / 100)));
    const adjustedG = Math.max(0, Math.min(255, g + (g * percent / 100)));
    const adjustedB = Math.max(0, Math.min(255, b + (b * percent / 100)));

    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
    return `#${toHex(adjustedR)}${toHex(adjustedG)}${toHex(adjustedB)}`;
  };

  const hexToRgba = (hex: string, alpha: number): string => {
    const cleanHex = hex.replace('#', '');
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

  const [characterDisplayOpen, setCharacterDisplayOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const displayInitial = (value: any, defaultValue: number = 0): string => {
    if (value !== undefined && value !== null && value !== '') {
      return String(value);
    }
    return String(defaultValue);
  };

  const calculateAbilityTotal = () => {
    const abilities = ['str_total', 'con_total', 'pow_total', 'dex_total', 'app_total', 'siz_total', 'int_total', 'edu_total'];
    return abilities.reduce((total, ability) => {
      const value = character[ability];
      return total + (value && !isNaN(value) ? parseInt(value) : 0);
    }, 0);
  };

  const toggleSecretMemoVisibility = (memoId: string) => {
    setSecretMemoVisibility(prev => ({
      ...prev,
      [memoId]: !prev[memoId]
    }));
  };

  const handlePasswordInput = (memoId: string, inputPassword: string) => {
    setMemoPasswordStates(prev => ({
      ...prev,
      [memoId]: {
        ...prev[memoId],
        inputPassword
      }
    }));
  };

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

  const handleSkillClick = (skillName: string, skillValue: number) => {
    const result = rollSkillCheck(skillName, skillValue);
    setDiceRollResult(result);
  };

  const toggleEquipmentSection = (sectionId: keyof typeof equipmentSections) => {
    setEquipmentSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

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

  useEffect(() => {
    setMounted(true);
    
    // localStorageからテンポラリキャラクターデータを取得
    if (typeof window !== 'undefined') {
      const tempCharacter = localStorage.getItem('tempCharacter');
      if (tempCharacter) {
        try {
          const parsedCharacter = JSON.parse(tempCharacter);
          setCharacter(parsedCharacter);
        } catch (error) {
          console.error('Failed to parse temp character:', error);
          router.push('/');
        }
      } else {
        // テンポラリデータがない場合はホームに戻る
        router.push('/');
      }
    }
  }, [router]);

  if (!character) {
    return (
      <div>
        <Head>
          <title>プレビュー読み込み中</title>
        </Head>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#666'
        }}>
          プレビューを読み込み中...
        </div>
      </div>
    );
  }

  const pageTitle = `${character.character_name || 'キャラクター'} - プレビュー`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`${character.character_name}のキャラクターシートプレビュー`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header 
        title="プレビュー"
        showBackButton={false}
        actionButtons={
          <button
            type="button"
            className="nav-link"
            style={{
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => window.close()}
          >
            <i className="fas fa-times"></i>
            <span className="nav-text">閉じる</span>
          </button>
        }
      />

      <div className="works-template-default single single-works postid-6531 custom-background">
        <div id="content" className={`chara-coc character page-with-header ${character?.is_lost ? 'is-lost' : ''}`}>
          <div id="inner-content" className="wrap cf">
            <main id="main" role="main" itemScope itemProp="mainContentOfPage" itemType="http://schema.org/Blog">
              <article id="post-6531"
                className="cf post-6531 works type-works status-publish has-post-thumbnail hentry custom_cat-character custom_cat-chara-coc custom_tag-1072"
                role="article">
                
                <div style={{
                  background: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: '4px',
                  padding: '10px',
                  margin: '10px 0',
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#856404'
                }}>
                  <i className="fas fa-exclamation-triangle"></i> これはプレビューです。保存されていない変更内容が含まれています。
                </div>

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

                        <div className="character-info character-name-section">
                          <StatDisplay character={character} />

                          <SkillsDisplay
                            character={character}
                            characterId="preview"
                            handleSkillClick={handleSkillClick}
                            onCcfoliaExport={() => {}}
                          />

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

                <PersonalDataDisplay
                  characterData={character}
                />

                <RecordSectionDisplay
                  characterData={character}
                />
              </article>
            </main>
          </div>
        </div>
      </div>

      <DiceRollPopup
        result={diceRollResult}
        onClose={() => setDiceRollResult(null)}
      />

      <Footer />
    </>
  );
}