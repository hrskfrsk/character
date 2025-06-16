# Firebase Storage 設定手順

## 1. Firebase プロジェクト作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: `character-sheet-app`）
4. Google Analytics は任意で設定

## 2. Storage 設定

1. 左メニューから「Storage」を選択
2. 「始める」をクリック
3. セキュリティルールで「テストモードで開始」を選択
4. ロケーションを選択（asia-northeast1 推奨）

## 3. Web アプリ設定

1. プロジェクト設定 (⚙️) → 「全般」タブ
2. 「アプリ」セクションで Web アプリを追加 (`</>` アイコン)
3. アプリ名を入力
4. 「Firebase SDK の追加」で設定情報をコピー

## 4. 環境変数設定

`.env.local` ファイルを作成し、Firebase設定を追加：

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 5. セキュリティルール設定（推奨）

Storage のルールタブで以下に変更：

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /character_images/{allPaths=**} {
      allow read: if true;
      allow write: if request.resource.size < 5 * 1024 * 1024 
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

このルールにより：
- 画像の読み取りは誰でも可能
- アップロードは5MB以下の画像のみ
- character_images フォルダのみアップロード可能

## 6. 完了

環境変数を設定後、開発サーバーを再起動してください：

```bash
npm run dev
```

## トラブルシューティング

### Firebase の初期化エラー
- 環境変数が正しく設定されているか確認
- `.env.local` ファイルがプロジェクトルートにあるか確認

### アップロードエラー
- Firebase Storage が有効になっているか確認
- セキュリティルールが正しく設定されているか確認
- ネットワーク接続を確認

### 料金について
- 無料枠: 5GB ストレージ、1GB/日 ダウンロード
- 超過時の料金: ストレージ $0.026/GB/月、ダウンロード $0.12/GB