import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

  // 装備セクションのアコーディオン状態
  const [equipmentSections, setEquipmentSections] = useState({
    weapons: true,
    items: true,
    disorders: true,
    books: false,
    spells: false,
    artifacts: false,
    entities: false,
    memos: true
  });

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



  useEffect(() => {
    setMounted(true);

    // localStorage から UI 状態を復元（キャラクターID別）
    if (typeof window !== 'undefined' && characterId) {
      // 一時的に古いデータをクリア（デバッグ用）
      localStorage.removeItem('character-display-equipmentSections');
      localStorage.removeItem('character-display-equipmentSections-v1');
      localStorage.removeItem('character-display-showAllSkills');

      const savedEquipmentSections = localStorage.getItem(`character-display-equipmentSections-${characterId}-v2`);

      if (savedEquipmentSections !== null) {
        const parsed = JSON.parse(savedEquipmentSections);
        // 新しいデフォルト値とマージして、保存されていないキーはデフォルト値を使用
        setEquipmentSections({
          weapons: parsed.weapons !== undefined ? parsed.weapons : true,
          items: parsed.items !== undefined ? parsed.items : true,
          disorders: parsed.disorders !== undefined ? parsed.disorders : true,
          books: parsed.books !== undefined ? parsed.books : false,
          spells: parsed.spells !== undefined ? parsed.spells : false,
          artifacts: parsed.artifacts !== undefined ? parsed.artifacts : false,
          entities: parsed.entities !== undefined ? parsed.entities : false,
          memos: parsed.memos !== undefined ? parsed.memos : true,
        });
      }
    }
  }, [characterId]);


  useEffect(() => {
    if (typeof window !== 'undefined' && characterId) {
      localStorage.setItem(`character-display-equipmentSections-${characterId}-v2`, JSON.stringify(equipmentSections));
    }
  }, [equipmentSections, characterId]);

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

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`${character.character_name}のキャラクターシート`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="works-template-default single single-works postid-6531 custom-background">
        <div id="content" className="chara-coc character">
          <div id="inner-content" className="wrap cf">
            <main id="main" role="main" itemScope itemProp="mainContentOfPage" itemType="http://schema.org/Blog">
              <article id="post-6531"
                className="cf post-6531 works type-works status-publish has-post-thumbnail hentry custom_cat-character custom_cat-chara-coc custom_tag-1072"
                role="article">
                {/* 基本データ */}
                <BasicDataDisplay character={character} />

                <section className="chara-seet">
                  <CharacterHeader
                    character={character}
                    calculateAbilityTotal={calculateAbilityTotal}
                  />

                  {/* スペック */}
                  <StatDisplay character={character} />

                  {/* 技能セクション */}
                  <SkillsDisplay
                    character={character}
                    characterId={characterId}
                    handleSkillClick={handleSkillClick}
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

      {/* ダイスロール結果ポップアップ */}
      <DiceRollPopup
        result={diceRollResult}
        onClose={() => setDiceRollResult(null)}
      />
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
      revalidate: 3600, // 1時間ごとに再生成
    };
  } catch (error) {
    console.error('getStaticProps error:', error);
    return {
      notFound: true,
    };
  }
};

