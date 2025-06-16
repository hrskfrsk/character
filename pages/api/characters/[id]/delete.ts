import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../lib/firebase-admin';
import { getStorage } from 'firebase-admin/storage';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid character ID' });
  }

  try {
    // Firebase Adminが初期化されているか確認
    if (!db) {
      console.error('Firebase Admin DB is not initialized');
      return res.status(500).json({ error: 'Database connection error' });
    }

    // キャラクターデータを取得（画像URLを確認するため）
    const characterDoc = await db.collection('characters').doc(id).get();
    
    if (!characterDoc.exists) {
      return res.status(404).json({ error: 'Character not found' });
    }

    const characterData = characterDoc.data();
    
    // 画像URLがある場合は、Firebase Storageから削除
    if (characterData?.character_image_url) {
      try {
        // URLからStorage pathを抽出
        const url = characterData.character_image_url;
        const pathMatch = url.match(/o\/(.+?)\?/);
        
        if (pathMatch) {
          const imagePath = decodeURIComponent(pathMatch[1]);
          const storage = getStorage();
          const file = storage.bucket().file(imagePath);
          
          // ファイルが存在するか確認してから削除
          const [exists] = await file.exists();
          if (exists) {
            await file.delete();
            console.log('Deleted image:', imagePath);
          }
        }
      } catch (error) {
        // 画像削除に失敗してもキャラクター削除は続行
        console.error('Failed to delete image:', error);
      }
    }

    // Firestoreからキャラクターデータを削除
    await db.collection('characters').doc(id).delete();

    res.status(200).json({ success: true, message: 'Character deleted successfully' });
  } catch (error) {
    console.error('Error deleting character:', error);
    res.status(500).json({ error: 'Failed to delete character' });
  }
}