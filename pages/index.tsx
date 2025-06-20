import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { collection, getDocs, orderBy, query, limit, startAfter, DocumentSnapshot, getCountFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase-client';
import { calculateAbilityTotal } from '../lib/character-calculations';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
  const [genderFilter, setGenderFilter] = useState('');
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(true);
  const CHARACTERS_PER_PAGE = 50;

  const fetchTotalCount = async () => {
    try {
      if (!db) return;

      const countQuery = query(collection(db, 'characters'));
      const snapshot = await getCountFromServer(countQuery);
      const total = snapshot.data().count;

      setTotalCharacters(total);
      setTotalPages(Math.ceil(total / CHARACTERS_PER_PAGE));
    } catch (error) {
      console.error('総数取得エラー:', error);
    }
  };

  const fetchAllCharacters = async () => {
    try {
      setLoading(true);
      if (!db) {
        console.error('Firebase not initialized');
        setLoading(false);
        return;
      }

      // 全キャラクターを取得（検索・ソート用）
      const q = query(
        collection(db, 'characters'),
        orderBy(sortBy, sortOrder)
      );

      const querySnapshot = await getDocs(q);
      const characterList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setCharacters(characterList);
      applyFiltersAndSort(characterList);
    } catch (error) {
      console.error('キャラクター取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = (characterList: any[]) => {
    let filtered = characterList;

    // 検索フィルター
    if (searchTerm) {
      filtered = filtered.filter(character =>
        character.character_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.job?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 性別フィルター
    if (genderFilter) {
      filtered = filtered.filter(character => {
        const gender = character.gender || character.sex;
        return gender === genderFilter;
      });
    }

    // ソート
    filtered.sort((a, b) => {
      let aValue, bValue;

      // 能力値の場合は計算済みの値を使用
      if (sortBy.endsWith('_total')) {
        const abilityName = sortBy.replace('_total', '');
        aValue = calculateAbilityTotal(
          a[`${abilityName}_base`] || 0,
          a[`${abilityName}_age_mod`] || 0,
          a[`${abilityName}_other_mod`] || 0
        );
        bValue = calculateAbilityTotal(
          b[`${abilityName}_base`] || 0,
          b[`${abilityName}_age_mod`] || 0,
          b[`${abilityName}_other_mod`] || 0
        );
      } else if (sortBy === 'current_san') {
        // 現在SAN値は数値として扱う
        aValue = parseInt(a.current_san) || 0;
        bValue = parseInt(b.current_san) || 0;
      } else if (sortBy === 'cthulhu_mythos') {
        // クトゥルフ神話技能値は数値として扱う
        aValue = parseInt(a.cthulhu_mythos_total) || 0;
        bValue = parseInt(b.cthulhu_mythos_total) || 0;
      } else if (sortBy === 'height') {
        // 身長は数値部分を抽出して比較（例: "170cm" → 170）
        aValue = parseFloat(a.height?.toString().replace(/[^\d.]/g, '')) || 0;
        bValue = parseFloat(b.height?.toString().replace(/[^\d.]/g, '')) || 0;
      } else if (sortBy === 'age') {
        // 年齢は数値として扱う
        aValue = parseInt(a.age) || 0;
        bValue = parseInt(b.age) || 0;
      } else {
        aValue = a[sortBy];
        bValue = b[sortBy];

        if (sortBy === 'updatedAt' || sortBy === 'createdAt') {
          aValue = aValue?.seconds || 0;
          bValue = bValue?.seconds || 0;
        } else if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue?.toLowerCase() || '';
        }
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCharacters(filtered);

    // ページネーション用の設定
    const totalFiltered = filtered.length;
    setTotalPages(Math.ceil(totalFiltered / CHARACTERS_PER_PAGE));
    setCurrentPage(1);
  };

  const getCurrentPageCharacters = () => {
    const startIndex = (currentPage - 1) * CHARACTERS_PER_PAGE;
    const endIndex = startIndex + CHARACTERS_PER_PAGE;
    return filteredCharacters.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFiltersAndSort(characters);
  };


  useEffect(() => {
    applyFiltersAndSort(characters);
  }, [searchTerm, genderFilter, sortBy, sortOrder]);

  useEffect(() => {
    setHasNextPage(currentPage < totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    fetchTotalCount();
    fetchAllCharacters();
  }, [sortBy, sortOrder]);

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
          <div className="character-stats">
            <div className="character-count">
              全{totalCharacters}件
            </div>
            <button 
              className="search-toggle-btn"
              onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
              title={isSearchBarOpen ? '検索バーを閉じる' : '検索バーを開く'}
            >
              <i className={`fas fa-${isSearchBarOpen ? 'chevron-up' : 'search'}`}></i>
            </button>
          </div>
        </div>

        {/* 検索・ソート */}
        {isSearchBarOpen && (
          <div className="search-sort-controls">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="キャラクター名で検索..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="gender-filter">
            <span className="filter-label">性別:</span>
            <div className="gender-options">
              <label className="gender-option">
                <input
                  type="radio"
                  name="gender"
                  value=""
                  checked={genderFilter === ''}
                  onChange={(e) => setGenderFilter(e.target.value)}
                />
                <span>全て</span>
              </label>
              <label className="gender-option">
                <input
                  type="radio"
                  name="gender"
                  value="男性"
                  checked={genderFilter === '男性'}
                  onChange={(e) => setGenderFilter(e.target.value)}
                />
                <span>男性</span>
              </label>
              <label className="gender-option">
                <input
                  type="radio"
                  name="gender"
                  value="女性"
                  checked={genderFilter === '女性'}
                  onChange={(e) => setGenderFilter(e.target.value)}
                />
                <span>女性</span>
              </label>
              <label className="gender-option">
                <input
                  type="radio"
                  name="gender"
                  value="その他"
                  checked={genderFilter === 'その他'}
                  onChange={(e) => setGenderFilter(e.target.value)}
                />
                <span>その他</span>
              </label>
            </div>
          </div>
          <div className="sort-controls">
            <span className="sort-label">並び順:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="updatedAt">更新日時</option>
              <option value="character_name">名前</option>
              <option value="createdAt">作成日時</option>
              <option value="str_total">STR</option>
              <option value="con_total">CON</option>
              <option value="pow_total">POW</option>
              <option value="dex_total">DEX</option>
              <option value="app_total">APP</option>
              <option value="siz_total">SIZ</option>
              <option value="int_total">INT</option>
              <option value="edu_total">EDU</option>
              <option value="current_san">現在SAN値</option>
              <option value="cthulhu_mythos">クトゥルフ神話</option>
              <option value="height">身長</option>
              <option value="age">年齢</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="sort-order-btn"
              title={sortOrder === 'desc' ? '降順' : '昇順'}
            >
              <i className={`fas fa-sort-amount-${sortOrder === 'desc' ? 'down' : 'up'}`}></i>
            </button>
          </div>
        </div>
        )}

        {loading ? (
          <div className="loading">キャラクター一覧を読み込み中...</div>
        ) : (
          <>
            <div className="character-list">
              {getCurrentPageCharacters().length === 0 ? (
                <p>{searchTerm ? '検索結果がありません' : '保存されたキャラクターはありません'}</p>
              ) : (
                getCurrentPageCharacters().map((character) => (
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
            {filteredCharacters.length > CHARACTERS_PER_PAGE && (
              <div className="pagination">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                <span className="page-info">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={!hasNextPage}
                  className="pagination-btn"
                >
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
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .character-stats {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .character-count {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        
        .search-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          padding: 0;
          background: transparent;
          border: 1px solid #ddd;
          border-radius: 50%;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          top: -1px;
        }
        
        .search-toggle-btn:hover {
          color: var(--ui-theme-color);
          border-color: var(--ui-theme-color);
          background: var(--ui-theme-color-light);
        }
        
        .search-toggle-btn i {
          font-size: 10px;
        }
        
        .search-sort-controls {
          display: flex;
          gap: 16px;
          align-items: center;
          margin: 16px 0;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 6px;
          border: 1px solid #e9ecef;
          animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .search-box {
          position: relative;
          flex: 1;
          max-width: 300px;
        }
        
        .search-box i {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
          font-size: 14px;
        }
        
        .search-input {
          width: 100%;
          padding: 6px 10px 6px 32px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 13px;
          transition: border-color 0.3s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--ui-theme-color);
          box-shadow: 0 0 0 2px var(--ui-theme-color-light);
        }
        
        .sort-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .sort-label {
          font-size: 13px;
          color: #495057;
          font-weight: 500;
        }
        
        .sort-select {
          padding: 6px 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 13px;
          background: white;
          color: #495057;
          cursor: pointer;
          transition: border-color 0.3s ease;
          min-width: 80px;
        }
        
        .sort-select:focus {
          outline: none;
          border-color: var(--ui-theme-color);
          box-shadow: 0 0 0 2px var(--ui-theme-color-light);
        }
        
        .sort-order-btn {
          padding: 6px;
          background: white;
          color: #495057;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        }
        
        .sort-order-btn:hover {
          border-color: var(--ui-theme-color);
          color: var(--ui-theme-color);
        }
        
        .gender-filter {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }
        
        .filter-label {
          font-size: 13px;
          color: #495057;
          font-weight: 500;
        }
        
        .gender-options {
          display: flex;
          gap: 2px;
          flex-wrap: wrap;
        }
        
        .gender-option {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          font-size: 13px;
          color: #6c757d;
          padding: 2px 6px;
          border-radius: 4px;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .gender-option:hover {
          background: #f8f9fa;
        }
        
        .gender-option input[type="radio"] {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .gender-option::before {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1.5px solid #ced4da;
          background: white;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        
        .gender-option input[type="radio"]:checked + span {
          color: #495057;
        }
        
        .gender-option:has(input:checked)::before {
          border-color: var(--ui-theme-color);
          background: var(--ui-theme-color);
          box-shadow: inset 0 0 0 2.5px white;
        }
        
        .gender-option span {
          cursor: pointer;
        }
        
        .btn {
          display: inline-block;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          margin: 0 5px;
          transition: all 0.3s ease;
          font-size: 14px;
          letter-spacing: 0.02em;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .btn-primary {
          background: var(--ui-theme-color);
          color: white;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .btn-primary::before {
          content: '\\f067';
          font-family: 'Font Awesome 5 Free';
          font-weight: 900;
          font-size: 14px;
        }
        
        .btn-primary:hover {
          background: var(--ui-theme-color-hover);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
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
          bottom: 10px;
          right: 10px;
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
          background: var(--ui-theme-color);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .pagination-btn:hover:not(:disabled) {
          background: var(--ui-theme-color-hover);
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
          
          .actions {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
          
          .btn {
            padding: 8px 16px;
            font-size: 13px;
          }
          
          .btn-primary::before {
            font-size: 12px;
          }
          
          .search-sort-controls {
            flex-direction: column;
            gap: 5px;
            align-items: stretch;
          }
          
          .search-toggle-btn {
            top: 0;
          }
          
          .search-box {
            max-width: none;
          }
          
          .sort-controls {
            justify-content: center;
          }
          
          .gender-filter {
            justify-content: center;
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