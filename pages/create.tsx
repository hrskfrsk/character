import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase-client';
import { calculateAllStats, CharacterData } from '../lib/character-calculations';

// 新しいコンポーネントをインポート
import CharacterInfo from '../components/character-form/CharacterInfo';
import AbilityAndDerivedStats from '../components/character-form/AbilityAndDerivedStats';
import SkillSections from '../components/character-form/SkillSections';
import Equipment from '../components/character-form/Equipment';

export default function CreateCharacterPage() {
  const [mounted, setMounted] = useState(false);
  const [characterData, setCharacterData] = useState<CharacterData>({});
  const [calculatedStats, setCalculatedStats] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [additionalCombatSkills, setAdditionalCombatSkills] = useState<Array<{ id: string, counter: number }>>([]);
  const [combatSkillCounter, setCombatSkillCounter] = useState(0);
  const [additionalExplorationSkills, setAdditionalExplorationSkills] = useState<Array<{ id: string, counter: number }>>([]);
  const [explorationSkillCounter, setExplorationSkillCounter] = useState(0);
  const [additionalActionSkills, setAdditionalActionSkills] = useState<Array<{ id: string, counter: number }>>([]);
  const [actionSkillCounter, setActionSkillCounter] = useState(0);
  const [additionalNegotiationSkills, setAdditionalNegotiationSkills] = useState<Array<{ id: string, counter: number }>>([]);
  const [negotiationSkillCounter, setNegotiationSkillCounter] = useState(0);
  const [additionalKnowledgeSkills, setAdditionalKnowledgeSkills] = useState<Array<{ id: string, counter: number }>>([]);
  const [knowledgeSkillCounter, setKnowledgeSkillCounter] = useState(0);

  // 装備セクション用の状態管理
  const [weapons, setWeapons] = useState<Array<{ id: string, counter: number }>>([]);
  const [weaponCounter, setWeaponCounter] = useState(0);
  const [items, setItems] = useState<Array<{ id: string, counter: number }>>([]);
  const [itemCounter, setItemCounter] = useState(0);
  const [disorders, setDisorders] = useState<Array<{ id: string, counter: number }>>([]);
  const [disorderCounter, setDisorderCounter] = useState(0);
  const [books, setBooks] = useState<Array<{ id: string, counter: number }>>([]);
  const [bookCounter, setBookCounter] = useState(0);
  const [spells, setSpells] = useState<Array<{ id: string, counter: number }>>([]);
  const [spellCounter, setSpellCounter] = useState(0);
  const [artifacts, setArtifacts] = useState<Array<{ id: string, counter: number }>>([]);
  const [artifactCounter, setArtifactCounter] = useState(0);
  const [entities, setEntities] = useState<Array<{ id: string, counter: number }>>([]);
  const [entityCounter, setEntityCounter] = useState(0);

  // 特徴用の状態管理
  const [traits, setTraits] = useState<Array<{ id: string, counter: number }>>([]);
  const [traitCounter, setTraitCounter] = useState(0);

  // 技能表示切替の状態管理
  const [hideInitialSkills, setHideInitialSkills] = useState(false);

  // アコーディオンの開閉状態
  const [equipmentSections, setEquipmentSections] = useState({
    weapons: true,
    items: true,
    disorders: true,
    books: true,
    spells: true,
    artifacts: true,
    entities: true
  });

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 計算を実行
  const updateCalculations = useCallback(() => {
    const stats = calculateAllStats(characterData);
    setCalculatedStats(stats);
  }, [characterData]);

  useEffect(() => {
    updateCalculations();
  }, [updateCalculations]);

  // フォーム値の更新
  const handleInputChange = (field: string, value: any) => {
    setCharacterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 職業ポイント計算式の更新
  const handleJobPointsFormulaChange = (formula: string) => {
    setCharacterData(prev => ({
      ...prev,
      job_points_formula: formula
    }));
  };

  // 戦闘技能を追加
  const addCombatSkill = () => {
    const newCounter = combatSkillCounter + 1;
    const skillId = `additional_combat_${newCounter}`;

    setCombatSkillCounter(newCounter);
    setAdditionalCombatSkills(prev => [...prev, { id: skillId, counter: newCounter }]);

    // 新しい技能のデフォルト値を設定
    setCharacterData(prev => ({
      ...prev,
      [`${skillId}_name`]: '',
      [`${skillId}_initial`]: 1,
      [`${skillId}_job`]: '',
      [`${skillId}_interest`]: '',
      [`${skillId}_growth`]: '',
      [`${skillId}_other`]: '',
      [`${skillId}_total`]: 1
    }));
  };

  // 戦闘技能を削除
  const removeCombatSkill = (skillId: string) => {
    setAdditionalCombatSkills(prev => prev.filter(skill => skill.id !== skillId));

    // データからも削除
    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${skillId}_name`];
      delete newData[`${skillId}_initial`];
      delete newData[`${skillId}_job`];
      delete newData[`${skillId}_interest`];
      delete newData[`${skillId}_growth`];
      delete newData[`${skillId}_other`];
      delete newData[`${skillId}_total`];
      return newData;
    });
  };

  // 探索技能を追加
  const addExplorationSkill = () => {
    const newCounter = explorationSkillCounter + 1;
    const skillId = `additional_exploration_${newCounter}`;

    setExplorationSkillCounter(newCounter);
    setAdditionalExplorationSkills(prev => [...prev, { id: skillId, counter: newCounter }]);

    setCharacterData(prev => ({
      ...prev,
      [`${skillId}_name`]: '',
      [`${skillId}_initial`]: 1,
      [`${skillId}_job`]: '',
      [`${skillId}_interest`]: '',
      [`${skillId}_growth`]: '',
      [`${skillId}_other`]: '',
      [`${skillId}_total`]: 1
    }));
  };

  // 探索技能を削除
  const removeExplorationSkill = (skillId: string) => {
    setAdditionalExplorationSkills(prev => prev.filter(skill => skill.id !== skillId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${skillId}_name`];
      delete newData[`${skillId}_initial`];
      delete newData[`${skillId}_job`];
      delete newData[`${skillId}_interest`];
      delete newData[`${skillId}_growth`];
      delete newData[`${skillId}_other`];
      delete newData[`${skillId}_total`];
      return newData;
    });
  };

  // 行動技能を追加
  const addActionSkill = () => {
    const newCounter = actionSkillCounter + 1;
    const skillId = `additional_action_${newCounter}`;

    setActionSkillCounter(newCounter);
    setAdditionalActionSkills(prev => [...prev, { id: skillId, counter: newCounter }]);

    setCharacterData(prev => ({
      ...prev,
      [`${skillId}_name`]: '',
      [`${skillId}_initial`]: 1,
      [`${skillId}_job`]: '',
      [`${skillId}_interest`]: '',
      [`${skillId}_growth`]: '',
      [`${skillId}_other`]: '',
      [`${skillId}_total`]: 1
    }));
  };

  // 行動技能を削除
  const removeActionSkill = (skillId: string) => {
    setAdditionalActionSkills(prev => prev.filter(skill => skill.id !== skillId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${skillId}_name`];
      delete newData[`${skillId}_initial`];
      delete newData[`${skillId}_job`];
      delete newData[`${skillId}_interest`];
      delete newData[`${skillId}_growth`];
      delete newData[`${skillId}_other`];
      delete newData[`${skillId}_total`];
      return newData;
    });
  };

  // 交渉技能を追加
  const addNegotiationSkill = () => {
    const newCounter = negotiationSkillCounter + 1;
    const skillId = `additional_negotiation_${newCounter}`;

    setNegotiationSkillCounter(newCounter);
    setAdditionalNegotiationSkills(prev => [...prev, { id: skillId, counter: newCounter }]);

    setCharacterData(prev => ({
      ...prev,
      [`${skillId}_name`]: '',
      [`${skillId}_initial`]: 1,
      [`${skillId}_job`]: '',
      [`${skillId}_interest`]: '',
      [`${skillId}_growth`]: '',
      [`${skillId}_other`]: '',
      [`${skillId}_total`]: 1
    }));
  };

  // 交渉技能を削除
  const removeNegotiationSkill = (skillId: string) => {
    setAdditionalNegotiationSkills(prev => prev.filter(skill => skill.id !== skillId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${skillId}_name`];
      delete newData[`${skillId}_initial`];
      delete newData[`${skillId}_job`];
      delete newData[`${skillId}_interest`];
      delete newData[`${skillId}_growth`];
      delete newData[`${skillId}_other`];
      delete newData[`${skillId}_total`];
      return newData;
    });
  };

  // 知識技能を追加
  const addKnowledgeSkill = () => {
    const newCounter = knowledgeSkillCounter + 1;
    const skillId = `additional_knowledge_${newCounter}`;

    setKnowledgeSkillCounter(newCounter);
    setAdditionalKnowledgeSkills(prev => [...prev, { id: skillId, counter: newCounter }]);

    setCharacterData(prev => ({
      ...prev,
      [`${skillId}_name`]: '',
      [`${skillId}_initial`]: 1,
      [`${skillId}_job`]: '',
      [`${skillId}_interest`]: '',
      [`${skillId}_growth`]: '',
      [`${skillId}_other`]: '',
      [`${skillId}_total`]: 1
    }));
  };

  // 知識技能を削除
  const removeKnowledgeSkill = (skillId: string) => {
    setAdditionalKnowledgeSkills(prev => prev.filter(skill => skill.id !== skillId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${skillId}_name`];
      delete newData[`${skillId}_initial`];
      delete newData[`${skillId}_job`];
      delete newData[`${skillId}_interest`];
      delete newData[`${skillId}_growth`];
      delete newData[`${skillId}_other`];
      delete newData[`${skillId}_total`];
      return newData;
    });
  };

  // 装備セクションのアコーディオン制御
  const toggleEquipmentSection = (sectionId: keyof typeof equipmentSections) => {
    setEquipmentSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // 武器を追加
  const addWeapon = () => {
    const newCounter = weaponCounter + 1;
    const weaponId = `weapon_${newCounter}`;

    setWeaponCounter(newCounter);
    setWeapons(prev => [...prev, { id: weaponId, counter: newCounter }]);

    setCharacterData(prev => ({
      ...prev,
      [`${weaponId}_name`]: '',
      [`${weaponId}_success`]: '',
      [`${weaponId}_damage`]: '',
      [`${weaponId}_range`]: '',
      [`${weaponId}_attacks`]: '',
      [`${weaponId}_capacity`]: '',
      [`${weaponId}_malfunction`]: '',
      [`${weaponId}_durability`]: '',
      [`${weaponId}_details`]: ''
    }));
  };

  // 武器を削除
  const removeWeapon = (weaponId: string) => {
    setWeapons(prev => prev.filter(weapon => weapon.id !== weaponId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${weaponId}_name`];
      delete newData[`${weaponId}_success`];
      delete newData[`${weaponId}_damage`];
      delete newData[`${weaponId}_range`];
      delete newData[`${weaponId}_attacks`];
      delete newData[`${weaponId}_capacity`];
      delete newData[`${weaponId}_malfunction`];
      delete newData[`${weaponId}_durability`];
      delete newData[`${weaponId}_details`];
      return newData;
    });
  };

  // 所持品を追加
  const addItem = () => {
    const newCounter = itemCounter + 1;
    const itemId = `item_${newCounter}`;

    setItemCounter(newCounter);
    setItems(prev => [...prev, { id: itemId, counter: newCounter }]);

    setCharacterData(prev => ({
      ...prev,
      [`${itemId}_name`]: '',
      [`${itemId}_quantity`]: '',
      [`${itemId}_details`]: ''
    }));
  };

  // 所持品を削除
  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${itemId}_name`];
      delete newData[`${itemId}_quantity`];
      delete newData[`${itemId}_details`];
      return newData;
    });
  };

  // 不定・後遺症を追加
  const addDisorder = () => {
    const newCounter = disorderCounter + 1;
    const disorderId = `disorder_${newCounter}`;

    setDisorderCounter(newCounter);
    setDisorders(prev => [...prev, { id: disorderId, counter: newCounter }]);

    setCharacterData(prev => ({
      ...prev,
      [`${disorderId}_name`]: '',
      [`${disorderId}_period`]: '',
      [`${disorderId}_details`]: ''
    }));
  };

  // 不定・後遺症を削除
  const removeDisorder = (disorderId: string) => {
    setDisorders(prev => prev.filter(disorder => disorder.id !== disorderId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${disorderId}_name`];
      delete newData[`${disorderId}_period`];
      delete newData[`${disorderId}_details`];
      return newData;
    });
  };

  // 魔導書を追加
  const addBook = () => {
    const newCounter = bookCounter + 1;
    const bookId = `book_${newCounter}`;

    setBookCounter(newCounter);
    setBooks(prev => [...prev, { id: bookId, counter: newCounter }]);

    setCharacterData(prev => ({
      ...prev,
      [`${bookId}_name`]: '',
      [`${bookId}_details`]: ''
    }));
  };

  // 魔導書を削除
  const removeBook = (bookId: string) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${bookId}_name`];
      delete newData[`${bookId}_details`];
      return newData;
    });
  };

  // 呪文を追加
  const addSpell = () => {
    const newCounter = spellCounter + 1;
    const spellId = `spell_${newCounter}`;

    setSpellCounter(newCounter);
    setSpells(prev => [...prev, { id: spellId, counter: newCounter }]);

    setCharacterData(prev => ({
      ...prev,
      [`${spellId}_name`]: '',
      [`${spellId}_details`]: ''
    }));
  };

  // 呪文を削除
  const removeSpell = (spellId: string) => {
    setSpells(prev => prev.filter(spell => spell.id !== spellId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${spellId}_name`];
      delete newData[`${spellId}_details`];
      return newData;
    });
  };

  // AFを追加
  const addArtifact = () => {
    const newCounter = artifactCounter + 1;
    const artifactId = `artifact_${newCounter}`;

    setArtifactCounter(newCounter);
    setArtifacts(prev => [...prev, { id: artifactId, counter: newCounter }]);

    setCharacterData(prev => ({
      ...prev,
      [`${artifactId}_name`]: '',
      [`${artifactId}_details`]: ''
    }));
  };

  // AFを削除
  const removeArtifact = (artifactId: string) => {
    setArtifacts(prev => prev.filter(artifact => artifact.id !== artifactId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${artifactId}_name`];
      delete newData[`${artifactId}_details`];
      return newData;
    });
  };

  // 遭遇した超自然の存在を追加
  const addEntity = () => {
    const newCounter = entityCounter + 1;
    const entityId = `entity_${newCounter}`;

    setEntityCounter(newCounter);
    setEntities(prev => [...prev, { id: entityId, counter: newCounter }]);

    setCharacterData(prev => ({
      ...prev,
      [`${entityId}_name`]: '',
      [`${entityId}_details`]: ''
    }));
  };

  // 遭遇した超自然の存在を削除
  const removeEntity = (entityId: string) => {
    setEntities(prev => prev.filter(entity => entity.id !== entityId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${entityId}_name`];
      delete newData[`${entityId}_details`];
      return newData;
    });
  };

  // 特徴を追加
  const addTrait = () => {
    const newCounter = traitCounter + 1;
    const traitId = `trait_${newCounter}`;

    setTraitCounter(newCounter);
    setTraits(prev => [...prev, { id: traitId, counter: newCounter }]);

    // 新しい特徴のデフォルト値を設定
    setCharacterData(prev => ({
      ...prev,
      [`${traitId}_number`]: '',
      [`${traitId}_name`]: '',
      [`${traitId}_description`]: ''
    }));
  };

  // 特徴を削除
  const removeTrait = (traitId: string) => {
    setTraits(prev => prev.filter(trait => trait.id !== traitId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${traitId}_number`];
      delete newData[`${traitId}_name`];
      delete newData[`${traitId}_description`];
      return newData;
    });
  };

  // 技能表示切替
  const toggleSkillDisplay = () => {
    setHideInitialSkills(!hideInitialSkills);
  };

  // 技能が初期値のみかどうかを判定
  const isSkillInitialOnly = (skillName: string, initialValue: number = 1) => {
    const jobValue = parseInt((characterData as any)[`${skillName}_job`] as string) || 0;
    const interestValue = parseInt((characterData as any)[`${skillName}_interest`] as string) || 0;
    const growthValue = parseInt((characterData as any)[`${skillName}_growth`] as string) || 0;
    const otherValue = parseInt((characterData as any)[`${skillName}_other`] as string) || 0;

    return jobValue === 0 && interestValue === 0 && growthValue === 0 && otherValue === 0;
  };

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      alert('Firebase接続エラーです');
      return;
    }

    setSaving(true);
    try {
      const finalData = {
        ...characterData,
        ...calculatedStats,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'characters'), finalData);
      alert('キャラクターが保存されました！');
      router.push(`/character/${docRef.id}`);
    } catch (error) {
      console.error('保存エラー:', error);
      alert('保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  // 表示ボタン
  const handleDisplay = () => {
    if (!calculatedStats.character_name) {
      alert('キャラクター名を入力してください');
      return;
    }

    // 一時的にローカルストレージに保存して表示
    localStorage.setItem('tempCharacter', JSON.stringify({
      ...characterData,
      ...calculatedStats
    }));

    window.open('/character/preview', '_blank');
  };

  if (!mounted) {
    return (
      <>
        <Head>
          <title>キャラクター作成 - クトゥルフ神話TRPG第6版</title>
        </Head>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>キャラクター作成 - クトゥルフ神話TRPG第6版</title>
        <meta name="description" content="クトゥルフ神話TRPG第6版のキャラクターシート作成フォーム" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />

      </Head>

      <div id="content" className="character-input">
        <div className="wrap">
          <main id="main">
            <article className="character-input">
              <form id="chara-form" className="pc-data" onSubmit={handleSubmit}>
                <section className="chara-seet">
                  <h1><i className="fa-brands fa-octopus-deploy"></i> クトゥルフ神話TRPG第6版</h1>
                  <p className="subtitle">キャラクター作成シート</p>

                  {/* キャラクター基本情報 */}
                  <CharacterInfo
                    characterData={characterData}
                    handleInputChange={handleInputChange}
                  />

                  {/* 能力値と導出ステータス */}
                  <AbilityAndDerivedStats
                    characterData={characterData}
                    calculatedStats={calculatedStats}
                    handleInputChange={handleInputChange}
                    handleJobPointsFormulaChange={handleJobPointsFormulaChange}
                    traits={traits}
                    addTrait={addTrait}
                    removeTrait={removeTrait}
                    hideInitialSkills={hideInitialSkills}
                    toggleSkillDisplay={toggleSkillDisplay}
                  />

                  {/* 技能セクション */}
                  <SkillSections
                    characterData={characterData}
                    calculatedStats={calculatedStats}
                    handleInputChange={handleInputChange}
                    hideInitialSkills={hideInitialSkills}
                    toggleSkillDisplay={toggleSkillDisplay}
                    isSkillInitialOnly={isSkillInitialOnly}
                    additionalCombatSkills={additionalCombatSkills}
                    addCombatSkill={addCombatSkill}
                    removeCombatSkill={removeCombatSkill}
                    additionalExplorationSkills={additionalExplorationSkills}
                    addExplorationSkill={addExplorationSkill}
                    removeExplorationSkill={removeExplorationSkill}
                    additionalActionSkills={additionalActionSkills}
                    addActionSkill={addActionSkill}
                    removeActionSkill={removeActionSkill}
                    additionalNegotiationSkills={additionalNegotiationSkills}
                    addNegotiationSkill={addNegotiationSkill}
                    removeNegotiationSkill={removeNegotiationSkill}
                    additionalKnowledgeSkills={additionalKnowledgeSkills}
                    addKnowledgeSkill={addKnowledgeSkill}
                    removeKnowledgeSkill={removeKnowledgeSkill}
                  />

                  {/* 装備・所持品・メモセクション */}
                  <Equipment
                    characterData={characterData}
                    handleInputChange={handleInputChange}
                    equipmentSections={equipmentSections}
                    toggleEquipmentSection={toggleEquipmentSection}
                    weapons={weapons}
                    addWeapon={addWeapon}
                    removeWeapon={removeWeapon}
                    items={items}
                    addItem={addItem}
                    removeItem={removeItem}
                    disorders={disorders}
                    addDisorder={addDisorder}
                    removeDisorder={removeDisorder}
                    books={books}
                    addBook={addBook}
                    removeBook={removeBook}
                    spells={spells}
                    addSpell={addSpell}
                    removeSpell={removeSpell}
                    artifacts={artifacts}
                    addArtifact={addArtifact}
                    removeArtifact={removeArtifact}
                    entities={entities}
                    addEntity={addEntity}
                    removeEntity={removeEntity}
                  />

                  {/* 保存・表示ボタン */}
                  <div className="form-actions" style={{ textAlign: 'center', margin: '30px 0' }}>
                    <button
                      type="submit"
                      className="btn save-btn"
                      style={{ marginRight: '15px', padding: '10px 30px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      disabled={saving}
                    >
                      <i className="fas fa-save"></i> {saving ? '保存中...' : 'キャラクターを保存'}
                    </button>
                    <button
                      type="button"
                      className="btn display-btn"
                      style={{ padding: '10px 30px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={handleDisplay}
                    >
                      <i className="fas fa-eye"></i> キャラクターシートを表示
                    </button>
                  </div>

                </section>
              </form>
            </article>
          </main>
        </div>
      </div>

    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};