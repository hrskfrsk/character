import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { collection, getDocs, orderBy, query, limit, startAfter, DocumentSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase-client';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const CHARACTERS_PER_PAGE = 50;

  const fetchCharacters = async (page: number = 1, lastDocument: DocumentSnapshot | null = null) => {
    try {
      setLoading(true);
      if (!db) {
        console.error('Firebase not initialized');
        setLoading(false);
        return;
      }

      // ページごとにキャラクター一覧を取得
      let q = query(
        collection(db, 'characters'),
        orderBy('updatedAt', 'desc'),
        limit(CHARACTERS_PER_PAGE + 1) // +1で次ページの有無を確認
      );

      // 2ページ目以降の場合、最後のドキュメントから開始
      if (lastDocument) {
        q = query(
          collection(db, 'characters'),
          orderBy('updatedAt', 'desc'),
          startAfter(lastDocument),
          limit(CHARACTERS_PER_PAGE + 1)
        );
      }

      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;
      
      // 次ページがあるかどうかを確認
      const hasMore = docs.length > CHARACTERS_PER_PAGE;
      setHasNextPage(hasMore);
      
      // 実際に表示するデータ（最大50件）
      const characterList = docs.slice(0, CHARACTERS_PER_PAGE).map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // 最後のドキュメントを保存（次ページ用）
      if (characterList.length > 0) {
        setLastDoc(docs[characterList.length - 1]);
      }

      setCharacters(characterList);
      setCurrentPage(page);
    } catch (error) {
      console.error('キャラクター取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchCharacters(currentPage + 1, lastDoc);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      // 前ページに戻る場合は最初から再取得（簡易実装）
      fetchCharacters(1);
      // より複雑な実装では前ページのlastDocを保存する必要がある
    }
  };

  useEffect(() => {
    fetchCharacters(1);
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
          <>
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
                    <Link href={`/character/${character.id}`} className="character-card-link" style={{ textDecoration: 'none' }}>
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
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* ページネーション */}
            {characters.length > 0 && (currentPage > 1 || hasNextPage) && (
              <div className="pagination">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  <i className="fas fa-chevron-left"></i>
                  前のページ
                </button>
                
                <span className="page-info">
                  ページ {currentPage}
                </span>
                
                <button 
                  onClick={handleNextPage}
                  disabled={!hasNextPage}
                  className="pagination-btn"
                >
                  次のページ
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .container {
          max-width: 1400px;
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
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        
        @media (min-width: 1200px) {
          .character-list {
            grid-template-columns: repeat(5, 1fr);
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
          }
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
        
        a.character-card-link {
          text-decoration: none !important;
          color: inherit !important;
          display: flex;
          flex-direction: column;
          flex: 1;
          cursor: pointer;
        }
        
        a.character-card-link:hover {
          text-decoration: none !important;
          color: inherit !important;
        }
        
        a.character-card-link:visited {
          text-decoration: none !important;
          color: inherit !important;
        }
        
        a.character-card-link:focus {
          text-decoration: none !important;
          color: inherit !important;
        }
        
        a.character-card-link * {
          text-decoration: none !important;
        }
        
        a.character-card-link:hover * {
          text-decoration: none !important;
        }
        
        .character-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }
        
        .character-avatar {
          width: 100%;
          height: 150px;
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
          padding: 5px 10px 11px;
          text-align: center;
          width: 100%;
        }
        
        .character-info h3 {
          margin: 0 0 3px 0;
          color: #57595d;
          font-size: 0.95em;
          font-weight: 500;
        }
        
        
        .last-updated {
          font-size: 0.7em;
          color: #999;
          margin-top: 6px;
          line-height: 1.3;
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
          bottom: 5px;
          right: 5px;
          z-index: 10;
          
        }
        
        .edit-btn {
          display: flex;
          align-items: center;
          color: #333;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
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
        
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin: 40px 0;
          padding: 20px;
        }
        
        .pagination-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .pagination-btn:hover:not(:disabled) {
          background: #45a049;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .pagination-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .page-info {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          padding: 0 10px;
        }
        
        @media (max-width: 1199px) and (min-width: 769px) {
          .character-list {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .character-list {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          
          .character-avatar {
            height: 130px;
          }
          
          .face-placeholder {
            font-size: 32px;
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
          
          .pagination {
            gap: 15px;
            margin: 30px 0;
            padding: 15px;
          }
          
          .pagination-btn {
            padding: 10px 16px;
            font-size: 13px;
          }
          
          .page-info {
            font-size: 14px;
          }
        }
        
        @media (max-width: 480px) {
          .character-list {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          
          .character-avatar {
            height: 110px;
          }
          
          .face-placeholder {
            font-size: 28px;
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
          
          .pagination {
            flex-direction: column;
            gap: 10px;
            margin: 20px 0;
            padding: 10px;
          }
          
          .pagination-btn {
            padding: 8px 12px;
            font-size: 12px;
            width: 100%;
            max-width: 200px;
          }
          
          .page-info {
            font-size: 13px;
            order: -1;
          }
        }
      `}</style>
    </>
  );
}