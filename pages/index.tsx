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
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const handleDelete = async (characterId: string, characterName: string) => {
    if (!confirm(`本当に「${characterName}」を削除しますか？\nこの操作は取り消せません。`)) {
      return;
    }

    setDeletingId(characterId);

    try {
      const response = await fetch(`/api/characters/${characterId}/delete`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 削除成功したらリストから削除
        setCharacters(characters.filter(char => char.id !== characterId));
        alert('キャラクターを削除しました');
      } else {
        const error = await response.json();
        alert(`削除に失敗しました: ${error.error || '不明なエラー'}`);
      }
    } catch (error) {
      console.error('削除エラー:', error);
      alert('削除中にエラーが発生しました');
    } finally {
      setDeletingId(null);
    }
  };

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
                  <div className="character-info">
                    <h3>{character.character_name || '無名のキャラクター'}</h3>
                    <div className="character-details">
                      <span className="detail-item">職業: {character.job || '-'}</span>
                      <span className="detail-item">年齢: {character.age || '-'}</span>
                      <span className="detail-item">性別: {character.gender || '-'}</span>
                    </div>
                    {character.updatedAt && (
                      <div className="last-updated">
                        最終更新: {new Date(character.updatedAt.seconds * 1000).toLocaleDateString('ja-JP')}
                      </div>
                    )}
                  </div>
                  <div className="character-actions">
                    <Link href={`/character/${character.id}`} className="btn btn-secondary">
                      <i className="fas fa-eye"></i> 表示
                    </Link>
                    <Link href={`/create?edit=${character.id}`} className="btn btn-edit">
                      <i className="fas fa-edit"></i> 編集
                    </Link>
                    <button 
                      onClick={() => handleDelete(character.id, character.character_name || '無名のキャラクター')}
                      className="btn btn-danger"
                      disabled={deletingId === character.id}
                    >
                      <i className="fas fa-trash"></i> {deletingId === character.id ? '削除中...' : '削除'}
                    </button>
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
          padding: 20px;
          border-radius: 8px;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .character-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }
        
        .character-info h3 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 1.2em;
        }
        
        .character-details {
          margin: 10px 0;
        }
        
        .detail-item {
          display: block;
          margin: 5px 0;
          color: #666;
          font-size: 0.9em;
        }
        
        .last-updated {
          font-size: 0.8em;
          color: #999;
          margin-top: 10px;
        }
        
        .character-actions {
          margin-top: 15px;
          display: flex;
          gap: 10px;
        }
        
        .character-actions .btn {
          flex: 1;
          text-align: center;
          padding: 8px 16px;
          font-size: 0.9em;
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
          
          .container {
            padding: 10px;
          }
        }
      `}</style>
    </>
  );
}