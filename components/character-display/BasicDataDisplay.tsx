import React, { useState } from 'react';

interface BasicDataDisplayProps {
  character: any;
}

export default function BasicDataDisplay({ character }: BasicDataDisplayProps) {
  const [toastMessage, setToastMessage] = useState<string>('');

  // データベースから縦横比を取得、なければフォールバック
  const imageAspectRatio = character.image_aspect_ratio || null;

  // トースト通知を表示
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 2000); // 2秒後に自動で消える
  };

  // カラーコードをクリップボードにコピー
  const copyColorCode = (colorCode: string) => {
    navigator.clipboard.writeText(colorCode).then(() => {
      showToast('コピーしました');
    }, () => {
      // フォールバック：テキストエリアを作成してコピー
      const textArea = document.createElement('textarea');
      textArea.value = colorCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('コピーしました');
    });
  };

  return (
    <div className="content-wrap">
      {/* キャラクター画像 */}
      <div className={`pc-image ${imageAspectRatio ? `aspect-${imageAspectRatio}` : ''}`}>
        {character.character_image_url && (
          <img
            src={character.character_image_url}
            alt={character.character_name || 'キャラクター画像'}
            className={imageAspectRatio ? `img-${imageAspectRatio}` : ''}
          />
        )}
      </div>

      <div className="pc-data">
        {/* キャラクター名 */}
        <div className="catch-phrase" style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
          <span style={{ display: 'inline-block', marginRight: '10px', lineHeight: '1.3', position: 'relative' }}>
            {character.character_name || '無名のキャラクター'}
            {character.is_lost && (
              <span className="lost-mark" title="このキャラクターはロストしています">
                <i className="fas fa-skull-crossbones"></i>
              </span>
            )}
          </span>
          {character.character_name_kana && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 'bold',
                display: 'block',
                whiteSpace: 'nowrap',
                marginTop: '3px',
              }}
            >
              {character.character_name_kana}
            </span>
          )}
        </div>

        {/* 紹介文 */}
        {character.introduction && (
          <div className="introduction">
            <div
              style={{ whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ __html: character.introduction }}
            />

            {/* 秘匿情報 */}
            {character.secret_information && (
              <div className="data-wrap">
                <input id="acd-check-rsc" className="acd-check" type="checkbox" />
                <label className="acd-label more-secret" htmlFor="acd-check-rsc">秘匿情報込…</label>
                <div className="o-memos acd-content">
                  <div
                    style={{ whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{ __html: character.secret_information }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 基本データ */}
        <div className="spec dai-topic">
          <h2 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
            <i className="fas fa-address-card"></i> Basic data
          </h2>
          <div className="spec-wrap">
            {character.gender && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>性別</h3>
                <div>
                  {character.gender === 'その他' && character.gender_custom 
                    ? character.gender_custom 
                    : character.gender}
                </div>
              </section>
            )}

            {character.age && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>年齢</h3>
                <div>{character.age}</div>
              </section>
            )}

            {character.height && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>身長</h3>
                <div>{character.height}</div>
              </section>
            )}

            {character.weight && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>体重</h3>
                <div>{character.weight}</div>
              </section>
            )}

            {character.occupation && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>職業</h3>
                <div>{character.occupation}</div>
              </section>
            )}

            {character.birthplace && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>出身地</h3>
                <div>{character.birthplace}</div>
              </section>
            )}

            {character.era && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>時代</h3>
                <div>{character.era}</div>
              </section>
            )}

            {character.birthday && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>誕生日</h3>
                <div>{character.birthday}</div>
              </section>
            )}

            {character.zodiac_sign && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>星座</h3>
                <div>{character.zodiac_sign}</div>
              </section>
            )}

            {character.blood_type && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>血液型</h3>
                <div>{character.blood_type}</div>
              </section>
            )}

            {(character.character_color || character.character_color_code) && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>カラー</h3>
                <div>
                  {character.character_color && character.character_color}
                  {character.character_color_code && (
                    <span
                      className="color-code"
                      style={{ color: character.character_color_code, cursor: 'pointer' }}
                      onClick={() => copyColorCode(character.character_color_code)}
                      title="クリックでコピー"
                    >
                      {character.character_color ? ' ' : ''}{character.character_color_code}
                    </span>
                  )}
                </div>
              </section>
            )}

            {(character.hair_color || character.hair_color_code) && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>髪の色</h3>
                <div>
                  {character.hair_color && character.hair_color}
                  {character.hair_color_code && (
                    <span
                      className="color-code"
                      style={{ color: character.hair_color_code, cursor: 'pointer' }}
                      onClick={() => copyColorCode(character.hair_color_code)}
                      title="クリックでコピー"
                    >
                      {character.hair_color ? ' ' : ''}{character.hair_color_code}
                    </span>
                  )}
                </div>
              </section>
            )}

            {(character.eye_color || character.eye_color_code) && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>目の色</h3>
                <div>
                  {character.eye_color && character.eye_color}
                  {character.eye_color_code && (
                    <span
                      className="color-code"
                      style={{ color: character.eye_color_code, cursor: 'pointer' }}
                      onClick={() => copyColorCode(character.eye_color_code)}
                      title="クリックでコピー"
                    >
                      {character.eye_color ? ' ' : ''}{character.eye_color_code}
                    </span>
                  )}
                </div>
              </section>
            )}

            {(character.skin_color || character.skin_color_code) && (
              <section className="line01 personal" style={{ borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <h3 style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8', borderColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>肌の色</h3>
                <div>
                  {character.skin_color && character.skin_color}
                  {character.skin_color_code && (
                    <span
                      className="color-code"
                      style={{ color: character.skin_color_code, cursor: 'pointer' }}
                      onClick={() => copyColorCode(character.skin_color_code)}
                      title="クリックでコピー"
                    >
                      {character.skin_color ? ' ' : ''}{character.skin_color_code}
                    </span>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* トースト通知 */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#333',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 1000,
            fontSize: '14px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}