import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>
            <img src="/images/logo.svg" alt="ChroLog" style={{ width: '100%', height: 'auto' }} />
          </h3>
          <p>Call of Cthulhu 6th Edition Character Sheet</p>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h4>リンク</h4>
            <ul>
              <li><a href="/">ホーム</a></li>
              <li><a href="/create">キャラクター作成</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>情報</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>使い方</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>お問い合わせ</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 ChroLog. All rights reserved.</p>
        <p>当サイトは、「株式会社アークライト」および「株式会社KADOKAWA」が権利を有する『クトゥルフ神話TRPG』シリーズの二次創作物です。</p>
        <p>Call of Cthulhu is copyright ©1981, 2015, 2019 by Chaosium Inc. All rights reserved. Arranged by Arclight Inc.<br />
          Call of Cthulhu is a registered trademark of Chaosium Inc.<br />
          PUBLISHED BY KADOKAWA CORPORATION 「クトゥルフ神話TRPG」</p>
      </div>
    </footer>
  );
};

export default Footer;