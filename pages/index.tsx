import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // SSRでのハイドレーション問題を避ける
  }

  return (
    <>
      <Head>
        <title>クトゥルフ神話TRPG第6版 キャラクターシート</title>
        <meta name="description" content="クトゥルフ神話TRPG第6版のキャラクターシートを簡単に作成・管理できるWebアプリケーション" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header showCreateButton={false} />

      <main className="hero-page">
        {/* ヒーローセクション */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                <img src="/images/logo.svg" alt="ChroLog - クトゥルフ神話TRPG キャラクターシート" className="hero-logo" />
              </h1>
              <p className="hero-subtitle">
                第6版対応の使いやすいキャラクターシート作成ツール
              </p>
              <p className="hero-description">
                キャラクター作成から管理、セッション中の使用まで<br />
                すべてをサポートする総合ツールです
              </p>

              <div className="hero-actions">
                {user ? (
                  <>
                    <Link href="/create" className="btn btn-primary btn-large">
                      新しいキャラクター作成
                    </Link>
                    <Link href="/list" className="btn btn-secondary btn-large">
                      <i className="fas fa-list"></i>
                      キャラクター一覧
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signup" className="btn btn-primary btn-large">
                      <i className="fas fa-user-plus"></i>
                      今すぐ始める
                    </Link>
                    <Link href="/auth/login" className="btn btn-secondary btn-large">
                      <i className="fas fa-sign-in-alt"></i>
                      ログイン
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="hero-image">
              <div className="character-sheet-preview">
                <i className="fas fa-scroll"></i>
                <span>キャラクターシート</span>
              </div>
            </div>
          </div>
        </section>

        {/* 機能紹介セクション */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">主な機能</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-edit"></i>
                </div>
                <h3>簡単作成</h3>
                <p>直感的なフォームでキャラクターを素早く作成。能力値の自動計算やスキル管理も簡単です。</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-dice-d20"></i>
                </div>
                <h3>セッション支援</h3>
                <p>ダイスロール機能やココフォリア連携で、実際のセッションもスムーズに進行できます。</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-share-alt"></i>
                </div>
                <h3>共有機能</h3>
                <p>キャラクターシートをURLで簡単共有。KPやプレイヤー間での情報共有が便利です。</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-cloud"></i>
                </div>
                <h3>クラウド保存</h3>
                <p>データは安全にクラウドに保存。どこからでもアクセスでき、データの紛失もありません。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 使い方セクション */}
        <section className="howto-section">
          <div className="container">
            <h2 className="section-title">使い方</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>アカウント作成</h3>
                  <p>無料でアカウントを作成し、ログインします</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>キャラクター作成</h3>
                  <p>フォームに沿って探索者の情報を入力します</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>セッションで使用</h3>
                  <p>作成したシートをセッションで活用します</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        {!user && (
          <section className="cta-section">
            <div className="container">
              <div className="cta-content">
                <h2>今すぐ始めましょう</h2>
                <p>無料でアカウントを作成して、キャラクターシート作成を始めましょう</p>
                <Link href="/auth/signup" className="btn btn-primary btn-large">
                  <i className="fas fa-rocket"></i>
                  無料で始める
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .hero-page {
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(180deg,#74cdc3 35%,transparent);
          padding: 120px 0 80px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .hero-content {
          text-align: left;
        }

        .hero-title {
          margin-bottom: 20px;
        }

        .hero-logo {
          width: 100%;
          max-width: 400px;
          height: auto;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
        }

        .hero-subtitle {
          font-size: 1.4rem;
          margin-bottom: 16px;
          font-weight: 500;
          opacity: 0.95;
        }

        .hero-description {
          font-size: 1.1rem;
          margin-bottom: 40px;
          line-height: 1.6;
          opacity: 0.9;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-image {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .character-sheet-preview {
          width: 250px;
          height: 300px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .character-sheet-preview i {
          font-size: 4rem;
          opacity: 0.8;
        }

        .character-sheet-preview span {
          font-size: 1.2rem;
          font-weight: 500;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-large {
          padding: 16px 32px;
          font-size: 18px;
        }

        .btn-primary {
          background: #ffffff;
          color: #74cdc3;
        }

        .btn-primary:hover {
          background: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.8);
          transform: translateY(-2px);
        }

        .features-section {
          padding: 80px 0;
          background: #f8f9fa;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 60px;
          color: #333;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
        }

        .feature-card {
          background: white;
          padding: 40px 30px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          background: var(--ui-theme-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: white;
          font-size: 2rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #333;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
        }

        .howto-section {
          padding: 80px 0;
          background: white;
        }

        .steps-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          max-width: 900px;
          margin: 0 auto;
        }

        .step {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .step-number {
          width: 50px;
          height: 50px;
          background: var(--ui-theme-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .step-content h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        .step-content p {
          color: #666;
          line-height: 1.6;
        }

        .cta-section {
          padding: 80px 0;
          background: var(--ui-theme-color);
          color: white;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-content p {
          font-size: 1.2rem;
          margin-bottom: 32px;
          opacity: 0.9;
        }

        .cta-section .btn-primary {
          background: white;
          color: var(--ui-theme-color);
        }

        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .hero-logo {
            max-width: 300px;
          }

          .hero-actions {
            justify-content: center;
          }

          .btn-large {
            padding: 14px 24px;
            font-size: 16px;
          }

          .section-title {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .steps-container {
            grid-template-columns: 1fr;
          }

          .step {
            text-align: center;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}