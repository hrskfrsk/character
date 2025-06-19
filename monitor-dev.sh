#!/bin/bash

# 開発サーバー監視スクリプト

echo "👀 開発サーバーの状態を監視します..."

check_server() {
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ $(date '+%H:%M:%S') - サーバーは正常に動作中"
        return 0
    else
        echo "❌ $(date '+%H:%M:%S') - サーバーにアクセスできません"
        return 1
    fi
}

restart_server() {
    echo "🔄 $(date '+%H:%M:%S') - サーバーを再起動します..."
    
    # 既存プロセスを停止
    pkill -f "next dev" 2>/dev/null || true
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    
    sleep 3
    
    # バックグラウンドで再起動
    nohup npm run dev:stable > dev-server.log 2>&1 &
    
    # 起動を待機
    sleep 10
    
    if check_server; then
        echo "✅ $(date '+%H:%M:%S') - サーバーが正常に再起動しました"
    else
        echo "❌ $(date '+%H:%M:%S') - サーバーの再起動に失敗しました"
    fi
}

# メイン監視ループ
while true; do
    if ! check_server; then
        restart_server
    fi
    sleep 30  # 30秒ごとにチェック
done