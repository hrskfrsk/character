/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 無限リロード防止
  swcMinify: true,
  
  // 開発時の設定
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      }
      return config
    }
  }),
  
  // 静的ファイル出力設定
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
  }),
  
  images: {
    unoptimized: true
  },
  
  // SCSS設定
  sassOptions: {
    includePaths: ['./styles'],
  },
  
  // 既存のassetsディレクトリを保持
  assetPrefix: process.env.NODE_ENV === 'production' ? '/character' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/character' : '',
  
  // 静的エクスポート時の設定
  experimental: {
    esmExternals: false
  },
  
  // Firebase関連の設定
  env: {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  }
}

module.exports = nextConfig