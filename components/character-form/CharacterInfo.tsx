import React, { useState, useEffect, useRef } from 'react';
import { CharacterData } from '../../lib/character-calculations';
import { uploadImage, deleteImage, getImagePathFromUrl, UploadProgress } from '../../lib/upload-image';

interface CharacterInfoProps {
  characterData: CharacterData;
  handleInputChange: (field: string, value: any) => void;
}

export default function CharacterInfo({ characterData, handleInputChange }: CharacterInfoProps) {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    progress: 0,
    isUploading: false
  });

  // 色の明度を調整する関数
  const adjustBrightness = (hex: string, percent: number): string => {
    // #を取り除く
    const cleanHex = hex.replace('#', '');

    // RGB値に変換
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // 明度調整
    const adjustedR = Math.max(0, Math.min(255, r + (r * percent / 100)));
    const adjustedG = Math.max(0, Math.min(255, g + (g * percent / 100)));
    const adjustedB = Math.max(0, Math.min(255, b + (b * percent / 100)));

    // 16進数に戻す
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
    return `#${toHex(adjustedR)}${toHex(adjustedG)}${toHex(adjustedB)}`;
  };

  // HEXカラーをRGBAに変換する関数
  const hexToRgba = (hex: string, alpha: number): string => {
    // #を取り除く
    const cleanHex = hex.replace('#', '');

    // RGB値に変換
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };


  // アコーディオン状態の初期化（localStorageから読み込み）
  const [isAccordionOpen, setIsAccordionOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accordion-portrait-color');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [isBasicDataOpen, setIsBasicDataOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accordion-basic-data');
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accordion-description');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // WYSIWYGエディタ用の状態
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [lastFocusedElement, setLastFocusedElement] = useState<HTMLElement | null>(null);

  // デバウンス用の状態
  const [inputTimeouts, setInputTimeouts] = useState<{ [key: string]: NodeJS.Timeout }>({});

  // UIテーマカラーの動的適用
  useEffect(() => {
    if (characterData.ui_theme_color && typeof window !== 'undefined') {
      const color = characterData.ui_theme_color;
      const hoverColor = adjustBrightness(color, -20);
      const lightColor = hexToRgba(color, 0.15);
      const mediumColor = hexToRgba(color, 0.4);
      const darkColor = hexToRgba(color, 0.7);

      document.documentElement.style.setProperty('--ui-theme-color', color);
      document.documentElement.style.setProperty('--ui-theme-color-hover', hoverColor);
      document.documentElement.style.setProperty('--ui-theme-color-light', lightColor);
      document.documentElement.style.setProperty('--ui-theme-color-medium', mediumColor);
      document.documentElement.style.setProperty('--ui-theme-color-dark', darkColor);
    }
  }, [characterData.ui_theme_color]);

  // アコーディオン状態が変更されたときにlocalStorageに保存
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accordion-portrait-color', JSON.stringify(isAccordionOpen));
    }
  }, [isAccordionOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accordion-basic-data', JSON.stringify(isBasicDataOpen));
    }
  }, [isBasicDataOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accordion-description', JSON.stringify(isDescriptionOpen));
    }
  }, [isDescriptionOpen]);

  // コンポーネントアンマウント時にタイマーをクリーンアップ
  useEffect(() => {
    return () => {
      Object.values(inputTimeouts).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, [inputTimeouts]);

  // 旧リッチテキストエディタのヘルパー関数（削除）

  // WYSIWYGエディタ用のコマンド実行関数（完全に滑らかな選択範囲維持）
  const executeCommand = (command: string, value?: string) => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement.getAttribute('contenteditable') === 'true') {
      // フォーカスを確保
      activeElement.focus();

      // 現在の選択範囲を保存
      const selection = window.getSelection();
      let savedRange: Range | null = null;

      if (selection && selection.rangeCount > 0) {
        savedRange = selection.getRangeAt(0).cloneRange();
      }

      // execCommandが選択範囲を変更するかどうかを事前チェック
      const preserveSelectionCommands = ['bold', 'italic', 'underline', 'strikeThrough', 'foreColor'];
      const shouldPreserveSelection = preserveSelectionCommands.includes(command) && savedRange && !savedRange.collapsed;

      if (shouldPreserveSelection) {
        // ブラウザの再描画を一時的に防ぐ
        activeElement.style.userSelect = 'none';

        // コマンドを実行
        document.execCommand(command, false, value);

        // 次のフレームで選択範囲を復元
        requestAnimationFrame(() => {
          try {
            if (savedRange && selection) {
              selection.removeAllRanges();
              selection.addRange(savedRange);
            }
          } catch (e) {
            // 復元失敗時は何もしない
          }

          // userSelectを元に戻す
          activeElement.style.userSelect = '';
        });
      } else {
        // 通常のコマンド実行
        document.execCommand(command, false, value);
      }
    }
  };

  // フォントサイズを適用（選択範囲内のspanを統一）
  const applyFontSize = (size: number) => {
    const targetElement = lastFocusedElement || document.activeElement as HTMLElement;
    if (targetElement && targetElement.getAttribute('contenteditable') === 'true') {
      targetElement.focus();

      document.execCommand('styleWithCSS', false, 'true');

      const selection = window.getSelection();
      if (!selection) return;

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        if (!range.collapsed) {
          // 選択範囲内の既存フォントサイズspanを削除
          const fragment = range.extractContents();
          const tempDiv = document.createElement('div');
          tempDiv.appendChild(fragment);

          // 既存のフォントサイズspanを削除して内容を展開
          const fontSpans = tempDiv.querySelectorAll('span[style*="font-size"]');
          fontSpans.forEach(span => {
            const parent = span.parentNode;
            if (parent) {
              while (span.firstChild) {
                parent.insertBefore(span.firstChild, span);
              }
              parent.removeChild(span);
            }
          });

          // 新しいフォントサイズspanで全体を囲む
          const newSpan = document.createElement('span');
          newSpan.style.fontSize = `${size}pt`;

          // tempDivの内容をnewSpanに直接移動（divは含めない）
          while (tempDiv.firstChild) {
            newSpan.appendChild(tempDiv.firstChild);
          }

          range.insertNode(newSpan);

          // 選択範囲を新しいspanに設定
          const newRange = document.createRange();
          newRange.selectNodeContents(newSpan);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } else {
          // カーソル位置での処理
          const currentNode = range.startContainer;
          const parentSpan = currentNode.nodeType === Node.TEXT_NODE
            ? currentNode.parentElement
            : currentNode as HTMLElement;

          if (parentSpan && parentSpan.tagName === 'SPAN' && (parentSpan as HTMLElement).style.fontSize) {
            // 既存のspan内にいる場合はそのサイズを更新
            (parentSpan as HTMLElement).style.fontSize = `${size}pt`;
          } else {
            // 新しいspanを作成
            const span = document.createElement('span');
            span.style.fontSize = `${size}pt`;
            span.textContent = ' ';

            range.insertNode(span);

            const newRange = document.createRange();
            newRange.setStart(span, 1);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        }
      }
    }
  };

  // 色を適用してフォーカスと選択範囲を維持（完全に滑らか）
  const applyColor = (color: string) => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement.getAttribute('contenteditable') === 'true') {
      // フォーカスを確保
      activeElement.focus();

      // 現在の選択範囲を保存
      const selection = window.getSelection();
      let savedRange: Range | null = null;

      if (selection && selection.rangeCount > 0) {
        savedRange = selection.getRangeAt(0).cloneRange();
      }

      // 選択範囲がある場合は滑らかな処理
      if (savedRange && !savedRange.collapsed) {
        // ブラウザの再描画を一時的に防ぐ
        activeElement.style.userSelect = 'none';

        // コマンドを実行
        document.execCommand('foreColor', false, color);
        setShowColorPicker(null);

        // 次のフレームで選択範囲を復元
        requestAnimationFrame(() => {
          try {
            if (savedRange && selection) {
              selection.removeAllRanges();
              selection.addRange(savedRange);
            }
          } catch (e) {
            // 復元失敗時は何もしない
          }

          // userSelectを元に戻す
          activeElement.style.userSelect = '';
        });
      } else {
        // カーソル位置のみの場合は通常処理
        document.execCommand('foreColor', false, color);
        setShowColorPicker(null);
      }
    }
  };

  // カラーパレット（横：色相、縦：明度）9列×6行
  const colorPalette = [
    '#000000', '#7F1D1D', '#EA580C', '#CA8A04', '#166534', '#0C7489', '#1E40AF', '#581C87', '#BE185D',
    '#1F2937', '#991B1B', '#F97316', '#EAB308', '#16A34A', '#0891B2', '#2563EB', '#7C3AED', '#C2185B',
    '#374151', '#DC2626', '#FB923C', '#FACC15', '#22C55E', '#06B6D4', '#3B82F6', '#8B5CF6', '#DB2777',
    '#6B7280', '#EF4444', '#FDBA74', '#FDE047', '#4ADE80', '#22D3EE', '#60A5FA', '#A78BFA', '#EC4899',
    '#9CA3AF', '#F87171', '#FED7AA', '#FEF08A', '#86EFAC', '#7DD3FC', '#93C5FD', '#C4B5FD', '#F472B6',
    '#E5E7EB', '#FECACA', '#FEE2E2', '#FEFCE8', '#BBF7D0', '#CFFAFE', '#DBEAFE', '#DDD6FE', '#FBCFE8'
  ];

  // フォントサイズのプリセット
  const fontSizePresets = [
    { label: '極小', size: '8pt', value: 8 },
    { label: '小', size: '9pt', value: 9 },
    { label: '標準', size: '10pt', value: 10 },
    { label: '中', size: '12pt', value: 12 },
    { label: '大', size: '14pt', value: 14 },
    { label: '特大', size: '16pt', value: 16 },
    { label: '巨大', size: '20pt', value: 20 },
    { label: '超巨大', size: '24pt', value: 24 }
  ];

  // contentEditableの参照を保持
  const introductionRef = useRef<HTMLDivElement>(null);
  const secretInfoRef = useRef<HTMLDivElement>(null);

  // プレビューエリアでの入力時ハンドラ（選択範囲を維持）
  const handlePreviewInput = (fieldName: string, element: HTMLElement) => {
    const content = element.innerHTML;

    // 現在の選択範囲を即座に保存
    const selection = window.getSelection();
    let savedRange: Range | null = null;
    let savedOffset = 0;
    let savedContainer: Node | null = null;

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      savedRange = range.cloneRange();
      savedOffset = range.startOffset;
      savedContainer = range.startContainer;
    }

    // 既存のタイマーをクリア
    if (inputTimeouts[fieldName]) {
      clearTimeout(inputTimeouts[fieldName]);
    }

    // 新しいタイマーを設定（150ms後に更新）
    const newTimeout = setTimeout(() => {
      // 内容が空かどうかをチェック（空白文字やHTMLタグのみの場合も空と判定）
      const textContent = element.textContent || '';
      const trimmedText = textContent.trim();

      // HTMLタグのみ（<br>、<p>、<div>など）で実際のテキストがない場合も空と判定
      const htmlContent = content.replace(/<\/?[^>]+(>|$)/g, '').trim();

      // 完全に空の場合は空文字列で更新、そうでなければHTMLで更新
      if (trimmedText === '' || htmlContent === '') {
        handleInputChange(fieldName, '');
        // DOMも完全にクリア
        element.innerHTML = '';
      } else {
        handleInputChange(fieldName, content);
      }

      // 選択範囲を復元
      if (savedRange && selection && savedContainer) {
        setTimeout(() => {
          try {
            // 元のノードがまだ存在するかチェック
            if (element.contains(savedContainer) || element === savedContainer) {
              const newRange = document.createRange();
              const maxOffset = savedContainer.nodeType === Node.TEXT_NODE
                ? (savedContainer.textContent?.length || 0)
                : savedContainer.childNodes.length;

              newRange.setStart(savedContainer, Math.min(savedOffset, maxOffset));

              // 選択範囲が折りたたまれていない場合、終了位置も設定
              if (!savedRange.collapsed) {
                const endOffset = savedRange.endOffset;
                const endContainer = savedRange.endContainer;
                if (element.contains(endContainer) || element === endContainer) {
                  const endMaxOffset = endContainer.nodeType === Node.TEXT_NODE
                    ? (endContainer.textContent?.length || 0)
                    : endContainer.childNodes.length;
                  newRange.setEnd(endContainer, Math.min(endOffset, endMaxOffset));
                } else {
                  newRange.collapse(true);
                }
              } else {
                newRange.collapse(true);
              }

              selection.removeAllRanges();
              selection.addRange(newRange);
            } else {
              // ノードが見つからない場合は要素の最後にカーソルを置く
              const newRange = document.createRange();
              newRange.selectNodeContents(element);
              newRange.collapse(false);
              selection.removeAllRanges();
              selection.addRange(newRange);
            }
          } catch (e) {
            // エラー時は要素の最後にカーソルを置く
            try {
              const newRange = document.createRange();
              newRange.selectNodeContents(element);
              newRange.collapse(false);
              selection.removeAllRanges();
              selection.addRange(newRange);
            } catch (e2) {
              // 何もできない場合はそのまま
            }
          }
        }, 0);
      }
    }, 300);

    setInputTimeouts(prev => ({
      ...prev,
      [fieldName]: newTimeout
    }));
  };

  // プレビューエリアでのフォーカス離脱時ハンドラ（即座に保存）
  const handlePreviewBlur = (fieldName: string, element: HTMLElement) => {
    // タイマーをクリア
    if (inputTimeouts[fieldName]) {
      clearTimeout(inputTimeouts[fieldName]);
      setInputTimeouts(prev => {
        const newTimeouts = { ...prev };
        delete newTimeouts[fieldName];
        return newTimeouts;
      });
    }

    const content = element.innerHTML;
    handleInputChange(fieldName, content);
  };

  // contentEditableの初期化
  useEffect(() => {
    if (introductionRef.current && !introductionRef.current.innerHTML) {
      introductionRef.current.innerHTML = characterData.introduction || '';
    }
  }, []);

  useEffect(() => {
    if (secretInfoRef.current && !secretInfoRef.current.innerHTML) {
      secretInfoRef.current.innerHTML = characterData.secret_information || '';
    }
  }, []);

  // contentEditableのデータ同期（フォーカス時以外）
  useEffect(() => {
    if (introductionRef.current) {
      const currentContent = introductionRef.current.innerHTML;
      const expectedContent = characterData.introduction || '';
      if (currentContent !== expectedContent && document.activeElement !== introductionRef.current) {
        introductionRef.current.innerHTML = expectedContent;
      }
    }
  }, [characterData.introduction]);

  useEffect(() => {
    if (secretInfoRef.current) {
      const currentContent = secretInfoRef.current.innerHTML;
      const expectedContent = characterData.secret_information || '';
      if (currentContent !== expectedContent && document.activeElement !== secretInfoRef.current) {
        secretInfoRef.current.innerHTML = expectedContent;
      }
    }
  }, [characterData.secret_information]);

  // wrapSelectedText関数削除（WYSIWYG化により不要）

  // RichTextToolbar削除（WYSIWYGエディタに変更）

  // 画像の縦横比を計算する関数
  const calculateImageAspectRatio = (img: HTMLImageElement): string => {
    const aspectRatio = img.naturalWidth / img.naturalHeight;

    if (aspectRatio > 1.2) {
      return 'landscape';
    } else if (aspectRatio < 0.8) {
      return 'portrait';
    } else {
      return 'square';
    }
  };

  // 画像圧縮関数
  const compressImage = (file: File, maxSizeInBytes: number = 5 * 1024 * 1024): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // 最大幅・高さを設定（アスペクト比を保持）
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1920;

        let { width, height } = img;

        // アスペクト比を保持しながらリサイズ
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = (height * MAX_WIDTH) / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = (width * MAX_HEIGHT) / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // 透過画像（PNG）の場合は背景を透明に保持
        const isPNG = file.type === 'image/png';
        if (!isPNG) {
          // JPEG等の場合は白背景を設定
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        // 画像を描画
        ctx.drawImage(img, 0, 0, width, height);

        // 元の画像形式に応じて圧縮形式を決定
        const outputType = isPNG ? 'image/png' : 'image/jpeg';
        let quality = 0.9;

        const tryCompress = () => {
          if (isPNG) {
            // PNGの場合は品質設定なしで圧縮
            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error('Failed to compress image'));
                return;
              }

              const compressedFile = new File([blob], file.name, {
                type: 'image/png',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            }, 'image/png');
          } else {
            // JPEG等の場合は品質を調整しながら圧縮
            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error('Failed to compress image'));
                return;
              }

              if (blob.size <= maxSizeInBytes || quality <= 0.1) {
                // 目標サイズ以下になったか、品質が最低値になったら完了
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                // まだ大きい場合は品質を下げて再試行
                quality -= 0.1;
                tryCompress();
              }
            }, 'image/jpeg', quality);
          }
        };

        tryCompress();
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ファイル形式チェック
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('JPEG、PNG、GIF、WebP形式の画像をアップロードしてください');
      return;
    }

    try {
      let processedFile = file;
      const maxSize = 5 * 1024 * 1024; // 5MB

      // ファイルサイズが5MBを超える場合は圧縮
      if (file.size > maxSize) {
        console.log(`画像サイズが${(file.size / 1024 / 1024).toFixed(2)}MBのため、圧縮します...`);
        processedFile = await compressImage(file, maxSize);
        console.log(`圧縮後のサイズ: ${(processedFile.size / 1024 / 1024).toFixed(2)}MB`);
      }

      // 既存の画像を削除（Firebase Storageの画像の場合）
      const currentImageUrl = characterData.character_image_url;
      const oldImagePath = currentImageUrl ? getImagePathFromUrl(currentImageUrl) : null;

      // Firebase Storageにアップロード
      const result = await uploadImage(processedFile, setUploadProgress);

      // 縦横比を計算
      const img = new Image();
      img.onload = () => {
        const aspectRatio = calculateImageAspectRatio(img);
        // 画像URLと縦横比の両方を保存
        handleInputChange('character_image_url', result.url);
        handleInputChange('image_aspect_ratio', aspectRatio);
      };
      img.src = result.url;

      // 古い画像を削除（新しい画像のアップロード成功後）
      if (oldImagePath) {
        await deleteImage(oldImagePath);
      }

      console.log('Image uploaded successfully:', result.url);

      // 入力フィールドをクリア
      event.target.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      alert(`画像のアップロードに失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setUploadProgress({ progress: 0, isUploading: false });
    }
  };

  const removeImage = async () => {
    const currentImageUrl = characterData.character_image_url;
    if (!currentImageUrl) {
      console.log('No image URL to delete');
      return;
    }

    console.log('Attempting to delete image:', currentImageUrl);

    try {
      // Firebase Storageの画像の場合は削除
      const imagePath = getImagePathFromUrl(currentImageUrl);
      console.log('Extracted image path:', imagePath);

      if (imagePath) {
        await deleteImage(imagePath);
        console.log('Image deletion completed');
      } else {
        console.log('Could not extract image path from URL');
      }

      handleInputChange('character_image_url', '');
    } catch (error) {
      console.error('Failed to delete image:', error);
      // エラーが出ても画像URLは削除する
      handleInputChange('character_image_url', '');
    }
  };

  return (
    <div className="character-info">
      {/* キャラクター名セクション */}

      {/* ロストトグル（右上） */}
      <div className="character-lost-toggle-header">
        <label htmlFor="is_lost">
          <i className="fas fa-skull-crossbones"></i> ロスト
        </label>
        <div className="toggle-wrapper">
          <input
            type="checkbox"
            id="is_lost"
            name="is_lost"
            checked={characterData.is_lost || false}
            onChange={(e) => handleInputChange('is_lost', e.target.checked)}
            className="toggle-checkbox"
          />
          <label htmlFor="is_lost" className="toggle-label">
            <span className="toggle-inner"></span>
            <span className="toggle-switch"></span>
          </label>
        </div>
      </div>

      <div className="character-name-input" style={{ marginTop: '10px' }}>
        <input
          type="text"
          id="character_name"
          name="character_name"
          value={characterData.character_name || ''}
          onChange={(e) => handleInputChange('character_name', e.target.value)}
          placeholder="キャラクターの名前を入力"
        />
      </div>

      {/* パスワード保護設定 */}
      <div className="password-protection-setting" style={{ marginTop: '15px' }}>
        <div className="password-protection-toggle">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={characterData.page_password_enabled || false}
              onChange={(e) => handleInputChange('page_password_enabled', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">
            {characterData.page_password_enabled ? 'パスワード保護ON' : 'パスワード保護OFF'}
          </span>
        </div>
        
        {characterData.page_password_enabled && (
          <div className="password-input-group" style={{ marginTop: '10px' }}>
            <label htmlFor="page_password">
              <i className="fas fa-key"></i> パスワード
            </label>
            <input
              type="password"
              id="page_password"
              name="page_password"
              placeholder="パスワードを入力してください"
              value={characterData.page_password || ''}
              onChange={(e) => handleInputChange('page_password', e.target.value)}
              className="password-input"
            />
          </div>
        )}
      </div>

      {/* アコーディオントグル（見出し風） */}
      <div className="accordion-toggle">
        <button
          type="button"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="accordion-toggle-btn"
        >
          <div className="title-text">
            <i className="fas fa-palette"></i>
            立ち絵/カラー設定
          </div>
          <i className={`fas chevron ${isAccordionOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
        </button>
      </div>

      {/* 2カラムレイアウト（アコーディオンコンテンツ） */}
      <div className={`character-main-info ${isAccordionOpen ? 'accordion-open' : 'accordion-closed'}`}>
        {/* 左カラム：キャラクター画像 */}
        <div className="character-left-column">
          <div className="character-image-section">
            <label>
              <i className="fas fa-image"></i> キャラクター画像
            </label>

            {/* 画像プレビュー */}
            {characterData.character_image_url && (
              <div className="image-preview-container">
                <div className="image-preview">
                  <img
                    src={characterData.character_image_url}
                    alt="キャラクター画像プレビュー"
                    onError={(e) => {
                      console.log('Image load error');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={removeImage}
                    title="画像を削除"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            )}

            {/* アップロードエリア */}
            <div className="image-upload-area">
              <div className="upload-options">
                <div className="upload-option">
                  <label htmlFor="character_image_upload" className="upload-btn">
                    <i className={uploadProgress.isUploading ? "fas fa-spinner fa-spin" : "fas fa-upload"}></i>
                    {uploadProgress.isUploading ? `アップロード中... ${uploadProgress.progress}%` : '画像をアップロード'}
                  </label>
                  <input
                    type="file"
                    id="character_image_upload"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleImageUpload}
                    disabled={uploadProgress.isUploading}
                    style={{ display: 'none' }}
                  />

                  {/* プログレスバー */}
                  {uploadProgress.isUploading && (
                    <div className="upload-progress">
                      <div
                        className="upload-progress-bar"
                        style={{ width: `${uploadProgress.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>

              </div>

              <div className="upload-info">
                <small>
                  <i className="fas fa-info-circle"></i>
                  JPEG、PNG、GIF、WebP形式対応 (最大5MB)
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* 右カラム：基本情報 */}
        <div className="character-right-column">
          <div className="character-kana-input">
            <label htmlFor="character_name_kana">
              <i className="fas fa-font"></i> フリガナ
            </label>
            <input
              type="text"
              id="character_name_kana"
              name="character_name_kana"
              value={characterData.character_name_kana || ''}
              onChange={(e) => handleInputChange('character_name_kana', e.target.value)}
              placeholder="カタカナで入力"
            />
          </div>

          {/* UIカラー設定 */}
          <div className="ui-color-setting">
            <label htmlFor="ui_theme_color">
              <i className="fas fa-paint-brush"></i> UIテーマカラー
            </label>
            <div className="ui-color-description">
              <i className="fas fa-info-circle"></i>
              表示ページの見出しに使用されます。
            </div>
            <div className="color-input-group">
              <input
                type="color"
                id="ui_theme_color_picker"
                value={characterData.ui_theme_color || '#74cdc3'}
                onChange={(e) => handleInputChange('ui_theme_color', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                id="ui_theme_color"
                name="ui_theme_color"
                placeholder="#74cdc3"
                value={characterData.ui_theme_color || ''}
                onChange={(e) => handleInputChange('ui_theme_color', e.target.value)}
                className="color-text-input"
              />
            </div>
          </div>


          {/* 外見・カラー設定 */}
          <div className="appearance-color-setting">
            <h4 className="appearance-title">
              <i className="fas fa-palette"></i> 外見・カラー
            </h4>
            <div className="appearance-grid">

              <div className="color-pair">
                <div className="info-item">
                  <label htmlFor="character_color">
                    <i className="fas fa-circle" style={{ color: characterData.character_color_code || '#74cdc3' }}></i> イメージカラー
                  </label>
                  <input
                    type="text"
                    id="character_color"
                    name="character_color"
                    placeholder="ベビーブルーなど"
                    value={characterData.character_color || ''}
                    onChange={(e) => handleInputChange('character_color', e.target.value)}
                  />
                </div>
                <div className="info-item color-code">
                  <label htmlFor="character_color_code">カラーコード</label>
                  <div className="color-input-group">
                    <input
                      type="color"
                      id="character_color_picker"
                      value={characterData.character_color_code || '#74cdc3'}
                      onChange={(e) => handleInputChange('character_color_code', e.target.value)}
                      className="color-picker"
                    />
                    <input
                      type="text"
                      id="character_color_code"
                      name="character_color_code"
                      placeholder="#abe5ed"
                      value={characterData.character_color_code || ''}
                      onChange={(e) => handleInputChange('character_color_code', e.target.value)}
                      className="color-text-input"
                    />
                  </div>
                </div>
              </div>

              <div className="color-pair">
                <div className="info-item">
                  <label htmlFor="hair_color">
                    <i className="fas fa-circle" style={{ color: characterData.hair_color_code || '#8B4513' }}></i> 髪の色
                  </label>
                  <input
                    type="text"
                    id="hair_color"
                    name="hair_color"
                    placeholder="白髪など"
                    value={characterData.hair_color || ''}
                    onChange={(e) => handleInputChange('hair_color', e.target.value)}
                  />
                </div>
                <div className="info-item color-code">
                  <label htmlFor="hair_color_code">カラーコード</label>
                  <div className="color-input-group">
                    <input
                      type="color"
                      id="hair_color_picker"
                      value={characterData.hair_color_code || '#8B4513'}
                      onChange={(e) => handleInputChange('hair_color_code', e.target.value)}
                      className="color-picker"
                    />
                    <input
                      type="text"
                      id="hair_color_code"
                      name="hair_color_code"
                      placeholder="#ffffff"
                      value={characterData.hair_color_code || ''}
                      onChange={(e) => handleInputChange('hair_color_code', e.target.value)}
                      className="color-text-input"
                    />
                  </div>
                </div>
              </div>

              <div className="color-pair">
                <div className="info-item">
                  <label htmlFor="eye_color">
                    <i className="fas fa-circle" style={{ color: characterData.eye_color_code || '#4169E1' }}></i> 目の色
                  </label>
                  <input
                    type="text"
                    id="eye_color"
                    name="eye_color"
                    placeholder="スカイブルーなど"
                    value={characterData.eye_color || ''}
                    onChange={(e) => handleInputChange('eye_color', e.target.value)}
                  />
                </div>
                <div className="info-item color-code">
                  <label htmlFor="eye_color_code">カラーコード</label>
                  <div className="color-input-group">
                    <input
                      type="color"
                      id="eye_color_picker"
                      value={characterData.eye_color_code || '#4169E1'}
                      onChange={(e) => handleInputChange('eye_color_code', e.target.value)}
                      className="color-picker"
                    />
                    <input
                      type="text"
                      id="eye_color_code"
                      name="eye_color_code"
                      placeholder="#a0d8ef"
                      value={characterData.eye_color_code || ''}
                      onChange={(e) => handleInputChange('eye_color_code', e.target.value)}
                      className="color-text-input"
                    />
                  </div>
                </div>
              </div>

              <div className="color-pair">
                <div className="info-item">
                  <label htmlFor="skin_color">
                    <i className="fas fa-circle" style={{ color: characterData.skin_color_code || '#FDBCB4' }}></i> 肌の色
                  </label>
                  <input
                    type="text"
                    id="skin_color"
                    name="skin_color"
                    placeholder="小麦色など"
                    value={characterData.skin_color || ''}
                    onChange={(e) => handleInputChange('skin_color', e.target.value)}
                  />
                </div>
                <div className="info-item color-code">
                  <label htmlFor="skin_color_code">カラーコード</label>
                  <div className="color-input-group">
                    <input
                      type="color"
                      id="skin_color_picker"
                      value={characterData.skin_color_code || '#FDBCB4'}
                      onChange={(e) => handleInputChange('skin_color_code', e.target.value)}
                      className="color-picker"
                    />
                    <input
                      type="text"
                      id="skin_color_code"
                      name="skin_color_code"
                      placeholder="#f4c2a1"
                      value={characterData.skin_color_code || ''}
                      onChange={(e) => handleInputChange('skin_color_code', e.target.value)}
                      className="color-text-input"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 基本情報セクション */}
      {/* 基本データ アコーディオントグル */}
      <div className="accordion-toggle">
        <button
          type="button"
          onClick={() => setIsBasicDataOpen(!isBasicDataOpen)}
          className="accordion-toggle-btn"
        >
          <div className="title-text">
            <i className="fas fa-id-card"></i>
            基本データ
          </div>
          <i className={`fas chevron ${isBasicDataOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
        </button>
      </div>

      <div className={`accordion-content ${isBasicDataOpen ? 'accordion-open' : 'accordion-closed'}`}>
        <div className="info-grid basic-info">



          <div className="info-item compact">
            <label htmlFor="gender">
              <i className="fas fa-venus-mars"></i> 性別
            </label>
            {characterData.gender === 'その他' ? (
              <div style={{ display: 'flex', gap: '3px', width: '100%' }}>
                <select
                  id="gender"
                  name="gender"
                  value={characterData.gender || ''}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  style={{ flex: '0 0 auto', width: '80px' }}
                >
                  <option value="">-</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                  <option value="その他">その他</option>
                </select>
                <input
                  type="text"
                  name="gender_custom"
                  value={characterData.gender_custom || ''}
                  onChange={(e) => handleInputChange('gender_custom', e.target.value)}
                  placeholder="自由入力"
                  style={{
                    flex: '1 0 calc(100% - 90px)',
                    padding: '8px 10px',
                    fontSize: '1em',
                    textAlign: 'left',
                    boxSizing: 'border-box',
                    borderRadius: '5px',
                    boxShadow: '0 0 2px rgba(0, 0, 0, 0.5) inset',
                    height: 'auto',
                    border: 'none',
                    background: 'transparent'
                  }}
                />
              </div>
            ) : (
              <select
                id="gender"
                name="gender"
                value={characterData.gender || ''}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <option value="">選択してください</option>
                <option value="男">男</option>
                <option value="女">女</option>
                <option value="その他">その他</option>
              </select>
            )}
          </div>

          <div className="info-item compact">
            <label htmlFor="age">
              <i className="fas fa-calendar-alt"></i> 年齢
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={characterData.age || ''}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="20歳"
            />
          </div>

          <div className="info-item compact">
            <label htmlFor="height">
              <i className="fas fa-ruler-vertical"></i> 身長
            </label>
            <input
              type="text"
              id="height"
              name="height"
              placeholder="160cm"
              value={characterData.height || ''}
              onChange={(e) => handleInputChange('height', e.target.value)}
            />
          </div>

          <div className="info-item compact">
            <label htmlFor="weight">
              <i className="fas fa-weight"></i> 体重
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              placeholder="50kg"
              value={characterData.weight || ''}
              onChange={(e) => handleInputChange('weight', e.target.value)}
            />
          </div>

          <div className="info-item">
            <label htmlFor="occupation">
              <i className="fas fa-briefcase"></i> 職業
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={characterData.occupation || ''}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
            />
          </div>

          <div className="info-item">
            <label htmlFor="birthplace">
              <i className="fas fa-map-marker-alt"></i> 出身地
            </label>
            <input
              type="text"
              id="birthplace"
              name="birthplace"
              value={characterData.birthplace || ''}
              onChange={(e) => handleInputChange('birthplace', e.target.value)}
            />
          </div>

          <div className="info-item">
            <label htmlFor="birthday">
              <i className="fas fa-birthday-cake"></i> 誕生日
            </label>
            <input
              type="text"
              id="birthday"
              name="birthday"
              placeholder=""
              value={characterData.birthday || ''}
              onChange={(e) => handleInputChange('birthday', e.target.value)}
            />
          </div>

          <div className="info-item">
            <label htmlFor="zodiac_sign">
              <i className="fas fa-star"></i> 星座
            </label>
            <input
              type="text"
              id="zodiac_sign"
              name="zodiac_sign"
              placeholder=""
              value={characterData.zodiac_sign || ''}
              onChange={(e) => handleInputChange('zodiac_sign', e.target.value)}
            />
          </div>

          <div className="info-item">
            <label htmlFor="blood_type">
              <i className="fas fa-tint"></i> 血液型
            </label>
            <input
              type="text"
              id="blood_type"
              name="blood_type"
              placeholder=""
              value={characterData.blood_type || ''}
              onChange={(e) => handleInputChange('blood_type', e.target.value)}
            />
          </div>

          <div className="info-item">
            <label htmlFor="era">
              <i className="fas fa-history"></i> 時代
            </label>
            <input
              type="text"
              id="era"
              name="era"
              placeholder="1920年代、現代など"
              value={characterData.era || ''}
              onChange={(e) => handleInputChange('era', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 説明・設定セクション */}
      {/* 説明・設定 アコーディオントグル */}
      <div className="accordion-toggle">
        <button
          type="button"
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          className="accordion-toggle-btn"
        >
          <div className="title-text">
            <i className="fas fa-file-alt"></i>
            キャラクター紹介
          </div>
          <i className={`fas chevron ${isDescriptionOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
        </button>
      </div>

      <div className={`accordion-content ${isDescriptionOpen ? 'accordion-open' : 'accordion-closed'}`}>
        <div className="info-grid description-info">

          <div className="info-item full-width">
            <label htmlFor="catchphrase">
              <i className="fas fa-quote-left"></i> キャッチフレーズ
            </label>
            <textarea
              id="catchphrase"
              name="catchphrase"
              placeholder="キャラクターを表す一言"
              value={characterData.catchphrase || ''}
              onChange={(e) => handleInputChange('catchphrase', e.target.value)}
              rows={2}
            />
          </div>

          <div className="info-item full-width">
            <label htmlFor="introduction">
              <i className="fas fa-user-edit"></i> 紹介文
              <span className="label-hint">立ち絵画像の横に表示されます</span>
            </label>

            <div className="wysiwyg-container">
              <div className="wysiwyg-toolbar">
                <div className="toolbar-group">
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('undo')} title="元に戻す">
                    <i className="fas fa-undo"></i>
                  </button>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('redo')} title="進む">
                    <i className="fas fa-redo"></i>
                  </button>
                </div>
                <div className="toolbar-separator"></div>
                <div className="toolbar-group">
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('bold')} title="太字">
                    <i className="fas fa-bold"></i>
                  </button>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('italic')} title="斜体">
                    <i className="fas fa-italic"></i>
                  </button>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('underline')} title="下線">
                    <i className="fas fa-underline"></i>
                  </button>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('strikeThrough')} title="打ち消し線">
                    <i className="fas fa-strikethrough"></i>
                  </button>
                </div>
                <div className="toolbar-separator"></div>
                <div className="toolbar-group color-group">
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowColorPicker(showColorPicker === 'introduction' ? null : 'introduction')}
                    title="文字色"
                  >
                    <i className="fas fa-palette"></i>
                  </button>
                  {showColorPicker === 'introduction' && (
                    <div className="color-palette">
                      {colorPalette.map((color, index) => (
                        <button
                          key={index}
                          type="button"
                          className="color-swatch"
                          style={{ backgroundColor: color }}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => applyColor(color)}
                          title={color}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="toolbar-separator"></div>
                <div className="toolbar-group font-size-group">
                  <select
                    className="font-size-select"
                    onChange={(e) => {
                      const size = parseInt(e.target.value);
                      if (size) {
                        applyFontSize(size);
                      }
                      e.target.value = '';
                    }}
                    defaultValue=""
                    title="フォントサイズ"
                  >
                    <option value="" disabled>
                      <i className="fas fa-text-height"></i> サイズ
                    </option>
                    {fontSizePresets.map((preset, index) => (
                      <option key={index} value={preset.value}>
                        {preset.label} ({preset.size})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                ref={introductionRef}
                className="preview-content editable"
                contentEditable={true}
                suppressContentEditableWarning={true}
                data-placeholder="ここに入力してください..."
                onFocus={(e) => setLastFocusedElement(e.currentTarget)}
                onInput={(e) => handlePreviewInput('introduction', e.currentTarget)}
                onBlur={(e) => handlePreviewBlur('introduction', e.currentTarget)}
              />
            </div>
          </div>

          <div className="info-item full-width secret-info">
            <label htmlFor="secret_information">
              <i className="fas fa-lock"></i> 秘匿情報
              <span className="label-hint">立ち絵画像の横に表示されます</span>
            </label>

            <div className="wysiwyg-container">
              <div className="wysiwyg-toolbar">
                <div className="toolbar-group">
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('undo')} title="元に戻す">
                    <i className="fas fa-undo"></i>
                  </button>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('redo')} title="進む">
                    <i className="fas fa-redo"></i>
                  </button>
                </div>
                <div className="toolbar-separator"></div>
                <div className="toolbar-group">
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('bold')} title="太字">
                    <i className="fas fa-bold"></i>
                  </button>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('italic')} title="斜体">
                    <i className="fas fa-italic"></i>
                  </button>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('underline')} title="下線">
                    <i className="fas fa-underline"></i>
                  </button>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => executeCommand('strikeThrough')} title="打ち消し線">
                    <i className="fas fa-strikethrough"></i>
                  </button>
                </div>
                <div className="toolbar-separator"></div>
                <div className="toolbar-group color-group">
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowColorPicker(showColorPicker === 'secret' ? null : 'secret')}
                    title="文字色"
                  >
                    <i className="fas fa-palette"></i>
                  </button>
                  {showColorPicker === 'secret' && (
                    <div className="color-palette">
                      {colorPalette.map((color, index) => (
                        <button
                          key={index}
                          type="button"
                          className="color-swatch"
                          style={{ backgroundColor: color }}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => applyColor(color)}
                          title={color}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="toolbar-separator"></div>
                <div className="toolbar-group font-size-group">
                  <select
                    className="font-size-select"
                    onChange={(e) => {
                      const size = parseInt(e.target.value);
                      if (size) {
                        applyFontSize(size);
                      }
                      e.target.value = '';
                    }}
                    defaultValue=""
                    title="フォントサイズ"
                  >
                    <option value="" disabled>
                      <i className="fas fa-text-height"></i> サイズ
                    </option>
                    {fontSizePresets.map((preset, index) => (
                      <option key={index} value={preset.value}>
                        {preset.label} ({preset.size})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                ref={secretInfoRef}
                className="preview-content editable"
                contentEditable={true}
                suppressContentEditableWarning={true}
                data-placeholder="表示ページでは折りたたまれます"
                onFocus={(e) => setLastFocusedElement(e.currentTarget)}
                onInput={(e) => handlePreviewInput('secret_information', e.currentTarget)}
                onBlur={(e) => handlePreviewBlur('secret_information', e.currentTarget)}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}