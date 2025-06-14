// キャラクター管理機能
import { db, auth, currentUser } from './firebase-config.js';
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, query, orderBy, where, deleteDoc, deleteField } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

class CharacterManager {
  constructor() {
    this.currentCharacterId = null;
    this.characters = [];
    this.characterCache = new Map(); // キャラクターデータのキャッシュ
    this.cacheExpiry = 5 * 60 * 1000; // 5分間のキャッシュ
  }

  // キャラクター保存
  async saveCharacter(characterData, characterId = null) {
    try {
      if (!currentUser) {
        throw new Error("ユーザー認証が必要です");
      }

      const saveData = {
        ...characterData,
        userId: currentUser.uid,
        updatedAt: new Date(),
        version: (characterData.version || 0) + 1
      };

      if (characterId) {
        // 既存キャラクター更新
        await this.createVersion(characterId, characterData); // バージョン履歴保存
        const docRef = doc(db, "characters", characterId);
        await updateDoc(docRef, saveData);
        
        // キャッシュを無効化（最新データで更新）
        this.characterCache.set(characterId, {
          data: { id: characterId, ...saveData },
          timestamp: Date.now()
        });
        
        this.currentCharacterId = characterId;
        this.showNotification("キャラクターを更新しました", "success");
        return characterId;
      } else {
        // 新規キャラクター作成
        saveData.createdAt = new Date();
        saveData.version = 1;
        const docRef = await addDoc(collection(db, "characters"), saveData);
        
        // 新規作成時もキャッシュに追加
        this.characterCache.set(docRef.id, {
          data: { id: docRef.id, ...saveData },
          timestamp: Date.now()
        });
        
        this.currentCharacterId = docRef.id;
        this.showNotification("キャラクターを保存しました", "success");
        return docRef.id;
      }
    } catch (error) {
      console.error("保存エラー:", error);
      this.showNotification("保存に失敗しました: " + error.message, "error");
      throw error;
    }
  }

  // キャラクター読み込み（キャッシュ機能付き）
  async loadCharacter(characterId) {
    try {
      // キャッシュをチェック
      const cached = this.characterCache.get(characterId);
      if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
        this.currentCharacterId = characterId;
        this.showNotification("キャラクターを読み込みました", "success");
        return cached.data;
      }
      const docRef = doc(db, "characters", characterId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = { id: characterId, ...docSnap.data() };
        
        // キャッシュに保存
        this.characterCache.set(characterId, {
          data: data,
          timestamp: Date.now()
        });
        
        this.currentCharacterId = characterId;
        this.showNotification("キャラクターを読み込みました", "success");
        return data;
      } else {
        throw new Error("キャラクターが見つかりません");
      }
    } catch (error) {
      console.error("読み込みエラー:", error);
      this.showNotification("読み込みに失敗しました: " + error.message, "error");
      throw error;
    }
  }

  // キャラクター一覧取得
  async getCharacterList() {
    try {
      if (!currentUser) {
        throw new Error("ユーザー認証が必要です");
      }

      const q = query(
        collection(db, "characters"),
        where("userId", "==", currentUser.uid)
      );
      
      const querySnapshot = await getDocs(q);
      this.characters = [];
      
      querySnapshot.forEach((doc) => {
        this.characters.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return this.characters;
    } catch (error) {
      console.error("一覧取得エラー:", error);
      this.showNotification("一覧取得に失敗しました: " + error.message, "error");
      throw error;
    }
  }

  // キャラクター削除
  async deleteCharacter(characterId) {
    try {
      if (!confirm("本当にこのキャラクターを削除しますか？")) {
        return false;
      }

      // バージョン履歴も削除
      await this.deleteVersionHistory(characterId);
      
      // キャラクター本体削除
      await deleteDoc(doc(db, "characters", characterId));
      
      this.showNotification("キャラクターを削除しました", "success");
      return true;
    } catch (error) {
      console.error("削除エラー:", error);
      this.showNotification("削除に失敗しました: " + error.message, "error");
      throw error;
    }
  }

  // バージョン履歴作成
  async createVersion(characterId, characterData) {
    try {
      const versionData = {
        characterId: characterId,
        data: characterData,
        createdAt: new Date(),
        userId: currentUser.uid
      };
      
      await addDoc(collection(db, "character_versions"), versionData);
    } catch (error) {
      console.error("バージョン保存エラー:", error);
    }
  }

  // バージョン履歴取得
  async getVersionHistory(characterId) {
    try {
      const q = query(
        collection(db, "character_versions"),
        where("characterId", "==", characterId),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const versions = [];
      
      querySnapshot.forEach((doc) => {
        versions.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return versions;
    } catch (error) {
      console.error("バージョン履歴取得エラー:", error);
      throw error;
    }
  }

  // バージョン履歴削除
  async deleteVersionHistory(characterId) {
    try {
      const q = query(
        collection(db, "character_versions"),
        where("characterId", "==", characterId)
      );
      
      const querySnapshot = await getDocs(q);
      const deletePromises = [];
      
      querySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });
      
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("バージョン履歴削除エラー:", error);
    }
  }

  // 共有URL生成
  generateShareUrl(characterId) {
    const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
    return `${baseUrl}character.html?share=${characterId}`;
  }

  // バックアップ作成
  async createBackup() {
    try {
      const characters = await this.getCharacterList();
      const backup = {
        exportDate: new Date().toISOString(),
        characters: characters,
        version: "1.0"
      };
      
      const dataStr = JSON.stringify(backup, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `character_backup_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      this.showNotification("バックアップを作成しました", "success");
    } catch (error) {
      console.error("バックアップエラー:", error);
      this.showNotification("バックアップ作成に失敗しました: " + error.message, "error");
    }
  }

  // バックアップ復元
  async restoreBackup(file) {
    try {
      const text = await file.text();
      const backup = JSON.parse(text);
      
      if (!backup.characters || !Array.isArray(backup.characters)) {
        throw new Error("無効なバックアップファイルです");
      }
      
      let restoredCount = 0;
      for (const character of backup.characters) {
        try {
          const characterData = { ...character };
          delete characterData.id; // IDは新規生成
          delete characterData.userId; // ユーザーIDは現在のユーザーに設定
          
          await this.saveCharacter(characterData);
          restoredCount++;
        } catch (error) {
          console.error("キャラクター復元エラー:", error);
        }
      }
      
      this.showNotification(`${restoredCount}件のキャラクターを復元しました`, "success");
      return restoredCount;
    } catch (error) {
      console.error("復元エラー:", error);
      this.showNotification("バックアップ復元に失敗しました: " + error.message, "error");
      throw error;
    }
  }

  // 追加技能フィールドを削除
  async deleteSkillFields(characterId, skillId) {
    try {
      if (!characterId) {
        console.log('No character ID provided, skipping Firebase field deletion');
        return;
      }

      const fieldTypes = ['name', 'initial', 'job', 'interest', 'growth', 'other', 'total'];
      const deleteUpdates = {};
      
      // 削除対象のフィールドを設定
      fieldTypes.forEach(fieldType => {
        const fieldName = `${skillId}_${fieldType}`;
        deleteUpdates[fieldName] = deleteField();
      });
      
      // Firestoreからフィールドを削除
      const docRef = doc(db, "characters", characterId);
      await updateDoc(docRef, deleteUpdates);
      
    } catch (error) {
      console.error("技能フィールド削除エラー:", error);
      // エラーが発生してもUI操作を妨げないように静かに失敗
    }
  }

  // 通知表示
  showNotification(message, type = "info") {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    switch (type) {
      case 'success':
        notification.style.backgroundColor = '#4CAF50';
        break;
      case 'error':
        notification.style.backgroundColor = '#f44336';
        break;
      default:
        notification.style.backgroundColor = '#2196F3';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // アニメーション
    setTimeout(() => notification.style.opacity = '1', 100);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// グローバルインスタンス
window.characterManager = new CharacterManager();

export default CharacterManager;