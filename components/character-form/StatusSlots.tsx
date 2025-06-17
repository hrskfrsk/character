import React from 'react';
import { CharacterData } from '../../lib/character-calculations';

interface StatusSlotsProps {
  characterData: CharacterData;
  calculatedStats: any;
  handleInputChange: (field: string, value: any) => void;
  handleJobPointsFormulaChange: (formula: string) => void;
}

export default function StatusSlots({
  characterData,
  calculatedStats,
  handleInputChange,
  handleJobPointsFormulaChange
}: StatusSlotsProps) {
  return (
    <div className="slots d-flex">
      <div className="now-san slot">
        <h3>現在SAN値</h3>
        <div className="slot-txt">
          <span>
            <input
              type="number"
              className="current_san"
              id="current_san"
              name="current_san"
              style={{ color: '#57595d' }}
              value={characterData.current_san || 0}
              onChange={(e) => handleInputChange('current_san', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
            />
            <span>/</span>
            <input
              type="number"
              id="max_san"
              name="max_san"
              className="max_san readonly auto-resize _02"
              value={characterData.max_san || calculatedStats.max_san_value || 0}
              onChange={(e) => handleInputChange('max_san', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
              style={{
                width: `${Math.max(2, String(characterData.max_san || calculatedStats.max_san_value || 0).length)}ch`,
                fontSize: '0.8rem',
                fontWeight: '400',
                color: '#888'
              }}
            />
          </span>
        </div>
      </div>
      <div className="db slot">
        <h3>ダメ―ジボーナス</h3>
        <div className="slot-txt">
          <input type="text" className="readonly _02" id="damage_bonus" value={calculatedStats.damage_bonus || ''} readOnly />
        </div>
      </div>
      <div className="jobp slot" style={{
        backgroundColor: (characterData.job_points_used || 0) > (characterData.job_points_formula === 'manual' ? (characterData.job_points_total || 0) : (calculatedStats.job_points_total || 0)) ? '#ffe6e6' : 'inherit'
      }}>
        <h3>職業P</h3>
        <div className="slot-txt">
          <span>
            <input
              type="text"
              id="job_points_used"
              name="job_points_used"
              className="readonly auto-resize _02"
              value={characterData.job_points_used || 0}
              readOnly
              style={{
                width: `${Math.max(2, String(characterData.job_points_used || 0).length)}ch`,
                color: (characterData.job_points_used || 0) > (characterData.job_points_formula === 'manual' ? (characterData.job_points_total || 0) : (calculatedStats.job_points_total || 0)) ? '#d32f2f' : '#57595d'
              }}
            />
            <span>/</span>
            {characterData.job_points_formula === 'manual' ? (
              <input
                type="number"
                id="job_points_total_manual"
                name="job_points_total"
                className="readonly auto-resize _02"
                value={characterData.job_points_total || 0}
                onChange={(e) => handleInputChange('job_points_total', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                style={{
                  width: `${Math.max(2, String(characterData.job_points_total || 0).length)}ch`,
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  color: '#888'
                }}
              />
            ) : (
              <input
                type="text"
                className="readonly auto-resize _02"
                id="job_points_total"
                value={calculatedStats.job_points_total || 0}
                readOnly
                style={{
                  width: `${Math.max(2, String(calculatedStats.job_points_total || 0).length)}ch`,
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  color: '#888'
                }}
              />
            )}
          </span>
          <select
            name="job_points_formula"
            value={characterData.job_points_formula || 'edu20'}
            onChange={(e) => handleJobPointsFormulaChange(e.target.value)}
            className="job-point"
          >
            <option value="edu20">EDU×20</option>
            <option value="edu10_str10">EDU×10+STR×10</option>
            <option value="edu10_con10">EDU×10+CON×10</option>
            <option value="edu10_pow10">EDU×10+POW×10</option>
            <option value="edu10_dex10">EDU×10+DEX×10</option>
            <option value="edu10_app10">EDU×10+APP×10</option>
            <option value="edu10_siz10">EDU×10+SIZ×10</option>
            <option value="edu10_int10">EDU×10+INT×10</option>
            <option value="manual">手動入力</option>
          </select>
        </div>
      </div>
      <div className="intp slot" style={{
        backgroundColor: (characterData.interest_points_used || 0) > (calculatedStats.interest_points_total || 0) ? '#ffe6e6' : 'inherit'
      }}>
        <h3>興味P</h3>
        <div className="slot-txt">
          <span>
            <input
              type="text"
              id="interest_points_used"
              name="interest_points_used"
              className="readonly auto-resize _02"
              value={characterData.interest_points_used || 0}
              readOnly
              style={{
                width: `${Math.max(2, String(characterData.interest_points_used || 0).length)}ch`,
                color: (characterData.interest_points_used || 0) > (calculatedStats.interest_points_total || 0) ? '#d32f2f' : '#57595d'
              }}
            />
            <span>/</span>
            <input
              type="text"
              className="readonly auto-resize _02"
              id="interest_points_total"
              value={calculatedStats.interest_points_total || 0}
              readOnly
              style={{
                width: `${Math.max(2, String(calculatedStats.interest_points_total || 0).length)}ch`,
                fontSize: '0.8rem',
                fontWeight: '400',
                color: '#888'
              }}
            />
          </span>
          <span className="interest-point">追加分 ：
            <input
              type="number"
              className="nterest_points_extra"
              id="interest_points_extra"
              name="interest_points_extra"
              value={characterData.interest_points_extra || ''}
              onChange={(e) => handleInputChange('interest_points_extra', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
            />
          </span>
        </div>
      </div>
    </div>
  );
}