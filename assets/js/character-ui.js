// キャラクター管理UI操作
import CharacterManager from './character-manager.js';

let currentCharacterId = null;

// 現在のキャラクターを保存
async function saveCurrentCharacter() {
  try {
    const characterData = getFormData();
    
    if (!characterData.character_name) {
      characterManager.showNotification("キャラクター名を入力してください", "error");
      return;
    }
    
    // 保存前にもう一度クリーンアップを実行
    cleanupDeletedSkills(characterData);
    
    const characterId = await characterManager.saveCharacter(characterData, currentCharacterId);
    currentCharacterId = characterId;
    
    // URLを更新（履歴に残さない）
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('id', characterId);
    window.history.replaceState({}, '', newUrl);
    
  } catch (error) {
    console.error("保存エラー:", error);
  }
}

// キャラクター一覧の表示切替
async function toggleCharacterList() {
  console.log('toggleCharacterList called');
  
  const listElement = document.getElementById('character-list');
  if (!listElement) {
    console.error('character-list element not found');
    return;
  }
  
  if (!window.characterManager) {
    console.error('characterManager not found');
    return;
  }
  
  if (listElement.style.display === 'none' || !listElement.style.display) {
    await loadCharacterList();
    listElement.style.display = 'block';
  } else {
    listElement.style.display = 'none';
  }
}

// キャラクター一覧を読み込み
async function loadCharacterList() {
  try {
    console.log('loadCharacterList called');
    console.log('characterManager:', window.characterManager);
    
    const characters = await window.characterManager.getCharacterList();
    console.log('characters:', characters);
    
    const contentElement = document.getElementById('character-list-content');
    
    if (characters.length === 0) {
      contentElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">保存されたキャラクターはありません</div>';
      return;
    }
    
    const listHtml = characters.map(char => {
      const createdDate = char.createdAt ? new Date(char.createdAt.seconds * 1000).toLocaleDateString('ja-JP') : '-';
      const updatedDate = char.updatedAt ? new Date(char.updatedAt.seconds * 1000).toLocaleDateString('ja-JP') : '-';
      
      return `
        <div class="character-item">
          <div class="character-info">
            <div class="character-name">${char.character_name || '無名のキャラクター'}</div>
            <div class="character-meta">
              職業: ${char.job || '-'} | 年齢: ${char.age || '-'} | 
              作成: ${createdDate} | 更新: ${updatedDate} | v${char.version || 1}
            </div>
          </div>
          <div class="character-actions">
            <button class="action-btn btn-load-char" onclick="loadCharacterFromList('${char.id}')">
              読み込み
            </button>
            <button class="action-btn btn-share-char" onclick="shareCharacter('${char.id}')">
              共有
            </button>
            <button class="action-btn btn-history" onclick="showVersionHistory('${char.id}')">
              履歴
            </button>
            <button class="action-btn btn-delete" onclick="deleteCharacter('${char.id}')">
              削除
            </button>
          </div>
        </div>
      `;
    }).join('');
    
    contentElement.innerHTML = listHtml;
  } catch (error) {
    console.error("一覧読み込みエラー:", error);
  }
}

// キャラクターを一覧から読み込み
async function loadCharacterFromList(characterId) {
  try {
    const character = await characterManager.loadCharacter(characterId);
    setFormData(character);
    currentCharacterId = characterId;
    
    // URLを更新
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('id', characterId);
    window.history.replaceState({}, '', newUrl);
    
    // 一覧を閉じる
    document.getElementById('character-list').style.display = 'none';
    
  } catch (error) {
    console.error("読み込みエラー:", error);
  }
}

// キャラクター削除
async function deleteCharacter(characterId) {
  try {
    const success = await characterManager.deleteCharacter(characterId);
    if (success) {
      // 削除されたキャラクターが現在のキャラクターの場合
      if (currentCharacterId === characterId) {
        currentCharacterId = null;
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete('id');
        window.history.replaceState({}, '', newUrl);
      }
      
      // 一覧を更新
      await loadCharacterList();
    }
  } catch (error) {
    console.error("削除エラー:", error);
  }
}

// 現在のキャラクターを表示
async function displayCurrentCharacter() {
  try {
    // まずキャラクターを保存（既存の場合は更新）
    await saveCurrentCharacter();
    
    // 保存されたキャラクターIDが存在する場合は共有URLを使用
    if (currentCharacterId) {
      const shareUrl = characterManager.generateShareUrl(currentCharacterId);
      window.open(shareUrl, '_blank');
    } else {
      // 保存に失敗した場合は従来の方法
      const data = getFormData();
      if (!data.character_name) {
        characterManager.showNotification("キャラクター名を入力してください", "error");
        return;
      }
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
      window.open(`character.html?data=${encoded}`, '_blank');
    }
  } catch (error) {
    console.error("表示エラー:", error);
    // エラーの場合は従来の方法にフォールバック
    const data = getFormData();
    if (!data.character_name) {
      characterManager.showNotification("キャラクター名を入力してください", "error");
      return;
    }
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    window.open(`character.html?data=${encoded}`, '_blank');
  }
}

// 現在のキャラクターを共有
async function shareCurrentCharacter() {
  if (!currentCharacterId) {
    characterManager.showNotification("まずキャラクターを保存してください", "error");
    return;
  }
  
  shareCharacter(currentCharacterId);
}

// キャラクター共有
function shareCharacter(characterId) {
  const shareUrl = characterManager.generateShareUrl(characterId);
  document.getElementById('share-url').value = shareUrl;
  showModal('share-modal');
}

// 共有URLをコピー
function copyShareUrl() {
  const urlInput = document.getElementById('share-url');
  urlInput.select();
  document.execCommand('copy');
  characterManager.showNotification("URLをコピーしました", "success");
}

// バージョン履歴表示
async function showVersionHistory(characterId) {
  try {
    const versions = await characterManager.getVersionHistory(characterId);
    const contentElement = document.getElementById('version-history-content');
    
    if (versions.length === 0) {
      contentElement.innerHTML = '<div style="text-align: center; color: #666;">バージョン履歴はありません</div>';
    } else {
      const historyHtml = versions.map((version, index) => {
        const date = new Date(version.createdAt.seconds * 1000).toLocaleString('ja-JP');
        return `
          <div class="version-item">
            <div class="version-date">Version ${versions.length - index} - ${date}</div>
            <div class="version-actions">
              <button class="action-btn btn-load-char" onclick="restoreVersion('${version.id}', '${characterId}')">
                この版に戻す
              </button>
            </div>
          </div>
        `;
      }).join('');
      
      contentElement.innerHTML = historyHtml;
    }
    
    showModal('version-history-modal');
  } catch (error) {
    console.error("履歴取得エラー:", error);
  }
}

// バージョン復元
async function restoreVersion(versionId, characterId) {
  try {
    // バージョンデータを取得して現在のフォームに設定
    // 実装はバージョンデータ構造に依存
    characterManager.showNotification("バージョン復元機能は開発中です", "info");
  } catch (error) {
    console.error("復元エラー:", error);
  }
}

// バックアップメニュー表示
function showBackupMenu() {
  showModal('backup-modal');
}

// バックアップ作成
async function createBackup() {
  try {
    await characterManager.createBackup();
    closeModal('backup-modal');
  } catch (error) {
    console.error("バックアップエラー:", error);
  }
}

// バックアップファイル選択
function selectBackupFile() {
  document.getElementById('backup-file-input').click();
}

// バックアップ復元
async function restoreFromBackup(input) {
  const file = input.files[0];
  if (!file) return;
  
  try {
    await characterManager.restoreBackup(file);
    await loadCharacterList(); // 一覧更新
    closeModal('backup-modal');
  } catch (error) {
    console.error("復元エラー:", error);
  }
  
  // ファイル入力をリセット
  input.value = '';
}

// モーダル表示
function showModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

// モーダル閉じる
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// フォームデータを取得
function getFormData() {
  const form = document.getElementById('chara-form');
  const data = {};
  
  // 全てのinput, select, textareaを取得（読み取り専用も含む）
  const elements = form.querySelectorAll('input, select, textarea');
  
  // デバッグ: 追加技能の要素を確認
  const additionalSkills = [];
  
  for (const element of elements) {
    if (element.name) {
      data[element.name] = element.value || '';
      
      // 追加技能の要素をログ
      if (element.name.includes('additional_')) {
        additionalSkills.push({
          name: element.name,
          value: element.value,
          container: element.closest('li')?.id || 'unknown'
        });
      }
    }
  }
  
  console.log('Found additional skills:', additionalSkills);
  console.log('Total form elements found:', elements.length);
  
  // セーブ時のみクリーンアップを実行（コンポーネント読み込み中は実行しない）
  // cleanupDeletedSkills(data); // この処理はsetFormDataの遅延処理に移動
  
  console.log('Final form data:', data);
  return data;
}

// 削除された追加技能のデータをクリーンアップする関数
function cleanupDeletedSkills(data) {
  console.log('Starting cleanup of deleted skills...');
  const skillTypes = ['combat', 'exploration', 'action', 'negotiation', 'knowledge'];
  
  skillTypes.forEach(skillType => {
    // 現在存在する技能のIDを取得（DOM上に実際に存在するもの）
    const existingSkillIds = new Set();
    
    // DOM上の技能コンテナを確認
    const containers = document.querySelectorAll(`#additional-${skillType}-skills li[id$="_container"]`);
    containers.forEach(container => {
      const skillId = container.id.replace('_container', '');
      existingSkillIds.add(skillId);
    });
    
    console.log(`Existing ${skillType} skill IDs in DOM:`, Array.from(existingSkillIds));
    
    // データ内で技能名が設定されている技能IDも取得
    const dataSkillIds = new Set();
    for (const key of Object.keys(data)) {
      if (key.startsWith(`additional_${skillType}_`) && key.endsWith('_name')) {
        const skillId = key.replace('_name', '');
        const skillName = data[key];
        if (skillName && skillName.trim() !== '') {
          dataSkillIds.add(skillId);
        }
      }
    }
    
    console.log(`${skillType} skills with names in data:`, Array.from(dataSkillIds));
    
    // データ内のすべての追加技能フィールドをチェック
    const keysToDelete = [];
    for (const key of Object.keys(data)) {
      if (key.startsWith(`additional_${skillType}_`)) {
        // skillIdを抽出（例: additional_combat_1_name → additional_combat_1）
        const skillId = key.replace(/_[^_]+$/, '');
        
        // DOM上に存在しない技能のデータは削除対象（技能名の有無に関わらず）
        if (!existingSkillIds.has(skillId)) {
          keysToDelete.push(key);
        }
      }
    }
    
    // 削除対象のキーを実際に削除
    if (keysToDelete.length > 0) {
      console.log(`Deleting ${keysToDelete.length} orphaned ${skillType} skill fields:`, keysToDelete);
      keysToDelete.forEach(key => {
        delete data[key];
      });
    }
  });
}

// フォームデータを設定
function setFormData(data) {
  const form = document.getElementById('chara-form');
  
  // まず追加技能を復元（DOMが完全に構築される前にクリーンアップしない）
  restoreAdditionalSkills(data);
  
  // 通常のフィールドを設定
  for (const [key, value] of Object.entries(data)) {
    if (key === 'id' || key === 'userId' || key === 'createdAt' || key === 'updatedAt' || key === 'version') {
      continue; // メタデータはスキップ
    }
    
    const element = form.querySelector(`[name="${key}"]`);
    if (element) {
      element.value = value || '';
    }
  }
  
  // コンポーネント読み込み完了後に計算値を更新
  setTimeout(() => {
    if (typeof calculateDerivedScores === 'function') {
      calculateDerivedScores();
    }
    if (typeof initializeSkills === 'function') {
      initializeSkills();
    }
    
    // 追加技能復元に失敗した場合のリトライ
    if (typeof addCombatSkill === 'function' || typeof addExplorationSkill === 'function') {
      console.log('Skill functions are available, retrying skill restoration');
      restoreAdditionalSkills(data);
    }
    
    // 追加技能復元後にクリーンアップを実行（遅延させてDOMが完全に構築されるのを待つ）
    setTimeout(() => {
      console.log('Running delayed cleanup after DOM construction');
      cleanupDeletedSkills(data);
      
      // クリーンアップ後にFirebaseにも反映（非同期で実行）
      if (currentCharacterId) {
        updateFirebaseWithCleanedData(data);
      }
    }, 500); // さらに遅延させてDOMの構築を確実に完了させる
  }, 100);
}

// クリーンアップされたデータをFirebaseに反映する関数
async function updateFirebaseWithCleanedData(data) {
  try {
    console.log('Updating Firebase with cleaned data...');
    
    if (!window.characterManager || !currentCharacterId) {
      console.log('CharacterManager or currentCharacterId not available, skipping Firebase update');
      return;
    }
    
    // 現在のキャラクターデータを取得
    const currentCharacter = await window.characterManager.loadCharacter(currentCharacterId);
    
    // クリーンアップされたデータでFirebaseを更新
    const updatedCharacter = { ...currentCharacter, ...data };
    
    // Firebaseに保存（ただし、ログなしで静かに実行）
    await window.characterManager.saveCharacter(updatedCharacter, currentCharacterId);
    
    console.log('Firebase updated with cleaned data successfully');
  } catch (error) {
    console.error('Error updating Firebase with cleaned data:', error);
    // エラーが発生してもUI操作を妨げないように、静かに失敗する
  }
}

// 追加技能を復元する関数
function restoreAdditionalSkills(data, retryCount = 0) {
  const skillTypes = ['combat', 'exploration', 'action', 'negotiation', 'knowledge'];
  
  skillTypes.forEach(skillType => {
    // 既存の追加技能をクリア
    const container = document.getElementById(`additional-${skillType}-skills`);
    if (container) {
      container.innerHTML = '';
    }
    
    // 追加技能のデータを検索（技能名が存在し、空でないもののみ）
    const additionalSkills = [];
    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith(`additional_${skillType}_`) && key.endsWith('_name') && value && value.trim() !== '') {
        const skillId = key.replace('_name', '');
        const skillNumber = skillId.split('_').pop();
        additionalSkills.push({
          skillId,
          skillNumber: parseInt(skillNumber),
          name: value
        });
      }
    }
    
    console.log(`Restoring ${skillType} skills:`, additionalSkills);
    
    // ソートしない（作成順を維持）
    // additionalSkills.sort((a, b) => a.skillNumber - b.skillNumber);
    
    // 各追加技能を復元
    additionalSkills.forEach((skill, index) => {
      // 適切な追加関数を呼び出し
      switch (skillType) {
        case 'combat':
          if (typeof addCombatSkill === 'function') {
            addCombatSkill();
            // カウンターを正しい値に設定
            if (typeof additionalCombatSkillCounter !== 'undefined') {
              additionalCombatSkillCounter = skill.skillNumber;
            }
            // 全ての技能フィールドを設定
            setTimeout(() => {
              populateSkillFields(skill.skillId, data);
            }, 10);
          } else {
            console.log('addCombatSkill function not available yet, will retry later');
          }
          break;
        case 'exploration':
          if (typeof addExplorationSkill === 'function') {
            addExplorationSkill();
            if (typeof additionalExplorationSkillCounter !== 'undefined') {
              additionalExplorationSkillCounter = skill.skillNumber;
            }
            // 全ての技能フィールドを設定
            setTimeout(() => {
              populateSkillFields(skill.skillId, data);
            }, 10);
          }
          break;
        case 'action':
          if (typeof addActionSkill === 'function') {
            addActionSkill();
            if (typeof additionalActionSkillCounter !== 'undefined') {
              additionalActionSkillCounter = skill.skillNumber;
            }
            // 全ての技能フィールドを設定
            setTimeout(() => {
              populateSkillFields(skill.skillId, data);
            }, 10);
          }
          break;
        case 'negotiation':
          if (typeof addNegotiationSkill === 'function') {
            addNegotiationSkill();
            if (typeof additionalNegotiationSkillCounter !== 'undefined') {
              additionalNegotiationSkillCounter = skill.skillNumber;
            }
            // 全ての技能フィールドを設定
            setTimeout(() => {
              populateSkillFields(skill.skillId, data);
            }, 10);
          }
          break;
        case 'knowledge':
          if (typeof addKnowledgeSkill === 'function') {
            addKnowledgeSkill();
            if (typeof additionalKnowledgeSkillCounter !== 'undefined') {
              additionalKnowledgeSkillCounter = skill.skillNumber;
            }
            // 全ての技能フィールドを設定
            setTimeout(() => {
              populateSkillFields(skill.skillId, data);
            }, 10);
          }
          break;
      }
    });
  });
}

// 追加技能のフィールドを設定する関数
function populateSkillFields(skillId, data) {
  const fieldTypes = ['name', 'initial', 'job', 'interest', 'growth', 'other', 'total'];
  
  fieldTypes.forEach(fieldType => {
    const fieldName = `${skillId}_${fieldType}`;
    const value = data[fieldName];
    
    if (value !== undefined) {
      const field = document.querySelector(`[name="${fieldName}"]`);
      if (field) {
        field.value = value;
        console.log(`Set ${fieldName} = ${value}`);
      }
    }
  });
  
  // 合計値を再計算
  if (typeof updateSkillTotal === 'function') {
    updateSkillTotal(skillId);
  }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
  // URLパラメータからキャラクターIDを取得
  const urlParams = new URLSearchParams(window.location.search);
  const characterId = urlParams.get('id');
  const shareId = urlParams.get('share');
  
  // 共有リンクの場合
  if (shareId) {
    setTimeout(async () => {
      try {
        const character = await characterManager.loadCharacter(shareId);
        setFormData(character);
        characterManager.showNotification("共有キャラクターを読み込みました", "success");
      } catch (error) {
        characterManager.showNotification("共有キャラクターの読み込みに失敗しました", "error");
      }
    }, 1000); // コンポーネント読み込み待ち
  }
  // 通常のキャラクターIDの場合
  else if (characterId) {
    currentCharacterId = characterId;
    setTimeout(async () => {
      try {
        const character = await characterManager.loadCharacter(characterId);
        setFormData(character);
      } catch (error) {
        console.error("キャラクター読み込みエラー:", error);
      }
    }, 1000); // コンポーネント読み込み待ち
  }
  
  // モーダルの背景クリックで閉じる
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });
});

// グローバル関数として公開
window.saveCurrentCharacter = saveCurrentCharacter;
window.displayCurrentCharacter = displayCurrentCharacter;
window.toggleCharacterList = toggleCharacterList;
window.loadCharacterFromList = loadCharacterFromList;
window.deleteCharacter = deleteCharacter;
window.shareCurrentCharacter = shareCurrentCharacter;
window.shareCharacter = shareCharacter;
window.copyShareUrl = copyShareUrl;
window.showVersionHistory = showVersionHistory;
window.restoreVersion = restoreVersion;
window.showBackupMenu = showBackupMenu;
window.createBackup = createBackup;
window.selectBackupFile = selectBackupFile;
window.restoreFromBackup = restoreFromBackup;
window.showModal = showModal;
window.closeModal = closeModal;

// 現在のキャラクターIDもグローバルに公開
window.getCurrentCharacterId = () => currentCharacterId;