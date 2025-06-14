# Next.js SSR セットアップ手順

## 🚀 セットアップ完了しました！

### 1. パッケージインストール

```bash
cd /Users/m.hirosaka/03_private/character
npm install
```

### 2. 環境変数設定

`.env.local` ファイルを作成して、Firebase設定を追加：

```bash
cp .env.local.example .env.local
```

`.env.local` ファイルを編集して、実際のFirebase認証情報を設定してください。

### 3. 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセス

### 4. 本番ビルド

```bash
npm run build
npm start
```

## 📁 新しいディレクトリ構造

```
/character
├── pages/
│   ├── index.tsx              # メインページ
│   └── character/
│       └── [id].tsx           # 動的キャラクターページ ✨
├── lib/
│   └── firebase-admin.ts      # Firebase Admin SDK
├── styles/                    # CSS/SCSS ファイル
├── public/                    # 静的ファイル
├── next.config.js            # Next.js 設定
├── package.json              # 依存関係
└── tsconfig.json             # TypeScript 設定
```

## ✨ 新機能

### SSG（Static Site Generation）
- キャラクターページが事前生成される
- **瞬間表示**を実現（参考サイトと同レベル）

### ISR（Incremental Static Regeneration） 
- 1時間ごとに自動更新
- 新しいキャラクターは動的に生成

### 最適化されたURL
- `/character/[キャラクターID]` 形式
- SEO対応のメタタグ自動生成

## 🔄 移行フロー

1. **現在**: Firebase読み込み待機 → 表示（遅い）
2. **Next.js**: サーバーサイド生成 → 即座に表示（高速）

## 🧪 テスト方法

キャラクターページの表示テスト：
```
http://localhost:3000/character/YOUR_CHARACTER_ID
```