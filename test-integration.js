#!/usr/bin/env node

// 統合テストスクリプト
const http = require('http');

console.log('🧪 Next.js + Firebase 統合テスト開始\n');

// Next.jsサーバーテスト
function testNextJSServer() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000/', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 && data.includes('クトゥルフ神話TRPG')) {
          console.log('✅ Next.jsサーバー: 正常動作');
          resolve(true);
        } else {
          console.log('❌ Next.jsサーバー: 応答異常');
          resolve(false);
        }
      });
    });
    
    req.on('error', () => {
      console.log('❌ Next.jsサーバー: 接続失敗');
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Next.jsサーバー: タイムアウト');
      resolve(false);
    });
  });
}

// 環境変数チェック
function checkEnvironment() {
  const requiredVars = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL', 
    'FIREBASE_PRIVATE_KEY'
  ];
  
  let allPresent = true;
  
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      console.log(`❌ 環境変数: ${varName} が設定されていません`);
      allPresent = false;
    }
  });
  
  if (allPresent) {
    console.log('✅ 環境変数: Firebase設定完了');
  }
  
  return allPresent;
}

// メインテスト実行
async function runTests() {
  console.log('📋 環境変数チェック:');
  const envOk = checkEnvironment();
  
  console.log('\n🌐 Next.jsサーバーチェック:');
  const serverOk = await testNextJSServer();
  
  console.log('\n📊 テスト結果:');
  console.log(`Environment: ${envOk ? '✅' : '❌'}`);
  console.log(`Next.js Server: ${serverOk ? '✅' : '❌'}`);
  
  if (envOk && serverOk) {
    console.log('\n🎉 すべてのテストが正常に完了しました！');
    console.log('\n次のステップ:');
    console.log('1. index.html でキャラクターを作成・保存');
    console.log('2. 「表示」ボタンをクリック');
    console.log('3. Next.js版の高速表示を確認');
  } else {
    console.log('\n⚠️  いくつかの問題が見つかりました。');
    if (!serverOk) {
      console.log('- npm run dev を実行してNext.jsサーバーを起動してください');
    }
  }
}

runTests();