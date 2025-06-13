# Firebase設定手順

## 1. Firebaseプロジェクト作成

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例：coc-character-sheet）
4. Google Analyticsは任意で設定
5. プロジェクトを作成

## 2. Firestore Database設定

1. Firebase Consoleで「Firestore Database」を選択
2. 「データベースの作成」をクリック
3. セキュリティルールは「テストモードで開始」を選択
4. ロケーションを選択（asia-northeast1がおすすめ）

## 3. 認証設定

1. Firebase Consoleで「Authentication」を選択
2. 「始める」をクリック
3. 「Sign-in method」タブで「匿名」を有効化

## 4. Web アプリ設定

1. Firebase Consoleでプロジェクト設定（歯車アイコン）
2. 「全般」タブの「マイアプリ」で「ウェブアプリを追加」
3. アプリ名を入力（例：COC Character Sheet）
4. Firebase Hostingは任意
5. 設定をコピー

## 5. 設定ファイル更新

`assets/js/firebase-config.js`の設定を更新：

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com", 
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 6. Firestoreセキュリティルール

Firebase Consoleの「Firestore Database」→「ルール」で以下に変更：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // キャラクターコレクション
    match /characters/{document} {
      allow read, write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
    }
    
    // バージョン履歴コレクション
    match /character_versions/{document} {
      allow read, write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
    }
    
    // 共有読み取り（特定の条件下）
    match /characters/{document} {
      allow read: if true; // 共有機能用
    }
  }
}
```

## 7. Firebase Hosting（オプション）

Webサイトを公開する場合：

1. Firebase CLIをインストール：`npm install -g firebase-tools`
2. ログイン：`firebase login`
3. プロジェクト初期化：`firebase init hosting`
4. publicディレクトリを指定
5. デプロイ：`firebase deploy`

## 使用可能な機能

### ✅ 実装済み機能
- キャラクター保存/読み込み
- キャラクター一覧表示
- 共有URL生成
- バックアップ作成/復元
- バージョン履歴保存
- 匿名認証

### 🎯 使用方法
1. **保存**：「保存」ボタンでキャラクターをFirestoreに保存
2. **一覧**：「一覧」ボタンで保存済みキャラクター表示
3. **共有**：「共有」ボタンでURLを生成、他の人と共有可能
4. **バックアップ**：「バックアップ」ボタンでJSONファイルとしてエクスポート
5. **履歴**：各キャラクターの「履歴」ボタンで過去のバージョンを確認

### 🔒 セキュリティ
- 匿名認証でユーザーを区別
- 自分のキャラクターのみ編集可能
- 共有リンクは読み取り専用

### 💾 データ構造
```
characters/
  ├── {characterId}/
  │   ├── userId: string
  │   ├── character_name: string
  │   ├── job: string
  │   ├── age: string
  │   ├── str_total: string
  │   ├── ... (その他のフィールド)
  │   ├── createdAt: timestamp
  │   ├── updatedAt: timestamp
  │   └── version: number

character_versions/
  ├── {versionId}/
  │   ├── characterId: string
  │   ├── userId: string
  │   ├── data: object
  │   └── createdAt: timestamp
```