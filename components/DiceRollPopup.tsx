import React, { useState, useEffect } from 'react';

interface DiceRollResult {
  skillName: string;
  targetValue: number;
  diceRoll: number;
  isSuccess: boolean;
  successLevel: 'critical' | 'special' | 'regular' | 'failure' | 'fumble';
}

interface DiceRollPopupProps {
  result: DiceRollResult | null;
  onClose: () => void;
}

export default function DiceRollPopup({ result, onClose }: DiceRollPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (result) {
      setIsVisible(true);
    }
  }, [result]);

  if (!result) return null;

  const getSuccessLevelDisplay = (level: DiceRollResult['successLevel']) => {
    switch (level) {
      case 'critical': return { text: 'クリティカル！', color: '#ff6b6b', icon: '🎯', bgColor: '#ffe0e0' };
      case 'special': return { text: 'スペシャル', color: '#45b7d1', icon: '💪', bgColor: '#e0f4f8' };
      case 'regular': return { text: '通常成功', color: '#96ceb4', icon: '✅', bgColor: '#e8f5ed' };
      case 'failure': return { text: '失敗', color: '#fab005', icon: '❌', bgColor: '#fff3cd' };
      case 'fumble': return { text: 'ファンブル！', color: '#ff7675', icon: '💥', bgColor: '#ffe4e4' };
      default: return { text: '不明', color: '#666', icon: '❓', bgColor: '#f0f0f0' };
    }
  };

  const successDisplay = getSuccessLevelDisplay(result.successLevel);

  return (
    <>
      {/* 背景オーバーレイ */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
          cursor: 'pointer'
        }}
      />

      {/* ポップアップ */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.8})`,
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        padding: '30px',
        minWidth: '320px',
        maxWidth: '400px',
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.2s ease'
      }}>
        {/* スキル名 */}
        <h3 style={{
          margin: '0 0 20px 0',
          fontSize: '20px',
          color: '#333'
        }}>
          {result.skillName}判定
        </h3>

        {/* ダイスロール結果 */}
        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: successDisplay.color
        }}>
          {result.diceRoll}
        </div>

        {/* 目標値 */}
        <div style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '20px'
        }}>
          目標値: {result.targetValue}
        </div>

        {/* 成功レベル */}
        <div style={{
          backgroundColor: successDisplay.bgColor,
          padding: '15px 20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{
            fontSize: '24px',
            marginBottom: '5px'
          }}>
            {successDisplay.icon}
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: successDisplay.color
          }}>
            {successDisplay.text}
          </div>
        </div>

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          style={{
            padding: '10px 24px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#666'}
        >
          閉じる
        </button>

        {/* クリックで閉じる案内 */}
        <div style={{
          fontSize: '12px',
          color: '#999',
          marginTop: '10px'
        }}>
          背景をクリックでも閉じます
        </div>
      </div>
    </>
  );
}