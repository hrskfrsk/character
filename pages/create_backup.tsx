import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase-client';
import { calculateAllStats, CharacterData } from '../lib/character-calculations';

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
          <title>キャラクター作成 - ChroLog</title>
        </Head>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>キャラクター作成 - ChroLog</title>
        <meta name="description" content="クトゥルフ神話TRPG第6版のキャラクターシート作成フォーム" />
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

        {/* Original CSS */}
        <link rel="stylesheet" href="/assets/css/style.css" />
      </Head>

      <div id="content" className="character-input">
        <div className="wrap">
          <main id="main">
            <article className="character-input">
              <form id="chara-form" className="pc-data" onSubmit={handleSubmit}>
                <section className="chara-seet">

                  {/* キャラクター管理セクション */}
                  <div className="management-section">
                    <h2>
                      <i className="fas fa-user-cog"></i> キャラクター管理
                    </h2>

                    <div className="management-buttons">
                      <button type="button" className="btn load-btn">
                        <i className="fas fa-folder-open"></i> キャラクター読み込み
                      </button>
                      <button type="button" className="btn save-btn">
                        <i className="fas fa-save"></i> 保存
                      </button>
                      <button type="button" className="btn display-btn">
                        <i className="fas fa-eye"></i> キャラクター表示
                      </button>
                      <button type="button" className="btn new-btn">
                        <i className="fas fa-plus"></i> 新規作成
                      </button>
                    </div>
                  </div>

                  {/* キャラクター基本情報 */}
                  <div className="character-info">
                    <h2>
                      <i className="fas fa-user"></i> キャラクター基本情報
                    </h2>

                    <div className="info-grid">
                      <div className="info-item">
                        <label htmlFor="character_name">キャラクター名</label>
                        <input
                          type="text"
                          id="character_name"
                          name="character_name"
                          value={characterData.character_name || ''}
                          onChange={(e) => handleInputChange('character_name', e.target.value)}
                        />
                      </div>

                      <div className="info-item">
                        <label htmlFor="character_name_kana">フリガナ</label>
                        <input
                          type="text"
                          id="character_name_kana"
                          name="character_name_kana"
                          value={characterData.character_name_kana || ''}
                          onChange={(e) => handleInputChange('character_name_kana', e.target.value)}
                        />
                      </div>

                      <div className="info-item">
                        <label htmlFor="job">職業</label>
                        <input
                          type="text"
                          id="job"
                          name="job"
                          value={characterData.job || ''}
                          onChange={(e) => handleInputChange('job', e.target.value)}
                        />
                      </div>

                      <div className="info-item">
                        <label htmlFor="age">年齢</label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={characterData.age || ''}
                          onChange={(e) => handleInputChange('age', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="info-item">
                        <label htmlFor="sex">性別</label>
                        <select
                          id="sex"
                          name="sex"
                          value={characterData.sex || ''}
                          onChange={(e) => handleInputChange('sex', e.target.value)}
                        >
                          <option value="">選択してください</option>
                          <option value="男性">男性</option>
                          <option value="女性">女性</option>
                          <option value="その他">その他</option>
                        </select>
                      </div>

                      <div className="info-item">
                        <label htmlFor="height">身長</label>
                        <input
                          type="text"
                          id="height"
                          name="height"
                          placeholder="cm"
                          value={characterData.height || ''}
                          onChange={(e) => handleInputChange('height', e.target.value)}
                        />
                      </div>

                      <div className="info-item">
                        <label htmlFor="weight">体重</label>
                        <input
                          type="text"
                          id="weight"
                          name="weight"
                          placeholder="kg"
                          value={characterData.weight || ''}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                        />
                      </div>

                      <div className="info-item full-width">
                        <label htmlFor="backstory">設定・バックストーリー</label>
                        <textarea
                          id="backstory"
                          name="backstory"
                          rows={4}
                          value={characterData.backstory || ''}
                          onChange={(e) => handleInputChange('backstory', e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* 能力値セクション */}
                  <div className="scores d-flex">
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
                          <input type="text" className="readonly" id="str_total" value={calculatedStats.str_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <select
                              className="base-select"
                              id="str_base"
                              name="str_base"
                              value={characterData.str_base || ''}
                              onChange={(e) => handleInputChange('str_base', parseInt(e.target.value) || 0)}
                            >
                              <option value="">-</option>
                              {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </li>
                          <li className="ages">
                            <input
                              type="number"
                              className="_02"
                              id="str_age_mod"
                              name="str_age_mod"
                              value={characterData.str_age_mod || ''}
                              onChange={(e) => handleInputChange('str_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                          <li>
                            <input
                              type="number"
                              id="str_other_mod"
                              name="str_other_mod"
                              value={characterData.str_other_mod || ''}
                              onChange={(e) => handleInputChange('str_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      {/* CON */}
                      <li className="con score-li">
                        <h3>CON</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="con_total" value={calculatedStats.con_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <select
                              className="base-select"
                              id="con_base"
                              name="con_base"
                              value={characterData.con_base || ''}
                              onChange={(e) => handleInputChange('con_base', parseInt(e.target.value) || 0)}
                            >
                              <option value="">-</option>
                              {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </li>
                          <li className="ages">
                            <input
                              type="number"
                              className="_02"
                              id="con_age_mod"
                              name="con_age_mod"
                              value={characterData.con_age_mod || ''}
                              onChange={(e) => handleInputChange('con_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                          <li>
                            <input
                              type="number"
                              id="con_other_mod"
                              name="con_other_mod"
                              value={characterData.con_other_mod || ''}
                              onChange={(e) => handleInputChange('con_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      {/* POW */}
                      <li className="pow score-li">
                        <h3>POW</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="pow_total" value={calculatedStats.pow_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <select
                              className="base-select"
                              id="pow_base"
                              name="pow_base"
                              value={characterData.pow_base || ''}
                              onChange={(e) => handleInputChange('pow_base', parseInt(e.target.value) || 0)}
                            >
                              <option value="">-</option>
                              {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </li>
                          <li className="ages">
                            <input
                              type="number"
                              className="_02"
                              id="pow_age_mod"
                              name="pow_age_mod"
                              value={characterData.pow_age_mod || ''}
                              onChange={(e) => handleInputChange('pow_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                          <li>
                            <input
                              type="number"
                              id="pow_other_mod"
                              name="pow_other_mod"
                              value={characterData.pow_other_mod || ''}
                              onChange={(e) => handleInputChange('pow_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      {/* DEX */}
                      <li className="dex score-li">
                        <h3>DEX</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="dex_total" value={calculatedStats.dex_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <select
                              className="base-select"
                              id="dex_base"
                              name="dex_base"
                              value={characterData.dex_base || ''}
                              onChange={(e) => handleInputChange('dex_base', parseInt(e.target.value) || 0)}
                            >
                              <option value="">-</option>
                              {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </li>
                          <li className="ages">
                            <input
                              type="number"
                              className="_02"
                              id="dex_age_mod"
                              name="dex_age_mod"
                              value={characterData.dex_age_mod || ''}
                              onChange={(e) => handleInputChange('dex_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                          <li>
                            <input
                              type="number"
                              id="dex_other_mod"
                              name="dex_other_mod"
                              value={characterData.dex_other_mod || ''}
                              onChange={(e) => handleInputChange('dex_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      {/* APP */}
                      <li className="app score-li">
                        <h3>APP</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="app_total" value={calculatedStats.app_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <select
                              className="base-select"
                              id="app_base"
                              name="app_base"
                              value={characterData.app_base || ''}
                              onChange={(e) => handleInputChange('app_base', parseInt(e.target.value) || 0)}
                            >
                              <option value="">-</option>
                              {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </li>
                          <li className="ages">
                            <input
                              type="number"
                              className="_02"
                              id="app_age_mod"
                              name="app_age_mod"
                              value={characterData.app_age_mod || ''}
                              onChange={(e) => handleInputChange('app_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                          <li>
                            <input
                              type="number"
                              id="app_other_mod"
                              name="app_other_mod"
                              value={characterData.app_other_mod || ''}
                              onChange={(e) => handleInputChange('app_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      {/* SIZ */}
                      <li className="siz score-li">
                        <h3>SIZ</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="siz_total" value={calculatedStats.siz_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <select
                              className="base-select"
                              id="siz_base"
                              name="siz_base"
                              value={characterData.siz_base || ''}
                              onChange={(e) => handleInputChange('siz_base', parseInt(e.target.value) || 0)}
                            >
                              <option value="">-</option>
                              {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </li>
                          <li className="ages">
                            <input
                              type="number"
                              className="_02"
                              id="siz_age_mod"
                              name="siz_age_mod"
                              value={characterData.siz_age_mod || ''}
                              onChange={(e) => handleInputChange('siz_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                          <li>
                            <input
                              type="number"
                              id="siz_other_mod"
                              name="siz_other_mod"
                              value={characterData.siz_other_mod || ''}
                              onChange={(e) => handleInputChange('siz_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      {/* INT */}
                      <li className="int score-li">
                        <h3>INT</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="int_total" value={calculatedStats.int_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <select
                              className="base-select"
                              id="int_base"
                              name="int_base"
                              value={characterData.int_base || ''}
                              onChange={(e) => handleInputChange('int_base', parseInt(e.target.value) || 0)}
                            >
                              <option value="">-</option>
                              {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </li>
                          <li className="ages">
                            <input
                              type="number"
                              className="_02"
                              id="int_age_mod"
                              name="int_age_mod"
                              value={characterData.int_age_mod || ''}
                              onChange={(e) => handleInputChange('int_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                          <li>
                            <input
                              type="number"
                              id="int_other_mod"
                              name="int_other_mod"
                              value={characterData.int_other_mod || ''}
                              onChange={(e) => handleInputChange('int_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      {/* EDU */}
                      <li className="edu score-li">
                        <h3>EDU</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="edu_total" value={calculatedStats.edu_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <select
                              className="base-select"
                              id="edu_base"
                              name="edu_base"
                              value={characterData.edu_base || ''}
                              onChange={(e) => handleInputChange('edu_base', parseInt(e.target.value) || 0)}
                            >
                              <option value="">-</option>
                              {Array.from({ length: 16 }, (_, i) => i + 3).map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </li>
                          <li className="ages">
                            <input
                              type="number"
                              className="_02"
                              id="edu_age_mod"
                              name="edu_age_mod"
                              value={characterData.edu_age_mod || ''}
                              onChange={(e) => handleInputChange('edu_age_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                          <li>
                            <input
                              type="number"
                              id="edu_other_mod"
                              name="edu_other_mod"
                              value={characterData.edu_other_mod || ''}
                              onChange={(e) => handleInputChange('edu_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
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
                          <input type="text" className="readonly" id="san_total" value={calculatedStats.san_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <input type="text" className="readonly _02" id="san_base_value" value={calculatedStats.san_base_value || ''} readOnly />
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <input
                              type="number"
                              id="san_other_mod"
                              name="san_other_mod"
                              value={characterData.san_other_mod || ''}
                              onChange={(e) => handleInputChange('san_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      <li className="hp score-li">
                        <h3>HP</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="hp_total" value={calculatedStats.hp_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <input type="text" className="readonly _02" id="hp_base_value" value={calculatedStats.hp_base_value || ''} readOnly />
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <input
                              type="number"
                              id="hp_other_mod"
                              name="hp_other_mod"
                              value={characterData.hp_other_mod || ''}
                              onChange={(e) => handleInputChange('hp_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      <li className="mp score-li">
                        <h3>MP</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="mp_total" value={calculatedStats.mp_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <input type="text" className="readonly _02" id="mp_base_value" value={calculatedStats.mp_base_value || ''} readOnly />
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <input
                              type="number"
                              id="mp_other_mod"
                              name="mp_other_mod"
                              value={characterData.mp_other_mod || ''}
                              onChange={(e) => handleInputChange('mp_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      <li className="idea score-li">
                        <h3>アイデア</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="idea_total" value={calculatedStats.idea_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <input type="text" className="readonly _02" id="idea_base_value" value={calculatedStats.idea_base_value || ''} readOnly />
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <input
                              type="number"
                              id="idea_other_mod"
                              name="idea_other_mod"
                              value={characterData.idea_other_mod || ''}
                              onChange={(e) => handleInputChange('idea_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      <li className="luck score-li">
                        <h3>幸運</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="luck_total" value={calculatedStats.luck_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <input type="text" className="readonly _02" id="luck_base_value" value={calculatedStats.luck_base_value || ''} readOnly />
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <input
                              type="number"
                              id="luck_other_mod"
                              name="luck_other_mod"
                              value={characterData.luck_other_mod || ''}
                              onChange={(e) => handleInputChange('luck_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>

                      <li className="knowledge score-li">
                        <h3>知識</h3>
                        <div className="score-sum">
                          <input type="text" className="readonly" id="knowledge_total" value={calculatedStats.knowledge_total || ''} readOnly />
                        </div>
                        <ul className="score-detail">
                          <li>
                            <input type="text" className="readonly _02" id="knowledge_base_value" value={calculatedStats.knowledge_base_value || ''} readOnly />
                          </li>
                          <li className="ages">
                            -
                          </li>
                          <li>
                            <input
                              type="number"
                              id="knowledge_other_mod"
                              name="knowledge_other_mod"
                              value={characterData.knowledge_other_mod || ''}
                              onChange={(e) => handleInputChange('knowledge_other_mod', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            />
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  {/* 特徴・ベース職業セクション */}
                  <div className="traits-section" style={{ marginTop: '10px' }}>
                    <div className="features">

                      {/* 特徴リスト */}
                      <ul>
                        {traits.map((trait) => (
                          <li key={trait.id} className="d-flex f-list">
                            <div className="f-label">
                              <span className="num">
                                <select
                                  name={`${trait.id}_number`}
                                  value={(characterData as any)[`${trait.id}_number`] || ''}
                                  onChange={(e) => handleInputChange(`${trait.id}_number`, e.target.value)}
                                  style={{ width: '7ch', border: 'none', background: 'transparent', textAlign: 'center' }}
                                >
                                  <option value="">0-0</option>
                                  <option value="1-1">1-1</option>
                                  <option value="1-2">1-2</option>
                                  <option value="1-3">1-3</option>
                                  <option value="1-4">1-4</option>
                                  <option value="1-5">1-5</option>
                                  <option value="1-6">1-6</option>
                                  <option value="1-7">1-7</option>
                                  <option value="1-8">1-8</option>
                                  <option value="1-9">1-9</option>
                                  <option value="1-10">1-10</option>
                                  <option value="">----------</option>
                                  <option value="2-1">2-1</option>
                                  <option value="2-2">2-2</option>
                                  <option value="2-3">2-3</option>
                                  <option value="2-4">2-4</option>
                                  <option value="2-5">2-5</option>
                                  <option value="2-6">2-6</option>
                                  <option value="2-7">2-7</option>
                                  <option value="2-8">2-8</option>
                                  <option value="2-9">2-9</option>
                                  <option value="2-10">2-10</option>
                                  <option value="">----------</option>
                                  <option value="3-1">3-1</option>
                                  <option value="3-2">3-2</option>
                                  <option value="3-3">3-3</option>
                                  <option value="3-4">3-4</option>
                                  <option value="3-5">3-5</option>
                                  <option value="3-6">3-6</option>
                                  <option value="3-7">3-7</option>
                                  <option value="3-8">3-8</option>
                                  <option value="3-9">3-9</option>
                                  <option value="3-10">3-10</option>
                                  <option value="">----------</option>
                                  <option value="4-1">4-1</option>
                                  <option value="4-2">4-2</option>
                                  <option value="4-3">4-3</option>
                                  <option value="4-4">4-4</option>
                                  <option value="4-5">4-5</option>
                                  <option value="4-6">4-6</option>
                                  <option value="4-7">4-7</option>
                                  <option value="4-8">4-8</option>
                                  <option value="4-9">4-9</option>
                                  <option value="4-10">4-10</option>
                                  <option value="">----------</option>
                                  <option value="5-1">5-1</option>
                                  <option value="5-2">5-2</option>
                                  <option value="5-3">5-3</option>
                                  <option value="5-4">5-4</option>
                                  <option value="5-5">5-5</option>
                                  <option value="5-6">5-6</option>
                                  <option value="5-7">5-7</option>
                                  <option value="5-8">5-8</option>
                                  <option value="5-9">5-9</option>
                                  <option value="5-10">5-10</option>
                                  <option value="">----------</option>
                                  <option value="6-1">6-1</option>
                                  <option value="6-2">6-2</option>
                                  <option value="6-3">6-3</option>
                                  <option value="6-4">6-4</option>
                                  <option value="6-5">6-5</option>
                                  <option value="6-6">6-6</option>
                                  <option value="6-7">6-7</option>
                                  <option value="6-8">6-8</option>
                                  <option value="6-9">6-9</option>
                                  <option value="6-10">6-10</option>
                                </select>
                              </span>
                              <span className="name" style={{ width: 'auto' }}>
                                <input
                                  type="text"
                                  name={`${trait.id}_name`}
                                  value={(characterData as any)[`${trait.id}_name`] || ''}
                                  onChange={(e) => handleInputChange(`${trait.id}_name`, e.target.value)}
                                  placeholder="特徴名" />
                              </span>
                            </div>
                            <div className="contents">
                              <input
                                type="text"
                                name={`${trait.id}_description`}
                                value={(characterData as any)[`${trait.id}_description`] || ''}
                                onChange={(e) => handleInputChange(`${trait.id}_description`, e.target.value)}
                                placeholder="特徴表説明"
                              />
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '10px'
                            }}>
                              <button
                                type="button"
                                onClick={() => removeTrait(trait.id)}
                                className="remove-btn">
                                <i className="fas fa-minus"></i>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {/* 特徴追加ボタン */}
                      <button
                        type="button"
                        onClick={addTrait}
                        className="add-btn"
                        style={{ margin: '10px auto 30px' }}>
                        <i className="fas fa-plus"></i> 特徴を追加
                      </button>

                      {/* ベース職業情報 */}
                      <div className="d-flex job-base">
                        <div style={{ flex: '1 1 auto' }}>
                          <span>ベース</span>
                          <input
                            type="text"
                            name="base_job"
                            value={characterData.base_job || ''}
                            onChange={(e) => handleInputChange('base_job', e.target.value)}
                            placeholder="職業名" />
                        </div>
                        <div style={{ flex: '2 1 auto', marginRight: '0' }}>
                          <span>特記</span>
                          <input
                            type="text"
                            name="special_notes"
                            value={characterData.special_notes || ''}
                            onChange={(e) => handleInputChange('special_notes', e.target.value)}
                            placeholder="特記事項" />
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* スペック */}
                  <div className="slots d-flex">
                    <div className="now-san slot">
                      <h3>現在SAN値</h3>
                      <div className="slot-txt">
                        <input
                          type="number"
                          className="current_san"
                          id="current_san"
                          name="current_san"
                          value={characterData.current_san || 0}
                          onChange={(e) => handleInputChange('current_san', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                        />
                        <span>/</span>
                        <input
                          type="number"
                          id="max_san"
                          name="max_san"
                          className="max_san readonly auto-resize _02"
                          value={characterData.max_san || calculatedStats.max_san_value || 0}
                          onChange={(e) => handleInputChange('max_san', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                          style={{
                            width: `${Math.max(2, String(characterData.max_san || calculatedStats.max_san_value || 0).length)}ch`,
                            fontSize: '0.8rem',
                            fontWeight: '400',
                            color: '#888'
                          }}
                        />
                      </div>
                    </div>
                    <div className="db slot">
                      <h3>ダメ―ジボーナス</h3>
                      <div className="slot-txt">
                        <input type="text" className="readonly _02" id="damage_bonus" value={calculatedStats.damage_bonus || ''} readOnly />
                      </div>
                    </div>
                    <div className="jobp slot">
                      <h3>職業P</h3>
                      <div className="slot-txt">
                        <input
                          type="number"
                          id="job_points_used"
                          name="job_points_used"
                          className="readonly auto-resize _02"
                          value={characterData.job_points_used || 0}
                          onChange={(e) => handleInputChange('job_points_used', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                          style={{
                            width: `${Math.max(2, String(characterData.job_points_used || 0).length)}ch`
                          }}
                        />
                        <span>/</span>
                        {characterData.job_points_formula === 'manual' ? (
                          <input
                            type="number"
                            id="job_points_total_manual"
                            name="job_points_total"
                            className="readonly auto-resize _02"
                            value={characterData.job_points_total || 0}
                            onChange={(e) => handleInputChange('job_points_total', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                            style={{
                              width: `${Math.max(2, String(characterData.job_points_total || 0).length)}ch`,
                              fontSize: '0.8rem',
                              fontWeight: '400',
                              color: '#888'
                            }}
                          />
                        ) : (
                          <input
                            type="text"
                            className="readonly auto-resize _02"
                            id="job_points_total"
                            value={calculatedStats.job_points_total || 0}
                            readOnly
                            style={{
                              width: `${Math.max(2, String(calculatedStats.job_points_total || 0).length)}ch`,
                              fontSize: '0.8rem',
                              fontWeight: '400',
                              color: '#888'
                            }}
                          />
                        )}
                        <br className="sp-only" />
                        <select
                          name="job_points_formula"
                          value={characterData.job_points_formula || 'edu20'}
                          onChange={(e) => handleJobPointsFormulaChange(e.target.value)}
                          className="job-point"
                        >
                          <option value="edu20">EDU×20</option>
                          <option value="edu10_str10">EDU×10+STR×10</option>
                          <option value="edu10_con10">EDU×10+CON×10</option>
                          <option value="edu10_pow10">EDU×10+POW×10</option>
                          <option value="edu10_dex10">EDU×10+DEX×10</option>
                          <option value="edu10_app10">EDU×10+APP×10</option>
                          <option value="edu10_siz10">EDU×10+SIZ×10</option>
                          <option value="edu10_int10">EDU×10+INT×10</option>
                          <option value="manual">手動入力</option>
                        </select>
                      </div>
                    </div>
                    <div className="intp slot">
                      <h3>興味P</h3>
                      <div className="slot-txt">
                        <input
                          type="number"
                          id="interest_points_used"
                          name="interest_points_used"
                          className="readonly auto-resize _02"
                          value={characterData.interest_points_used || 0}
                          onChange={(e) => handleInputChange('interest_points_used', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                          style={{
                            width: `${Math.max(2, String(characterData.interest_points_used || 0).length)}ch`
                          }}
                        />
                        <span>/</span>
                        <input
                          type="text"
                          className="readonly auto-resize _02"
                          id="interest_points_total"
                          value={calculatedStats.interest_points_total || 0}
                          readOnly
                          style={{
                            width: `${Math.max(2, String(calculatedStats.interest_points_total || 0).length)}ch`,
                            fontSize: '0.8rem',
                            fontWeight: '400',
                            color: '#888'
                          }}
                        />
                        <br className="sp-only" />
                        <span className="interest-point">追加分 ：
                          <input
                            type="number"
                            className="nterest_points_extra"
                            id="interest_points_extra"
                            name="interest_points_extra"
                            value={characterData.interest_points_extra || ''}
                            onChange={(e) => handleInputChange('interest_points_extra', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 技能表示切替ボタン */}
                  <div className="skill-toggle-container" style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <div className="segmented-toggle">
                      <button 
                        type="button" 
                        className={!hideInitialSkills ? 'active' : ''}
                        onClick={toggleSkillDisplay}
                      >
                        全表示
                      </button>
                      <button 
                        type="button" 
                        className={hideInitialSkills ? 'active' : ''}
                        onClick={toggleSkillDisplay}
                      >
                        初期値の技能を隠す
                      </button>
                    </div>
                  </div>

                  {/* 技能セクション */}
                  <div className="skill d-flex">
                    {/* 戦闘技能 */}
                    <div className="skill-group">
                      <h3><i className="fas fa-fist-raised"></i> 戦闘技能</h3>


                      <ul>
                        <li className="d-flex skill-li skill-head">
                          <div className="growth">成長</div>
                          <div className="title">技能名</div>
                          <div className="total">合計<span className="pc-only">値</span></div>
                          <div className="breakdown">
                            <span className="pc-only">初期値</span><span className="sp-only">初期</span>|
                            <span className="pc-only">職業P</span><span className="sp-only">職業</span>|
                            <span className="pc-only">興味P</span><span className="sp-only">興味</span>|
                            <span>成長</span>|
                            <span className="pc-only">その他</span><span className="sp-only">他</span>
                          </div>
                        </li>

                        {/* 回避 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('dodge', calculatedStats.dodge_initial || 0) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">回避</div>
                          <div className="total">
                            <input
                              type="number"
                              name="dodge_total"
                              className="readonly _02"
                              value={calculatedStats.dodge_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="dodge_initial"
                                className="readonly _02"
                                value={calculatedStats.dodge_initial || 0}
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="dodge_job"
                                value={characterData.dodge_job || ''}
                                onChange={(e) => handleInputChange('dodge_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="dodge_interest"
                                value={characterData.dodge_interest || ''}
                                onChange={(e) => handleInputChange('dodge_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="dodge_growth"
                                value={characterData.dodge_growth || ''}
                                onChange={(e) => handleInputChange('dodge_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="dodge_other"
                                value={characterData.dodge_other || ''}
                                onChange={(e) => handleInputChange('dodge_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* キック */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('kick') ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">キック</div>
                          <div className="total">
                            <input
                              type="number"
                              name="kick_total"
                              className="readonly _02"
                              value={calculatedStats.kick_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="kick_initial"
                                className="readonly _02"
                                value="25"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="kick_job"
                                value={characterData.kick_job || ''}
                                onChange={(e) => handleInputChange('kick_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="kick_interest"
                                value={characterData.kick_interest || ''}
                                onChange={(e) => handleInputChange('kick_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="kick_growth"
                                value={characterData.kick_growth || ''}
                                onChange={(e) => handleInputChange('kick_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="kick_other"
                                value={characterData.kick_other || ''}
                                onChange={(e) => handleInputChange('kick_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 組み付き */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('grapple') ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">組み付き</div>
                          <div className="total">
                            <input
                              type="number"
                              name="grapple_total"
                              className="readonly _02"
                              value={calculatedStats.grapple_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="grapple_initial"
                                className="readonly _02"
                                value="25"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="grapple_job"
                                value={characterData.grapple_job || ''}
                                onChange={(e) => handleInputChange('grapple_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="grapple_interest"
                                value={characterData.grapple_interest || ''}
                                onChange={(e) => handleInputChange('grapple_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="grapple_growth"
                                value={characterData.grapple_growth || ''}
                                onChange={(e) => handleInputChange('grapple_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="grapple_other"
                                value={characterData.grapple_other || ''}
                                onChange={(e) => handleInputChange('grapple_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* こぶし */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('punch') ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">こぶし</div>
                          <div className="total">
                            <input
                              type="number"
                              name="punch_total"
                              className="readonly _02"
                              value={calculatedStats.punch_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="punch_initial"
                                className="readonly _02"
                                value="50"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="punch_job"
                                value={characterData.punch_job || ''}
                                onChange={(e) => handleInputChange('punch_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="punch_interest"
                                value={characterData.punch_interest || ''}
                                onChange={(e) => handleInputChange('punch_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="punch_growth"
                                value={characterData.punch_growth || ''}
                                onChange={(e) => handleInputChange('punch_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="punch_other"
                                value={characterData.punch_other || ''}
                                onChange={(e) => handleInputChange('punch_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 頭突き */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('headbutt') ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">頭突き</div>
                          <div className="total">
                            <input
                              type="number"
                              name="headbutt_total"
                              className="readonly _02"
                              value={calculatedStats.headbutt_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="headbutt_initial"
                                className="readonly _02"
                                value="10"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="headbutt_job"
                                value={characterData.headbutt_job || ''}
                                onChange={(e) => handleInputChange('headbutt_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="headbutt_interest"
                                value={characterData.headbutt_interest || ''}
                                onChange={(e) => handleInputChange('headbutt_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="headbutt_growth"
                                value={characterData.headbutt_growth || ''}
                                onChange={(e) => handleInputChange('headbutt_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="headbutt_other"
                                value={characterData.headbutt_other || ''}
                                onChange={(e) => handleInputChange('headbutt_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 投擲 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('throw') ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">投擲</div>
                          <div className="total">
                            <input
                              type="number"
                              name="throw_total"
                              className="readonly _02"
                              value={calculatedStats.throw_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="throw_initial"
                                className="readonly _02"
                                value="25"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="throw_job"
                                value={characterData.throw_job || ''}
                                onChange={(e) => handleInputChange('throw_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="throw_interest"
                                value={characterData.throw_interest || ''}
                                onChange={(e) => handleInputChange('throw_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="throw_growth"
                                value={characterData.throw_growth || ''}
                                onChange={(e) => handleInputChange('throw_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="throw_other"
                                value={characterData.throw_other || ''}
                                onChange={(e) => handleInputChange('throw_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* マーシャルアーツ */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('martial_arts', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">マーシャルアーツ</div>
                          <div className="total">
                            <input
                              type="number"
                              name="martial_arts_total"
                              className="readonly _02"
                              value={calculatedStats.martial_arts_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="martial_arts_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="martial_arts_job"
                                value={characterData.martial_arts_job || ''}
                                onChange={(e) => handleInputChange('martial_arts_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="martial_arts_interest"
                                value={characterData.martial_arts_interest || ''}
                                onChange={(e) => handleInputChange('martial_arts_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="martial_arts_growth"
                                value={characterData.martial_arts_growth || ''}
                                onChange={(e) => handleInputChange('martial_arts_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="martial_arts_other"
                                value={characterData.martial_arts_other || ''}
                                onChange={(e) => handleInputChange('martial_arts_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 拳銃 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('handgun', 20) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">拳銃</div>
                          <div className="total">
                            <input
                              type="number"
                              name="handgun_total"
                              className="readonly _02"
                              value={calculatedStats.handgun_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="handgun_initial"
                                className="readonly _02"
                                value="20"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="handgun_job"
                                value={characterData.handgun_job || ''}
                                onChange={(e) => handleInputChange('handgun_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="handgun_interest"
                                value={characterData.handgun_interest || ''}
                                onChange={(e) => handleInputChange('handgun_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="handgun_growth"
                                value={characterData.handgun_growth || ''}
                                onChange={(e) => handleInputChange('handgun_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="handgun_other"
                                value={characterData.handgun_other || ''}
                                onChange={(e) => handleInputChange('handgun_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* サブマシンガン */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('submachine_gun', 15) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">サブマシンガン</div>
                          <div className="total">
                            <input
                              type="number"
                              name="submachine_gun_total"
                              className="readonly _02"
                              value={calculatedStats.submachine_gun_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="submachine_gun_initial"
                                className="readonly _02"
                                value="15"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="submachine_gun_job"
                                value={characterData.submachine_gun_job || ''}
                                onChange={(e) => handleInputChange('submachine_gun_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="submachine_gun_interest"
                                value={characterData.submachine_gun_interest || ''}
                                onChange={(e) => handleInputChange('submachine_gun_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="submachine_gun_growth"
                                value={characterData.submachine_gun_growth || ''}
                                onChange={(e) => handleInputChange('submachine_gun_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="submachine_gun_other"
                                value={characterData.submachine_gun_other || ''}
                                onChange={(e) => handleInputChange('submachine_gun_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* ショットガン */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('shotgun', 30) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">ショットガン</div>
                          <div className="total">
                            <input
                              type="number"
                              name="shotgun_total"
                              className="readonly _02"
                              value={calculatedStats.shotgun_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="shotgun_initial"
                                className="readonly _02"
                                value="30"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="shotgun_job"
                                value={characterData.shotgun_job || ''}
                                onChange={(e) => handleInputChange('shotgun_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="shotgun_interest"
                                value={characterData.shotgun_interest || ''}
                                onChange={(e) => handleInputChange('shotgun_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="shotgun_growth"
                                value={characterData.shotgun_growth || ''}
                                onChange={(e) => handleInputChange('shotgun_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="shotgun_other"
                                value={characterData.shotgun_other || ''}
                                onChange={(e) => handleInputChange('shotgun_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* マシンガン */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('machine_gun', 15) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">マシンガン</div>
                          <div className="total">
                            <input
                              type="number"
                              name="machine_gun_total"
                              className="readonly _02"
                              value={calculatedStats.machine_gun_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="machine_gun_initial"
                                className="readonly _02"
                                value="15"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="machine_gun_job"
                                value={characterData.machine_gun_job || ''}
                                onChange={(e) => handleInputChange('machine_gun_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="machine_gun_interest"
                                value={characterData.machine_gun_interest || ''}
                                onChange={(e) => handleInputChange('machine_gun_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="machine_gun_growth"
                                value={characterData.machine_gun_growth || ''}
                                onChange={(e) => handleInputChange('machine_gun_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="machine_gun_other"
                                value={characterData.machine_gun_other || ''}
                                onChange={(e) => handleInputChange('machine_gun_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* ライフル */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('rifle', 25) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">ライフル</div>
                          <div className="total">
                            <input
                              type="number"
                              name="rifle_total"
                              className="readonly _02"
                              value={calculatedStats.rifle_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="rifle_initial"
                                className="readonly _02"
                                value="25"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="rifle_job"
                                value={characterData.rifle_job || ''}
                                onChange={(e) => handleInputChange('rifle_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="rifle_interest"
                                value={characterData.rifle_interest || ''}
                                onChange={(e) => handleInputChange('rifle_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="rifle_growth"
                                value={characterData.rifle_growth || ''}
                                onChange={(e) => handleInputChange('rifle_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="rifle_other"
                                value={characterData.rifle_other || ''}
                                onChange={(e) => handleInputChange('rifle_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 追加戦闘技能 */}
                        {additionalCombatSkills.map((skill) => (
                          <li key={skill.id} className="d-flex skill-li skill-body add-slill-li">
                            <input type="checkbox" name="check-growth" className="check-growth" />
                            <div className="title">
                              <input
                                type="text"
                                name={`${skill.id}_name`}
                                value={(characterData as any)[`${skill.id}_name`] || ''}
                                onChange={(e) => handleInputChange(`${skill.id}_name`, e.target.value)}
                                placeholder="技能名"
                                style={{
                                  width: '85%',
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '0.9rem'
                                }}
                                required
                              />
                              <button
                                type="button"
                                onClick={() => removeCombatSkill(skill.id)}
                                className="remove-btn"
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                            </div>
                            <div className="total">
                              <input
                                type="number"
                                name={`${skill.id}_total`}
                                className="readonly _02"
                                value={
                                  (parseInt((characterData as any)[`${skill.id}_initial`] as string) || 1) +
                                  (parseInt((characterData as any)[`${skill.id}_job`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_interest`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_growth`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_other`] as string) || 0)
                                }
                                readOnly
                              />
                            </div>
                            <div className="breakdown">
                              <span className="initial">
                                <input
                                  type="number"
                                  name={`${skill.id}_initial`}
                                  className="_02"
                                  value={(characterData as any)[`${skill.id}_initial`] || 1}
                                  onChange={(e) => handleInputChange(`${skill.id}_initial`, e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_job`}
                                  value={(characterData as any)[`${skill.id}_job`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_job`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_interest`}
                                  value={(characterData as any)[`${skill.id}_interest`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_interest`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_growth`}
                                  value={(characterData as any)[`${skill.id}_growth`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_growth`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_other`}
                                  value={(characterData as any)[`${skill.id}_other`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_other`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {/* 戦闘技能追加ボタン */}
                      <button
                        type="button"
                        onClick={addCombatSkill}
                        className="add-btn"
                      >
                        <i className="fas fa-plus"></i> 戦闘技能を追加
                      </button>
                    </div>

                    {/* 探索技能 */}
                    <div className="skill-group">
                      <h3><i className="fas fa-search"></i> 探索技能</h3>


                      <ul>
                        <li className="d-flex skill-li skill-head">
                          <div className="growth">成長</div>
                          <div className="title">技能名</div>
                          <div className="total">合計<span className="pc-only">値</span></div>
                          <div className="breakdown">
                            <span className="pc-only">初期値</span><span className="sp-only">初期</span>|
                            <span className="pc-only">職業P</span><span className="sp-only">職業</span>|
                            <span className="pc-only">興味P</span><span className="sp-only">興味</span>|
                            <span>成長</span>|
                            <span className="pc-only">その他</span><span className="sp-only">他</span>
                          </div>
                        </li>

                        {/* 応急手当 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('first_aid', 30) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">応急手当</div>
                          <div className="total">
                            <input
                              type="number"
                              name="first_aid_total"
                              className="readonly _02"
                              value={calculatedStats.first_aid_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="first_aid_initial"
                                className="readonly _02"
                                value="30"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="first_aid_job"
                                value={characterData.first_aid_job || ''}
                                onChange={(e) => handleInputChange('first_aid_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="first_aid_interest"
                                value={characterData.first_aid_interest || ''}
                                onChange={(e) => handleInputChange('first_aid_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="first_aid_growth"
                                value={characterData.first_aid_growth || ''}
                                onChange={(e) => handleInputChange('first_aid_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="first_aid_other"
                                value={characterData.first_aid_other || ''}
                                onChange={(e) => handleInputChange('first_aid_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 鍵開け */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('locksmith', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">鍵開け</div>
                          <div className="total">
                            <input
                              type="number"
                              name="locksmith_total"
                              className="readonly _02"
                              value={calculatedStats.locksmith_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="locksmith_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="locksmith_job"
                                value={characterData.locksmith_job || ''}
                                onChange={(e) => handleInputChange('locksmith_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="locksmith_interest"
                                value={characterData.locksmith_interest || ''}
                                onChange={(e) => handleInputChange('locksmith_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="locksmith_growth"
                                value={characterData.locksmith_growth || ''}
                                onChange={(e) => handleInputChange('locksmith_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="locksmith_other"
                                value={characterData.locksmith_other || ''}
                                onChange={(e) => handleInputChange('locksmith_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 隠す */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('conceal', 15) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">隠す</div>
                          <div className="total">
                            <input
                              type="number"
                              name="conceal_total"
                              className="readonly _02"
                              value={calculatedStats.conceal_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="conceal_initial"
                                className="readonly _02"
                                value="15"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="conceal_job"
                                value={characterData.conceal_job || ''}
                                onChange={(e) => handleInputChange('conceal_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="conceal_interest"
                                value={characterData.conceal_interest || ''}
                                onChange={(e) => handleInputChange('conceal_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="conceal_growth"
                                value={characterData.conceal_growth || ''}
                                onChange={(e) => handleInputChange('conceal_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="conceal_other"
                                value={characterData.conceal_other || ''}
                                onChange={(e) => handleInputChange('conceal_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 隠れる */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('hide', 10) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">隠れる</div>
                          <div className="total">
                            <input
                              type="number"
                              name="hide_total"
                              className="readonly _02"
                              value={calculatedStats.hide_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="hide_initial"
                                className="readonly _02"
                                value="10"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="hide_job"
                                value={characterData.hide_job || ''}
                                onChange={(e) => handleInputChange('hide_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="hide_interest"
                                value={characterData.hide_interest || ''}
                                onChange={(e) => handleInputChange('hide_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="hide_growth"
                                value={characterData.hide_growth || ''}
                                onChange={(e) => handleInputChange('hide_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="hide_other"
                                value={characterData.hide_other || ''}
                                onChange={(e) => handleInputChange('hide_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 聞き耳 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('listen', 25) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">聞き耳</div>
                          <div className="total">
                            <input
                              type="number"
                              name="listen_total"
                              className="readonly _02"
                              value={calculatedStats.listen_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="listen_initial"
                                className="readonly _02"
                                value="25"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="listen_job"
                                value={characterData.listen_job || ''}
                                onChange={(e) => handleInputChange('listen_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="listen_interest"
                                value={characterData.listen_interest || ''}
                                onChange={(e) => handleInputChange('listen_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="listen_growth"
                                value={characterData.listen_growth || ''}
                                onChange={(e) => handleInputChange('listen_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="listen_other"
                                value={characterData.listen_other || ''}
                                onChange={(e) => handleInputChange('listen_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 忍び歩き */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('sneak', 10) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">忍び歩き</div>
                          <div className="total">
                            <input
                              type="number"
                              name="sneak_total"
                              className="readonly _02"
                              value={calculatedStats.sneak_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="sneak_initial"
                                className="readonly _02"
                                value="10"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="sneak_job"
                                value={characterData.sneak_job || ''}
                                onChange={(e) => handleInputChange('sneak_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="sneak_interest"
                                value={characterData.sneak_interest || ''}
                                onChange={(e) => handleInputChange('sneak_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="sneak_growth"
                                value={characterData.sneak_growth || ''}
                                onChange={(e) => handleInputChange('sneak_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="sneak_other"
                                value={characterData.sneak_other || ''}
                                onChange={(e) => handleInputChange('sneak_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 写真術 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('photography', 10) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">写真術</div>
                          <div className="total">
                            <input
                              type="number"
                              name="photography_total"
                              className="readonly _02"
                              value={calculatedStats.photography_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="photography_initial"
                                className="readonly _02"
                                value="10"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="photography_job"
                                value={characterData.photography_job || ''}
                                onChange={(e) => handleInputChange('photography_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="photography_interest"
                                value={characterData.photography_interest || ''}
                                onChange={(e) => handleInputChange('photography_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="photography_growth"
                                value={characterData.photography_growth || ''}
                                onChange={(e) => handleInputChange('photography_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="photography_other"
                                value={characterData.photography_other || ''}
                                onChange={(e) => handleInputChange('photography_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 精神分析 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('psychoanalysis', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">精神分析</div>
                          <div className="total">
                            <input
                              type="number"
                              name="psychoanalysis_total"
                              className="readonly _02"
                              value={calculatedStats.psychoanalysis_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="psychoanalysis_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="psychoanalysis_job"
                                value={characterData.psychoanalysis_job || ''}
                                onChange={(e) => handleInputChange('psychoanalysis_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="psychoanalysis_interest"
                                value={characterData.psychoanalysis_interest || ''}
                                onChange={(e) => handleInputChange('psychoanalysis_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="psychoanalysis_growth"
                                value={characterData.psychoanalysis_growth || ''}
                                onChange={(e) => handleInputChange('psychoanalysis_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="psychoanalysis_other"
                                value={characterData.psychoanalysis_other || ''}
                                onChange={(e) => handleInputChange('psychoanalysis_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 追跡 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('track', 10) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">追跡</div>
                          <div className="total">
                            <input
                              type="number"
                              name="track_total"
                              className="readonly _02"
                              value={calculatedStats.track_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="track_initial"
                                className="readonly _02"
                                value="10"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="track_job"
                                value={characterData.track_job || ''}
                                onChange={(e) => handleInputChange('track_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="track_interest"
                                value={characterData.track_interest || ''}
                                onChange={(e) => handleInputChange('track_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="track_growth"
                                value={characterData.track_growth || ''}
                                onChange={(e) => handleInputChange('track_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="track_other"
                                value={characterData.track_other || ''}
                                onChange={(e) => handleInputChange('track_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 登攀 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('climb', 40) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">登攀</div>
                          <div className="total">
                            <input
                              type="number"
                              name="climb_total"
                              className="readonly _02"
                              value={calculatedStats.climb_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="climb_initial"
                                className="readonly _02"
                                value="40"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="climb_job"
                                value={characterData.climb_job || ''}
                                onChange={(e) => handleInputChange('climb_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="climb_interest"
                                value={characterData.climb_interest || ''}
                                onChange={(e) => handleInputChange('climb_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="climb_growth"
                                value={characterData.climb_growth || ''}
                                onChange={(e) => handleInputChange('climb_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="climb_other"
                                value={characterData.climb_other || ''}
                                onChange={(e) => handleInputChange('climb_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 図書館 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('library_use', 25) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">図書館</div>
                          <div className="total">
                            <input
                              type="number"
                              name="library_use_total"
                              className="readonly _02"
                              value={calculatedStats.library_use_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="library_use_initial"
                                className="readonly _02"
                                value="25"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="library_use_job"
                                value={characterData.library_use_job || ''}
                                onChange={(e) => handleInputChange('library_use_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="library_use_interest"
                                value={characterData.library_use_interest || ''}
                                onChange={(e) => handleInputChange('library_use_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="library_use_growth"
                                value={characterData.library_use_growth || ''}
                                onChange={(e) => handleInputChange('library_use_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="library_use_other"
                                value={characterData.library_use_other || ''}
                                onChange={(e) => handleInputChange('library_use_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 目星 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('spot_hidden', 25) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">目星</div>
                          <div className="total">
                            <input
                              type="number"
                              name="spot_hidden_total"
                              className="readonly _02"
                              value={calculatedStats.spot_hidden_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="spot_hidden_initial"
                                className="readonly _02"
                                value="25"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="spot_hidden_job"
                                value={characterData.spot_hidden_job || ''}
                                onChange={(e) => handleInputChange('spot_hidden_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="spot_hidden_interest"
                                value={characterData.spot_hidden_interest || ''}
                                onChange={(e) => handleInputChange('spot_hidden_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="spot_hidden_growth"
                                value={characterData.spot_hidden_growth || ''}
                                onChange={(e) => handleInputChange('spot_hidden_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="spot_hidden_other"
                                value={characterData.spot_hidden_other || ''}
                                onChange={(e) => handleInputChange('spot_hidden_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 追加探索技能 */}
                        {additionalExplorationSkills.map((skill) => (
                          <li key={skill.id} className="d-flex skill-li skill-body add-slill-li">
                            <input type="checkbox" name="check-growth" className="check-growth" />
                            <div className="title">
                              <input
                                type="text"
                                name={`${skill.id}_name`}
                                value={(characterData as any)[`${skill.id}_name`] || ''}
                                onChange={(e) => handleInputChange(`${skill.id}_name`, e.target.value)}
                                placeholder="技能名"
                                style={{
                                  width: '85%',
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '0.9rem'
                                }}
                                required
                              />
                              <button
                                type="button"
                                onClick={() => removeExplorationSkill(skill.id)}
                                className="remove-btn"
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                            </div>
                            <div className="total">
                              <input
                                type="number"
                                name={`${skill.id}_total`}
                                className="readonly _02"
                                value={
                                  (parseInt((characterData as any)[`${skill.id}_initial`] as string) || 1) +
                                  (parseInt((characterData as any)[`${skill.id}_job`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_interest`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_growth`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_other`] as string) || 0)
                                }
                                readOnly
                              />
                            </div>
                            <div className="breakdown">
                              <span className="initial">
                                <input
                                  type="number"
                                  name={`${skill.id}_initial`}
                                  className="_02"
                                  value={(characterData as any)[`${skill.id}_initial`] || 1}
                                  onChange={(e) => handleInputChange(`${skill.id}_initial`, e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_job`}
                                  value={(characterData as any)[`${skill.id}_job`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_job`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_interest`}
                                  value={(characterData as any)[`${skill.id}_interest`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_interest`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_growth`}
                                  value={(characterData as any)[`${skill.id}_growth`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_growth`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_other`}
                                  value={(characterData as any)[`${skill.id}_other`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_other`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {/* 探索技能追加ボタン */}
                      <button
                        type="button"
                        onClick={addExplorationSkill}
                        className="add-btn"
                      >
                        <i className="fas fa-plus"></i> 探索技能を追加
                      </button>
                    </div>

                    {/* 行動技能 */}
                    <div className="skill-group">
                      <h3><i className="fas fa-running"></i> 行動技能</h3>


                      <ul>
                        <li className="d-flex skill-li skill-head">
                          <div className="growth">成長</div>
                          <div className="title">技能名</div>
                          <div className="total">合計<span className="pc-only">値</span></div>
                          <div className="breakdown">
                            <span className="pc-only">初期値</span><span className="sp-only">初期</span>|
                            <span className="pc-only">職業P</span><span className="sp-only">職業</span>|
                            <span className="pc-only">興味P</span><span className="sp-only">興味</span>|
                            <span>成長</span>|
                            <span className="pc-only">その他</span><span className="sp-only">他</span>
                          </div>
                        </li>

                        {/* 運転 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('drive', 20) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">運転<br className="sp-only" />
                            <input
                              type="text"
                              name="drive_specialty"
                              placeholder=""
                              className="free"
                              value={characterData.drive_specialty || ''}
                              onChange={(e) => handleInputChange('drive_specialty', e.target.value)}
                            />
                          </div>
                          <div className="total">
                            <input
                              type="number"
                              name="drive_total"
                              className="readonly _02"
                              value={calculatedStats.drive_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="drive_initial"
                                className="readonly _02"
                                value="20"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="drive_job"
                                value={characterData.drive_job || ''}
                                onChange={(e) => handleInputChange('drive_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="drive_interest"
                                value={characterData.drive_interest || ''}
                                onChange={(e) => handleInputChange('drive_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="drive_growth"
                                value={characterData.drive_growth || ''}
                                onChange={(e) => handleInputChange('drive_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="drive_other"
                                value={characterData.drive_other || ''}
                                onChange={(e) => handleInputChange('drive_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 機械修理 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('mechanical_repair', 20) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">機械修理</div>
                          <div className="total">
                            <input
                              type="number"
                              name="mechanical_repair_total"
                              className="readonly _02"
                              value={calculatedStats.mechanical_repair_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="mechanical_repair_initial"
                                className="readonly _02"
                                value="20"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="mechanical_repair_job"
                                value={characterData.mechanical_repair_job || ''}
                                onChange={(e) => handleInputChange('mechanical_repair_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="mechanical_repair_interest"
                                value={characterData.mechanical_repair_interest || ''}
                                onChange={(e) => handleInputChange('mechanical_repair_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="mechanical_repair_growth"
                                value={characterData.mechanical_repair_growth || ''}
                                onChange={(e) => handleInputChange('mechanical_repair_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="mechanical_repair_other"
                                value={characterData.mechanical_repair_other || ''}
                                onChange={(e) => handleInputChange('mechanical_repair_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 重機械操作 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('heavy_machinery', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">重機械操作</div>
                          <div className="total">
                            <input
                              type="number"
                              name="heavy_machinery_total"
                              className="readonly _02"
                              value={calculatedStats.heavy_machinery_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="heavy_machinery_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="heavy_machinery_job"
                                value={characterData.heavy_machinery_job || ''}
                                onChange={(e) => handleInputChange('heavy_machinery_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="heavy_machinery_interest"
                                value={characterData.heavy_machinery_interest || ''}
                                onChange={(e) => handleInputChange('heavy_machinery_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="heavy_machinery_growth"
                                value={characterData.heavy_machinery_growth || ''}
                                onChange={(e) => handleInputChange('heavy_machinery_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="heavy_machinery_other"
                                value={characterData.heavy_machinery_other || ''}
                                onChange={(e) => handleInputChange('heavy_machinery_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 乗馬 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('ride', 5) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">乗馬</div>
                          <div className="total">
                            <input
                              type="number"
                              name="ride_total"
                              className="readonly _02"
                              value={calculatedStats.ride_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="ride_initial"
                                className="readonly _02"
                                value="5"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="ride_job"
                                value={characterData.ride_job || ''}
                                onChange={(e) => handleInputChange('ride_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="ride_interest"
                                value={characterData.ride_interest || ''}
                                onChange={(e) => handleInputChange('ride_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="ride_growth"
                                value={characterData.ride_growth || ''}
                                onChange={(e) => handleInputChange('ride_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="ride_other"
                                value={characterData.ride_other || ''}
                                onChange={(e) => handleInputChange('ride_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 水泳 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('swim', 25) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">水泳</div>
                          <div className="total">
                            <input
                              type="number"
                              name="swim_total"
                              className="readonly _02"
                              value={calculatedStats.swim_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="swim_initial"
                                className="readonly _02"
                                value="25"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="swim_job"
                                value={characterData.swim_job || ''}
                                onChange={(e) => handleInputChange('swim_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="swim_interest"
                                value={characterData.swim_interest || ''}
                                onChange={(e) => handleInputChange('swim_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="swim_growth"
                                value={characterData.swim_growth || ''}
                                onChange={(e) => handleInputChange('swim_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="swim_other"
                                value={characterData.swim_other || ''}
                                onChange={(e) => handleInputChange('swim_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 製作 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('craft', 5) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">製作<br className="sp-only" />
                            <input
                              type="text"
                              name="craft_specialty"
                              placeholder=""
                              className="free"
                              value={characterData.craft_specialty || ''}
                              onChange={(e) => handleInputChange('craft_specialty', e.target.value)}
                            />
                          </div>
                          <div className="total">
                            <input
                              type="number"
                              name="craft_total"
                              className="readonly _02"
                              value={calculatedStats.craft_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="craft_initial"
                                className="readonly _02"
                                value="5"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="craft_job"
                                value={characterData.craft_job || ''}
                                onChange={(e) => handleInputChange('craft_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="craft_interest"
                                value={characterData.craft_interest || ''}
                                onChange={(e) => handleInputChange('craft_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="craft_growth"
                                value={characterData.craft_growth || ''}
                                onChange={(e) => handleInputChange('craft_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="craft_other"
                                value={characterData.craft_other || ''}
                                onChange={(e) => handleInputChange('craft_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 操縦 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('pilot', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">操縦 <br className="sp-only" />
                            <input
                              type="text"
                              name="pilot_specialty"
                              placeholder=""
                              className="free"
                              value={characterData.pilot_specialty || ''}
                              onChange={(e) => handleInputChange('pilot_specialty', e.target.value)}
                            />
                          </div>
                          <div className="total">
                            <input
                              type="number"
                              name="pilot_total"
                              className="readonly _02"
                              value={calculatedStats.pilot_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="pilot_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="pilot_job"
                                value={characterData.pilot_job || ''}
                                onChange={(e) => handleInputChange('pilot_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="pilot_interest"
                                value={characterData.pilot_interest || ''}
                                onChange={(e) => handleInputChange('pilot_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="pilot_growth"
                                value={characterData.pilot_growth || ''}
                                onChange={(e) => handleInputChange('pilot_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="pilot_other"
                                value={characterData.pilot_other || ''}
                                onChange={(e) => handleInputChange('pilot_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 跳躍 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('jump', 25) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">跳躍</div>
                          <div className="total">
                            <input
                              type="number"
                              name="jump_total"
                              className="readonly _02"
                              value={calculatedStats.jump_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="jump_initial"
                                className="readonly _02"
                                value="25"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="jump_job"
                                value={characterData.jump_job || ''}
                                onChange={(e) => handleInputChange('jump_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="jump_interest"
                                value={characterData.jump_interest || ''}
                                onChange={(e) => handleInputChange('jump_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="jump_growth"
                                value={characterData.jump_growth || ''}
                                onChange={(e) => handleInputChange('jump_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="jump_other"
                                value={characterData.jump_other || ''}
                                onChange={(e) => handleInputChange('jump_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 電気修理 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('electrical_repair', 10) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">電気修理</div>
                          <div className="total">
                            <input
                              type="number"
                              name="electrical_repair_total"
                              className="readonly _02"
                              value={calculatedStats.electrical_repair_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="electrical_repair_initial"
                                className="readonly _02"
                                value="10"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="electrical_repair_job"
                                value={characterData.electrical_repair_job || ''}
                                onChange={(e) => handleInputChange('electrical_repair_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="electrical_repair_interest"
                                value={characterData.electrical_repair_interest || ''}
                                onChange={(e) => handleInputChange('electrical_repair_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="electrical_repair_growth"
                                value={characterData.electrical_repair_growth || ''}
                                onChange={(e) => handleInputChange('electrical_repair_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="electrical_repair_other"
                                value={characterData.electrical_repair_other || ''}
                                onChange={(e) => handleInputChange('electrical_repair_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* ナビゲート */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('navigate', 10) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">ナビゲート</div>
                          <div className="total">
                            <input
                              type="number"
                              name="navigate_total"
                              className="readonly _02"
                              value={calculatedStats.navigate_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="navigate_initial"
                                className="readonly _02"
                                value="10"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="navigate_job"
                                value={characterData.navigate_job || ''}
                                onChange={(e) => handleInputChange('navigate_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="navigate_interest"
                                value={characterData.navigate_interest || ''}
                                onChange={(e) => handleInputChange('navigate_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="navigate_growth"
                                value={characterData.navigate_growth || ''}
                                onChange={(e) => handleInputChange('navigate_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="navigate_other"
                                value={characterData.navigate_other || ''}
                                onChange={(e) => handleInputChange('navigate_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 変装 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('disguise', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">変装</div>
                          <div className="total">
                            <input
                              type="number"
                              name="disguise_total"
                              className="readonly _02"
                              value={calculatedStats.disguise_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="disguise_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="disguise_job"
                                value={characterData.disguise_job || ''}
                                onChange={(e) => handleInputChange('disguise_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="disguise_interest"
                                value={characterData.disguise_interest || ''}
                                onChange={(e) => handleInputChange('disguise_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="disguise_growth"
                                value={characterData.disguise_growth || ''}
                                onChange={(e) => handleInputChange('disguise_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="disguise_other"
                                value={characterData.disguise_other || ''}
                                onChange={(e) => handleInputChange('disguise_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 追加行動技能 */}
                        {additionalActionSkills.map((skill) => (
                          <li key={skill.id} className="d-flex skill-li skill-body add-slill-li">
                            <input type="checkbox" name="check-growth" className="check-growth" />
                            <div className="title">
                              <input
                                type="text"
                                name={`${skill.id}_name`}
                                value={(characterData as any)[`${skill.id}_name`] || ''}
                                onChange={(e) => handleInputChange(`${skill.id}_name`, e.target.value)}
                                placeholder="技能名"
                                style={{
                                  width: '85%',
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '0.9rem'
                                }}
                                required
                              />
                              <button
                                type="button"
                                onClick={() => removeActionSkill(skill.id)}
                                className="remove-btn"
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                            </div>
                            <div className="total">
                              <input
                                type="number"
                                name={`${skill.id}_total`}
                                className="readonly _02"
                                value={
                                  (parseInt((characterData as any)[`${skill.id}_initial`] as string) || 1) +
                                  (parseInt((characterData as any)[`${skill.id}_job`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_interest`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_growth`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_other`] as string) || 0)
                                }
                                readOnly
                              />
                            </div>
                            <div className="breakdown">
                              <span className="initial">
                                <input
                                  type="number"
                                  name={`${skill.id}_initial`}
                                  className="_02"
                                  value={(characterData as any)[`${skill.id}_initial`] || 1}
                                  onChange={(e) => handleInputChange(`${skill.id}_initial`, e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_job`}
                                  value={(characterData as any)[`${skill.id}_job`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_job`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_interest`}
                                  value={(characterData as any)[`${skill.id}_interest`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_interest`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_growth`}
                                  value={(characterData as any)[`${skill.id}_growth`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_growth`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_other`}
                                  value={(characterData as any)[`${skill.id}_other`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_other`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {/* 行動技能追加ボタン */}
                      <button
                        type="button"
                        onClick={addActionSkill}
                        className="add-btn"
                      >
                        <i className="fas fa-plus"></i> 行動技能を追加
                      </button>
                    </div>

                    {/* 交渉技能 */}
                    <div className="skill-group">
                      <h3><i className="fas fa-american-sign-language-interpreting"></i> 交渉技能</h3>


                      <ul>
                        <li className="d-flex skill-li skill-head">
                          <div className="growth">成長</div>
                          <div className="title">技能名</div>
                          <div className="total">合計<span className="pc-only">値</span></div>
                          <div className="breakdown">
                            <span className="pc-only">初期値</span><span className="sp-only">初期</span>|
                            <span className="pc-only">職業P</span><span className="sp-only">職業</span>|
                            <span className="pc-only">興味P</span><span className="sp-only">興味</span>|
                            <span>成長</span>|
                            <span className="pc-only">その他</span><span className="sp-only">他</span>
                          </div>
                        </li>

                        {/* 言いくるめ */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('fast_talk', 5) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">言いくるめ</div>
                          <div className="total">
                            <input
                              type="number"
                              name="fast_talk_total"
                              className="readonly _02"
                              value={calculatedStats.fast_talk_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="fast_talk_initial"
                                className="readonly _02"
                                value="5"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="fast_talk_job"
                                value={characterData.fast_talk_job || ''}
                                onChange={(e) => handleInputChange('fast_talk_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="fast_talk_interest"
                                value={characterData.fast_talk_interest || ''}
                                onChange={(e) => handleInputChange('fast_talk_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="fast_talk_growth"
                                value={characterData.fast_talk_growth || ''}
                                onChange={(e) => handleInputChange('fast_talk_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="fast_talk_other"
                                value={characterData.fast_talk_other || ''}
                                onChange={(e) => handleInputChange('fast_talk_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 説得 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('persuade', 15) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">説得</div>
                          <div className="total">
                            <input
                              type="number"
                              name="persuade_total"
                              className="readonly _02"
                              value={calculatedStats.persuade_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="persuade_initial"
                                className="readonly _02"
                                value="15"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="persuade_job"
                                value={characterData.persuade_job || ''}
                                onChange={(e) => handleInputChange('persuade_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="persuade_interest"
                                value={characterData.persuade_interest || ''}
                                onChange={(e) => handleInputChange('persuade_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="persuade_growth"
                                value={characterData.persuade_growth || ''}
                                onChange={(e) => handleInputChange('persuade_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="persuade_other"
                                value={characterData.persuade_other || ''}
                                onChange={(e) => handleInputChange('persuade_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 信用 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('credit_rating', 15) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">信用</div>
                          <div className="total">
                            <input
                              type="number"
                              name="credit_rating_total"
                              className="readonly _02"
                              value={calculatedStats.credit_rating_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="credit_rating_initial"
                                className="readonly _02"
                                value="15"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="credit_rating_job"
                                value={characterData.credit_rating_job || ''}
                                onChange={(e) => handleInputChange('credit_rating_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="credit_rating_interest"
                                value={characterData.credit_rating_interest || ''}
                                onChange={(e) => handleInputChange('credit_rating_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="credit_rating_growth"
                                value={characterData.credit_rating_growth || ''}
                                onChange={(e) => handleInputChange('credit_rating_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="credit_rating_other"
                                value={characterData.credit_rating_other || ''}
                                onChange={(e) => handleInputChange('credit_rating_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 値切り */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('bargain', 5) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">値切り</div>
                          <div className="total">
                            <input
                              type="number"
                              name="bargain_total"
                              className="readonly _02"
                              value={calculatedStats.bargain_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="bargain_initial"
                                className="readonly _02"
                                value="5"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="bargain_job"
                                value={characterData.bargain_job || ''}
                                onChange={(e) => handleInputChange('bargain_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="bargain_interest"
                                value={characterData.bargain_interest || ''}
                                onChange={(e) => handleInputChange('bargain_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="bargain_growth"
                                value={characterData.bargain_growth || ''}
                                onChange={(e) => handleInputChange('bargain_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="bargain_other"
                                value={characterData.bargain_other || ''}
                                onChange={(e) => handleInputChange('bargain_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 母国語 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('mother_tongue', calculatedStats.mother_tongue_initial || 0) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">母国語 <br className="sp-only" />
                            <input
                              type="text"
                              name="mother_tongue_specialty"
                              placeholder=""
                              className="free"
                              value={characterData.mother_tongue_specialty || ''}
                              onChange={(e) => handleInputChange('mother_tongue_specialty', e.target.value)}
                            />
                          </div>
                          <div className="total">
                            <input
                              type="number"
                              name="mother_tongue_total"
                              className="readonly _02"
                              value={calculatedStats.mother_tongue_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="mother_tongue_initial"
                                className="readonly _02"
                                value={calculatedStats.mother_tongue_initial || 0}
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="mother_tongue_job"
                                value={characterData.mother_tongue_job || ''}
                                onChange={(e) => handleInputChange('mother_tongue_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="mother_tongue_interest"
                                value={characterData.mother_tongue_interest || ''}
                                onChange={(e) => handleInputChange('mother_tongue_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="mother_tongue_growth"
                                value={characterData.mother_tongue_growth || ''}
                                onChange={(e) => handleInputChange('mother_tongue_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="mother_tongue_other"
                                value={characterData.mother_tongue_other || ''}
                                onChange={(e) => handleInputChange('mother_tongue_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 外国語 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('language', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">外国語 <br className="sp-only" />
                            <input
                              type="text"
                              name="language_specialty"
                              placeholder=""
                              className="free"
                              value={characterData.language_specialty || ''}
                              onChange={(e) => handleInputChange('language_specialty', e.target.value)}
                            />
                          </div>
                          <div className="total">
                            <input
                              type="number"
                              name="language_total"
                              className="readonly _02"
                              value={calculatedStats.language_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="language_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="language_job"
                                value={characterData.language_job || ''}
                                onChange={(e) => handleInputChange('language_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="language_interest"
                                value={characterData.language_interest || ''}
                                onChange={(e) => handleInputChange('language_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="language_growth"
                                value={characterData.language_growth || ''}
                                onChange={(e) => handleInputChange('language_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="language_other"
                                value={characterData.language_other || ''}
                                onChange={(e) => handleInputChange('language_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 追加交渉技能 */}
                        {additionalNegotiationSkills.map((skill) => (
                          <li key={skill.id} className="d-flex skill-li skill-body add-slill-li">
                            <input type="checkbox" name="check-growth" className="check-growth" />
                            <div className="title">
                              <input
                                type="text"
                                name={`${skill.id}_name`}
                                value={(characterData as any)[`${skill.id}_name`] || ''}
                                onChange={(e) => handleInputChange(`${skill.id}_name`, e.target.value)}
                                placeholder="技能名"
                                style={{
                                  width: '85%',
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '0.9rem'
                                }}
                                required
                              />
                              <button
                                type="button"
                                onClick={() => removeNegotiationSkill(skill.id)}
                                className="remove-btn"
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                            </div>
                            <div className="total">
                              <input
                                type="number"
                                name={`${skill.id}_total`}
                                className="readonly _02"
                                value={
                                  (parseInt((characterData as any)[`${skill.id}_initial`] as string) || 1) +
                                  (parseInt((characterData as any)[`${skill.id}_job`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_interest`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_growth`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_other`] as string) || 0)
                                }
                                readOnly
                              />
                            </div>
                            <div className="breakdown">
                              <span className="initial">
                                <input
                                  type="number"
                                  name={`${skill.id}_initial`}
                                  className="_02"
                                  value={(characterData as any)[`${skill.id}_initial`] || 1}
                                  onChange={(e) => handleInputChange(`${skill.id}_initial`, e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_job`}
                                  value={(characterData as any)[`${skill.id}_job`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_job`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_interest`}
                                  value={(characterData as any)[`${skill.id}_interest`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_interest`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_growth`}
                                  value={(characterData as any)[`${skill.id}_growth`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_growth`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_other`}
                                  value={(characterData as any)[`${skill.id}_other`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_other`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {/* 交渉技能追加ボタン */}
                      <button
                        type="button"
                        onClick={addNegotiationSkill}
                        className="add-btn"
                      >
                        <i className="fas fa-plus"></i> 交渉技能を追加
                      </button>
                    </div>

                    {/* 知識技能 */}
                    <div className="skill-group">
                      <h3><i className="fas fa-book"></i> 知識技能</h3>


                      <ul>
                        <li className="d-flex skill-li skill-head">
                          <div className="growth">成長</div>
                          <div className="title">技能名</div>
                          <div className="total">合計<span className="pc-only">値</span></div>
                          <div className="breakdown">
                            <span className="pc-only">初期値</span><span className="sp-only">初期</span>|
                            <span className="pc-only">職業P</span><span className="sp-only">職業</span>|
                            <span className="pc-only">興味P</span><span className="sp-only">興味</span>|
                            <span>成長</span>|
                            <span className="pc-only">その他</span><span className="sp-only">他</span>
                          </div>
                        </li>

                        {/* 医学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('medicine', 5) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">医学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="medicine_total"
                              className="readonly _02"
                              value={calculatedStats.medicine_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="medicine_initial"
                                className="readonly _02"
                                value="5"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="medicine_job"
                                value={characterData.medicine_job || ''}
                                onChange={(e) => handleInputChange('medicine_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="medicine_interest"
                                value={characterData.medicine_interest || ''}
                                onChange={(e) => handleInputChange('medicine_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="medicine_growth"
                                value={characterData.medicine_growth || ''}
                                onChange={(e) => handleInputChange('medicine_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="medicine_other"
                                value={characterData.medicine_other || ''}
                                onChange={(e) => handleInputChange('medicine_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* オカルト */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('occult', 5) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">オカルト</div>
                          <div className="total">
                            <input
                              type="number"
                              name="occult_total"
                              className="readonly _02"
                              value={calculatedStats.occult_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="occult_initial"
                                className="readonly _02"
                                value="5"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="occult_job"
                                value={characterData.occult_job || ''}
                                onChange={(e) => handleInputChange('occult_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="occult_interest"
                                value={characterData.occult_interest || ''}
                                onChange={(e) => handleInputChange('occult_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="occult_growth"
                                value={characterData.occult_growth || ''}
                                onChange={(e) => handleInputChange('occult_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="occult_other"
                                value={characterData.occult_other || ''}
                                onChange={(e) => handleInputChange('occult_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 化学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('chemistry', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">化学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="chemistry_total"
                              className="readonly _02"
                              value={calculatedStats.chemistry_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="chemistry_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="chemistry_job"
                                value={characterData.chemistry_job || ''}
                                onChange={(e) => handleInputChange('chemistry_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="chemistry_interest"
                                value={characterData.chemistry_interest || ''}
                                onChange={(e) => handleInputChange('chemistry_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="chemistry_growth"
                                value={characterData.chemistry_growth || ''}
                                onChange={(e) => handleInputChange('chemistry_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="chemistry_other"
                                value={characterData.chemistry_other || ''}
                                onChange={(e) => handleInputChange('chemistry_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* クトゥルフ神話 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('cthulhu_mythos', 0) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">クトゥルフ神話</div>
                          <div className="total">
                            <input
                              type="number"
                              name="cthulhu_mythos_total"
                              className="readonly _02"
                              value={calculatedStats.cthulhu_mythos_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="cthulhu_mythos_initial"
                                className="readonly _02"
                                value="0"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="cthulhu_mythos_job"
                                value={characterData.cthulhu_mythos_job || ''}
                                onChange={(e) => handleInputChange('cthulhu_mythos_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="cthulhu_mythos_interest"
                                value={characterData.cthulhu_mythos_interest || ''}
                                onChange={(e) => handleInputChange('cthulhu_mythos_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="cthulhu_mythos_growth"
                                value={characterData.cthulhu_mythos_growth || ''}
                                onChange={(e) => handleInputChange('cthulhu_mythos_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="cthulhu_mythos_other"
                                value={characterData.cthulhu_mythos_other || ''}
                                onChange={(e) => handleInputChange('cthulhu_mythos_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 芸術 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('art', 5) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">芸術 <br className="sp-only" />
                            <input
                              type="text"
                              name="art_specialty"
                              placeholder=""
                              className="free"
                              value={characterData.art_specialty || ''}
                              onChange={(e) => handleInputChange('art_specialty', e.target.value)}
                            />
                          </div>
                          <div className="total">
                            <input
                              type="number"
                              name="art_total"
                              className="readonly _02"
                              value={calculatedStats.art_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="art_initial"
                                className="readonly _02"
                                value="5"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="art_job"
                                value={characterData.art_job || ''}
                                onChange={(e) => handleInputChange('art_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="art_interest"
                                value={characterData.art_interest || ''}
                                onChange={(e) => handleInputChange('art_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="art_growth"
                                value={characterData.art_growth || ''}
                                onChange={(e) => handleInputChange('art_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="art_other"
                                value={characterData.art_other || ''}
                                onChange={(e) => handleInputChange('art_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 経理 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('accounting', 10) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">経理</div>
                          <div className="total">
                            <input
                              type="number"
                              name="accounting_total"
                              className="readonly _02"
                              value={calculatedStats.accounting_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="accounting_initial"
                                className="readonly _02"
                                value="10"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="accounting_job"
                                value={characterData.accounting_job || ''}
                                onChange={(e) => handleInputChange('accounting_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="accounting_interest"
                                value={characterData.accounting_interest || ''}
                                onChange={(e) => handleInputChange('accounting_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="accounting_growth"
                                value={characterData.accounting_growth || ''}
                                onChange={(e) => handleInputChange('accounting_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="accounting_other"
                                value={characterData.accounting_other || ''}
                                onChange={(e) => handleInputChange('accounting_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 考古学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('archaeology', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">考古学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="archaeology_total"
                              className="readonly _02"
                              value={calculatedStats.archaeology_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="archaeology_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="archaeology_job"
                                value={characterData.archaeology_job || ''}
                                onChange={(e) => handleInputChange('archaeology_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="archaeology_interest"
                                value={characterData.archaeology_interest || ''}
                                onChange={(e) => handleInputChange('archaeology_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="archaeology_growth"
                                value={characterData.archaeology_growth || ''}
                                onChange={(e) => handleInputChange('archaeology_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="archaeology_other"
                                value={characterData.archaeology_other || ''}
                                onChange={(e) => handleInputChange('archaeology_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* コンピューター */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('computer_use', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">コンピューター</div>
                          <div className="total">
                            <input
                              type="number"
                              name="computer_use_total"
                              className="readonly _02"
                              value={calculatedStats.computer_use_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="computer_use_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="computer_use_job"
                                value={characterData.computer_use_job || ''}
                                onChange={(e) => handleInputChange('computer_use_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="computer_use_interest"
                                value={characterData.computer_use_interest || ''}
                                onChange={(e) => handleInputChange('computer_use_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="computer_use_growth"
                                value={characterData.computer_use_growth || ''}
                                onChange={(e) => handleInputChange('computer_use_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="computer_use_other"
                                value={characterData.computer_use_other || ''}
                                onChange={(e) => handleInputChange('computer_use_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 心理学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('psychology', 5) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">心理学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="psychology_total"
                              className="readonly _02"
                              value={calculatedStats.psychology_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="psychology_initial"
                                className="readonly _02"
                                value="5"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="psychology_job"
                                value={characterData.psychology_job || ''}
                                onChange={(e) => handleInputChange('psychology_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="psychology_interest"
                                value={characterData.psychology_interest || ''}
                                onChange={(e) => handleInputChange('psychology_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="psychology_growth"
                                value={characterData.psychology_growth || ''}
                                onChange={(e) => handleInputChange('psychology_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="psychology_other"
                                value={characterData.psychology_other || ''}
                                onChange={(e) => handleInputChange('psychology_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 人類学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('anthropology', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">人類学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="anthropology_total"
                              className="readonly _02"
                              value={calculatedStats.anthropology_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="anthropology_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="anthropology_job"
                                value={characterData.anthropology_job || ''}
                                onChange={(e) => handleInputChange('anthropology_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="anthropology_interest"
                                value={characterData.anthropology_interest || ''}
                                onChange={(e) => handleInputChange('anthropology_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="anthropology_growth"
                                value={characterData.anthropology_growth || ''}
                                onChange={(e) => handleInputChange('anthropology_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="anthropology_other"
                                value={characterData.anthropology_other || ''}
                                onChange={(e) => handleInputChange('anthropology_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 生物学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('biology', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">生物学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="biology_total"
                              className="readonly _02"
                              value={calculatedStats.biology_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="biology_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="biology_job"
                                value={characterData.biology_job || ''}
                                onChange={(e) => handleInputChange('biology_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="biology_interest"
                                value={characterData.biology_interest || ''}
                                onChange={(e) => handleInputChange('biology_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="biology_growth"
                                value={characterData.biology_growth || ''}
                                onChange={(e) => handleInputChange('biology_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="biology_other"
                                value={characterData.biology_other || ''}
                                onChange={(e) => handleInputChange('biology_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 地質学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('geology', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">地質学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="geology_total"
                              className="readonly _02"
                              value={calculatedStats.geology_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="geology_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="geology_job"
                                value={characterData.geology_job || ''}
                                onChange={(e) => handleInputChange('geology_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="geology_interest"
                                value={characterData.geology_interest || ''}
                                onChange={(e) => handleInputChange('geology_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="geology_growth"
                                value={characterData.geology_growth || ''}
                                onChange={(e) => handleInputChange('geology_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="geology_other"
                                value={characterData.geology_other || ''}
                                onChange={(e) => handleInputChange('geology_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 電子工学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('electronics', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">電子工学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="electronics_total"
                              className="readonly _02"
                              value={calculatedStats.electronics_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="electronics_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="electronics_job"
                                value={characterData.electronics_job || ''}
                                onChange={(e) => handleInputChange('electronics_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="electronics_interest"
                                value={characterData.electronics_interest || ''}
                                onChange={(e) => handleInputChange('electronics_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="electronics_growth"
                                value={characterData.electronics_growth || ''}
                                onChange={(e) => handleInputChange('electronics_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="electronics_other"
                                value={characterData.electronics_other || ''}
                                onChange={(e) => handleInputChange('electronics_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 天文学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('astronomy', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">天文学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="astronomy_total"
                              className="readonly _02"
                              value={calculatedStats.astronomy_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="astronomy_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="astronomy_job"
                                value={characterData.astronomy_job || ''}
                                onChange={(e) => handleInputChange('astronomy_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="astronomy_interest"
                                value={characterData.astronomy_interest || ''}
                                onChange={(e) => handleInputChange('astronomy_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="astronomy_growth"
                                value={characterData.astronomy_growth || ''}
                                onChange={(e) => handleInputChange('astronomy_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="astronomy_other"
                                value={characterData.astronomy_other || ''}
                                onChange={(e) => handleInputChange('astronomy_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 博物学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('natural_history', 10) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">博物学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="natural_history_total"
                              className="readonly _02"
                              value={calculatedStats.natural_history_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="natural_history_initial"
                                className="readonly _02"
                                value="10"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="natural_history_job"
                                value={characterData.natural_history_job || ''}
                                onChange={(e) => handleInputChange('natural_history_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="natural_history_interest"
                                value={characterData.natural_history_interest || ''}
                                onChange={(e) => handleInputChange('natural_history_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="natural_history_growth"
                                value={characterData.natural_history_growth || ''}
                                onChange={(e) => handleInputChange('natural_history_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="natural_history_other"
                                value={characterData.natural_history_other || ''}
                                onChange={(e) => handleInputChange('natural_history_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 物理学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('physics', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">物理学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="physics_total"
                              className="readonly _02"
                              value={calculatedStats.physics_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="physics_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="physics_job"
                                value={characterData.physics_job || ''}
                                onChange={(e) => handleInputChange('physics_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="physics_interest"
                                value={characterData.physics_interest || ''}
                                onChange={(e) => handleInputChange('physics_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="physics_growth"
                                value={characterData.physics_growth || ''}
                                onChange={(e) => handleInputChange('physics_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="physics_other"
                                value={characterData.physics_other || ''}
                                onChange={(e) => handleInputChange('physics_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 法律 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('law', 5) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">法律</div>
                          <div className="total">
                            <input
                              type="number"
                              name="law_total"
                              className="readonly _02"
                              value={calculatedStats.law_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="law_initial"
                                className="readonly _02"
                                value="5"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="law_job"
                                value={characterData.law_job || ''}
                                onChange={(e) => handleInputChange('law_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="law_interest"
                                value={characterData.law_interest || ''}
                                onChange={(e) => handleInputChange('law_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="law_growth"
                                value={characterData.law_growth || ''}
                                onChange={(e) => handleInputChange('law_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="law_other"
                                value={characterData.law_other || ''}
                                onChange={(e) => handleInputChange('law_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 薬学 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('pharmacy', 1) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">薬学</div>
                          <div className="total">
                            <input
                              type="number"
                              name="pharmacy_total"
                              className="readonly _02"
                              value={calculatedStats.pharmacy_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="pharmacy_initial"
                                className="readonly _02"
                                value="1"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="pharmacy_job"
                                value={characterData.pharmacy_job || ''}
                                onChange={(e) => handleInputChange('pharmacy_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="pharmacy_interest"
                                value={characterData.pharmacy_interest || ''}
                                onChange={(e) => handleInputChange('pharmacy_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="pharmacy_growth"
                                value={characterData.pharmacy_growth || ''}
                                onChange={(e) => handleInputChange('pharmacy_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="pharmacy_other"
                                value={characterData.pharmacy_other || ''}
                                onChange={(e) => handleInputChange('pharmacy_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 歴史 */}
                        <li
                          className="d-flex skill-li skill-body"
                          style={{
                            display: hideInitialSkills && isSkillInitialOnly('history', 20) ? 'none' : 'flex'
                          }}
                        >
                          <input type="checkbox" name="check-growth" className="check-growth" />
                          <div className="title">歴史</div>
                          <div className="total">
                            <input
                              type="number"
                              name="history_total"
                              className="readonly _02"
                              value={calculatedStats.history_total || 0}
                              readOnly
                            />
                          </div>
                          <div className="breakdown">
                            <span className="initial">
                              <input
                                type="number"
                                name="history_initial"
                                className="readonly _02"
                                value="20"
                                readOnly
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="history_job"
                                value={characterData.history_job || ''}
                                onChange={(e) => handleInputChange('history_job', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="history_interest"
                                value={characterData.history_interest || ''}
                                onChange={(e) => handleInputChange('history_interest', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="history_growth"
                                value={characterData.history_growth || ''}
                                onChange={(e) => handleInputChange('history_growth', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>|<span className="atai">
                              <input
                                type="number"
                                name="history_other"
                                value={characterData.history_other || ''}
                                onChange={(e) => handleInputChange('history_other', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                              />
                            </span>
                          </div>
                        </li>

                        {/* 追加知識技能 */}
                        {additionalKnowledgeSkills.map((skill) => (
                          <li key={skill.id} className="d-flex skill-li skill-body add-slill-li">
                            <input type="checkbox" name="check-growth" className="check-growth" />
                            <div className="title">
                              <input
                                type="text"
                                name={`${skill.id}_name`}
                                value={(characterData as any)[`${skill.id}_name`] || ''}
                                onChange={(e) => handleInputChange(`${skill.id}_name`, e.target.value)}
                                placeholder="技能名"
                                style={{
                                  width: '85%',
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '0.9rem'
                                }}
                                required
                              />
                              <button
                                type="button"
                                onClick={() => removeKnowledgeSkill(skill.id)}
                                className="remove-btn"
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                            </div>
                            <div className="total">
                              <input
                                type="number"
                                name={`${skill.id}_total`}
                                className="readonly _02"
                                value={
                                  (parseInt((characterData as any)[`${skill.id}_initial`] as string) || 1) +
                                  (parseInt((characterData as any)[`${skill.id}_job`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_interest`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_growth`] as string) || 0) +
                                  (parseInt((characterData as any)[`${skill.id}_other`] as string) || 0)
                                }
                                readOnly
                              />
                            </div>
                            <div className="breakdown">
                              <span className="initial">
                                <input
                                  type="number"
                                  name={`${skill.id}_initial`}
                                  className="_02"
                                  value={(characterData as any)[`${skill.id}_initial`] || 1}
                                  onChange={(e) => handleInputChange(`${skill.id}_initial`, e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_job`}
                                  value={(characterData as any)[`${skill.id}_job`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_job`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_interest`}
                                  value={(characterData as any)[`${skill.id}_interest`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_interest`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_growth`}
                                  value={(characterData as any)[`${skill.id}_growth`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_growth`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>|<span className="atai">
                                <input
                                  type="number"
                                  name={`${skill.id}_other`}
                                  value={(characterData as any)[`${skill.id}_other`] || ''}
                                  onChange={(e) => handleInputChange(`${skill.id}_other`, e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                />
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {/* 知識技能追加ボタン */}
                      <button
                        type="button"
                        onClick={addKnowledgeSkill}
                        className="add-btn"
                      >
                        <i className="fas fa-plus"></i> 知識技能を追加
                      </button>
                    </div>
                  </div>

                  {/* 装備セクション */}
                  <div id="equipment-section">

                    {/* 武器セクション */}
                    <div className="data-wrap buki">
                      <h3
                        onClick={() => toggleEquipmentSection('weapons')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className="fa-solid fa-gun"></i> 武器
                        <i
                          className={`fas fa-chevron-up`}
                          style={{
                            float: 'right',
                            transition: 'transform 0.3s',
                            transform: equipmentSections.weapons ? 'rotate(0deg)' : 'rotate(180deg)'
                          }}
                        />
                      </h3>
                      <div className={`equipment-content ${!equipmentSections.weapons ? 'collapsed' : ''}`}>
                        <ul>
                          {weapons.map((weapon) => (
                            <li key={weapon.id} className="d-flex data-li skill-body">
                              <div className="title">
                                <input
                                  type="text"
                                  name={`${weapon.id}_name`}
                                  value={(characterData as any)[`${weapon.id}_name`] || ''}
                                  onChange={(e) => handleInputChange(`${weapon.id}_name`, e.target.value)}
                                  placeholder="武器名"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="ginou kazu">
                                <input
                                  type="text"
                                  name={`${weapon.id}_success`}
                                  value={(characterData as any)[`${weapon.id}_success`] || ''}
                                  onChange={(e) => handleInputChange(`${weapon.id}_success`, e.target.value)}
                                  placeholder="成功率"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="damage">
                                <input
                                  type="text"
                                  name={`${weapon.id}_damage`}
                                  value={(characterData as any)[`${weapon.id}_damage`] || ''}
                                  onChange={(e) => handleInputChange(`${weapon.id}_damage`, e.target.value)}
                                  placeholder="ダメージ"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="syatei kazu">
                                <input
                                  type="text"
                                  name={`${weapon.id}_range`}
                                  value={(characterData as any)[`${weapon.id}_range`] || ''}
                                  onChange={(e) => handleInputChange(`${weapon.id}_range`, e.target.value)}
                                  placeholder="射程"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="kougekikaisu kazu">
                                <input
                                  type="text"
                                  name={`${weapon.id}_attacks`}
                                  value={(characterData as any)[`${weapon.id}_attacks`] || ''}
                                  onChange={(e) => handleInputChange(`${weapon.id}_attacks`, e.target.value)}
                                  placeholder="回数"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="soudansuu kazu">
                                <input
                                  type="text"
                                  name={`${weapon.id}_capacity`}
                                  value={(characterData as any)[`${weapon.id}_capacity`] || ''}
                                  onChange={(e) => handleInputChange(`${weapon.id}_capacity`, e.target.value)}
                                  placeholder="装弾"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="kosyou kazu">
                                <input
                                  type="text"
                                  name={`${weapon.id}_malfunction`}
                                  value={(characterData as any)[`${weapon.id}_malfunction`] || ''}
                                  onChange={(e) => handleInputChange(`${weapon.id}_malfunction`, e.target.value)}
                                  placeholder="故障"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="taikyu kazu">
                                <input
                                  type="text"
                                  name={`${weapon.id}_durability`}
                                  value={(characterData as any)[`${weapon.id}_durability`] || ''}
                                  onChange={(e) => handleInputChange(`${weapon.id}_durability`, e.target.value)}
                                  placeholder="耐久"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="memo">
                                <input
                                  type="text"
                                  name={`${weapon.id}_details`}
                                  value={(characterData as any)[`${weapon.id}_details`] || ''}
                                  onChange={(e) => handleInputChange(`${weapon.id}_details`, e.target.value)}
                                  placeholder="詳細"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => removeWeapon(weapon.id)}
                                  className="remove-btn"
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={addWeapon}
                          className="add-btn"
                        >
                          <i className="fas fa-plus"></i> 武器を追加
                        </button>
                      </div>
                    </div>

                    {/* 所持品セクション */}
                    <div className="data-wrap item">
                      <h3
                        onClick={() => toggleEquipmentSection('items')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className="fas fa-suitcase"></i> 所持品
                        <i
                          className={`fas fa-chevron-up`}
                          style={{
                            transition: 'transform 0.3s',
                            transform: equipmentSections.items ? 'rotate(0deg)' : 'rotate(180deg)'
                          }}
                        />
                      </h3>
                      <div className={`equipment-content ${!equipmentSections.items ? 'collapsed' : ''}`}>
                        <ul>
                          {items.map((item) => (
                            <li key={item.id} className="d-flex data-li skill-body">
                              <div className="title">
                                <input
                                  type="text"
                                  name={`${item.id}_name`}
                                  value={(characterData as any)[`${item.id}_name`] || ''}
                                  onChange={(e) => handleInputChange(`${item.id}_name`, e.target.value)}
                                  placeholder="品名"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="kosu">
                                <input
                                  type="text"
                                  name={`${item.id}_quantity`}
                                  value={(characterData as any)[`${item.id}_quantity`] || ''}
                                  onChange={(e) => handleInputChange(`${item.id}_quantity`, e.target.value)}
                                  placeholder="個数"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="content">
                                <input
                                  type="text"
                                  name={`${item.id}_details`}
                                  value={(characterData as any)[`${item.id}_details`] || ''}
                                  onChange={(e) => handleInputChange(`${item.id}_details`, e.target.value)}
                                  placeholder="詳細"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.id)}
                                  className="remove-btn"
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={addItem}
                          className="add-btn"
                        >
                          <i className="fas fa-plus"></i> 所持品を追加
                        </button>
                      </div>
                    </div>

                    {/* 不定・後遺症セクション */}
                    <div className="data-wrap hutei">
                      <h3
                        onClick={() => toggleEquipmentSection('disorders')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className="fas fa-bed"></i> 不定・後遺症
                        <i
                          className={`fas fa-chevron-up`}
                          style={{
                            float: 'right',
                            transition: 'transform 0.3s',
                            transform: equipmentSections.disorders ? 'rotate(0deg)' : 'rotate(180deg)'
                          }}
                        />
                      </h3>
                      <div className={`equipment-content ${!equipmentSections.disorders ? 'collapsed' : ''}`}>
                        <ul>
                          {disorders.map((disorder) => (
                            <li key={disorder.id} className="d-flex data-li skill-body">
                              <div className="title">
                                <input
                                  type="text"
                                  name={`${disorder.id}_name`}
                                  value={(characterData as any)[`${disorder.id}_name`] || ''}
                                  onChange={(e) => handleInputChange(`${disorder.id}_name`, e.target.value)}
                                  placeholder="症状名"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="term">
                                <input
                                  type="text"
                                  name={`${disorder.id}_period`}
                                  value={(characterData as any)[`${disorder.id}_period`] || ''}
                                  onChange={(e) => handleInputChange(`${disorder.id}_period`, e.target.value)}
                                  placeholder="YYYY/MM/DD～YYYY/MM/DD"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="content">
                                <input
                                  type="text"
                                  name={`${disorder.id}_details`}
                                  value={(characterData as any)[`${disorder.id}_details`] || ''}
                                  onChange={(e) => handleInputChange(`${disorder.id}_details`, e.target.value)}
                                  placeholder="詳細"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => removeDisorder(disorder.id)}
                                  className="remove-btn"
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={addDisorder}
                          className="add-btn"
                        >
                          <i className="fas fa-plus"></i> 不定・後遺症を追加
                        </button>
                      </div>
                    </div>

                    {/* 魔導書セクション */}
                    <div className="data-wrap book">
                      <h3
                        onClick={() => toggleEquipmentSection('books')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className="fas fa-book-dead"></i> 読んだ魔導書
                        <i
                          className={`fas fa-chevron-up`}
                          style={{
                            float: 'right',
                            transition: 'transform 0.3s',
                            transform: equipmentSections.books ? 'rotate(0deg)' : 'rotate(180deg)'
                          }}
                        />
                      </h3>
                      <div className={`equipment-content ${!equipmentSections.books ? 'collapsed' : ''}`}>
                        <ul>
                          {books.map((book) => (
                            <li key={book.id} className="d-flex data-li skill-body">
                              <div className="title">
                                <input
                                  type="text"
                                  name={`${book.id}_name`}
                                  value={(characterData as any)[`${book.id}_name`] || ''}
                                  onChange={(e) => handleInputChange(`${book.id}_name`, e.target.value)}
                                  placeholder="魔導書名"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="content">
                                <input
                                  type="text"
                                  name={`${book.id}_details`}
                                  value={(characterData as any)[`${book.id}_details`] || ''}
                                  onChange={(e) => handleInputChange(`${book.id}_details`, e.target.value)}
                                  placeholder="詳細・効果"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => removeBook(book.id)}
                                  className="remove-btn"
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={addBook}
                          className="add-btn"
                        >
                          <i className="fas fa-plus"></i> 魔導書を追加
                        </button>
                      </div>
                    </div>

                    {/* 呪文セクション */}
                    <div className="data-wrap jumon">
                      <h3
                        onClick={() => toggleEquipmentSection('spells')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className="fa-solid fa-hand-sparkles"></i> 覚えた呪文
                        <i
                          className={`fas fa-chevron-up`}
                          style={{
                            float: 'right',
                            transition: 'transform 0.3s',
                            transform: equipmentSections.spells ? 'rotate(0deg)' : 'rotate(180deg)'
                          }}
                        />
                      </h3>
                      <div className={`equipment-content ${!equipmentSections.spells ? 'collapsed' : ''}`}>
                        <ul>
                          {spells.map((spell) => (
                            <li key={spell.id} className="d-flex data-li skill-body">
                              <div className="title">
                                <input
                                  type="text"
                                  name={`${spell.id}_name`}
                                  value={(characterData as any)[`${spell.id}_name`] || ''}
                                  onChange={(e) => handleInputChange(`${spell.id}_name`, e.target.value)}
                                  placeholder="呪文名"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="content">
                                <input
                                  type="text"
                                  name={`${spell.id}_details`}
                                  value={(characterData as any)[`${spell.id}_details`] || ''}
                                  onChange={(e) => handleInputChange(`${spell.id}_details`, e.target.value)}
                                  placeholder="効果・詳細"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => removeSpell(spell.id)}
                                  className="remove-btn"
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={addSpell}
                          className="add-btn"
                        >
                          <i className="fas fa-plus"></i> 呪文を追加
                        </button>
                      </div>
                    </div>

                    {/* AFセクション */}
                    <div className="data-wrap af">
                      <h3
                        onClick={() => toggleEquipmentSection('artifacts')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className="fa-solid fa-star-of-david"></i> 所持AF
                        <i
                          className={`fas fa-chevron-up`}
                          style={{
                            float: 'right',
                            transition: 'transform 0.3s',
                            transform: equipmentSections.artifacts ? 'rotate(0deg)' : 'rotate(180deg)'
                          }}
                        />
                      </h3>
                      <div className={`equipment-content ${!equipmentSections.artifacts ? 'collapsed' : ''}`}>
                        <ul>
                          {artifacts.map((artifact) => (
                            <li key={artifact.id} className="d-flex data-li skill-body">
                              <div className="title">
                                <input
                                  type="text"
                                  name={`${artifact.id}_name`}
                                  value={(characterData as any)[`${artifact.id}_name`] || ''}
                                  onChange={(e) => handleInputChange(`${artifact.id}_name`, e.target.value)}
                                  placeholder="AF名"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="content">
                                <input
                                  type="text"
                                  name={`${artifact.id}_details`}
                                  value={(characterData as any)[`${artifact.id}_details`] || ''}
                                  onChange={(e) => handleInputChange(`${artifact.id}_details`, e.target.value)}
                                  placeholder="効果・詳細"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => removeArtifact(artifact.id)}
                                  className="remove-btn"
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={addArtifact}
                          className="add-btn"
                        >
                          <i className="fas fa-plus"></i> AFを追加
                        </button>
                      </div>
                    </div>

                    {/* 遭遇した超自然の存在セクション */}
                    <div className="data-wrap cthulhu">
                      <h3
                        onClick={() => toggleEquipmentSection('entities')}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                      >
                        <i className="fa-brands fa-octopus-deploy"></i> 遭遇した超自然の存在
                        <i
                          className={`fas fa-chevron-up`}
                          style={{
                            float: 'right',
                            transition: 'transform 0.3s',
                            transform: equipmentSections.entities ? 'rotate(0deg)' : 'rotate(180deg)'
                          }}
                        />
                      </h3>
                      <div className={`equipment-content ${!equipmentSections.entities ? 'collapsed' : ''}`}>
                        <ul>
                          {entities.map((entity) => (
                            <li key={entity.id} className="d-flex data-li skill-body">
                              <div className="title">
                                <input
                                  type="text"
                                  name={`${entity.id}_name`}
                                  value={(characterData as any)[`${entity.id}_name`] || ''}
                                  onChange={(e) => handleInputChange(`${entity.id}_name`, e.target.value)}
                                  placeholder="存在名"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div className="content">
                                <input
                                  type="text"
                                  name={`${entity.id}_details`}
                                  value={(characterData as any)[`${entity.id}_details`] || ''}
                                  onChange={(e) => handleInputChange(`${entity.id}_details`, e.target.value)}
                                  placeholder="詳細・状況"
                                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                                />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => removeEntity(entity.id)}
                                  className="remove-btn"
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={addEntity}
                          className="add-btn"
                        >
                          <i className="fas fa-plus"></i> 遭遇した存在を追加
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* メモセクション */}
                  <div className="memo-section" style={{ marginTop: '30px' }}>
                    {/* その他の作成時メモ */}
                    <div className="data-wrap o-memo">
                      <h3 className="memo-title">
                        <i className="fas fa-scroll"></i> その他の作成時メモ
                      </h3>
                      <div className="o-memos">
                        <textarea
                          name="other_memo"
                          rows={5}
                          value={characterData.other_memo || ''}
                          onChange={(e) => handleInputChange('other_memo', e.target.value)}
                          placeholder="キャラクター作成時のメモや設定など..."
                        />
                      </div>
                    </div>

                    {/* 秘匿関連 */}
                    <div className="data-wrap o-memo" style={{ marginTop: '20px' }}>
                      <h3 className="memo-title">
                        <i className="fas fa-scroll"></i> 秘匿関連
                      </h3>
                      <div className="o-memos">
                        <textarea
                          name="secret_memo"
                          rows={5}
                          value={characterData.secret_memo || ''}
                          onChange={(e) => handleInputChange('secret_memo', e.target.value)}
                          placeholder="GM専用情報、秘匿設定など..."
                        />
                      </div>
                    </div>
                  </div>

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

      <style jsx>{`
       

        .equipment-content {
          overflow: hidden;
          transition: max-height 0.1s ease-out, opacity 0.1s ease-out;
          max-height: 1000px;
          opacity: 1;
        }

        .equipment-content.collapsed {
          max-height: 0;
          opacity: 0;
          padding: 0;
          margin: 0;
        }

        .data-wrap h3 {
          border-bottom: 1px solid #ddd;
        }

        .fa-chevron-up {
          float: right;
          transition: transform 0.3s;
          background: #dddddd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
        }

        .segmented-toggle {
          display: inline-flex;
          border: 2px solid #607D8B;
          border-radius: 6px;
          overflow: hidden;
          background-color: white;
        }

        .segmented-toggle button {
          padding: 8px 16px;
          border: none;
          background-color: transparent;
          color: #607D8B;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.85rem;
          min-width: 100px;
        }

        .segmented-toggle button:hover {
          background-color: #f0f0f0;
        }

        .segmented-toggle button.active {
          background-color: #607D8B;
          color: white;
        }

        .segmented-toggle button:not(:last-child) {
          border-right: 1px solid #607D8B;
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};