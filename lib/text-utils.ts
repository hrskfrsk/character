// テキスト処理ユーティリティ

import React from 'react';

// テキストエリアの自動リサイズ
export const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

// URLを検出してリンク化
export const linkifyText = (text: string): React.ReactNode => {
  if (!text) return text;

  // URL検出の正規表現（http, https, www）
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      let href = part;
      // wwwで始まる場合はhttps://を追加
      if (part.startsWith('www.')) {
        href = `https://${part}`;
      }
      
      return React.createElement('a', {
        key: index,
        href: href,
        target: '_blank',
        rel: 'noopener noreferrer'
      }, part);
    }
    return part;
  });
};

// テキストエリアのprops型定義
export interface AutoResizeTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  minRows?: number;
  maxRows?: number;
}

// 自動リサイズテキストエリアコンポーネント
export const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  onChange,
  placeholder,
  id,
  minRows = 3,
  maxRows = 10
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      autoResizeTextarea(textareaRef.current);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    autoResizeTextarea(e.target);
  };

  const lineHeight = 20; // 行の高さ（px）
  const minHeight = lineHeight * minRows;
  const maxHeight = lineHeight * maxRows;

  return React.createElement('textarea', {
    ref: textareaRef,
    id: id,
    value: value,
    onChange: handleChange,
    placeholder: placeholder,
    className: 'auto-resize-textarea',
    style: {
      minHeight: `${minHeight}px`,
      maxHeight: `${maxHeight}px`,
      overflowY: value.split('\n').length > maxRows ? 'auto' : 'hidden'
    }
  });
};