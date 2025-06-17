import React from 'react';
import { CharacterData } from '../../lib/character-calculations';

type EquipmentSections = {
  weapons: boolean;
  items: boolean;
  disorders: boolean;
  books: boolean;
  spells: boolean;
  artifacts: boolean;
  entities: boolean;
};

interface EquipmentProps {
  characterData: CharacterData;
  handleInputChange: (field: string, value: any) => void;
  // 装備セクション表示状態
  equipmentSections: EquipmentSections;
  toggleEquipmentSection: (sectionId: keyof EquipmentSections) => void;
  // 武器関連
  weapons: Array<{ id: string, counter: number }>;
  addWeapon: () => void;
  removeWeapon: (id: string) => void;
  // アイテム関連
  items: Array<{ id: string, counter: number }>;
  addItem: () => void;
  removeItem: (id: string) => void;
  // 障害関連
  disorders: Array<{ id: string, counter: number }>;
  addDisorder: () => void;
  removeDisorder: (id: string) => void;
  // 書籍関連
  books: Array<{ id: string, counter: number }>;
  addBook: () => void;
  removeBook: (id: string) => void;
  // 呪文関連
  spells: Array<{ id: string, counter: number }>;
  addSpell: () => void;
  removeSpell: (id: string) => void;
  // アーティファクト関連
  artifacts: Array<{ id: string, counter: number }>;
  addArtifact: () => void;
  removeArtifact: (id: string) => void;
  // エンティティ関連
  entities: Array<{ id: string, counter: number }>;
  addEntity: () => void;
  removeEntity: (id: string) => void;
}

export default function Equipment({
  characterData,
  handleInputChange,
  equipmentSections,
  toggleEquipmentSection,
  weapons,
  addWeapon,
  removeWeapon,
  items,
  addItem,
  removeItem,
  disorders,
  addDisorder,
  removeDisorder,
  books,
  addBook,
  removeBook,
  spells,
  addSpell,
  removeSpell,
  artifacts,
  addArtifact,
  removeArtifact,
  entities,
  addEntity,
  removeEntity
}: EquipmentProps) {
  return (
    <>
      {/* 装備セクション */}
      <div id="equipment-section">

        {/* 武器セクション */}
        <div className="data-wrap buki">
          <h3
            onClick={() => toggleEquipmentSection('weapons')}
            style={{ cursor: 'pointer', userSelect: 'none', position: 'relative', zIndex: 10 }}
          >
            <i
              className={`fas ${equipmentSections.weapons ? 'fa-chevron-down' : 'fa-chevron-right'}`}
              style={{
                transition: 'all 0.3s',
                marginRight: '10px'
              }}
            />
            <i className="fa-solid fa-gun"></i> 武器
          </h3>
          <div className={`equipment-content ${!equipmentSections.weapons ? 'collapsed' : ''}`}>
            <ul>
              {weapons.map((weapon) => (
                <li key={weapon.id} className="d-flex data-li skill-body">
                  <div className="title" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}>
                    <span className="label">武器名</span>
                    <input
                      type="text"
                      name={`${weapon.id}_name`}
                      value={(characterData as any)[`${weapon.id}_name`] || ''}
                      onChange={(e) => handleInputChange(`${weapon.id}_name`, e.target.value)}
                      placeholder="--"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', marginTop: '5px' }}
                    />
                  </div>
                  <div className="ginou kazu">
                    <span className="label">成功</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="text"
                        name={`${weapon.id}_success`}
                        value={(characterData as any)[`${weapon.id}_success`] || ''}
                        onChange={(e) => handleInputChange(`${weapon.id}_success`, e.target.value)}
                        placeholder="--"
                        style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', marginTop: '5px' }}
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <div className="damage">
                    <span className="label">ダメ―ジ</span>
                    <input
                      type="text"
                      name={`${weapon.id}_damage`}
                      value={(characterData as any)[`${weapon.id}_damage`] || ''}
                      onChange={(e) => handleInputChange(`${weapon.id}_damage`, e.target.value)}
                      placeholder="--"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', marginTop: '5px' }}
                    />
                  </div>
                  <div className="syatei kazu">
                    <span className="label">射程</span>
                    <input
                      type="text"
                      name={`${weapon.id}_range`}
                      value={(characterData as any)[`${weapon.id}_range`] || ''}
                      onChange={(e) => handleInputChange(`${weapon.id}_range`, e.target.value)}
                      placeholder="--"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', marginTop: '5px' }}
                    />
                  </div>
                  <div className="kougekikaisu kazu">
                    <span className="label">回数</span>
                    <input
                      type="text"
                      name={`${weapon.id}_attacks`}
                      value={(characterData as any)[`${weapon.id}_attacks`] || ''}
                      onChange={(e) => handleInputChange(`${weapon.id}_attacks`, e.target.value)}
                      placeholder="--"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', marginTop: '5px' }}
                    />
                  </div>
                  <div className="soudansuu kazu">
                    <span className="label">装弾</span>
                    <input
                      type="text"
                      name={`${weapon.id}_capacity`}
                      value={(characterData as any)[`${weapon.id}_capacity`] || ''}
                      onChange={(e) => handleInputChange(`${weapon.id}_capacity`, e.target.value)}
                      placeholder="--"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', marginTop: '5px' }}
                    />
                  </div>
                  <div className="kosyou kazu">
                    <span className="label">故障</span>
                    <input
                      type="text"
                      name={`${weapon.id}_malfunction`}
                      value={(characterData as any)[`${weapon.id}_malfunction`] || ''}
                      onChange={(e) => handleInputChange(`${weapon.id}_malfunction`, e.target.value)}
                      placeholder="--"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', marginTop: '5px' }}
                    />
                  </div>
                  <div className="taikyu kazu">
                    <span className="label">耐久</span>
                    <input
                      type="text"
                      name={`${weapon.id}_durability`}
                      value={(characterData as any)[`${weapon.id}_durability`] || ''}
                      onChange={(e) => handleInputChange(`${weapon.id}_durability`, e.target.value)}
                      placeholder="--"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', marginTop: '5px' }}
                    />
                  </div>
                  <div className="memo">
                    <span className="label">詳細</span>
                    <textarea
                      name={`${weapon.id}_details`}
                      value={(characterData as any)[`${weapon.id}_details`] || ''}
                      onChange={(e) => handleInputChange(`${weapon.id}_details`, e.target.value)}
                      placeholder="--"
                      style={{
                        width: '100%',
                        resize: 'vertical',
                        minHeight: '15px',
                        marginTop: '5px',
                        padding: '3px 5px',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => removeWeapon(weapon.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={addWeapon}
              className="add-btn"
            >
              <i className="fas fa-plus"></i> 武器を追加
            </button>
          </div>
        </div>

        {/* 所持品セクション */}
        <div className="data-wrap item">
          <h3
            onClick={() => toggleEquipmentSection('items')}
            style={{ cursor: 'pointer', userSelect: 'none', position: 'relative', zIndex: 10 }}
          >
            <i
              className={`fas ${equipmentSections.items ? 'fa-chevron-down' : 'fa-chevron-right'}`}
              style={{
                transition: 'all 0.3s',
                marginRight: '10px'
              }}
            />
            <i className="fas fa-suitcase"></i> 所持品
          </h3>
          <div className={`equipment-content ${!equipmentSections.items ? 'collapsed' : ''}`}>
            <ul>
              {items.map((item) => (
                <li key={item.id} className="d-flex data-li skill-body">
                  <div className="title">
                    <input
                      type="text"
                      name={`${item.id}_name`}
                      value={(characterData as any)[`${item.id}_name`] || ''}
                      onChange={(e) => handleInputChange(`${item.id}_name`, e.target.value)}
                      placeholder="品名"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                    />
                  </div>
                  <div className="kosu">
                    <input
                      type="text"
                      name={`${item.id}_quantity`}
                      value={(characterData as any)[`${item.id}_quantity`] || ''}
                      onChange={(e) => handleInputChange(`${item.id}_quantity`, e.target.value)}
                      placeholder="個数"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                    />
                  </div>
                  <div className="content">
                    <textarea
                      name={`${item.id}_details`}
                      value={(characterData as any)[`${item.id}_details`] || ''}
                      onChange={(e) => handleInputChange(`${item.id}_details`, e.target.value)}
                      placeholder="詳細"
                      style={{
                        width: '100%',
                        resize: 'vertical',
                        minHeight: '25px',
                        padding: '3px 5px',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={addItem}
              className="add-btn"
            >
              <i className="fas fa-plus"></i> 所持品を追加
            </button>
          </div>
        </div>

        {/* 不定・後遺症セクション */}
        <div className="data-wrap hutei">
          <h3
            onClick={() => toggleEquipmentSection('disorders')}
            style={{ cursor: 'pointer', userSelect: 'none', position: 'relative', zIndex: 10 }}
          >
            <i
              className={`fas ${equipmentSections.disorders ? 'fa-chevron-down' : 'fa-chevron-right'}`}
              style={{
                transition: 'all 0.3s',
                marginRight: '10px'
              }}
            />
            <i className="fas fa-bed"></i> 不定・後遺症
          </h3>
          <div className={`equipment-content ${!equipmentSections.disorders ? 'collapsed' : ''}`}>
            <ul>
              {disorders.map((disorder) => (
                <li key={disorder.id} className="d-flex data-li skill-body">
                  <div className="title">
                    <input
                      type="text"
                      name={`${disorder.id}_name`}
                      value={(characterData as any)[`${disorder.id}_name`] || ''}
                      onChange={(e) => handleInputChange(`${disorder.id}_name`, e.target.value)}
                      placeholder="症状名"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                    />
                  </div>
                  <div className="term">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input
                        type="date"
                        name={`${disorder.id}_period_start`}
                        value={(characterData as any)[`${disorder.id}_period`]?.split('～')[0] || ''}
                        onChange={(e) => {
                          const endDate = (characterData as any)[`${disorder.id}_period`]?.split('～')[1] || '';
                          const newPeriod = e.target.value + (endDate ? '～' + endDate : '');
                          handleInputChange(`${disorder.id}_period`, newPeriod);
                        }}
                        style={{ 
                          width: '45%', 
                          border: 'none', 
                          background: 'transparent', 
                          textAlign: 'center',
                          fontSize: 'inherit',
                          fontFamily: 'inherit'
                        }}
                      />
                      <span>～</span>
                      <input
                        type="date"
                        name={`${disorder.id}_period_end`}
                        value={(characterData as any)[`${disorder.id}_period`]?.split('～')[1] || ''}
                        onChange={(e) => {
                          const startDate = (characterData as any)[`${disorder.id}_period`]?.split('～')[0] || '';
                          const newPeriod = startDate + '～' + e.target.value;
                          handleInputChange(`${disorder.id}_period`, newPeriod);
                        }}
                        style={{ 
                          width: '45%', 
                          border: 'none', 
                          background: 'transparent', 
                          textAlign: 'center',
                          fontSize: 'inherit',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>
                  </div>
                  <div className="content">
                    <textarea
                      name={`${disorder.id}_details`}
                      value={(characterData as any)[`${disorder.id}_details`] || ''}
                      onChange={(e) => handleInputChange(`${disorder.id}_details`, e.target.value)}
                      placeholder="詳細"
                      style={{
                        width: '100%',
                        resize: 'vertical',
                        minHeight: '25px',
                        padding: '3px 5px',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => removeDisorder(disorder.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={addDisorder}
              className="add-btn"
            >
              <i className="fas fa-plus"></i> 不定・後遺症を追加
            </button>
          </div>
        </div>

        {/* 魔導書セクション */}
        <div className="data-wrap book">
          <h3
            onClick={() => toggleEquipmentSection('books')}
            style={{ cursor: 'pointer', userSelect: 'none', position: 'relative', zIndex: 10 }}
          >
            <i
              className={`fas ${equipmentSections.books ? 'fa-chevron-down' : 'fa-chevron-right'}`}
              style={{
                transition: 'all 0.3s',
                marginRight: '10px'
              }}
            />
            <i className="fas fa-book-dead"></i> 読んだ魔導書
          </h3>
          <div className={`equipment-content ${!equipmentSections.books ? 'collapsed' : ''}`}>
            <ul>
              {books.map((book) => (
                <li key={book.id} className="d-flex data-li skill-body">
                  <div className="title">
                    <input
                      type="text"
                      name={`${book.id}_name`}
                      value={(characterData as any)[`${book.id}_name`] || ''}
                      onChange={(e) => handleInputChange(`${book.id}_name`, e.target.value)}
                      placeholder="魔導書名"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                    />
                  </div>
                  <div className="content">
                    <textarea
                      name={`${book.id}_details`}
                      value={(characterData as any)[`${book.id}_details`] || ''}
                      onChange={(e) => handleInputChange(`${book.id}_details`, e.target.value)}
                      placeholder="詳細・効果"
                      style={{
                        width: '100%',
                        resize: 'vertical',
                        minHeight: '25px',
                        padding: '3px 5px',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => removeBook(book.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={addBook}
              className="add-btn"
            >
              <i className="fas fa-plus"></i> 魔導書を追加
            </button>
          </div>
        </div>

        {/* 呪文セクション */}
        <div className="data-wrap jumon">
          <h3
            onClick={() => toggleEquipmentSection('spells')}
            style={{ cursor: 'pointer', userSelect: 'none', position: 'relative', zIndex: 10 }}
          >
            <i
              className={`fas ${equipmentSections.spells ? 'fa-chevron-down' : 'fa-chevron-right'}`}
              style={{
                transition: 'all 0.3s',
                marginRight: '10px'
              }}
            />
            <i className="fa-solid fa-hand-sparkles"></i> 覚えた呪文
          </h3>
          <div className={`equipment-content ${!equipmentSections.spells ? 'collapsed' : ''}`}>
            <ul>
              {spells.map((spell) => (
                <li key={spell.id} className="d-flex data-li skill-body">
                  <div className="title">
                    <input
                      type="text"
                      name={`${spell.id}_name`}
                      value={(characterData as any)[`${spell.id}_name`] || ''}
                      onChange={(e) => handleInputChange(`${spell.id}_name`, e.target.value)}
                      placeholder="呪文名"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                    />
                  </div>
                  <div className="content">
                    <textarea
                      name={`${spell.id}_details`}
                      value={(characterData as any)[`${spell.id}_details`] || ''}
                      onChange={(e) => handleInputChange(`${spell.id}_details`, e.target.value)}
                      placeholder="効果・詳細"
                      style={{
                        width: '100%',
                        resize: 'vertical',
                        minHeight: '25px',
                        padding: '3px 5px',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => removeSpell(spell.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={addSpell}
              className="add-btn"
            >
              <i className="fas fa-plus"></i> 呪文を追加
            </button>
          </div>
        </div>

        {/* AFセクション */}
        <div className="data-wrap af">
          <h3
            onClick={() => toggleEquipmentSection('artifacts')}
            style={{ cursor: 'pointer', userSelect: 'none', position: 'relative', zIndex: 10 }}
          >
            <i
              className={`fas ${equipmentSections.artifacts ? 'fa-chevron-down' : 'fa-chevron-right'}`}
              style={{
                transition: 'all 0.3s',
                marginRight: '10px'
              }}
            />
            <i className="fa-solid fa-star-of-david"></i> 所持AF
          </h3>
          <div className={`equipment-content ${!equipmentSections.artifacts ? 'collapsed' : ''}`}>
            <ul>
              {artifacts.map((artifact) => (
                <li key={artifact.id} className="d-flex data-li skill-body">
                  <div className="title">
                    <input
                      type="text"
                      name={`${artifact.id}_name`}
                      value={(characterData as any)[`${artifact.id}_name`] || ''}
                      onChange={(e) => handleInputChange(`${artifact.id}_name`, e.target.value)}
                      placeholder="AF名"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                    />
                  </div>
                  <div className="content">
                    <textarea
                      name={`${artifact.id}_details`}
                      value={(characterData as any)[`${artifact.id}_details`] || ''}
                      onChange={(e) => handleInputChange(`${artifact.id}_details`, e.target.value)}
                      placeholder="効果・詳細"
                      style={{
                        width: '100%',
                        resize: 'vertical',
                        minHeight: '25px',
                        padding: '3px 5px',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => removeArtifact(artifact.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={addArtifact}
              className="add-btn"
            >
              <i className="fas fa-plus"></i> AFを追加
            </button>
          </div>
        </div>

        {/* 遭遇した超自然の存在セクション */}
        <div className="data-wrap cthulhu">
          <h3
            onClick={() => toggleEquipmentSection('entities')}
            style={{ cursor: 'pointer', userSelect: 'none', position: 'relative', zIndex: 10 }}
          >
            <i
              className={`fas ${equipmentSections.entities ? 'fa-chevron-down' : 'fa-chevron-right'}`}
              style={{
                transition: 'all 0.3s',
                marginRight: '10px'
              }}
            />
            <i className="fa-brands fa-octopus-deploy"></i> 遭遇した超自然の存在
          </h3>
          <div className={`equipment-content ${!equipmentSections.entities ? 'collapsed' : ''}`}>
            <ul>
              {entities.map((entity) => (
                <li key={entity.id} className="d-flex data-li skill-body">
                  <div className="title">
                    <input
                      type="text"
                      name={`${entity.id}_name`}
                      value={(characterData as any)[`${entity.id}_name`] || ''}
                      onChange={(e) => handleInputChange(`${entity.id}_name`, e.target.value)}
                      placeholder="存在名"
                      style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center' }}
                    />
                  </div>
                  <div className="content">
                    <textarea
                      name={`${entity.id}_details`}
                      value={(characterData as any)[`${entity.id}_details`] || ''}
                      onChange={(e) => handleInputChange(`${entity.id}_details`, e.target.value)}
                      placeholder="詳細・状況"
                      style={{
                        width: '100%',
                        resize: 'vertical',
                        minHeight: '25px',
                        padding: '3px 5px',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => removeEntity(entity.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={addEntity}
              className="add-btn"
            >
              <i className="fas fa-plus"></i> 遭遇した存在を追加
            </button>
          </div>
        </div>
      </div>
    </>
  );
}