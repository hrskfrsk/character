import React from 'react';

interface CharacterHeaderProps {
  character: any;
  calculateAbilityTotal: () => number;
}

export default function CharacterHeader({
  character,
  calculateAbilityTotal
}: CharacterHeaderProps) {
  return (
    <>

      <div className="scores d-flex">
        {/* 能力値 */}
        <ul className="basic-score d-flex ul-score">
          <li className="name">
            <h3>TOTAL</h3>
            <div className="score-sum">
              <span style={{
                fontWeight: 'bold',
                fontSize: '12px',
                color: '#888',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '28px',
              }}>
                {calculateAbilityTotal()}
              </span>
            </div>
            <ul className="score-detail">
              <li>基礎能力</li>
              <li className="ages">年齢修正</li>
              <li>他増減</li>
            </ul>
          </li>

          {/* STR */}
          <li className="str score-li">
            <h3 style={{ background: character.ui_theme_color || character.character_color_code || '#74cdc3' }}>STR</h3>
            <div className="score-sum">
              <span id="str_total">{character.str_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span className="val" id="str_base">{character.str_base || '-'}</span>
              </li>
              <li className="ages">
                <span className="val" id="str_age_mod">{character.str_age_mod || '-'}</span>
              </li>
              <li>
                <span className="val" id="str_other_mod">{character.str_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          {/* CON */}
          <li className="con score-li">
            <h3 style={{ background: character.ui_theme_color || character.character_color_code || '#74cdc3' }}>CON</h3>
            <div className="score-sum">
              <span id="con_total">{character.con_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span className="val" id="con_base">{character.con_base || '-'}</span>
              </li>
              <li className="ages">
                <span className="val" id="con_age_mod">{character.con_age_mod || '-'}</span>
              </li>
              <li>
                <span className="val" id="con_other_mod">{character.con_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          {/* POW */}
          <li className="pow score-li">
            <h3 style={{ background: character.ui_theme_color || character.character_color_code || '#74cdc3' }}>POW</h3>
            <div className="score-sum">
              <span id="pow_total">{character.pow_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span className="val" id="pow_base">{character.pow_base || '-'}</span>
              </li>
              <li className="ages">
                <span className="val" id="pow_age_mod">{character.pow_age_mod || '-'}</span>
              </li>
              <li>
                <span className="val" id="pow_other_mod">{character.pow_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          {/* DEX */}
          <li className="dex score-li">
            <h3 style={{ background: character.ui_theme_color || character.character_color_code || '#74cdc3' }}>DEX</h3>
            <div className="score-sum">
              <span id="dex_total">{character.dex_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span className="val" id="dex_base">{character.dex_base || '-'}</span>
              </li>
              <li className="ages">
                <span className="val" id="dex_age_mod">{character.dex_age_mod || '-'}</span>
              </li>
              <li>
                <span className="val" id="dex_other_mod">{character.dex_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          {/* APP */}
          <li className="app score-li">
            <h3 style={{ background: character.ui_theme_color || character.character_color_code || '#74cdc3' }}>APP</h3>
            <div className="score-sum">
              <span id="app_total">{character.app_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span className="val" id="app_base">{character.app_base || '-'}</span>
              </li>
              <li className="ages">
                <span className="val" id="app_age_mod">{character.app_age_mod || '-'}</span>
              </li>
              <li>
                <span className="val" id="app_other_mod">{character.app_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          {/* SIZ */}
          <li className="siz score-li">
            <h3 style={{ background: character.ui_theme_color || character.character_color_code || '#74cdc3' }}>SIZ</h3>
            <div className="score-sum">
              <span id="siz_total">{character.siz_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span className="val" id="siz_base">{character.siz_base || '-'}</span>
              </li>
              <li className="ages">
                <span className="val" id="siz_age_mod">{character.siz_age_mod || '-'}</span>
              </li>
              <li>
                <span className="val" id="siz_other_mod">{character.siz_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          {/* INT */}
          <li className="int score-li">
            <h3 style={{ background: character.ui_theme_color || character.character_color_code || '#74cdc3' }}>INT</h3>
            <div className="score-sum">
              <span id="int_total">{character.int_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span className="val" id="int_base">{character.int_base || '-'}</span>
              </li>
              <li className="ages">
                <span className="val" id="int_age_mod">{character.int_age_mod || '-'}</span>
              </li>
              <li>
                <span className="val" id="int_other_mod">{character.int_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          {/* EDU */}
          <li className="edu score-li">
            <h3 style={{ background: character.ui_theme_color || character.character_color_code || '#74cdc3' }}>EDU</h3>
            <div className="score-sum">
              <span id="edu_total">{character.edu_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span className="val" id="edu_base">{character.edu_base || '-'}</span>
              </li>
              <li className="ages">
                <span className="val" id="edu_age_mod">{character.edu_age_mod || '-'}</span>
              </li>
              <li>
                <span className="val" id="edu_other_mod">{character.edu_other_mod || '-'}</span>
              </li>
            </ul>
          </li>
        </ul>

        {/* 基礎スペック */}
        <ul className="calc-score d-flex ul-score">
          <li className="name sp-only">
            <div className="score-sum"></div>
            <ul className="score-detail">
              <li>基礎能力</li>
              <li className="ages">年齢修正</li>
              <li>他増減</li>
            </ul>
          </li>

          <li className="san score-li">
            <h3>初期SAN</h3>
            <div className="score-sum">
              <span id="san_total">{character.san_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span id="san_base_value">{character.san_base_value || '-'}</span>
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <span id="san_other_mod">{character.san_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          <li className="hp score-li">
            <h3>HP</h3>
            <div className="score-sum">
              <span id="hp_total">{character.hp_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span id="hp_base_value">{character.hp_base_value || '-'}</span>
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <span id="hp_other_mod">{character.hp_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          <li className="mp score-li">
            <h3>MP</h3>
            <div className="score-sum">
              <span id="mp_total">{character.mp_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span id="mp_base_value">{character.mp_base_value || '-'}</span>
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <span id="mp_other_mod">{character.mp_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          <li className="idea score-li">
            <h3>アイデア</h3>
            <div className="score-sum">
              <span id="idea_total">{character.idea_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span id="idea_base_value">{character.idea_base_value || '-'}</span>
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <span id="idea_other_mod">{character.idea_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          <li className="luck score-li">
            <h3>幸運</h3>
            <div className="score-sum">
              <span id="luck_total">{character.luck_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span id="luck_base_value">{character.luck_base_value || '-'}</span>
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <span id="luck_other_mod">{character.luck_other_mod || '-'}</span>
              </li>
            </ul>
          </li>

          <li className="knowledge score-li">
            <h3>知識</h3>
            <div className="score-sum">
              <span id="knowledge_total">{character.knowledge_total || '-'}</span>
            </div>
            <ul className="score-detail">
              <li>
                <span id="knowledge_base_value">{character.knowledge_base_value || '-'}</span>
              </li>
              <li className="ages">
                -
              </li>
              <li>
                <span id="knowledge_other_mod">{character.knowledge_other_mod || '-'}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}