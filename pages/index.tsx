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
        <title>ChroLog</title>
        <meta name="description" content="クトゥルフ神話TRPG第6版のキャラクターシートを簡単に作成・管理できるWebアプリケーション ChroLog" />
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

                <img src="/images/logo_white.svg" alt="ChroLog - クトゥルフ神話TRPG キャラクターシート" className="hero-logo" />
              </h1>
              <p className="hero-tagline">「隠したい」も「見せたい」も。より自由で繊細なキャラ管理を。</p>
              <p className="hero-subtitle">
                ChroLog（クローグ）は、クトゥルフ神話TRPG（6版）のキャラクターシートを<br />
                作成・管理・共有できる、プレイヤー向けのオンラインツールです。
              </p>


              <div className="hero-actions">
                {user ? (
                  <>
                    <Link href="/create" className="btn btn-primary btn-large">
                      新しいキャラクター作成
                    </Link>
                    <Link
                      href="/list"
                      className="btn btn-secondary btn-large"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '16px 32px',
                        border: '2px solid rgba(255, 255, 255, 0.5)',
                        borderRadius: '50px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white'
                      }}
                    >
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
                    <Link
                      href="/auth/login"
                      className="btn btn-secondary btn-large"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '16px 32px',
                        border: '2px solid rgba(255, 255, 255, 0.5)',
                        borderRadius: '50px',
                        fontSize: '18px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white'
                      }}
                    >
                      <i className="fas fa-sign-in-alt"></i>
                      ログイン
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 機能紹介セクション */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">主な特徴</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-portrait"></i>
                </div>
                <h3>立ち絵アップロード対応</h3>
                <p>キャラクターのビジュアルも一緒に残せます。雰囲気や世界観の共有にも◎</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-user-lock"></i>
                </div>
                <h3>公開範囲を柔軟にカスタマイズ</h3>
                <p>部分的なパスワード保護はもちろん、ページ内の特定情報を除外した公開用シートの生成も可能。</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-gamepad"></i>
                </div>
                <h3>ココフォリア用コマを自動生成</h3>
                <p>キャラ情報を元に、ワンクリックでコマを出力できます。</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-dice-d20"></i>
                </div>
                <h3>シート内でダイスロールが可能</h3>
                <p>能力値の個別・一括ダイスロールに対応。技能値ダイス判定もできるので、簡易に判定したい時にも。</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-sticky-note"></i>
                </div>
                <h3>パスワード付きメモページ機能</h3>
                <p>メモ単位で専用ページを発行・制限可能。PLメモやKPとの情報共有にも最適です。</p>
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
          background: linear-gradient(368deg,#5fb5aa 29%,transparent), url('/images/img_top.png');
          background-size: cover, cover;
          background-position: center, center 20%;
          background-repeat: no-repeat, no-repeat;
          padding: 80px 0 90px;
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
          max-width: 1180px;
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
          font-size: 0.9rem;
          margin-bottom: 35px;
          font-weight: 600;
          opacity: 0.95;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
        }

        .hero-tagline {
          font-size: 1.15rem;
          font-weight: 900;
          line-height: 1.6;
          color: white;
          margin: 0 0 12px -9px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
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
          background: rgba(255, 255, 255, 0.2) !important;
          color: white !important;
          border: 2px solid rgba(255, 255, 255, 0.5) !important;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3) !important;
          border-color: rgba(255, 255, 255, 0.8) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
        }

        .features-section {
          padding: 50px 0 80px;
          background: linear-gradient(180deg,#5fb5aa 35%,transparent);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-title {
          text-align: left;
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #fff;
          border-bottom:dotted 1px #fff;
          padding: 0 10px 10px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.9);
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
          background: var(--ui-theme-color-hover);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: white;
          font-size: 2rem;
        }

        .feature-card h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: #333;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
          font-size:0.9rem;
          margin-top:0;
        }



        .cta-section {
          padding: 80px 0;
          background: var(--ui-theme-color-hover);
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
          .hero-section{
            padding-bottom:90px;
          }
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .hero-logo {
            max-width: 300px;
          }

          .hero-tagline {
            font-size: 1.4rem;
            margin-right:5px;
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

        }
      `}</style>
    </>
  );
}