import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin初期化（サーバーサイド専用）
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export const adminDb = getFirestore();

// キャラクターデータ取得関数
export async function getCharacterData(characterId: string) {
  try {
    const doc = await adminDb.collection('characters').doc(characterId).get();
    
    if (!doc.exists) {
      return null;
    }
    
    const data = doc.data();
    return {
      id: characterId,
      ...data,
      // Timestamp型をJSONシリアライズ可能な形式に変換
      createdAt: data?.createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: data?.updatedAt?.toDate?.()?.toISOString() || null,
    };
  } catch (error) {
    console.error('Character data fetch error:', error);
    return null;
  }
}

// 全キャラクターID取得（静的生成用）
export async function getAllCharacterIds() {
  try {
    const snapshot = await adminDb.collection('characters').get();
    return snapshot.docs.map(doc => ({
      params: { id: doc.id }
    }));
  } catch (error) {
    console.error('Character IDs fetch error:', error);
    return [];
  }
}