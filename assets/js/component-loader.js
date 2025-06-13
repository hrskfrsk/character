/**
 * HTML Component Loader System
 * HTMLコンポーネントを動的に読み込むシステム
 */

class ComponentLoader {
  constructor() {
    this.components = new Map();
    this.loadPromises = new Map();
  }

  /**
   * コンポーネントを読み込んで指定された要素に挿入
   * @param {string} elementId - 挿入先の要素ID
   * @param {string} componentPath - コンポーネントファイルのパス
   * @param {Object} options - オプション設定
   */
  async loadComponent(elementId, componentPath, options = {}) {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error(`Element with ID '${elementId}' not found`);
        return false;
      }

      // 既に読み込み中の場合は待機
      if (this.loadPromises.has(componentPath)) {
        await this.loadPromises.get(componentPath);
      }

      // キャッシュから取得
      if (this.components.has(componentPath)) {
        element.innerHTML = this.components.get(componentPath);
        this.initializeComponentEvents(element);
        return true;
      }

      // 新規読み込み
      const loadPromise = this.fetchComponent(componentPath);
      this.loadPromises.set(componentPath, loadPromise);

      const html = await loadPromise;
      this.components.set(componentPath, html);
      element.innerHTML = html;

      // コンポーネント内のイベントリスナーを初期化
      this.initializeComponentEvents(element);

      this.loadPromises.delete(componentPath);
      return true;
    } catch (error) {
      console.error(`Failed to load component ${componentPath}:`, error);
      this.loadPromises.delete(componentPath);
      return false;
    }
  }

  /**
   * コンポーネントファイルを取得
   */
  async fetchComponent(componentPath) {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  }

  /**
   * コンポーネント内のイベントリスナーを初期化
   */
  initializeComponentEvents(element) {
    // oninput属性を持つ要素にイベントリスナーを設定
    const inputElements = element.querySelectorAll("[oninput]");
    inputElements.forEach((input) => {
      const onInputCode = input.getAttribute("oninput");
      input.removeAttribute("oninput"); // 重複を避けるため削除

      input.addEventListener("input", () => {
        try {
          eval(onInputCode);
        } catch (error) {
          console.error("Error executing oninput:", error);
        }
      });
    });

    // onclick属性を持つ要素にイベントリスナーを設定
    const clickElements = element.querySelectorAll("[onclick]");
    clickElements.forEach((button) => {
      const onClickCode = button.getAttribute("onclick");
      button.removeAttribute("onclick"); // 重複を避けるため削除

      button.addEventListener("click", () => {
        try {
          eval(onClickCode);
        } catch (error) {
          console.error("Error executing onclick:", error);
        }
      });
    });
  }

  /**
   * 複数のコンポーネントを並行読み込み
   */
  async loadMultipleComponents(componentMappings) {
    const promises = Object.entries(componentMappings).map(
      ([elementId, componentPath]) =>
        this.loadComponent(elementId, componentPath)
    );

    const results = await Promise.allSettled(promises);
    return results.every(
      (result) => result.status === "fulfilled" && result.value
    );
  }

  /**
   * キャッシュクリア
   */
  clearCache() {
    this.components.clear();
    this.loadPromises.clear();
  }
}

// グローバルインスタンスを作成
window.componentLoader = new ComponentLoader();

/**
 * キャラクターシート用のコンポーネント設定
 */
const COMPONENT_MAPPINGS = {
  "character-management-section": "components/character-management.html",
  "character-info-section": "components/character-info.html",
  "ability-scores-section": "components/ability-scores.html",
  "derived-stats-section": "components/derived-stats.html",
  "traits-jobbase-section": "components/traits-jobbase.html",
  "combat-skills-section": "components/skills/combat-skills.html",
  "exploration-skills-section": "components/skills/exploration-skills.html",
  "action-skills-section": "components/skills/action-skills.html",
  "negotiation-skills-section": "components/skills/negotiation-skills.html",
  "knowledge-skills-section": "components/skills/knowledge-skills.html",
  "equipment-section": "components/equipment.html",
  "notes-section": "components/notes.html",
};

/**
 * 全コンポーネントを読み込む関数
 */
async function loadAllComponents() {
  console.log("🔄 Loading character sheet components...");

  const success = await window.componentLoader.loadMultipleComponents(
    COMPONENT_MAPPINGS
  );

  if (success) {
    console.log("✅ All components loaded successfully");
    // コンポーネント読み込み完了後にキャラクターシートを初期化
    if (typeof initializeSkills === "function") {
      initializeSkills();
    }
    if (typeof calculateDerivedScores === "function") {
      calculateDerivedScores();
    }
    if (typeof updateJobPointsUsed === "function") {
      updateJobPointsUsed();
    }
    if (typeof updateInterestPointsUsed === "function") {
      updateInterestPointsUsed();
    }
    if (typeof initializeAutoResize === "function") {
      initializeAutoResize();
    }
  } else {
    console.error("❌ Some components failed to load");
  }
}

// DOMContentLoadedイベントでコンポーネントを読み込み
document.addEventListener("DOMContentLoaded", loadAllComponents);
