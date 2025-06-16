import React, { useState } from 'react';
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
      <div className="character-name-section">
        <div className="character-name-input">
          <label htmlFor="character_name">
            <i className="fas fa-signature"></i> キャラクター名
          </label>
          <input
            type="text"
            id="character_name"
            name="character_name"
            value={characterData.character_name || ''}
            onChange={(e) => handleInputChange('character_name', e.target.value)}
            placeholder="キャラクターの名前を入力"
          />
        </div>
        <div className="character-sub-info">
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
          <div className="character-lost-toggle">
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
        </div>
      </div>

      {/* 基本情報セクション */}
      <div className="info-section">
        <h3 className="subsection-title">
          <i className="fas fa-id-card"></i> 基本データ
        </h3>
        <div className="info-grid basic-info">



          <div className="info-item compact">
            <label htmlFor="age">
              <i className="fas fa-calendar-alt"></i> 年齢
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={characterData.age || ''}
              onChange={(e) => handleInputChange('age', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
              min="1"
              max="200"
            />
          </div>

          <div className="info-item compact">
            <label htmlFor="gender">
              <i className="fas fa-venus-mars"></i> 性別
            </label>
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
          </div>

          <div className="info-item compact">
            <label htmlFor="height">
              <i className="fas fa-ruler-vertical"></i> 身長
            </label>
            <input
              type="text"
              id="height"
              name="height"
              placeholder="170"
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
              placeholder="65"
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

          <div className="info-item">
            <label htmlFor="birthday">
              <i className="fas fa-birthday-cake"></i> 誕生日
            </label>
            <input
              type="text"
              id="birthday"
              name="birthday"
              placeholder="3月15日など"
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
              placeholder="うお座など"
              value={characterData.zodiac_sign || ''}
              onChange={(e) => handleInputChange('zodiac_sign', e.target.value)}
            />
          </div>

          <div className="info-item">
            <label htmlFor="blood_type">
              <i className="fas fa-tint"></i> 血液型
            </label>
            <select
              id="blood_type"
              name="blood_type"
              value={characterData.blood_type || ''}
              onChange={(e) => handleInputChange('blood_type', e.target.value)}
            >
              <option value="">選択してください</option>
              <option value="A型">A型</option>
              <option value="B型">B型</option>
              <option value="O型">O型</option>
              <option value="AB型">AB型</option>
            </select>
          </div>
        </div>
      </div>

      {/* UIカラー設定セクション */}
      <div className="info-section">
        <h3 className="subsection-title">
          <i className="fas fa-paint-brush"></i> UIカラー設定
        </h3>
        <div className="info-grid appearance-info">
          <div className="color-pair">
            <div className="info-item">
              <label htmlFor="ui_theme_color">
                <i className="fas fa-palette"></i> UIテーマカラー
              </label>
              <div className="color-input-group">
                <input
                  type="color"
                  id="ui_theme_color_picker"
                  value={characterData.ui_theme_color || '#22c6d8'}
                  onChange={(e) => handleInputChange('ui_theme_color', e.target.value)}
                  className="color-picker"
                />
                <input
                  type="text"
                  id="ui_theme_color"
                  name="ui_theme_color"
                  placeholder="#22c6d8"
                  value={characterData.ui_theme_color || ''}
                  onChange={(e) => handleInputChange('ui_theme_color', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>
            <div className="info-item">
              <label>
                <i className="fas fa-info-circle"></i> 説明
              </label>
              <div style={{ fontSize: '0.9em', color: '#666', padding: '8px 0' }}>
                表示ページの見出しやボーダーの色に使用されます
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 外見情報セクション */}
      <div className="info-section">
        <h3 className="subsection-title">
          <i className="fas fa-palette"></i> 外見・カラー
        </h3>
        <div className="info-grid appearance-info">

          <div className="color-pair">
            <div className="info-item">
              <label htmlFor="character_color">
                <i className="fas fa-circle" style={{ color: characterData.character_color_code || '#22c6d8' }}></i> イメージカラー
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
                  value={characterData.character_color_code || '#22c6d8'}
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

          <div className="info-item full-width image-upload-section">
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

                <div className="upload-divider">または</div>

                <div className="upload-option">
                  <input
                    type="url"
                    id="character_image_url"
                    name="character_image_url"
                    placeholder="画像URLを入力 (https://example.com/image.png)"
                    value={characterData.character_image_url || ''}
                    onChange={(e) => handleInputChange('character_image_url', e.target.value)}
                    className="url-input"
                  />
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
      </div>

      {/* 説明・設定セクション */}
      <div className="info-section">
        <h3 className="subsection-title">
          <i className="fas fa-file-alt"></i> 説明・設定
        </h3>
        <div className="info-grid description-info">

          <div className="info-item full-width">
            <label htmlFor="introduction">
              <i className="fas fa-user-edit"></i> 紹介文
              <span className="label-hint">HTMLタグが使用できます</span>
            </label>
            <textarea
              id="introduction"
              name="introduction"
              rows={6}
              placeholder="キャラクターの詳細な紹介文を記入してください..."
              value={characterData.introduction || ''}
              onChange={(e) => handleInputChange('introduction', e.target.value)}
            ></textarea>
          </div>

          <div className="info-item full-width secret-info">
            <label htmlFor="secret_information">
              <i className="fas fa-lock"></i> 秘匿情報
              <span className="label-hint">HTMLタグが使用できます</span>
            </label>
            <textarea
              id="secret_information"
              name="secret_information"
              rows={6}
              placeholder="他のプレイヤーに見せたくない秘密の情報..."
              value={characterData.secret_information || ''}
              onChange={(e) => handleInputChange('secret_information', e.target.value)}
            ></textarea>
          </div>

        </div>
      </div>
    </div>
  );
}