// テキスト処理ユーティリティ

import React from 'react';

// テキストエリアの自動リサイズ
export const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

// URLを検出してリンク化（Markdown風リンクと通常URLの両方に対応）
export const linkifyText = (text: string): React.ReactNode => {
  if (!text) return text;

  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // Markdown風リンク [テキスト](URL) の正規表現
  const markdownRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  // 通常のURL検出の正規表現
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  
  // まずMarkdown風リンクを処理
  let match;
  const processedRanges: Array<{start: number, end: number}> = [];
  
  // Markdown風リンクを検索
  while ((match = markdownRegex.exec(text)) !== null) {
    const [fullMatch, linkText, url] = match;
    const startIndex = match.index;
    const endIndex = startIndex + fullMatch.length;
    
    // 前のテキストを追加
    if (startIndex > lastIndex) {
      result.push(text.substring(lastIndex, startIndex));
    }
    
    // リンクを追加
    let href = url.trim();
    if (href.startsWith('www.')) {
      href = `https://${href}`;
    }
    
    result.push(React.createElement('a', {
      key: `markdown-${startIndex}`,
      href: href,
      target: '_blank',
      rel: 'noopener noreferrer'
    }, linkText));
    
    processedRanges.push({start: startIndex, end: endIndex});
    lastIndex = endIndex;
  }
  
  // 残りのテキストを追加
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }
  
  // 通常のURLを処理（Markdown風リンクの範囲は除外）
  const finalResult: React.ReactNode[] = [];
  
  result.forEach((part, partIndex) => {
    if (typeof part === 'string') {
      const urlParts = part.split(urlRegex);
      urlParts.forEach((urlPart, urlPartIndex) => {
        if (urlRegex.test(urlPart)) {
          let href = urlPart;
          if (urlPart.startsWith('www.')) {
            href = `https://${urlPart}`;
          }
          
          finalResult.push(React.createElement('a', {
            key: `url-${partIndex}-${urlPartIndex}`,
            href: href,
            target: '_blank',
            rel: 'noopener noreferrer'
          }, urlPart));
        } else if (urlPart) {
          finalResult.push(urlPart);
        }
      });
    } else {
      finalResult.push(part);
    }
  });
  
  return finalResult;
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