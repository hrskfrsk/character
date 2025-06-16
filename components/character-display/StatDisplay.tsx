import React from 'react';

interface StatDisplayProps {
  character: any;
}

export default function StatDisplay({ character }: StatDisplayProps) {
  return (
    <>
      <div className="slots d-flex">
        <div className="now-san slot">
          <h3>現在SAN値</h3>
          <div className="slot-txt">
            <span>
              <span id="current_san">{character.current_san || '-'}</span>
              <span>/
                <span id="max_san">{character.max_san_value || '-'}</span>
              </span>
            </span>
          </div>
        </div>
        <div className="db slot">
          <h3>ダメ―ジボーナス</h3>
          <div className="slot-txt">
            <span id="damage_bonus">{character.damage_bonus || '-'}</span>
          </div>
        </div>
        <div className="jobp slot">
          <h3>職業P</h3>
          <div className="slot-txt">
            <span><span id="job_points_used">{character.job_points_used || '-'}</span>
              <span>/</span>
              <span id="job_points_total">{character.job_points_total || '-'}</span></span>

            <span id="job_points_formula_text">
              ( {(() => {
                const formula = character.job_points_formula || 'edu20';
                switch (formula) {
                  case 'edu20': return 'EDU×20';
                  case 'edu10_str10': return 'EDU×10+STR×10';
                  case 'edu10_con10': return 'EDU×10+CON×10';
                  case 'edu10_pow10': return 'EDU×10+POW×10';
                  case 'edu10_dex10': return 'EDU×10+DEX×10';
                  case 'edu10_app10': return 'EDU×10+APP×10';
                  case 'edu10_siz10': return 'EDU×10+SIZ×10';
                  case 'edu10_int10': return 'EDU×10+INT×10';
                  case 'manual': return '手動入力';
                  default: return 'EDU×20';
                }
              })()} )
            </span>

          </div>
        </div>
        <div className="intp slot">
          <h3>興味P</h3>
          <div className="slot-txt">
            <span>
              <span id="interest_points_used">{character.interest_points_used || '-'}</span>
              <span>/</span>
              <span id="interest_points_total">{character.interest_points_total || '-'}</span>
            </span>
            <span id="interest_points_extra">
              ( 追加分 ：
              {character.interest_points_extra || '-'} )</span>
          </div>
        </div>
      </div>

      {/* 特徴セクション */}
      <div className="features">
        <ul>
          {(() => {
            const traitElements = [];
            // trait_1からtrait_50まで確認して存在するもののみ表示
            for (let i = 1; i <= 50; i++) {
              const traitNumber = character[`trait_${i}_number`];
              const traitName = character[`trait_${i}_name`];
              const traitDescription = character[`trait_${i}_description`];

              if (traitName) {
                traitElements.push(
                  <li key={i} className="d-flex f-list" style={{ borderLeftColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                    <div className="f-label" style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                      <span className="num">{traitNumber || '0-0'}</span>
                      <span className="name">{traitName}</span>
                    </div>
                    <div className="contents">
                      {traitDescription || '-'}
                    </div>
                  </li>
                );
              }
            }
            return traitElements.length > 0 ? traitElements : (
              <li className="d-flex f-list" style={{ borderLeftColor: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                <div className="f-label" style={{ color: character.ui_theme_color || character.character_color_code || '#22c6d8' }}>
                  <span className="num">-</span>
                  <span className="name">特徴なし</span>
                </div>
                <div className="contents">-</div>
              </li>
            );
          })()}
        </ul>
      </div>

      {/* ベース職業と特記事項 */}
      <div className="d-flex job-base">
        <div>
          <span>ベース</span>
          {character.job || '-'}
        </div>
        <div>
          <span>特　記</span>
          {character.special_notes || ''}
        </div>
      </div>
    </>
  );
}