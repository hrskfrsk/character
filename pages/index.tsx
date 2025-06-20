import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase-client';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        if (!db) {
          console.error('Firebase not initialized');
          setLoading(false);
          return;
        }

        // キャラクター一覧を更新日時の降順で取得
        const q = query(
          collection(db, 'characters'), 
          orderBy('updatedAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const characterList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setCharacters(characterList);
      } catch (error) {
        console.error('キャラクター取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);


  return (
    <>
      <Head>
        <title>クトゥルフ神話TRPG第6版 キャラクターシート</title>
        <meta name="description" content="Call of Cthulhu 6th Edition Character Sheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main className="container page-with-header">
        
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
                  {character.is_lost && (
                    <div className="lost-badge">
                      <i className="fas fa-skull-crossbones"></i>
                      <span>LOST</span>
                    </div>
                  )}
                  <Link href={`/character/${character.id}`} className="character-card-link">
                    <div className="character-avatar">
                      {character.face_image_url ? (
                        <img 
                          src={character.face_image_url} 
                          alt={`${character.character_name}の顔画像`}
                          className="face-image"
                        />
                      ) : (
                        <div className="face-placeholder">
                          <i className="fas fa-user"></i>
                        </div>
                      )}
                    </div>
                    <div className="character-info">
                      <h3>{character.character_name || '無名のキャラクター'}</h3>
                      {character.updatedAt && (
                        <div className="last-updated">
                          最終更新: {new Date(character.updatedAt.seconds * 1000).toLocaleDateString('ja-JP')}
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="character-actions">
                    <Link 
                      href={`/create?edit=${character.id}`} 
                      className="edit-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fas fa-edit"></i>
                      <span>編集</span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
      
      <Footer />
      
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Kosugi', 'Varela Round', sans-serif;
        }
        
        h1 {
          color: #333;
          text-align: center;
          margin-bottom: 30px;
        }
        
        .actions {
          margin: 20px 0;
          text-align: center;
        }
        
        .btn {
          display: inline-block;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          margin: 0 5px;
          transition: all 0.3s ease;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .btn-primary {
          background-color: #4CAF50;
          color: white;
        }
        
        .btn-secondary {
          background-color: #2196F3;
          color: white;
        }
        
        .btn-edit {
          background-color: #FF9800;
          color: white;
        }
        
        .btn-danger {
          background-color: #f44336;
          color: white;
        }
        
        .btn-danger:hover {
          background-color: #d32f2f;
        }
        
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .character-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .character-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }
        
        .character-card-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          flex: 1;
          cursor: pointer;
        }
        
        .character-card-link:hover {
          text-decoration: none;
          color: inherit;
        }
        
        .character-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }
        
        .character-avatar {
          width: 100%;
          height: 180px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f0f0f0;
          position: relative;
        }
        
        .face-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .face-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 48px;
        }
        
        .character-info {
          padding: 20px;
          text-align: center;
          width: 100%;
        }
        
        .character-info h3 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 1.2em;
        }
        
        
        .last-updated {
          font-size: 0.8em;
          color: #999;
          margin-top: 10px;
        }
        
        .lost-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.85);
          color: white;
          border-radius: 12px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 15;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
        }
        
        .lost-badge i {
          font-size: 10px;
        }
        
        .character-actions {
          position: absolute;
          bottom: 15px;
          right: 15px;
          z-index: 10;
        }
        
        .edit-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.95);
          color: #2196F3;
          border: 1px solid rgba(33, 150, 243, 0.3);
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          backdrop-filter: blur(10px);
        }
        
        .edit-btn:hover {
          background: #2196F3;
          color: white;
          border-color: #2196F3;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
          text-decoration: none;
        }
        
        .edit-btn i {
          font-size: 12px;
        }
        
        .edit-btn span {
          font-size: 13px;
        }
        
        
        .loading {
          text-align: center;
          padding: 40px;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .character-list {
            grid-template-columns: 1fr;
          }
          
          .character-avatar {
            height: 150px;
          }
          
          .face-placeholder {
            font-size: 36px;
          }
          
          .lost-badge {
            top: 8px;
            left: 8px;
            padding: 3px 6px;
            font-size: 10px;
            border-radius: 10px;
          }
          
          .lost-badge i {
            font-size: 9px;
          }
          
          .character-actions {
            bottom: 10px;
            right: 10px;
          }
          
          .edit-btn {
            padding: 6px 10px;
            font-size: 12px;
            border-radius: 16px;
          }
          
          .edit-btn i {
            font-size: 11px;
          }
          
          .edit-btn span {
            font-size: 12px;
          }
          
          .container {
            padding: 10px;
          }
        }
        
        @media (max-width: 480px) {
          .character-avatar {
            height: 120px;
          }
          
          .face-placeholder {
            font-size: 30px;
          }
          
          .lost-badge {
            top: 6px;
            left: 6px;
            padding: 2px 5px;
            font-size: 9px;
            gap: 3px;
          }
          
          .lost-badge i {
            font-size: 8px;
          }
          
          .character-info {
            padding: 15px;
          }
        }
      `}</style>
    </>
  );
}