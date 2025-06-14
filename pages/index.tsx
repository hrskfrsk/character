import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // クライアントサイドでFirebaseからキャラクター一覧を取得
    // TODO: この部分は後でサーバーサイドに移行
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>クトゥルフ神話TRPG第6版 キャラクターシート</title>
        <meta name="description" content="Call of Cthulhu 6th Edition Character Sheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="container">
        <h1>クトゥルフ神話TRPG第6版 キャラクターシート</h1>
        
        <div className="actions">
          <Link href="/create" className="btn btn-primary">
            新しいキャラクター作成
          </Link>
        </div>
        
        {loading ? (
          <div className="loading">キャラクター一覧を読み込み中...</div>
        ) : (
          <div className="character-list">
            {characters.length === 0 ? (
              <p>保存されたキャラクターはありません</p>
            ) : (
              characters.map((character) => (
                <div key={character.id} className="character-card">
                  <h3>{character.character_name || '無名のキャラクター'}</h3>
                  <p>職業: {character.job || '-'} | 年齢: {character.age || '-'}</p>
                  <Link href={`/character/${character.id}`} className="btn btn-secondary">
                    表示
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </main>
      
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .actions {
          margin: 20px 0;
        }
        
        .btn {
          display: inline-block;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .btn-primary {
          background-color: #4CAF50;
          color: white;
        }
        
        .btn-secondary {
          background-color: #2196F3;
          color: white;
        }
        
        .character-card {
          border: 1px solid #ddd;
          padding: 15px;
          margin: 10px 0;
          border-radius: 4px;
        }
        
        .loading {
          text-align: center;
          padding: 40px;
        }
      `}</style>
    </>
  );
}