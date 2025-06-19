#!/bin/bash

# 開発サーバー安定起動スクリプト

echo "🔧 開発サーバーを安定起動します..."

# 既存のプロセスをクリーンアップ
echo "📋 既存プロセスをクリーンアップ中..."
pkill -f "next dev" 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# 少し待機
sleep 3

# ポート3000が空いているか確認
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ ポート3000がまだ使用されています。手動でプロセスを終了してください。"
    echo "次のコマンドを実行してください: lsof -ti:3000 | xargs kill -9"
    exit 1
fi

echo "✅ ポート3000が利用可能です"

# Node.jsのメモリとオプションを設定
export NODE_OPTIONS="--max-old-space-size=4096 --max-http-header-size=80000"

# 開発サーバーを起動
echo "🚀 開発サーバーを起動中..."
echo "📍 アクセスURL: http://localhost:3000"
echo "🛑 停止するには Ctrl+C を押してください"
echo ""

npm run dev:stable