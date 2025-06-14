function safeParse(val) {
  const n = parseInt(val);
  return isNaN(n) ? 0 : n;
}

// 入力フィールドの幅を内容に応じて自動調整する関数
function autoResizeInput(input) {
  if (!input) return;

  // 一時的に幅を計測するための隠し要素を作成
  const measureElement = document.createElement("span");
  measureElement.style.visibility = "hidden";
  measureElement.style.position = "absolute";
  measureElement.style.fontSize = window.getComputedStyle(input).fontSize;
  measureElement.style.fontFamily = window.getComputedStyle(input).fontFamily;
  measureElement.style.fontWeight = window.getComputedStyle(input).fontWeight;
  measureElement.style.padding = "0";
  measureElement.style.margin = "0";
  measureElement.style.border = "none";
  measureElement.style.whiteSpace = "nowrap";

  // 入力値またはプレースホルダーを使用
  const text = input.value || input.placeholder || "0";
  measureElement.textContent = text;

  document.body.appendChild(measureElement);

  // 計測した幅に少し余裕を加える
  const width = measureElement.offsetWidth + 5;
  const minWidth = 10; // 最小幅
  const maxWidth = 120; // 最大幅

  // 幅を設定（最小幅と最大幅の範囲内で）
  input.style.width = Math.max(minWidth, Math.min(maxWidth, width)) + "px";

  // 計測用要素を削除
  document.body.removeChild(measureElement);
}

// auto-resizeクラスを持つ全ての要素に自動リサイズ機能を適用
function initializeAutoResize() {
  const autoResizeInputs = document.querySelectorAll(".auto-resize");
  autoResizeInputs.forEach((input) => {
    // 初期幅を設定
    autoResizeInput(input);

    // 入力時に幅を調整
    input.addEventListener("input", () => autoResizeInput(input));

    // フォーカス時にも調整（プレースホルダーが消える場合など）
    input.addEventListener("focus", () => autoResizeInput(input));
    input.addEventListener("blur", () => autoResizeInput(input));
  });
}

// 技能表示切替の状態を管理する変数
let skillsHidden = false;

// 技能表示状態を設定する関数
function setSkillDisplay(hideInitialOnly) {
  const showAllBtn = document.getElementById("show-all-btn");
  const hideInitialBtn = document.getElementById("hide-initial-btn");
  const skillSections = document.querySelectorAll(".skill-group");

  // 既にアクティブなボタンをクリックした場合はトグルする
  if (hideInitialOnly && hideInitialBtn.classList.contains("active")) {
    hideInitialOnly = false; // 全表示に切り替え
  } else if (!hideInitialOnly && showAllBtn.classList.contains("active")) {
    hideInitialOnly = true; // 隠すモードに切り替え
  }

  // ボタンの状態を更新
  if (hideInitialOnly) {
    showAllBtn.classList.remove("active");
    hideInitialBtn.classList.add("active");
  } else {
    showAllBtn.classList.add("active");
    hideInitialBtn.classList.remove("active");
  }

  if (hideInitialOnly) {
    // 初期値のみの技能を隠す
    skillSections.forEach((section) => {
      const skillItems = section.querySelectorAll(".skill-li.skill-body");
      skillItems.forEach((item) => {
        // 初期値フィールドをチェック
        const initialInput = item.querySelector('input[name$="_initial"]');
        if (initialInput) {
          const jobInput = item.querySelector('input[name$="_job"]');
          const interestInput = item.querySelector('input[name$="_interest"]');
          const growthInput = item.querySelector('input[name$="_growth"]');
          const otherInput = item.querySelector('input[name$="_other"]');

          const jobValue = parseInt(jobInput?.value) || 0;
          const interestValue = parseInt(interestInput?.value) || 0;
          const growthValue = parseInt(growthInput?.value) || 0;
          const otherValue = parseInt(otherInput?.value) || 0;

          // 初期値以外に値が入っている場合は隠さない
          if (
            jobValue === 0 &&
            interestValue === 0 &&
            growthValue === 0 &&
            otherValue === 0
          ) {
            item.style.display = "none";
            item.classList.add("skill-hidden");
          }
        }
      });
    });
    skillsHidden = true;
  } else {
    // 全技能を表示
    skillSections.forEach((section) => {
      const hiddenItems = section.querySelectorAll(".skill-hidden");
      hiddenItems.forEach((item) => {
        item.style.display = "";
        item.classList.remove("skill-hidden");
      });
    });
    skillsHidden = false;
  }
}

// 後方互換性のため残しておく（必要に応じて削除可能）
function toggleSkillsDisplay() {
  setSkillDisplay(!skillsHidden);
}

// 装備・アイテム管理のカウンター
let weaponCounter = 0;
let itemCounter = 0;
let disorderCounter = 0;
let bookCounter = 0;
let spellCounter = 0;
let artifactCounter = 0;
let entityCounter = 0;

// 武器を追加する関数
function addWeapon() {
  weaponCounter++;
  const weaponId = `weapon_${weaponCounter}`;

  const weaponHtml = `
    <li class="d-flex data-li skill-body" id="${weaponId}_container">
      <div class="title">
        <input type="text" name="${weaponId}_name" placeholder="武器名" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="ginou kazu">
        <input type="text" name="${weaponId}_success" placeholder="成功率" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="damage">
        <input type="text" name="${weaponId}_damage" placeholder="ダメージ" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="syatei kazu">
        <input type="text" name="${weaponId}_range" placeholder="射程" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="kougekikaisu kazu">
        <input type="text" name="${weaponId}_attacks" placeholder="回数" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="soudansuu kazu">
        <input type="text" name="${weaponId}_capacity" placeholder="装弾" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="kosyou kazu">
        <input type="text" name="${weaponId}_malfunction" placeholder="故障" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="taikyu kazu">
        <input type="text" name="${weaponId}_durability" placeholder="耐久" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="memo">
        <input type="text" name="${weaponId}_details" placeholder="詳細" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div style="display: flex; align-items: center; width: 40px; justify-content: center;">
        <button type="button" onclick="removeWeapon('${weaponId}')" style="background: #f44336; color: white; border: none; border-radius: 3px; padding: 3px 6px; cursor: pointer; font-size: 0.8rem;">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </li>
  `;

  document
    .getElementById("weapons-list")
    .insertAdjacentHTML("beforeend", weaponHtml);
}

// 武器を削除する関数
function removeWeapon(weaponId) {
  const weaponElement = document.getElementById(`${weaponId}_container`);
  if (weaponElement) {
    weaponElement.remove();
  }
}

// 所持品を追加する関数
function addItem() {
  itemCounter++;
  const itemId = `item_${itemCounter}`;

  const itemHtml = `
    <li class="d-flex data-li skill-body" id="${itemId}_container">
      <div class="title">
        <input type="text" name="${itemId}_name" placeholder="品名" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="kosu">
        <input type="text" name="${itemId}_quantity" placeholder="個数" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="content">
        <input type="text" name="${itemId}_details" placeholder="詳細" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div style="display: flex; align-items: center; width: 40px; justify-content: center;">
        <button type="button" onclick="removeItem('${itemId}')" style="background: #f44336; color: white; border: none; border-radius: 3px; padding: 3px 6px; cursor: pointer; font-size: 0.8rem;">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </li>
  `;

  document
    .getElementById("items-list")
    .insertAdjacentHTML("beforeend", itemHtml);
}

// 所持品を削除する関数
function removeItem(itemId) {
  const itemElement = document.getElementById(`${itemId}_container`);
  if (itemElement) {
    itemElement.remove();
  }
}

// 不定・後遺症を追加する関数
function addDisorder() {
  disorderCounter++;
  const disorderId = `disorder_${disorderCounter}`;

  const disorderHtml = `
    <li class="d-flex data-li skill-body" id="${disorderId}_container">
      <div class="title">
        <input type="text" name="${disorderId}_name" placeholder="症状名" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="term">
        <input type="text" name="${disorderId}_period" placeholder="YYYY/MM/DD～YYYY/MM/DD" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="content">
        <input type="text" name="${disorderId}_details" placeholder="詳細" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div style="display: flex; align-items: center; width: 40px; justify-content: center;">
        <button type="button" onclick="removeDisorder('${disorderId}')" style="background: #f44336; color: white; border: none; border-radius: 3px; padding: 3px 6px; cursor: pointer; font-size: 0.8rem;">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </li>
  `;

  document
    .getElementById("disorders-list")
    .insertAdjacentHTML("beforeend", disorderHtml);
}

// 不定・後遺症を削除する関数
function removeDisorder(disorderId) {
  const disorderElement = document.getElementById(`${disorderId}_container`);
  if (disorderElement) {
    disorderElement.remove();
  }
}

// 魔導書を追加する関数
function addBook() {
  bookCounter++;
  const bookId = `book_${bookCounter}`;

  const bookHtml = `
    <li class="d-flex data-li skill-body" id="${bookId}_container">
      <div class="title">
        <input type="text" name="${bookId}_name" placeholder="魔導書名" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="content">
        <input type="text" name="${bookId}_details" placeholder="詳細・効果" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div style="display: flex; align-items: center; width: 40px; justify-content: center;">
        <button type="button" onclick="removeBook('${bookId}')" style="background: #f44336; color: white; border: none; border-radius: 3px; padding: 3px 6px; cursor: pointer; font-size: 0.8rem;">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </li>
  `;

  document
    .getElementById("books-list")
    .insertAdjacentHTML("beforeend", bookHtml);
}

// 魔導書を削除する関数
function removeBook(bookId) {
  const bookElement = document.getElementById(`${bookId}_container`);
  if (bookElement) {
    bookElement.remove();
  }
}

// 呪文を追加する関数
function addSpell() {
  spellCounter++;
  const spellId = `spell_${spellCounter}`;

  const spellHtml = `
    <li class="d-flex data-li skill-body" id="${spellId}_container">
      <div class="title">
        <input type="text" name="${spellId}_name" placeholder="呪文名" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="content">
        <input type="text" name="${spellId}_details" placeholder="効果・詳細" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div style="display: flex; align-items: center; width: 40px; justify-content: center;">
        <button type="button" onclick="removeSpell('${spellId}')" style="background: #f44336; color: white; border: none; border-radius: 3px; padding: 3px 6px; cursor: pointer; font-size: 0.8rem;">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </li>
  `;

  document
    .getElementById("spells-list")
    .insertAdjacentHTML("beforeend", spellHtml);
}

// 呪文を削除する関数
function removeSpell(spellId) {
  const spellElement = document.getElementById(`${spellId}_container`);
  if (spellElement) {
    spellElement.remove();
  }
}

// AFを追加する関数
function addArtifact() {
  artifactCounter++;
  const artifactId = `artifact_${artifactCounter}`;

  const artifactHtml = `
    <li class="d-flex data-li skill-body" id="${artifactId}_container">
      <div class="title">
        <input type="text" name="${artifactId}_name" placeholder="AF名" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="content">
        <input type="text" name="${artifactId}_details" placeholder="効果・詳細" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div style="display: flex; align-items: center; width: 40px; justify-content: center;">
        <button type="button" onclick="removeArtifact('${artifactId}')" style="background: #f44336; color: white; border: none; border-radius: 3px; padding: 3px 6px; cursor: pointer; font-size: 0.8rem;">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </li>
  `;

  document
    .getElementById("artifacts-list")
    .insertAdjacentHTML("beforeend", artifactHtml);
}

// AFを削除する関数
function removeArtifact(artifactId) {
  const artifactElement = document.getElementById(`${artifactId}_container`);
  if (artifactElement) {
    artifactElement.remove();
  }
}

// 遭遇した超自然の存在を追加する関数
function addEntity() {
  entityCounter++;
  const entityId = `entity_${entityCounter}`;

  const entityHtml = `
    <li class="d-flex data-li skill-body" id="${entityId}_container">
      <div class="title">
        <input type="text" name="${entityId}_name" placeholder="存在名" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div class="content">
        <input type="text" name="${entityId}_details" placeholder="詳細・状況" style="width: 100%; border: none; background: transparent; text-align: center;">
      </div>
      <div style="display: flex; align-items: center; width: 40px; justify-content: center;">
        <button type="button" onclick="removeEntity('${entityId}')" style="background: #f44336; color: white; border: none; border-radius: 3px; padding: 3px 6px; cursor: pointer; font-size: 0.8rem;">
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </li>
  `;

  document
    .getElementById("entities-list")
    .insertAdjacentHTML("beforeend", entityHtml);
}

// 遭遇した超自然の存在を削除する関数
function removeEntity(entityId) {
  const entityElement = document.getElementById(`${entityId}_container`);
  if (entityElement) {
    entityElement.remove();
  }
}

// 装備セクションのアコーディオン機能
function toggleEquipmentSection(sectionId) {
  const content = document.getElementById(`${sectionId}-content`);
  const icon = document.getElementById(`${sectionId}-toggle-icon`);

  if (!content || !icon) return;

  const isCollapsed = content.classList.contains("collapsed");

  if (isCollapsed) {
    // 展開
    content.classList.remove("collapsed");
    icon.style.transform = "rotate(0deg)";
  } else {
    // 折りたたみ
    content.classList.add("collapsed");
    icon.style.transform = "rotate(180deg)";
  }

  // 状態をローカルストレージに保存
  const newState = !isCollapsed;
  saveEquipmentSectionState(sectionId, newState);
}

// 装備セクションの状態を保存する関数
function saveEquipmentSectionState(sectionId, isOpen) {
  const states = getEquipmentStates();
  states[sectionId] = isOpen;
  localStorage.setItem('equipmentSectionStates', JSON.stringify(states));
}

// 装備セクションの状態を取得する関数
function getEquipmentStates() {
  const saved = localStorage.getItem('equipmentSectionStates');
  return saved ? JSON.parse(saved) : {};
}

// 装備セクションの状態を復元する関数
function restoreEquipmentSectionStates() {
  const states = getEquipmentStates();
  const sections = ['weapons', 'items', 'disorders', 'books', 'spells', 'artifacts', 'entities'];
  
  sections.forEach(sectionId => {
    const content = document.getElementById(`${sectionId}-content`);
    const icon = document.getElementById(`${sectionId}-toggle-icon`);
    
    if (content && icon) {
      // デフォルトは開いた状態、保存された状態があればそれを使用
      const isOpen = states[sectionId] !== undefined ? states[sectionId] : true;
      
      if (isOpen) {
        content.classList.remove("collapsed");
        icon.style.transform = "rotate(0deg)";
      } else {
        content.classList.add("collapsed");
        icon.style.transform = "rotate(180deg)";
      }
    }
  });
}

function updateTotal(stat) {
  const base = safeParse(
    document.querySelector(`[name="${stat}_base"]`)?.value
  );
  const ageMod = safeParse(
    document.querySelector(`[name="${stat}_age_mod"]`)?.value
  );
  const otherMod = safeParse(
    document.querySelector(`[name="${stat}_other_mod"]`)?.value
  );
  const total = base + ageMod + otherMod;
  document.querySelector(`[name="${stat}_total"]`).value = total;

  calculateDerivedScores();
}

function updateDerivedTotal(stat) {
  const str = parseInt(document.querySelector('[name="str_total"]').value) || 0;
  const con = parseInt(document.querySelector('[name="con_total"]').value) || 0;
  const pow = parseInt(document.querySelector('[name="pow_total"]').value) || 0;
  const dex = parseInt(document.querySelector('[name="dex_total"]').value) || 0;
  const app = parseInt(document.querySelector('[name="app_total"]').value) || 0;
  const siz = parseInt(document.querySelector('[name="siz_total"]').value) || 0;
  const int = parseInt(document.querySelector('[name="int_total"]').value) || 0;
  const edu = parseInt(document.querySelector('[name="edu_total"]').value) || 0;

  const otherMod = safeParse(
    document.querySelector(`[name="${stat}_other_mod"]`)?.value
  );

  let baseValue = 0;
  switch (stat) {
    case "san":
      baseValue = pow * 5;
      break;
    case "hp":
      baseValue = Math.floor((con + siz) / 2);
      break;
    case "mp":
      baseValue = pow;
      break;
    case "idea":
      baseValue = int * 5;
      break;
    case "luck":
      baseValue = pow * 5;
      break;
    case "knowledge":
      baseValue = edu * 5;
      break;
  }

  // 基礎値をreadonly欄に表示
  document.querySelector(`[name="${stat}_base_value"]`).value = baseValue;

  // 合計値を計算（基礎値 + 他修正のみ）
  let total = baseValue + otherMod;
  
  // SANの場合はクトゥルフ神話技能の合計値を引く
  if (stat === "san") {
    const cthulhuMythosTotal = parseInt(document.querySelector('[name="cthulhu_mythos_total"]')?.value) || 0;
    total = total - cthulhuMythosTotal;
    document.querySelector('[name="max_san"]').value = total;
  }
  
  document.querySelector(`[name="${stat}_total"]`).value = total;
}

function calculateDerivedScores() {
  // 要素の存在確認
  const strElement = document.querySelector('[name="str_total"]');
  const conElement = document.querySelector('[name="con_total"]');
  const powElement = document.querySelector('[name="pow_total"]');
  const dexElement = document.querySelector('[name="dex_total"]');
  const appElement = document.querySelector('[name="app_total"]');
  const sizElement = document.querySelector('[name="siz_total"]');
  const intElement = document.querySelector('[name="int_total"]');
  const eduElement = document.querySelector('[name="edu_total"]');
  
  // 要素が見つからない場合は処理を中断
  if (!strElement || !conElement || !powElement || !dexElement || !appElement || !sizElement || !intElement || !eduElement) {
    return;
  }
  
  const str = parseInt(strElement.value) || 0;
  const con = parseInt(conElement.value) || 0;
  const pow = parseInt(powElement.value) || 0;
  const dex = parseInt(dexElement.value) || 0;
  const app = parseInt(appElement.value) || 0;
  const siz = parseInt(sizElement.value) || 0;
  const int = parseInt(intElement.value) || 0;
  const edu = parseInt(eduElement.value) || 0;

  // 派生能力値も更新
  updateDerivedTotal("san");
  updateDerivedTotal("hp");
  updateDerivedTotal("mp");
  updateDerivedTotal("idea");
  updateDerivedTotal("luck");
  updateDerivedTotal("knowledge");

  // 回避の初期値をDEX*2に更新
  updateDodgeInitialValue(dex);

  // 母国語の初期値を知識値に更新
  updateMotherTongueInitialValue();

  // スロット系の値も更新
  updateSlotValues();
}

function updateDodgeInitialValue(dex) {
  const dodgeInitialField = document.querySelector('[name="dodge_initial"]');
  if (dodgeInitialField) {
    const dodgeInitialValue = dex * 2;
    dodgeInitialField.value = dodgeInitialValue;

    // 回避技能の合計値も更新
    updateSkillTotal("dodge");
  }
}

function updateMotherTongueInitialValue() {
  const knowledgeField = document.querySelector('[name="knowledge_total"]');
  const motherTongueInitialField = document.querySelector(
    '[name="mother_tongue_initial"]'
  );

  if (knowledgeField && motherTongueInitialField) {
    const knowledgeValue = parseInt(knowledgeField.value) || 0;
    motherTongueInitialField.value = knowledgeValue;

    // 母国語技能の合計値も更新
    updateSkillTotal("mother_tongue");
  }
}

function updateSlotValues() {
  const str = parseInt(document.querySelector('[name="str_total"]').value) || 0;
  const siz = parseInt(document.querySelector('[name="siz_total"]').value) || 0;
  const edu = parseInt(document.querySelector('[name="edu_total"]').value) || 0;
  const int = parseInt(document.querySelector('[name="int_total"]').value) || 0;
  const san_total =
    parseInt(document.querySelector('[name="san_total"]').value) || 0;

  // 現在SAN値は初回のみ設定、最大SAN値は常に更新
  const currentSanField = document.querySelector('[name="current_san"]');
  if (!currentSanField.value) {
    currentSanField.value = san_total;
  }
  document.querySelector('[name="max_san"]').value = san_total;

  // ダメージボーナス計算
  const dbSum = str + siz;
  let damageBonus = "";
  if (dbSum < 13) {
    damageBonus = "-1D6";
  } else if (dbSum < 17) {
    damageBonus = "-1D4";
  } else if (dbSum < 25) {
    damageBonus = "0";
  } else if (dbSum < 33) {
    damageBonus = "+1D4";
  } else {
    damageBonus = "+1D6";
  }
  document.querySelector('[name="damage_bonus"]').value = damageBonus;

  // 職業ポイント計算
  updateJobPointsFormula();

  // 興味ポイント計算
  updateInterestPoints();
}

function updateJobPoints() {
  // 職業ポイントの使用量チェック（必要に応じて）
}

function updateJobPointsFormula() {
  const formula = document.querySelector('[name="job_points_formula"]').value;
  const str = parseInt(document.querySelector('[name="str_total"]').value) || 0;
  const con = parseInt(document.querySelector('[name="con_total"]').value) || 0;
  const pow = parseInt(document.querySelector('[name="pow_total"]').value) || 0;
  const dex = parseInt(document.querySelector('[name="dex_total"]').value) || 0;
  const app = parseInt(document.querySelector('[name="app_total"]').value) || 0;
  const siz = parseInt(document.querySelector('[name="siz_total"]').value) || 0;
  const int = parseInt(document.querySelector('[name="int_total"]').value) || 0;
  const edu = parseInt(document.querySelector('[name="edu_total"]').value) || 0;

  let jobPointsTotal = 0;
  const jobPointsTotalField = document.querySelector(
    '[name="job_points_total"]'
  );

  switch (formula) {
    case "edu20":
      jobPointsTotal = edu * 20;
      jobPointsTotalField.readOnly = true;
      jobPointsTotalField.classList.add("readonly");
      break;
    case "edu10_str10":
      jobPointsTotal = edu * 10 + str * 10;
      jobPointsTotalField.readOnly = true;
      jobPointsTotalField.classList.add("readonly");
      break;
    case "edu10_con10":
      jobPointsTotal = edu * 10 + con * 10;
      jobPointsTotalField.readOnly = true;
      jobPointsTotalField.classList.add("readonly");
      break;
    case "edu10_pow10":
      jobPointsTotal = edu * 10 + pow * 10;
      jobPointsTotalField.readOnly = true;
      jobPointsTotalField.classList.add("readonly");
      break;
    case "edu10_dex10":
      jobPointsTotal = edu * 10 + dex * 10;
      jobPointsTotalField.readOnly = true;
      jobPointsTotalField.classList.add("readonly");
      break;
    case "edu10_app10":
      jobPointsTotal = edu * 10 + app * 10;
      jobPointsTotalField.readOnly = true;
      jobPointsTotalField.classList.add("readonly");
      break;
    case "edu10_siz10":
      jobPointsTotal = edu * 10 + siz * 10;
      jobPointsTotalField.readOnly = true;
      jobPointsTotalField.classList.add("readonly");
      break;
    case "edu10_int10":
      jobPointsTotal = edu * 10 + int * 10;
      jobPointsTotalField.readOnly = true;
      jobPointsTotalField.classList.add("readonly");
      break;
    case "manual":
      jobPointsTotalField.readOnly = false;
      jobPointsTotalField.classList.remove("readonly");
      return; // 手動入力の場合は計算しない
  }

  jobPointsTotalField.value = jobPointsTotal;
  // 幅を自動調整
  autoResizeInput(jobPointsTotalField);

  // 職業ポイント超過チェック
  checkJobPointsOverage();
}

function updateInterestPoints() {
  const int = parseInt(document.querySelector('[name="int_total"]').value) || 0;
  const extra =
    parseInt(document.querySelector('[name="interest_points_extra"]').value) ||
    0;
  const interestPointsTotal = int * 10 + extra;
  const interestPointsTotalField = document.querySelector(
    '[name="interest_points_total"]'
  );
  interestPointsTotalField.value = interestPointsTotal;

  // 幅を自動調整
  autoResizeInput(interestPointsTotalField);

  // 興味ポイント超過チェック
  checkInterestPointsOverage();
}

// 追加戦闘技能のカウンター
let additionalCombatSkillCounter = 0;

// 戦闘技能を追加する関数
function addCombatSkill() {
  additionalCombatSkillCounter++;
  const skillId = `additional_combat_${additionalCombatSkillCounter}`;

  const skillHtml = `
        <li class="d-flex skill-li skill-body add-slill-li" id="${skillId}_container">
        <input type="checkbox" name="check-growth" class="check-growth">
            <div class="title">
                <input type="text" name="${skillId}_name" placeholder="技能名" style="width: 85%; border: none; background: transparent; text-align: center; font-size: 0.9rem;" required>
                <button type="button" onclick="removeCombatSkill('${skillId}')" class="remove-btn">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
            <div class="total">
                <input type="number" name="${skillId}_total" class="readonly _02" readonly>
            </div>
            <div class="breakdown">
                <span class="initial">
                    <input type="number" name="${skillId}_initial" class="_02" value="1" oninput="updateSkillTotal('${skillId}')">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_job" oninput="updateSkillTotal('${skillId}'); updateJobPointsUsed();">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_interest" oninput="updateSkillTotal('${skillId}'); updateInterestPointsUsed();">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_growth" oninput="updateSkillTotal('${skillId}')">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_other" oninput="updateSkillTotal('${skillId}')">
                </span>
            </div>
        </li>
    `;

  document
    .getElementById("additional-combat-skills")
    .insertAdjacentHTML("beforeend", skillHtml);

  // 新しく追加されたスキルの初期値を計算
  updateSkillTotal(skillId);
}

// 戦闘技能を削除する関数
function removeCombatSkill(skillId) {
  const skillElement = document.getElementById(`${skillId}_container`);
  if (skillElement) {
    skillElement.remove();
    
    // FirebaseからもフィールドをdeleteField()で削除
    setTimeout(async () => {
      try {
        const currentCharacterId = typeof getCurrentCharacterId === 'function' ? getCurrentCharacterId() : null;
        if (currentCharacterId && window.characterManager) {
          await window.characterManager.deleteSkillFields(currentCharacterId, skillId);
        }
      } catch (error) {
        console.error('Error deleting skill fields from Firebase:', error);
      }
    }, 100);
  }
}

// 追加探索技能のカウンター
let additionalExplorationSkillCounter = 0;

// 探索技能を追加する関数
function addExplorationSkill() {
  additionalExplorationSkillCounter++;
  const skillId = `additional_exploration_${additionalExplorationSkillCounter}`;

  const skillHtml = `
        <li class="d-flex skill-li skill-body add-slill-li" id="${skillId}_container">
        <input type="checkbox" name="check-growth" class="check-growth">
            <div class="title">
                <input type="text" name="${skillId}_name" placeholder="技能名" style="width: 85%; border: none; background: transparent; text-align: center; font-size: 0.9rem;" required>
                <button type="button" onclick="removeExplorationSkill('${skillId}')" class="remove-btn">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
            <div class="total">
                <input type="number" name="${skillId}_total" class="readonly _02" readonly>
            </div>
            <div class="breakdown">
                <span class="initial">
                    <input type="number" name="${skillId}_initial" class="_02" value="1" oninput="updateSkillTotal('${skillId}')">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_job" oninput="updateSkillTotal('${skillId}'); updateJobPointsUsed();">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_interest" oninput="updateSkillTotal('${skillId}'); updateInterestPointsUsed();">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_growth" oninput="updateSkillTotal('${skillId}')">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_other" oninput="updateSkillTotal('${skillId}')">
                </span>
            </div>
        </li>
    `;

  document
    .getElementById("additional-exploration-skills")
    .insertAdjacentHTML("beforeend", skillHtml);
  updateSkillTotal(skillId);
}

// 探索技能を削除する関数
function removeExplorationSkill(skillId) {
  const skillElement = document.getElementById(`${skillId}_container`);
  if (skillElement) {
    skillElement.remove();
    
    // FirebaseからもフィールドをdeleteField()で削除
    setTimeout(async () => {
      try {
        const currentCharacterId = typeof getCurrentCharacterId === 'function' ? getCurrentCharacterId() : null;
        if (currentCharacterId && window.characterManager) {
          await window.characterManager.deleteSkillFields(currentCharacterId, skillId);
        }
      } catch (error) {
        console.error('Error deleting skill fields from Firebase:', error);
      }
    }, 100);
  }
}

// 追加行動技能のカウンター
let additionalActionSkillCounter = 0;

// 行動技能を追加する関数
function addActionSkill() {
  additionalActionSkillCounter++;
  const skillId = `additional_action_${additionalActionSkillCounter}`;

  const skillHtml = `
        <li class="d-flex skill-li skill-body add-slill-li" id="${skillId}_container">
        <input type="checkbox" name="check-growth" class="check-growth">
            <div class="title">
                <input type="text" name="${skillId}_name" placeholder="技能名" style="width: 85%; border: none; background: transparent; text-align: center; font-size: 0.9rem;" required>
                <button type="button" onclick="removeActionSkill('${skillId}')" class="remove-btn">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
            <div class="total">
                <input type="number" name="${skillId}_total" class="readonly _02" readonly>
            </div>
            <div class="breakdown">
                <span class="initial">
                    <input type="number" name="${skillId}_initial" class="_02" value="1" oninput="updateSkillTotal('${skillId}')">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_job" oninput="updateSkillTotal('${skillId}'); updateJobPointsUsed();">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_interest" oninput="updateSkillTotal('${skillId}'); updateInterestPointsUsed();">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_growth" oninput="updateSkillTotal('${skillId}')">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_other" oninput="updateSkillTotal('${skillId}')">
                </span>
            </div>
        </li>
    `;

  document
    .getElementById("additional-action-skills")
    .insertAdjacentHTML("beforeend", skillHtml);
  updateSkillTotal(skillId);
}

// 行動技能を削除する関数
function removeActionSkill(skillId) {
  const skillElement = document.getElementById(`${skillId}_container`);
  if (skillElement) {
    skillElement.remove();
    
    // FirebaseからもフィールドをdeleteField()で削除
    setTimeout(async () => {
      try {
        const currentCharacterId = typeof getCurrentCharacterId === 'function' ? getCurrentCharacterId() : null;
        if (currentCharacterId && window.characterManager) {
          await window.characterManager.deleteSkillFields(currentCharacterId, skillId);
        }
      } catch (error) {
        console.error('Error deleting skill fields from Firebase:', error);
      }
    }, 100);
  }
}

// 追加交渉技能のカウンター
let additionalNegotiationSkillCounter = 0;

// 交渉技能を追加する関数
function addNegotiationSkill() {
  additionalNegotiationSkillCounter++;
  const skillId = `additional_negotiation_${additionalNegotiationSkillCounter}`;

  const skillHtml = `
        <li class="d-flex skill-li skill-body add-slill-li" id="${skillId}_container">
        <input type="checkbox" name="check-growth" class="check-growth">
            <div class="title">
                <input type="text" name="${skillId}_name" placeholder="技能名" style="width: 85%; border: none; background: transparent; text-align: center; font-size: 0.9rem;" required>
                <button type="button" onclick="removeNegotiationSkill('${skillId}')" class="remove-btn">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
            <div class="total">
                <input type="number" name="${skillId}_total" class="readonly _02" readonly>
            </div>
            <div class="breakdown">
                <span class="initial">
                    <input type="number" name="${skillId}_initial" class="_02" value="1" oninput="updateSkillTotal('${skillId}')">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_job" oninput="updateSkillTotal('${skillId}'); updateJobPointsUsed();">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_interest" oninput="updateSkillTotal('${skillId}'); updateInterestPointsUsed();">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_growth" oninput="updateSkillTotal('${skillId}')">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_other" oninput="updateSkillTotal('${skillId}')">
                </span>
            </div>
        </li>
    `;

  document
    .getElementById("additional-negotiation-skills")
    .insertAdjacentHTML("beforeend", skillHtml);
  updateSkillTotal(skillId);
}

// 交渉技能を削除する関数
function removeNegotiationSkill(skillId) {
  const skillElement = document.getElementById(`${skillId}_container`);
  if (skillElement) {
    skillElement.remove();
    
    // FirebaseからもフィールドをdeleteField()で削除
    setTimeout(async () => {
      try {
        const currentCharacterId = typeof getCurrentCharacterId === 'function' ? getCurrentCharacterId() : null;
        if (currentCharacterId && window.characterManager) {
          await window.characterManager.deleteSkillFields(currentCharacterId, skillId);
        }
      } catch (error) {
        console.error('Error deleting skill fields from Firebase:', error);
      }
    }, 100);
  }
}

// 追加知識技能のカウンター
let additionalKnowledgeSkillCounter = 0;

// 知識技能を追加する関数
function addKnowledgeSkill() {
  additionalKnowledgeSkillCounter++;
  const skillId = `additional_knowledge_${additionalKnowledgeSkillCounter}`;

  const skillHtml = `
        <li class="d-flex skill-li skill-body add-slill-li" id="${skillId}_container">
        <input type="checkbox" name="check-growth" class="check-growth">
            <div class="title">
                <input type="text" name="${skillId}_name" placeholder="技能名" style="width: 85%; border: none; background: transparent; text-align: center; font-size: 0.9rem;" required>
                <button type="button" onclick="removeKnowledgeSkill('${skillId}')" class="remove-btn">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
            <div class="total">
                <input type="number" name="${skillId}_total" class="readonly _02" readonly>
            </div>
            <div class="breakdown">
                <span class="initial">
                    <input type="number" name="${skillId}_initial" class="_02" value="1" oninput="updateSkillTotal('${skillId}')">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_job" oninput="updateSkillTotal('${skillId}'); updateJobPointsUsed();">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_interest" oninput="updateSkillTotal('${skillId}'); updateInterestPointsUsed();">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_growth" oninput="updateSkillTotal('${skillId}')">
                </span>|<span class="atai">
                    <input type="number" name="${skillId}_other" oninput="updateSkillTotal('${skillId}')">
                </span>
            </div>
        </li>
    `;

  document
    .getElementById("additional-knowledge-skills")
    .insertAdjacentHTML("beforeend", skillHtml);
  updateSkillTotal(skillId);
}

// 知識技能を削除する関数
function removeKnowledgeSkill(skillId) {
  const skillElement = document.getElementById(`${skillId}_container`);
  if (skillElement) {
    skillElement.remove();
    
    // FirebaseからもフィールドをdeleteField()で削除
    setTimeout(async () => {
      try {
        const currentCharacterId = typeof getCurrentCharacterId === 'function' ? getCurrentCharacterId() : null;
        if (currentCharacterId && window.characterManager) {
          await window.characterManager.deleteSkillFields(currentCharacterId, skillId);
        }
      } catch (error) {
        console.error('Error deleting skill fields from Firebase:', error);
      }
    }, 100);
  }
}


function updateSkillTotal(skillName) {
  const initialEl = document.querySelector(`[name="${skillName}_initial"]`);
  const jobEl = document.querySelector(`[name="${skillName}_job"]`);
  const interestEl = document.querySelector(`[name="${skillName}_interest"]`);
  const growthEl = document.querySelector(`[name="${skillName}_growth"]`);
  const otherEl = document.querySelector(`[name="${skillName}_other"]`);
  const totalEl = document.querySelector(`[name="${skillName}_total"]`);
  
  // 要素が存在しない場合は処理をスキップ
  if (!initialEl || !jobEl || !interestEl || !growthEl || !otherEl || !totalEl) {
    return;
  }
  
  const initial = parseInt(initialEl.value) || 0;
  const job = parseInt(jobEl.value) || 0;
  const interest = parseInt(interestEl.value) || 0;
  const growth = parseInt(growthEl.value) || 0;
  const other = parseInt(otherEl.value) || 0;

  const total = initial + job + interest + growth + other;
  totalEl.value = total;

  // クトゥルフ神話技能が更新された場合、SAN値も再計算
  if (skillName === "cthulhu_mythos") {
    updateDerivedTotal("san");
  }

  // 職業ポイントと興味ポイントの合計を更新
  updateJobPointsUsed();
  updateInterestPointsUsed();
}

// 全技能の職業ポイント合計を計算する関数
function updateJobPointsUsed() {
  let totalJobPoints = 0;

  // 全ての _job フィールドを検索して合計
  const jobFields = document.querySelectorAll('input[name$="_job"]');
  jobFields.forEach((field) => {
    const value = parseInt(field.value) || 0;
    totalJobPoints += value;
  });

  // job_points_used フィールドに合計を表示
  const jobPointsUsedField = document.querySelector('[name="job_points_used"]');
  if (jobPointsUsedField) {
    jobPointsUsedField.value = totalJobPoints;
    // 幅を自動調整
    autoResizeInput(jobPointsUsedField);
  }

  // 超過チェックと背景色変更
  checkJobPointsOverage();
}

// 統合されたポイント超過チェックと背景色変更
function checkPointsOverage() {
  const jobPointsUsedEl = document.querySelector('[name="job_points_used"]');
  const jobPointsTotalEl = document.querySelector('[name="job_points_total"]');
  const interestPointsUsedEl = document.querySelector('[name="interest_points_used"]');
  const interestPointsTotalEl = document.querySelector('[name="interest_points_total"]');
  
  // 要素が存在しない場合は処理をスキップ
  if (!jobPointsUsedEl || !jobPointsTotalEl || !interestPointsUsedEl || !interestPointsTotalEl) {
    return;
  }
  
  const jobPointsUsed = parseInt(jobPointsUsedEl.value) || 0;
  const jobPointsTotal = parseInt(jobPointsTotalEl.value) || 0;
  const interestPointsUsed = parseInt(interestPointsUsedEl.value) || 0;
  const interestPointsTotal = parseInt(interestPointsTotalEl.value) || 0;

  const skillSection = document.querySelector(".skill");
  const jobpSlot = document.querySelector(".jobp.slot");
  const intpSlot = document.querySelector(".intp.slot");

  const jobExceeded = jobPointsUsed > jobPointsTotal;
  const interestExceeded = interestPointsUsed > interestPointsTotal;

  // スキルセクションの背景色設定
  if (skillSection) {
    if (jobExceeded && interestExceeded) {
      // 両方超過: 紫色
      skillSection.style.backgroundColor = "#f3e5f5";
      skillSection.style.border = "2px solid #9c27b0";
    } else if (jobExceeded) {
      // 職業ポイント超過: 赤色
      skillSection.style.backgroundColor = "#ffebee";
      skillSection.style.border = "2px solid #f44336";
    } else if (interestExceeded) {
      // 興味ポイント超過: オレンジ色
      skillSection.style.backgroundColor = "#fff3e0";
      skillSection.style.border = "2px solid #ff9800";
    } else {
      // 正常時: リセット
      skillSection.style.backgroundColor = "";
      skillSection.style.border = "";
    }
  }

  // 職業ポイントスロットの背景色設定
  if (jobpSlot) {
    if (jobExceeded) {
      jobpSlot.style.backgroundColor = "#ffcdd2";
      jobpSlot.style.border = "2px solid #f44336";
    } else {
      jobpSlot.style.backgroundColor = "";
      jobpSlot.style.border = "";
    }
  }

  // 興味ポイントスロットの背景色設定
  if (intpSlot) {
    if (interestExceeded) {
      intpSlot.style.backgroundColor = "#ffe0b2";
      intpSlot.style.border = "2px solid #ff9800";
    } else {
      intpSlot.style.backgroundColor = "";
      intpSlot.style.border = "";
    }
  }
}

// 職業ポイント超過チェック（統合関数を呼び出し）
function checkJobPointsOverage() {
  checkPointsOverage();
}

// 興味ポイント超過チェック（統合関数を呼び出し）
function checkInterestPointsOverage() {
  checkPointsOverage();
}

// 全技能の興味ポイント合計を計算する関数
function updateInterestPointsUsed() {
  let totalInterestPoints = 0;

  // 全ての _interest フィールドを検索して合計
  const interestFields = document.querySelectorAll('input[name$="_interest"]');
  interestFields.forEach((field) => {
    const value = parseInt(field.value) || 0;
    totalInterestPoints += value;
  });

  // interest_points_used フィールドに合計を表示
  const interestPointsUsedField = document.querySelector(
    '[name="interest_points_used"]'
  );
  if (interestPointsUsedField) {
    interestPointsUsedField.value = totalInterestPoints;
    // 幅を自動調整
    autoResizeInput(interestPointsUsedField);
  }

  // 超過チェックと背景色変更
  checkInterestPointsOverage();
}

function initializeSkills() {
  // 戦闘技能
  updateSkillTotal("dodge");
  updateSkillTotal("kick");
  updateSkillTotal("grapple");
  updateSkillTotal("punch");
  updateSkillTotal("headbutt");
  updateSkillTotal("throw");
  updateSkillTotal("martial_arts");
  updateSkillTotal("handgun");
  updateSkillTotal("submachine_gun");
  updateSkillTotal("shotgun");
  updateSkillTotal("machine_gun");
  updateSkillTotal("rifle");

  // 探索技能
  updateSkillTotal("first_aid");
  updateSkillTotal("locksmith");
  updateSkillTotal("conceal");
  updateSkillTotal("hide");
  updateSkillTotal("listen");
  updateSkillTotal("sneak");
  updateSkillTotal("photography");
  updateSkillTotal("psychoanalysis");
  updateSkillTotal("track");
  updateSkillTotal("climb");
  updateSkillTotal("library_use");
  updateSkillTotal("spot_hidden");

  // 行動技能
  updateSkillTotal("drive");
  updateSkillTotal("mechanical_repair");
  updateSkillTotal("heavy_machinery");
  updateSkillTotal("ride");
  updateSkillTotal("swim");
  updateSkillTotal("craft");
  updateSkillTotal("pilot");
  updateSkillTotal("jump");
  updateSkillTotal("electrical_repair");
  updateSkillTotal("navigate");
  updateSkillTotal("disguise");

  // 交渉技能
  updateSkillTotal("fast_talk");
  updateSkillTotal("persuade");
  updateSkillTotal("credit_rating");
  updateSkillTotal("bargain");
  updateSkillTotal("mother_tongue");
  updateSkillTotal("language");

  // 知識技能
  updateSkillTotal("medicine");
  updateSkillTotal("occult");
  updateSkillTotal("chemistry");
  updateSkillTotal("cthulhu_mythos");
  updateSkillTotal("accounting");
  updateSkillTotal("computer_use");
  updateSkillTotal("psychology");
  updateSkillTotal("law");
  updateSkillTotal("pharmacy");
  updateSkillTotal("history");
  updateSkillTotal("art");
  updateSkillTotal("archaeology");
  updateSkillTotal("anthropology");
  updateSkillTotal("biology");
  updateSkillTotal("geology");
  updateSkillTotal("electronics");
  updateSkillTotal("astronomy");
  updateSkillTotal("natural_history");
  updateSkillTotal("physics");
}

// ページ読み込み完了後に初期化を実行
document.addEventListener("DOMContentLoaded", function () {
  // コンポーネント読み込み完了を待つ
  setTimeout(() => {
    // リアルタイムで計算結果を反映
    document.querySelectorAll('[name$="_total"]').forEach((el) => {
      el.addEventListener("input", calculateDerivedScores);
    });

    // 初期計算
    calculateDerivedScores();
    initializeSkills();
    updateJobPointsUsed();
    updateInterestPointsUsed();

    // 自動リサイズ機能を初期化
    initializeAutoResize();
  }, 200);
});

// Form submission handler - フォーム送信を無効化のみ（index.htmlでのみ実行）
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("chara-form");
  
  // index.htmlでのみ実行（chara-formが存在する場合のみ）
  if (form) {
    // フォーム送信を無効化
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }
  
  // 注意: 「キャラクターシート作成」ボタンの処理は character-ui.js の displayCurrentCharacter で行う
});

// 装備データを収集する関数
function collectEquipmentData() {
  const equipmentData = {
    weapons: [],
    items: [],
    disorders: [],
    books: [],
    spells: [],
    artifacts: [],
    entities: []
  };

  // 武器データの収集
  const weaponElements = document.querySelectorAll('#weapons-list li');
  weaponElements.forEach(element => {
    const weaponData = {
      name: element.querySelector('input[name*="_name"]')?.value || '',
      success: element.querySelector('input[name*="_success"]')?.value || '',
      damage: element.querySelector('input[name*="_damage"]')?.value || '',
      range: element.querySelector('input[name*="_range"]')?.value || '',
      attacks: element.querySelector('input[name*="_attacks"]')?.value || '',
      capacity: element.querySelector('input[name*="_capacity"]')?.value || '',
      malfunction: element.querySelector('input[name*="_malfunction"]')?.value || '',
      durability: element.querySelector('input[name*="_durability"]')?.value || '',
      details: element.querySelector('input[name*="_details"]')?.value || ''
    };
    if (weaponData.name) {
      equipmentData.weapons.push(weaponData);
    }
  });

  // 所持品データの収集
  const itemElements = document.querySelectorAll('#items-list li');
  itemElements.forEach(element => {
    const itemData = {
      name: element.querySelector('input[name*="_name"]')?.value || '',
      quantity: element.querySelector('input[name*="_quantity"]')?.value || '',
      details: element.querySelector('input[name*="_details"]')?.value || ''
    };
    if (itemData.name) {
      equipmentData.items.push(itemData);
    }
  });

  // 不定・後遺症データの収集
  const disorderElements = document.querySelectorAll('#disorders-list li');
  disorderElements.forEach(element => {
    const disorderData = {
      name: element.querySelector('input[name*="_name"]')?.value || '',
      startDate: element.querySelector('input[name*="_start_date"]')?.value || '',
      endDate: element.querySelector('input[name*="_end_date"]')?.value || '',
      details: element.querySelector('input[name*="_details"]')?.value || ''
    };
    if (disorderData.name) {
      equipmentData.disorders.push(disorderData);
    }
  });

  // 魔導書データの収集
  const bookElements = document.querySelectorAll('#books-list li');
  bookElements.forEach(element => {
    const bookData = {
      name: element.querySelector('input[name*="_name"]')?.value || '',
      sanLoss: element.querySelector('input[name*="_san_loss"]')?.value || '',
      cthulhuIncrease: element.querySelector('input[name*="_cthulhu_increase"]')?.value || '',
      spells: element.querySelector('input[name*="_spells"]')?.value || '',
      details: element.querySelector('input[name*="_details"]')?.value || ''
    };
    if (bookData.name) {
      equipmentData.books.push(bookData);
    }
  });

  // 呪文データの収集
  const spellElements = document.querySelectorAll('#spells-list li');
  spellElements.forEach(element => {
    const spellData = {
      name: element.querySelector('input[name*="_name"]')?.value || '',
      cost: element.querySelector('input[name*="_cost"]')?.value || '',
      castingTime: element.querySelector('input[name*="_casting_time"]')?.value || '',
      details: element.querySelector('input[name*="_details"]')?.value || ''
    };
    if (spellData.name) {
      equipmentData.spells.push(spellData);
    }
  });

  // AFデータの収集
  const artifactElements = document.querySelectorAll('#artifacts-list li');
  artifactElements.forEach(element => {
    const artifactData = {
      name: element.querySelector('input[name*="_name"]')?.value || '',
      details: element.querySelector('input[name*="_details"]')?.value || ''
    };
    if (artifactData.name) {
      equipmentData.artifacts.push(artifactData);
    }
  });

  // 超自然の存在データの収集
  const entityElements = document.querySelectorAll('#entities-list li');
  entityElements.forEach(element => {
    const entityData = {
      name: element.querySelector('input[name*="_name"]')?.value || '',
      details: element.querySelector('input[name*="_details"]')?.value || ''
    };
    if (entityData.name) {
      equipmentData.entities.push(entityData);
    }
  });

  return equipmentData;
}

// 装備データをcharacter.htmlに表示する関数
function displayEquipmentData(equipmentData) {
  // character.htmlでのみ実行（equipment-sectionが存在しない場合のみ）
  if (document.getElementById('equipment-section')) {
    return; // index.htmlなので処理をスキップ
  }
  // 武器データの表示
  const weaponsWrapper = document.querySelector('.data-wrap.buki');
  const weaponsSection = document.querySelector('.data-wrap.buki ul');
  if (weaponsSection) {
    if (equipmentData.weapons.length > 0) {
      weaponsSection.innerHTML = '';
      equipmentData.weapons.forEach(weapon => {
        const weaponHtml = `
          <li class="d-flex data-li skill-body">
            <div class="title">${weapon.name}</div>
            <div class="ginou kazu"><span class="label">成功</span>${weapon.success}%</div>
            <div class="damage"><span class="label">ダメージ</span>${weapon.damage}</div>
            <div class="syatei kazu"><span class="label">射程</span>${weapon.range}</div>
            <div class="kougekikaisu kazu"><span class="label">回数</span>${weapon.attacks}</div>
            <div class="soudansuu kazu"><span class="label">装弾</span>${weapon.capacity}</div>
            <div class="kosyou kazu"><span class="label">故障</span>${weapon.malfunction}</div>
            <div class="taikyu kazu"><span class="label">耐久</span>${weapon.durability}</div>
            <div class="memo"><span class="label">詳細</span>${weapon.details}</div>
          </li>
        `;
        weaponsSection.insertAdjacentHTML('beforeend', weaponHtml);
      });
      // アコーディオン状態復元に委ねるため、display設定をしない
    } else {
      if (weaponsWrapper) weaponsWrapper.style.display = 'none';
    }
  }

  // 所持品データの表示
  const itemsWrapper = document.querySelector('.data-wrap.item');
  const itemsSection = document.querySelector('.data-wrap.item ul');
  if (itemsSection) {
    if (equipmentData.items.length > 0) {
      itemsSection.innerHTML = '';
      equipmentData.items.forEach(item => {
        const itemHtml = `
          <li class="d-flex data-li skill-body">
            <div class="title">${item.name}</div>
            <div class="kosu">${item.quantity}</div>
            <div class="content">${item.details}</div>
          </li>
        `;
        itemsSection.insertAdjacentHTML('beforeend', itemHtml);
      });
      // アコーディオン状態復元に委ねるため、display設定をしない
    } else {
      if (itemsWrapper) itemsWrapper.style.display = 'none';
    }
  }

  // 不定・後遺症データの表示
  const disordersWrapper = document.querySelector('.data-wrap.hutei');
  const disordersSection = document.querySelector('.data-wrap.hutei ul');
  if (disordersSection) {
    if (equipmentData.disorders.length > 0) {
      disordersSection.innerHTML = '';
      equipmentData.disorders.forEach(disorder => {
        const disorderHtml = `
          <li class="d-flex data-li skill-body">
            <div class="title">${disorder.name}</div>
            <div class="term">${disorder.startDate} ～ ${disorder.endDate}</div>
            <div class="content">${disorder.details}</div>
          </li>
        `;
        disordersSection.insertAdjacentHTML('beforeend', disorderHtml);
      });
      // アコーディオン状態復元に委ねるため、display設定をしない
    } else {
      if (disordersWrapper) disordersWrapper.style.display = 'none';
    }
  }

  // 魔導書データの表示
  const booksWrapper = document.querySelector('.data-wrap.book');
  const booksSection = document.getElementById('books-display');
  if (booksSection) {
    if (equipmentData.books.length > 0) {
      booksSection.innerHTML = '';
      equipmentData.books.forEach(book => {
        const bookHtml = `
          <li class="d-flex data-li skill-body">
            <div class="title">${book.name}</div>
            <div class="content">${book.details}</div>
          </li>
        `;
        booksSection.insertAdjacentHTML('beforeend', bookHtml);
      });
      // アコーディオン状態復元に委ねるため、display設定をしない
    } else {
      if (booksWrapper) booksWrapper.style.display = 'none';
    }
  }

  // 呪文データの表示
  const spellsWrapper = document.querySelector('.data-wrap.jumon');
  const spellsSection = document.getElementById('spells-display');
  if (spellsSection) {
    if (equipmentData.spells.length > 0) {
      spellsSection.innerHTML = '';
      equipmentData.spells.forEach(spell => {
        const spellHtml = `
          <li class="d-flex data-li skill-body">
            <div class="title">${spell.name}</div>
            <div class="content">${spell.details}</div>
          </li>
        `;
        spellsSection.insertAdjacentHTML('beforeend', spellHtml);
      });
      // アコーディオン状態復元に委ねるため、display設定をしない
    } else {
      if (spellsWrapper) spellsWrapper.style.display = 'none';
    }
  }

  // AFデータの表示
  const artifactsWrapper = document.querySelector('.data-wrap.af');
  const artifactsSection = document.getElementById('artifacts-display');
  if (artifactsSection) {
    if (equipmentData.artifacts.length > 0) {
      artifactsSection.innerHTML = '';
      equipmentData.artifacts.forEach(artifact => {
        const artifactHtml = `
          <li class="d-flex data-li skill-body">
            <div class="title">${artifact.name}</div>
            <div class="content">${artifact.details}</div>
          </li>
        `;
        artifactsSection.insertAdjacentHTML('beforeend', artifactHtml);
      });
      // アコーディオン状態復元に委ねるため、display設定をしない
    } else {
      if (artifactsWrapper) artifactsWrapper.style.display = 'none';
    }
  }

  // 超自然の存在データの表示
  const entitiesWrapper = document.querySelector('.data-wrap.cthulhu');
  const entitiesSection = document.getElementById('entities-display');
  if (entitiesSection) {
    if (equipmentData.entities.length > 0) {
      entitiesSection.innerHTML = '';
      equipmentData.entities.forEach(entity => {
        const entityHtml = `
          <li class="d-flex data-li skill-body">
            <div class="title">${entity.name}</div>
            <div class="content">${entity.details}</div>
          </li>
        `;
        entitiesSection.insertAdjacentHTML('beforeend', entityHtml);
      });
      // アコーディオン状態復元に委ねるため、display設定をしない
    } else {
      if (entitiesWrapper) entitiesWrapper.style.display = 'none';
    }
  }
}

// 装備データをindex.htmlの入力フィールドに復元する関数
function restoreEquipmentData(equipmentData) {
  // index.htmlでのみ実行（equipment-sectionが存在する場合のみ）
  if (!document.getElementById('equipment-section')) {
    return; // character.htmlなので処理をスキップ
  }

  if (!equipmentData) return;

  // 武器データの復元
  if (equipmentData.weapons && equipmentData.weapons.length > 0) {
    equipmentData.weapons.forEach(weapon => {
      addWeapon();
      const weaponId = `weapon_${weaponCounter}`;
      
      // フィールドに値を設定
      const nameField = document.querySelector(`input[name="${weaponId}_name"]`);
      if (nameField) nameField.value = weapon.name || '';
      
      const successField = document.querySelector(`input[name="${weaponId}_success"]`);
      if (successField) successField.value = weapon.success || '';
      
      const damageField = document.querySelector(`input[name="${weaponId}_damage"]`);
      if (damageField) damageField.value = weapon.damage || '';
      
      const rangeField = document.querySelector(`input[name="${weaponId}_range"]`);
      if (rangeField) rangeField.value = weapon.range || '';
      
      const attacksField = document.querySelector(`input[name="${weaponId}_attacks"]`);
      if (attacksField) attacksField.value = weapon.attacks || '';
      
      const capacityField = document.querySelector(`input[name="${weaponId}_capacity"]`);
      if (capacityField) capacityField.value = weapon.capacity || '';
      
      const malfunctionField = document.querySelector(`input[name="${weaponId}_malfunction"]`);
      if (malfunctionField) malfunctionField.value = weapon.malfunction || '';
      
      const durabilityField = document.querySelector(`input[name="${weaponId}_durability"]`);
      if (durabilityField) durabilityField.value = weapon.durability || '';
      
      const detailsField = document.querySelector(`input[name="${weaponId}_details"]`);
      if (detailsField) detailsField.value = weapon.details || '';
    });
  }

  // 所持品データの復元
  if (equipmentData.items && equipmentData.items.length > 0) {
    equipmentData.items.forEach(item => {
      addItem();
      const itemId = `item_${itemCounter}`;
      
      const nameField = document.querySelector(`input[name="${itemId}_name"]`);
      if (nameField) nameField.value = item.name || '';
      
      const quantityField = document.querySelector(`input[name="${itemId}_quantity"]`);
      if (quantityField) quantityField.value = item.quantity || '';
      
      const detailsField = document.querySelector(`input[name="${itemId}_details"]`);
      if (detailsField) detailsField.value = item.details || '';
    });
  }

  // 不定・後遺症データの復元
  if (equipmentData.disorders && equipmentData.disorders.length > 0) {
    equipmentData.disorders.forEach(disorder => {
      addDisorder();
      const disorderId = `disorder_${disorderCounter}`;
      
      const nameField = document.querySelector(`input[name="${disorderId}_name"]`);
      if (nameField) nameField.value = disorder.name || '';
      
      const startDateField = document.querySelector(`input[name="${disorderId}_start_date"]`);
      if (startDateField) startDateField.value = disorder.startDate || '';
      
      const endDateField = document.querySelector(`input[name="${disorderId}_end_date"]`);
      if (endDateField) endDateField.value = disorder.endDate || '';
      
      const detailsField = document.querySelector(`input[name="${disorderId}_details"]`);
      if (detailsField) detailsField.value = disorder.details || '';
    });
  }

  // 魔導書データの復元
  if (equipmentData.books && equipmentData.books.length > 0) {
    equipmentData.books.forEach(book => {
      addBook();
      const bookId = `book_${bookCounter}`;
      
      const nameField = document.querySelector(`input[name="${bookId}_name"]`);
      if (nameField) nameField.value = book.name || '';
      
      const detailsField = document.querySelector(`input[name="${bookId}_details"]`);
      if (detailsField) detailsField.value = book.details || '';
    });
  }

  // 呪文データの復元
  if (equipmentData.spells && equipmentData.spells.length > 0) {
    equipmentData.spells.forEach(spell => {
      addSpell();
      const spellId = `spell_${spellCounter}`;
      
      const nameField = document.querySelector(`input[name="${spellId}_name"]`);
      if (nameField) nameField.value = spell.name || '';
      
      const detailsField = document.querySelector(`input[name="${spellId}_details"]`);
      if (detailsField) detailsField.value = spell.details || '';
    });
  }

  // AFデータの復元
  if (equipmentData.artifacts && equipmentData.artifacts.length > 0) {
    equipmentData.artifacts.forEach(artifact => {
      addArtifact();
      const artifactId = `artifact_${artifactCounter}`;
      
      const nameField = document.querySelector(`input[name="${artifactId}_name"]`);
      if (nameField) nameField.value = artifact.name || '';
      
      const detailsField = document.querySelector(`input[name="${artifactId}_details"]`);
      if (detailsField) detailsField.value = artifact.details || '';
    });
  }

  // 超自然の存在データの復元
  if (equipmentData.entities && equipmentData.entities.length > 0) {
    equipmentData.entities.forEach(entity => {
      addEntity();
      const entityId = `entity_${entityCounter}`;
      
      const nameField = document.querySelector(`input[name="${entityId}_name"]`);
      if (nameField) nameField.value = entity.name || '';
      
      const detailsField = document.querySelector(`input[name="${entityId}_details"]`);
      if (detailsField) detailsField.value = entity.details || '';
    });
  }
}

// グローバルスコープに関数を公開
window.collectEquipmentData = collectEquipmentData;
window.displayEquipmentData = displayEquipmentData;
window.restoreEquipmentData = restoreEquipmentData;

// 装備関連の関数をグローバルスコープに公開
window.addWeapon = addWeapon;
window.removeWeapon = removeWeapon;
window.addItem = addItem;
window.removeItem = removeItem;
window.addDisorder = addDisorder;
window.removeDisorder = removeDisorder;
window.addBook = addBook;
window.removeBook = removeBook;
window.addSpell = addSpell;
window.removeSpell = removeSpell;
window.addArtifact = addArtifact;
window.removeArtifact = removeArtifact;
window.addEntity = addEntity;
window.removeEntity = removeEntity;
window.toggleEquipmentSection = toggleEquipmentSection;
window.restoreEquipmentSectionStates = restoreEquipmentSectionStates;
