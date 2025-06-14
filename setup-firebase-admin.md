# Firebase Admin SDK セットアップ

## 🔑 Firebase Service Account キー取得手順

### 1. Firebase Console にアクセス
1. [Firebase Console](https://console.firebase.google.com/) を開く
2. プロジェクト「hatake-ffb62」を選択

### 2. Service Account キーを生成
1. **設定** (⚙️) → **プロジェクトの設定**
2. **サービス アカウント** タブをクリック
3. **新しい秘密鍵の生成** をクリック
4. JSON ファイルをダウンロード

### 3. 環境変数に設定
ダウンロードしたJSONファイルから以下の値を取得：

```json
{
  "project_id": "hatake-ffb62",
  "client_email": "firebase-adminsdk-xxxxx@hatake-ffb62.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
}
```

`.env.local` ファイルを編集：

```bash
FIREBASE_PROJECT_ID=hatake-ffb62
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@hatake-ffb62.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-actual-private-key-here\n-----END PRIVATE KEY-----\n"
```

## 🚀 テスト用の簡易セットアップ

開発環境では、Firebaseエミュレーターを使用することも可能です：

```bash
# Firebase CLI インストール
npm install -g firebase-tools

# エミュレーター起動
firebase emulators:start --only firestore
```

## ✅ 設定確認

次のコマンドで設定を確認：

```bash
npm run dev
```

ブラウザで `http://localhost:3000/character/test-id` にアクセスして動作確認。