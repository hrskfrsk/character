import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  isOpen: boolean;
  onClose: () => void;
  sourceImageUrl: string;
  onCropComplete: (croppedImageUrl: string) => void;
  characterName?: string;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  isOpen,
  onClose,
  sourceImageUrl,
  onCropComplete,
  characterName = 'キャラクター'
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [loading, setLoading] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Firebase画像をプロキシ経由で読み込み
  useEffect(() => {
    if (!sourceImageUrl || !isOpen) return;

    const loadImageWithProxy = async () => {
      try {
        // Firebase StorageのURLかどうかチェック
        if (sourceImageUrl.includes('firebasestorage.googleapis.com')) {
          // プロキシ経由で画像を取得
          const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(sourceImageUrl)}`;
          setProcessedImageUrl(proxyUrl);
        } else {
          // その他のURLはそのまま使用
          setProcessedImageUrl(sourceImageUrl);
        }
      } catch (error) {
        console.warn('Failed to process image URL:', error);
        setProcessedImageUrl(sourceImageUrl);
      }
    };

    loadImageWithProxy();

    return () => {
      // プロキシURLの場合はrevokeしない
      if (processedImageUrl && processedImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(processedImageUrl);
      }
    };
  }, [sourceImageUrl, isOpen]);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    
    // 画像の縦横比に応じて初期クロップ領域を調整
    const size = Math.min(naturalWidth, naturalHeight);
    const x = (naturalWidth - size) / 2;
    const y = (naturalHeight - size) / 2;
    
    setCrop({
      unit: 'px',
      width: size * 0.6,
      height: size * 0.6,
      x: x + size * 0.2,
      y: y + size * 0.2
    });
  }, []);

  const generateCroppedImage = useCallback(async () => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    setLoading(true);

    try {
      const image = imgRef.current;
      
      // キャンバスを作成
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      // キャンバスサイズを256x256に設定（高解像度）
      const targetSize = 256;
      canvas.width = targetSize;
      canvas.height = targetSize;

      // 高品質レンダリング設定
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 表示された画像と実際の画像のスケール比を計算
      const scaleX = image.naturalWidth / image.clientWidth;
      const scaleY = image.naturalHeight / image.clientHeight;

      // クロップ座標を実際の画像サイズに変換
      const sourceX = completedCrop.x * scaleX;
      const sourceY = completedCrop.y * scaleY;
      const sourceWidth = completedCrop.width * scaleX;
      const sourceHeight = completedCrop.height * scaleY;

      console.log('Crop info:', {
        completedCrop,
        scale: { scaleX, scaleY },
        source: { x: sourceX, y: sourceY, width: sourceWidth, height: sourceHeight },
        imageSize: { natural: { width: image.naturalWidth, height: image.naturalHeight }, 
                    display: { width: image.clientWidth, height: image.clientHeight } }
      });

      // 白背景を設定（透明部分があった場合の対策）
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetSize, targetSize);

      // 画像をクロップしてキャンバスに描画
      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        targetSize,
        targetSize
      );

      // キャンバスからデータURLを取得（PNG形式で無劣化）
      const dataUrl = canvas.toDataURL('image/png');
      
      // dataURLが正常に生成されたかチェック
      if (!dataUrl || dataUrl === 'data:,') {
        throw new Error('Failed to generate cropped image data');
      }
      
      // データURLをBlobに変換
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const croppedImageUrl = URL.createObjectURL(blob);

      onCropComplete(croppedImageUrl);
      setLoading(false);
      onClose();
    } catch (error) {
      console.error('Crop generation error:', error);
      setLoading(false);
      alert('画像の処理に失敗しました: ' + (error instanceof Error ? error.message : '不明なエラー'));
    }
  }, [completedCrop, onCropComplete, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          fontSize: '20px',
          color: '#333',
          textAlign: 'center'
        }}>
          <i className="fas fa-crop" style={{ marginRight: '8px' }}></i>
          {characterName}の顔画像をクロップ
        </h3>

        <div style={{
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p style={{
            margin: '0 0 16px 0',
            fontSize: '14px',
            color: '#666'
          }}>
            顔部分をドラッグして選択してください
          </p>

          <div style={{
            maxWidth: '500px',
            maxHeight: '500px',
            margin: '0 auto',
            border: '1px solid #ddd',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1} // 正方形に固定
              minWidth={50}
              minHeight={50}
            >
              <img
                ref={imgRef}
                src={processedImageUrl || sourceImageUrl}
                alt="クロップ対象画像"
                onLoad={onImageLoad}
                style={{
                  maxWidth: '100%',
                  maxHeight: '500px',
                  display: 'block'
                }}
              />
            </ReactCrop>
          </div>
        </div>

        {/* プレビュー情報 */}
        {completedCrop && (
          <div style={{
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <p style={{
              margin: '0',
              fontSize: '14px',
              color: '#666'
            }}>
              選択範囲: {Math.round(completedCrop.width)} × {Math.round(completedCrop.height)}px<br />
              最終サイズ: 256 × 256px（高品質）
            </p>
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f0f0f0',
              color: '#666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            キャンセル
          </button>

          <button
            onClick={generateCroppedImage}
            disabled={!completedCrop || loading}
            style={{
              padding: '10px 20px',
              backgroundColor: loading ? '#ccc' : '#74cdc3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '6px' }}></i>
                処理中...
              </>
            ) : (
              <>
                <i className="fas fa-check" style={{ marginRight: '6px' }}></i>
                顔画像を設定
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;