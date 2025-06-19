/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 無限リロード防止
  swcMinify: true,
  
  // 開発時の設定
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config, { dev }) => {
      if (dev) {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
          ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
        }
        // ホットリロード安定化
        config.infrastructureLogging = {
          level: 'error',
        }
        // キャッシュ設定
        config.cache = {
          type: 'filesystem',
          buildDependencies: {
            config: [__filename],
          },
        }
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
  
  // CORS警告の修正
  allowedDevOrigins: ['http://127.0.0.1:3000'],
  
  // 静的エクスポート時の設定
  experimental: {
    esmExternals: false,
    // 開発時のみFast Refresh調整を適用
    ...(process.env.NODE_ENV === 'development' && {
      forceSwcTransforms: true,
    })
  },
  
  // Firebase関連の設定
  env: {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  }
}

module.exports = nextConfig