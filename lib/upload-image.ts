import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export interface UploadProgress {
  progress: number;
  isUploading: boolean;
  error?: string;
}

export interface UploadResult {
  url: string;
  path: string;
}

export const uploadImage = async (
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  try {
    // ファイル名を生成（タイムスタンプ + ランダム文字列）
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const fileName = `character_images/${timestamp}_${randomStr}.${extension}`;

    // Firebase Storage参照を作成
    const storageRef = ref(storage, fileName);

    // アップロードタスクを作成
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // 進行状況を計算
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          
          if (onProgress) {
            onProgress({
              progress: Math.round(progress),
              isUploading: true,
            });
          }
        },
        (error) => {
          // エラーハンドリング
          console.error('Upload failed:', error);
          
          if (onProgress) {
            onProgress({
              progress: 0,
              isUploading: false,
              error: 'アップロードに失敗しました',
            });
          }
          
          reject(error);
        },
        async () => {
          // アップロード完了
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            if (onProgress) {
              onProgress({
                progress: 100,
                isUploading: false,
              });
            }
            
            resolve({
              url: downloadURL,
              path: fileName,
            });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Upload initialization failed:', error);
    throw error;
  }
};

export const deleteImage = async (imagePath: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    console.log('Image deleted successfully:', imagePath);
  } catch (error) {
    console.error('Failed to delete image:', error);
    // エラーを投げずに続行（画像が既に削除されている可能性もある）
  }
};

export const getImagePathFromUrl = (url: string): string | null => {
  try {
    // Firebase Storage URLからパスを抽出
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('firebasestorage.googleapis.com')) {
      const pathMatch = url.match(/o\/(.+?)\?/);
      if (pathMatch) {
        return decodeURIComponent(pathMatch[1]);
      }
    }
    return null;
  } catch {
    return null;
  }
};