import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin初期化
let adminDb: any = null;

try {
  if (!getApps().length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    if (!privateKey || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PROJECT_ID) {
      throw new Error('Firebase Admin environment variables are missing');
    }
    
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    
    console.log('Firebase Admin initialized successfully');
  }
  
  adminDb = getFirestore();
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

export { adminDb };

// キャラクターデータ取得関数
export async function getCharacterData(characterId: string) {
  try {
    if (!adminDb) {
      throw new Error('Firebase Admin not initialized');
    }
    
    const doc = await adminDb.collection('characters').doc(characterId).get();
    
    if (!doc.exists) {
      return null;
    }
    
    const data = doc.data();
    
    // Firestore Timestampを文字列に変換
    const serializedData = JSON.parse(JSON.stringify(data, (key, value) => {
      if (value && typeof value === 'object' && value._seconds) {
        // Firestore Timestamp
        return new Date(value._seconds * 1000).toISOString();
      }
      return value;
    }));
    
    return { id: doc.id, ...serializedData };
  } catch (error) {
    console.error('Character data fetch error:', error);
    return null;
  }
}

// 全キャラクターID取得
export async function getAllCharacterIds() {
  try {
    if (!adminDb) {
      throw new Error('Firebase Admin not initialized');
    }
    
    const snapshot = await adminDb.collection('characters').get();
    const paths = snapshot.docs.map((doc: any) => ({
      params: { id: doc.id }
    }));
    
    return paths;
  } catch (error) {
    console.error('Character IDs fetch error:', error);
    return [];
  }
}