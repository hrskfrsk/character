import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase-client';
import { calculateAllStats, CharacterData } from '../lib/character-calculations';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';
import Footer from '../components/Footer';

// 新しいコンポーネントをインポート
import ProfileSheet from '../components/character-form/ProfileSheet';
import PlaySheet from '../components/character-form/PlaySheet';
import PersonalDataSection, { RecordSection } from '../components/character-form/PersonalDataSection';

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

export default function CreateCharacterPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [characterData, setCharacterData] = useState<CharacterData>({});
  const [calculatedStats, setCalculatedStats] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<CharacterData>({});
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

  // 秘匿関連の状態管理
  const [secretMemos, setSecretMemos] = useState<Array<{ id: string, counter: number }>>([]);
  const [secretMemoCounter, setSecretMemoCounter] = useState(0);

  // メモの並べ替え順序を管理
  const [memoOrder, setMemoOrder] = useState<string[]>([]);

  // 元々データベースに存在していた動的フィールドを追跡
  const [originalDynamicFields, setOriginalDynamicFields] = useState<Set<string>>(new Set());

  // 技能表示切替の状態管理
  const [hideInitialSkills, setHideInitialSkills] = useState(false);

  // 技能セクション全体の折りたたみ状態
  const [isSkillSectionCollapsed, setIsSkillSectionCollapsed] = useState(false);

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

  // メモセクション用の独立した状態
  const [showMemoSection, setShowMemoSection] = useState(true);

  // localStorage から UI 状態を復元
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHideInitialSkills = localStorage.getItem('character-form-hideInitialSkills');
      const savedEquipmentSections = localStorage.getItem('character-form-equipmentSections');
      const savedShowMemoSection = localStorage.getItem('character-form-showMemoSection');
      const savedMemoOrder = localStorage.getItem('character-form-memoOrder');

      if (savedHideInitialSkills !== null) {
        setHideInitialSkills(JSON.parse(savedHideInitialSkills));
      }

      if (savedEquipmentSections !== null) {
        setEquipmentSections(JSON.parse(savedEquipmentSections));
      }

      if (savedShowMemoSection !== null) {
        setShowMemoSection(JSON.parse(savedShowMemoSection));
      }

      if (savedMemoOrder !== null) {
        setMemoOrder(JSON.parse(savedMemoOrder));
      }
    }
  }, []);

  // UI 状態を localStorage に保存
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('character-form-hideInitialSkills', JSON.stringify(hideInitialSkills));
    }
  }, [hideInitialSkills]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('character-form-equipmentSections', JSON.stringify(equipmentSections));
    }
  }, [equipmentSections]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('character-form-showMemoSection', JSON.stringify(showMemoSection));
    }
  }, [showMemoSection]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('character-form-memoOrder', JSON.stringify(memoOrder));
    }
    // キャラクターデータにも保存
    setCharacterData(prev => ({
      ...prev,
      memo_order: JSON.stringify(memoOrder)
    }));
  }, [memoOrder]);

  const router = useRouter();
  const { edit } = router.query;
  const isEditMode = !!edit;

  // 動的フィールドかどうかを判定するヘルパー関数
  const isDynamicField = (key: string): boolean => {
    const dynamicPatterns = [
      /^weapon_\d+_/,
      /^item_\d+_/,
      /^disorder_\d+_/,
      /^book_\d+_/,
      /^spell_\d+_/,
      /^artifact_\d+_/,
      /^entity_\d+_/,
      /^trait_\d+_/,
      /^memo_\d+_/,
      /^additional_combat_\d+_/,
      /^additional_exploration_\d+_/,
      /^additional_action_\d+_/,
      /^additional_negotiation_\d+_/,
      /^additional_knowledge_\d+_/
    ];
    return dynamicPatterns.some(pattern => pattern.test(key));
  };

  // 動的リストを復元する関数
  const restoreDynamicLists = (data: any) => {
    // 武器の復元
    const weaponList: Array<{ id: string, counter: number }> = [];
    let maxWeaponCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`weapon_${i}_name`]) {
        weaponList.push({ id: `weapon_${i}`, counter: i });
        maxWeaponCounter = Math.max(maxWeaponCounter, i);
      }
    }
    setWeapons(weaponList);
    setWeaponCounter(maxWeaponCounter);

    // アイテムの復元
    const itemList: Array<{ id: string, counter: number }> = [];
    let maxItemCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`item_${i}_name`]) {
        itemList.push({ id: `item_${i}`, counter: i });
        maxItemCounter = Math.max(maxItemCounter, i);
      }
    }
    setItems(itemList);
    setItemCounter(maxItemCounter);

    // 精神的障害の復元
    const disorderList: Array<{ id: string, counter: number }> = [];
    let maxDisorderCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`disorder_${i}_name`]) {
        disorderList.push({ id: `disorder_${i}`, counter: i });
        maxDisorderCounter = Math.max(maxDisorderCounter, i);
      }
    }
    setDisorders(disorderList);
    setDisorderCounter(maxDisorderCounter);

    // 魔道書の復元
    const bookList: Array<{ id: string, counter: number }> = [];
    let maxBookCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`book_${i}_name`]) {
        bookList.push({ id: `book_${i}`, counter: i });
        maxBookCounter = Math.max(maxBookCounter, i);
      }
    }
    setBooks(bookList);
    setBookCounter(maxBookCounter);

    // 呪文の復元
    const spellList: Array<{ id: string, counter: number }> = [];
    let maxSpellCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`spell_${i}_name`]) {
        spellList.push({ id: `spell_${i}`, counter: i });
        maxSpellCounter = Math.max(maxSpellCounter, i);
      }
    }
    setSpells(spellList);
    setSpellCounter(maxSpellCounter);

    // アーティファクトの復元
    const artifactList: Array<{ id: string, counter: number }> = [];
    let maxArtifactCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`artifact_${i}_name`]) {
        artifactList.push({ id: `artifact_${i}`, counter: i });
        maxArtifactCounter = Math.max(maxArtifactCounter, i);
      }
    }
    setArtifacts(artifactList);
    setArtifactCounter(maxArtifactCounter);

    // 超常的存在の復元
    const entityList: Array<{ id: string, counter: number }> = [];
    let maxEntityCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`entity_${i}_name`]) {
        entityList.push({ id: `entity_${i}`, counter: i });
        maxEntityCounter = Math.max(maxEntityCounter, i);
      }
    }
    setEntities(entityList);
    setEntityCounter(maxEntityCounter);

    // 特徴の復元
    const traitList: Array<{ id: string, counter: number }> = [];
    let maxTraitCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`trait_${i}_name`]) {
        traitList.push({ id: `trait_${i}`, counter: i });
        maxTraitCounter = Math.max(maxTraitCounter, i);
      }
    }
    setTraits(traitList);
    setTraitCounter(maxTraitCounter);

    // メモの復元（新形式）
    const memoList: Array<{ id: string, counter: number }> = [];
    let maxMemoCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`memo_${i}_title`] || data[`memo_${i}_content`] ||
        data[`secret_memo_${i}_title`] || data[`secret_memo_${i}_content`]) {
        // 新形式または旧形式のデータがある場合
        const memoId = data[`memo_${i}_title`] || data[`memo_${i}_content`] ? `memo_${i}` : `secret_memo_${i}`;
        memoList.push({ id: memoId, counter: i });
        maxMemoCounter = Math.max(maxMemoCounter, i);
      }
    }
    setSecretMemos(memoList);
    setSecretMemoCounter(maxMemoCounter);

    // データベースから保存された順序を優先、次にlocalStorage、最後に作成順
    let savedOrder: string[] | null = null;

    // まずデータベースの順序を確認
    if (data.memo_order) {
      try {
        savedOrder = JSON.parse(data.memo_order);
      } catch (e) {
        console.warn('Failed to parse memo_order from database:', e);
      }
    }

    // データベースにない場合はlocalStorageを確認
    if (!savedOrder) {
      const localStorageOrder = localStorage.getItem('character-form-memoOrder');
      if (localStorageOrder) {
        try {
          savedOrder = JSON.parse(localStorageOrder);
        } catch (e) {
          console.warn('Failed to parse memo_order from localStorage:', e);
        }
      }
    }

    if (savedOrder) {
      // 既存のメモIDと照合して、存在するもののみを保持
      const validOrder = savedOrder.filter((id: string) =>
        memoList.some(memo => memo.id === id)
      );
      // 新しく追加されたメモ（順序にないもの）を末尾に追加
      const newMemos = memoList
        .filter(memo => !validOrder.includes(memo.id))
        .map(memo => memo.id);
      setMemoOrder([...validOrder, ...newMemos]);
    } else {
      // 保存された順序がない場合は作成順を使用
      const initialMemoOrder = memoList.map(memo => memo.id);
      setMemoOrder(initialMemoOrder);
    }

    // 追加技能の復元
    // 戦闘技能
    const combatSkillList: Array<{ id: string, counter: number }> = [];
    let maxCombatCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`additional_combat_${i}_name`]) {
        combatSkillList.push({ id: `additional_combat_${i}`, counter: i });
        maxCombatCounter = Math.max(maxCombatCounter, i);
      }
    }
    setAdditionalCombatSkills(combatSkillList);
    setCombatSkillCounter(maxCombatCounter);

    // 探索技能
    const explorationSkillList: Array<{ id: string, counter: number }> = [];
    let maxExplorationCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`additional_exploration_${i}_name`]) {
        explorationSkillList.push({ id: `additional_exploration_${i}`, counter: i });
        maxExplorationCounter = Math.max(maxExplorationCounter, i);
      }
    }
    setAdditionalExplorationSkills(explorationSkillList);
    setExplorationSkillCounter(maxExplorationCounter);

    // 行動技能
    const actionSkillList: Array<{ id: string, counter: number }> = [];
    let maxActionCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`additional_action_${i}_name`]) {
        actionSkillList.push({ id: `additional_action_${i}`, counter: i });
        maxActionCounter = Math.max(maxActionCounter, i);
      }
    }
    setAdditionalActionSkills(actionSkillList);
    setActionSkillCounter(maxActionCounter);

    // 交渉技能
    const negotiationSkillList: Array<{ id: string, counter: number }> = [];
    let maxNegotiationCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`additional_negotiation_${i}_name`]) {
        negotiationSkillList.push({ id: `additional_negotiation_${i}`, counter: i });
        maxNegotiationCounter = Math.max(maxNegotiationCounter, i);
      }
    }
    setAdditionalNegotiationSkills(negotiationSkillList);
    setNegotiationSkillCounter(maxNegotiationCounter);

    // 知識技能
    const knowledgeSkillList: Array<{ id: string, counter: number }> = [];
    let maxKnowledgeCounter = 0;
    for (let i = 1; i <= 50; i++) {
      if (data[`additional_knowledge_${i}_name`]) {
        knowledgeSkillList.push({ id: `additional_knowledge_${i}`, counter: i });
        maxKnowledgeCounter = Math.max(maxKnowledgeCounter, i);
      }
    }
    setAdditionalKnowledgeSkills(knowledgeSkillList);
    setKnowledgeSkillCounter(maxKnowledgeCounter);
  };

  // キャラクターデータを読み込む関数
  const loadExistingCharacter = async (characterId: string) => {
    try {
      if (!db) return;

      const docRef = doc(db, 'characters', characterId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // ユーザー権限チェック
        if (data.userId && data.userId !== user?.uid) {
          alert('このキャラクターを編集する権限がありません');
          router.push('/list');
          return;
        }
        
        setCharacterData(data as CharacterData);
        setOriginalData(data as CharacterData); // 元データを保存

        // 元々データベースに存在していた動的フィールドを追跡
        const originalFields = new Set<string>();
        Object.keys(data).forEach(key => {
          if (isDynamicField(key)) {
            originalFields.add(key);
          }
        });
        setOriginalDynamicFields(originalFields);

        // 動的リストの復元ロジック
        restoreDynamicLists(data);
      } else {
        alert('キャラクターが見つかりません');
        router.push('/create');
      }
    } catch (error) {
      console.error('キャラクター読み込みエラー:', error);
      alert('キャラクターの読み込みに失敗しました');
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // 編集モードの場合、キャラクターデータを読み込む（認証完了後）
  useEffect(() => {
    if (mounted && edit && typeof edit === 'string' && user) {
      loadExistingCharacter(edit);
    }
  }, [mounted, edit, user]);

  // 計算を実行
  const updateCalculations = useCallback(() => {
    const stats = calculateAllStats(characterData);
    setCalculatedStats(stats);
  }, [characterData]);

  useEffect(() => {
    updateCalculations();
  }, [updateCalculations]);

  // データ変更を検知
  useEffect(() => {
    if (isEditMode && Object.keys(originalData).length > 0) {
      const hasDataChanged = JSON.stringify(characterData) !== JSON.stringify(originalData);
      setHasChanges(hasDataChanged);
    }
  }, [characterData, originalData, isEditMode]);

  // UIテーマカラーの動的適用
  useEffect(() => {
    // デフォルトのテーマカラー
    const defaultColor = '#74cdc3';
    const defaultHoverColor = '#5fb5aa';
    const defaultLightColor = 'rgba(116, 205, 195, 0.15)';
    const defaultMediumColor = 'rgba(116, 205, 195, 0.4)';
    const defaultDarkColor = 'rgba(116, 205, 195, 0.7)';

    if (characterData?.ui_theme_color && typeof window !== 'undefined') {
      const color = characterData.ui_theme_color;
      const hoverColor = adjustBrightness(color, -20);
      const lightColor = hexToRgba(color, 0.15);
      const mediumColor = hexToRgba(color, 0.4);
      const darkColor = hexToRgba(color, 0.7);

      document.documentElement.style.setProperty('--ui-theme-color', color);
      document.documentElement.style.setProperty('--ui-theme-color-hover', hoverColor);
      document.documentElement.style.setProperty('--ui-theme-color-light', lightColor);
      document.documentElement.style.setProperty('--ui-theme-color-medium', mediumColor);
      document.documentElement.style.setProperty('--ui-theme-color-dark', darkColor);
    } else if (typeof window !== 'undefined') {
      // キャラクターにテーマカラーが設定されていない場合はデフォルトに戻す
      document.documentElement.style.setProperty('--ui-theme-color', defaultColor);
      document.documentElement.style.setProperty('--ui-theme-color-hover', defaultHoverColor);
      document.documentElement.style.setProperty('--ui-theme-color-light', defaultLightColor);
      document.documentElement.style.setProperty('--ui-theme-color-medium', defaultMediumColor);
      document.documentElement.style.setProperty('--ui-theme-color-dark', defaultDarkColor);
    }

    // コンポーネントがアンマウントされる時にデフォルトカラーに戻す
    return () => {
      if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty('--ui-theme-color', defaultColor);
        document.documentElement.style.setProperty('--ui-theme-color-hover', defaultHoverColor);
        document.documentElement.style.setProperty('--ui-theme-color-light', defaultLightColor);
        document.documentElement.style.setProperty('--ui-theme-color-medium', defaultMediumColor);
        document.documentElement.style.setProperty('--ui-theme-color-dark', defaultDarkColor);
      }
    };
  }, [characterData?.ui_theme_color]);

  // フォーム値の更新
  // 職業ポイントの使用量を計算
  const calculateJobPointsUsed = (data: CharacterData): number => {
    let total = 0;

    // 固定技能の職業ポイント
    const fixedSkills = [
      'dodge', 'kick', 'grapple', 'punch', 'headbutt', 'throw',
      'first_aid', 'locksmith', 'conceal', 'hide', 'listen', 'sneak',
      'photography', 'psychoanalysis', 'climb', 'jump', 'swim',
      'throw_skill', 'fast_talk', 'credit_rating', 'disguise',
      'dodge_skill', 'intimidate', 'persuade', 'psychology',
      'accounting', 'anthropology', 'archeology', 'art', 'astronomy',
      'biology', 'chemistry', 'computer_use', 'craft', 'demolitions',
      'economics', 'electrical_repair', 'electronics', 'engineering',
      'forensics', 'geology', 'history', 'law', 'library_use',
      'linguistics', 'locksmith_skill', 'mathematics', 'mechanical_repair',
      'medicine', 'natural_world', 'navigate', 'occult', 'operate_heavy_machinery',
      'pharmacy', 'physics', 'pilot', 'psychotherapy', 'ride', 'spot_hidden',
      'survival', 'track'
    ];

    fixedSkills.forEach(skill => {
      const jobValue = (data as any)[`${skill}_job`];
      if (jobValue && !isNaN(Number(jobValue))) {
        total += Number(jobValue);
      }
    });

    // 追加技能の職業ポイント
    for (let i = 1; i <= 50; i++) {
      ['additional_combat', 'additional_exploration', 'additional_action', 'additional_negotiation', 'additional_knowledge'].forEach(category => {
        const jobValue = (data as any)[`${category}_${i}_job`];
        if (jobValue && !isNaN(Number(jobValue))) {
          total += Number(jobValue);
        }
      });
    }

    return total;
  };

  // 興味ポイントの使用量を計算
  const calculateInterestPointsUsed = (data: CharacterData): number => {
    let total = 0;

    // 固定技能の興味ポイント
    const fixedSkills = [
      'dodge', 'kick', 'grapple', 'punch', 'headbutt', 'throw',
      'first_aid', 'locksmith', 'conceal', 'hide', 'listen', 'sneak',
      'photography', 'psychoanalysis', 'climb', 'jump', 'swim',
      'throw_skill', 'fast_talk', 'credit_rating', 'disguise',
      'dodge_skill', 'intimidate', 'persuade', 'psychology',
      'accounting', 'anthropology', 'archeology', 'art', 'astronomy',
      'biology', 'chemistry', 'computer_use', 'craft', 'demolitions',
      'economics', 'electrical_repair', 'electronics', 'engineering',
      'forensics', 'geology', 'history', 'law', 'library_use',
      'linguistics', 'locksmith_skill', 'mathematics', 'mechanical_repair',
      'medicine', 'natural_world', 'navigate', 'occult', 'operate_heavy_machinery',
      'pharmacy', 'physics', 'pilot', 'psychotherapy', 'ride', 'spot_hidden',
      'survival', 'track'
    ];

    fixedSkills.forEach(skill => {
      const interestValue = (data as any)[`${skill}_interest`];
      if (interestValue && !isNaN(Number(interestValue))) {
        total += Number(interestValue);
      }
    });

    // 追加技能の興味ポイント
    for (let i = 1; i <= 50; i++) {
      ['additional_combat', 'additional_exploration', 'additional_action', 'additional_negotiation', 'additional_knowledge'].forEach(category => {
        const interestValue = (data as any)[`${category}_${i}_interest`];
        if (interestValue && !isNaN(Number(interestValue))) {
          total += Number(interestValue);
        }
      });
    }

    return total;
  };

  const handleInputChange = (field: string, value: any) => {
    setCharacterData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };

      // 職業ポイントや興味ポイントに関連する変更の場合、使用量を再計算
      if (field.includes('_job') || field.includes('_interest')) {
        newData.job_points_used = calculateJobPointsUsed(newData);
        newData.interest_points_used = calculateInterestPointsUsed(newData);
      }

      return newData;
    });
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
  const toggleEquipmentSection = (sectionId: string) => {
    setEquipmentSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId as keyof typeof prev]
    }));
  };

  // メモセクションのトグル関数
  const toggleMemoSection = () => {
    setShowMemoSection(prev => !prev);
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

  // メモを追加
  const addSecretMemo = () => {
    const newCounter = secretMemoCounter + 1;
    const memoId = `memo_${newCounter}`;

    setSecretMemoCounter(newCounter);
    setSecretMemos(prev => [...prev, { id: memoId, counter: newCounter }]);
    setMemoOrder(prev => [...prev, memoId]);

    setCharacterData(prev => ({
      ...prev,
      [`${memoId}_title`]: '',
      [`${memoId}_content`]: '',
      [`${memoId}_hidden`]: false,
      [`${memoId}_password_protected`]: false,
      [`${memoId}_password`]: ''
    }));

    // 新しい要素にスクロール
    setTimeout(() => {
      const newElement = document.querySelector(`[name="${memoId}_title"]`);
      if (newElement) {
        newElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        // フォーカスも設定
        (newElement as HTMLInputElement).focus();
      }
    }, 100);
  };

  // メモを削除
  const removeSecretMemo = (memoId: string) => {
    setSecretMemos(prev => prev.filter(memo => memo.id !== memoId));
    setMemoOrder(prev => prev.filter(id => id !== memoId));

    setCharacterData(prev => {
      const newData = { ...prev } as any;
      delete newData[`${memoId}_title`];
      delete newData[`${memoId}_content`];
      delete newData[`${memoId}_hidden`];
      delete newData[`${memoId}_password_protected`];
      delete newData[`${memoId}_password`];
      return newData;
    });
  };

  // メモの順序を並べ替える
  const reorderMemos = (newOrder: string[]) => {
    setMemoOrder(newOrder);
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

    if (!user) {
      alert('ログインが必要です');
      router.push('/auth/login');
      return;
    }

    setSaving(true);
    try {
      if (isEditMode && edit) {
        // 編集モード：既存キャラクターを更新
        // 追加セキュリティチェック：キャラクターの所有者を確認
        if (originalData.userId && originalData.userId !== user.uid) {
          alert('このキャラクターを編集する権限がありません');
          router.push('/list');
          return;
        }
        
        const finalData = {
          ...characterData,
          ...calculatedStats,
          updatedAt: new Date(),
        };

        // 削除された動的フィールドを検出して明示的にnullに設定
        const currentDynamicFields = new Set<string>();
        Object.keys(characterData).forEach(key => {
          if (isDynamicField(key)) {
            currentDynamicFields.add(key);
          }
        });

        // 元々存在していたが現在は存在しない動的フィールドを特定
        const removedFields: { [key: string]: null } = {};
        originalDynamicFields.forEach(originalField => {
          if (!currentDynamicFields.has(originalField)) {
            removedFields[originalField] = null;
          }
        });

        // 削除されたフィールドをfinalDataに追加
        const finalDataWithDeletions = {
          ...finalData,
          ...removedFields
        };

        const docRef = doc(db, 'characters', edit as string);
        await updateDoc(docRef, finalDataWithDeletions);
        alert('キャラクターが更新されました！');
        router.push(`/character/${edit}`);
      } else {
        // 作成モード：新しいキャラクターを作成
        const finalData = {
          ...characterData,
          ...calculatedStats,
          userId: user.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const docRef = await addDoc(collection(db, 'characters'), finalData);
        alert('キャラクターが保存されました！');
        router.push(`/character/${docRef.id}`);
      }
    } catch (error) {
      console.error('保存エラー:', error);
      alert('保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  // プレビューボタン
  const handlePreview = () => {
    if (!calculatedStats.character_name) {
      alert('キャラクター名を入力してください');
      return;
    }

    // 一時的にローカルストレージに保存して表示
    localStorage.setItem('tempCharacter', JSON.stringify({
      ...characterData,
      ...calculatedStats,
      ...(isEditMode && edit ? { id: edit } : {}) // 編集モードの場合はIDを含める
    }));

    window.open('/character/preview', '_blank');
  };

  const handleDelete = async () => {
    if (!isEditMode || !edit) return;

    const characterName = characterData.character_name || '無名のキャラクター';
    if (!confirm(`本当に「${characterName}」を削除しますか？\nこの操作は取り消せません。`)) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/characters/${edit}/delete`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('キャラクターを削除しました');
        router.push('/list');
      } else {
        const error = await response.json();
        alert(`削除に失敗しました: ${error.error || '不明なエラー'}`);
      }
    } catch (error) {
      console.error('削除エラー:', error);
      alert('削除中にエラーが発生しました');
    } finally {
      setDeleting(false);
    }
  };

  const pageTitle = "キャラクター作成 - クトゥルフ神話TRPG第6版";


  return (
    <ProtectedRoute>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="クトゥルフ神話TRPG第6版のキャラクターシート作成フォーム" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header
        showBackButton={true}
        customBackUrl="/list"
        actionButtons={
          <>
            <button
              type="button"
              className="nav-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={handlePreview}
            >
              <i className="fas fa-eye"></i>
              <span className="nav-text">プレビュー</span>
            </button>
            <button
              type="submit"
              form="chara-form"
              className="nav-link"
              style={{
                background: (!isEditMode || hasChanges) ? '#74cdc3' : '',
                border: 'none',
                cursor: 'pointer'
              }}
              disabled={saving}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLElement;
                if (!isEditMode || hasChanges) {
                  btn.style.background = '#5fb5aa';
                }
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLElement;
                if (!isEditMode || hasChanges) {
                  btn.style.background = '#74cdc3';
                }
              }}
            >
              <i className="fas fa-save"></i>
              <span className="nav-text">{saving ? '保存中...' : (isEditMode ? '更新' : '保存')}</span>
            </button>
          </>
        }
      />

      <div id="content" className="character-input page-with-header">
        <div className="wrap">
          <main id="main">
            <article className="character-input">
              <form id="chara-form" className="pc-data" onSubmit={handleSubmit}>
                <section className="chara-seet">

                  {/* プロフィールシート */}
                  <ProfileSheet
                    characterData={characterData}
                    handleInputChange={handleInputChange}
                  />

                  {/* プレイシート */}
                  <PlaySheet
                    characterData={characterData}
                    calculatedStats={calculatedStats}
                    handleInputChange={handleInputChange}
                    handleJobPointsFormulaChange={handleJobPointsFormulaChange}
                    traits={traits}
                    addTrait={addTrait}
                    removeTrait={removeTrait}
                    hideInitialSkills={hideInitialSkills}
                    toggleSkillDisplay={toggleSkillDisplay}
                    isSkillInitialOnly={isSkillInitialOnly}
                    isSkillSectionCollapsed={isSkillSectionCollapsed}
                    onSkillSectionToggle={() => setIsSkillSectionCollapsed(!isSkillSectionCollapsed)}
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
                    showMemoSection={showMemoSection}
                    toggleMemoSection={toggleMemoSection}
                    secretMemos={secretMemos}
                    addSecretMemo={addSecretMemo}
                    removeSecretMemo={removeSecretMemo}
                    memoOrder={memoOrder}
                    reorderMemos={reorderMemos}
                  />

                  {/* パーソナルデータセクション */}
                  <PersonalDataSection
                    characterData={characterData}
                    setCharacterData={(updater) => {
                      if (typeof updater === 'function') {
                        const newData = updater(characterData);
                        Object.keys(newData).forEach(key => {
                          if ((newData as any)[key] !== (characterData as any)[key]) {
                            handleInputChange(key, (newData as any)[key]);
                          }
                        });
                      }
                    }}
                  />

                  {/* 記録セクション */}
                  <RecordSection
                    characterData={characterData}
                    setCharacterData={(updater) => {
                      if (typeof updater === 'function') {
                        const newData = updater(characterData);
                        Object.keys(newData).forEach(key => {
                          if ((newData as any)[key] !== (characterData as any)[key]) {
                            handleInputChange(key, (newData as any)[key]);
                          }
                        });
                      }
                    }}
                  />

                  {/* 保存・削除ボタン */}
                  <div style={{
                    textAlign: 'center',
                    margin: '20px 0',
                    paddingTop: '10px',
                    borderTop: '1px solid #eee',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '15px'
                  }}>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="btn delete-btn"
                        style={{
                          padding: '10px 30px',
                          backgroundColor: 'transparent',
                          color: '#666',
                          border: '1px solid #666',
                          borderRadius: '50px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          transition: 'all 0.3s ease',
                          minWidth: '120px'
                        }}
                        disabled={deleting}
                        onMouseEnter={(e) => {
                          if (!deleting) {
                            (e.target as HTMLElement).style.backgroundColor = '#666';
                            (e.target as HTMLElement).style.color = 'white';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!deleting) {
                            (e.target as HTMLElement).style.backgroundColor = 'transparent';
                            (e.target as HTMLElement).style.color = '#666';
                          }
                        }}
                      >
                        <i className="fas fa-trash"></i> {deleting ? '削除中...' : '削除'}
                      </button>
                    )}

                    <button
                      type="submit"
                      className="btn save-btn"
                      style={{
                        padding: '10px 30px',
                        backgroundColor: '#74cdc3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}
                      disabled={saving}
                    >
                      <i className="fas fa-save"></i> {saving ? '保存中...' : (isEditMode ? '更新' : '保存')}
                    </button>
                  </div>

                </section>
              </form>
            </article>
          </main>
        </div>
      </div>

      <Footer />

    </ProtectedRoute>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};