import React from 'react';

interface FloatingActionButtonsProps {
  onCcfoliaExport: () => void;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onCcfoliaExport
}) => {
  return (
    <div className="floating-action-buttons">
      <button
        onClick={onCcfoliaExport}
        className="floating-btn ccfolia-btn"
        title="ココフォリア用コマ出力"
      >
        <i className="fas fa-download"></i>
        <span className="btn-text">コマ出力</span>
      </button>
    </div>
  );
};

export default FloatingActionButtons;