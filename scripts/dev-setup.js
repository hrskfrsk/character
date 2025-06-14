#!/usr/bin/env node

// 開発環境セットアップ用スクリプト
const fs = require('fs');
const path = require('path');

console.log('🚀 Next.js開発環境セットアップ中...\n');

// 必要なディレクトリをチェック・作成
const requiredDirs = [
  'pages/character',
  'lib',
  'styles',
  'public/images',
  'components'
];

requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ ディレクトリ作成: ${dir}`);
  }
});

// .env.localの存在確認
if (!fs.existsSync('.env.local')) {
  console.log('⚠️  .env.local ファイルが見つかりません');
  console.log('   .env.local.example をコピーして設定してください');
  
  if (fs.existsSync('.env.local.example')) {
    fs.copyFileSync('.env.local.example', '.env.local');
    console.log('✅ .env.local.example を .env.local にコピーしました');
    console.log('   Firebase認証情報を設定してください');
  }
}

// package.jsonの存在確認
if (fs.existsSync('package.json')) {
  console.log('✅ package.json が見つかりました');
  console.log('\n次のコマンドを実行してください:');
  console.log('1. npm install');
  console.log('2. npm run dev');
} else {
  console.log('❌ package.json が見つかりません');
}

console.log('\n🎉 セットアップ完了！');
console.log('詳細は setup-nextjs.md を確認してください');