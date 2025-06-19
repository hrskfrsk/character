import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin初期化
let adminDb: any = null;
let isInitialized = false;

function initializeFirebaseAdmin() {
  try {
    if (!getApps().length) {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
      
      if (!privateKey || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PROJECT_ID) {
        console.warn('Firebase Admin environment variables are missing - running in offline mode');
        return false;
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
    isInitialized = true;
    return true;
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    isInitialized = false;
    return false;
  }
}

// 初期化を試行
initializeFirebaseAdmin();

export { adminDb };
export const db = adminDb;

// キャラクターデータ取得関数
export async function getCharacterData(characterId: string) {
  try {
    if (!isInitialized || !adminDb) {
      console.warn('Firebase Admin not initialized, cannot fetch character data');
      return null;
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
    if (!isInitialized || !adminDb) {
      console.warn('Firebase Admin not initialized, cannot fetch character IDs');
      return [];
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

// 全キャラクターデータ取得
export async function getAllCharacterData() {
  try {
    if (!isInitialized || !adminDb) {
      console.warn('Firebase Admin not initialized, cannot fetch character data');
      return [];
    }
    
    const snapshot = await adminDb.collection('characters').get();
    const characters = snapshot.docs.map((doc: any) => {
      const data = doc.data();
      
      // Firestore Timestampを文字列に変換
      const serializedData = JSON.parse(JSON.stringify(data, (_key, value) => {
        if (value && typeof value === 'object' && value._seconds) {
          // Firestore Timestamp
          return new Date(value._seconds * 1000).toISOString();
        }
        return value;
      }));
      
      return { id: doc.id, ...serializedData };
    });
    
    return characters;
  } catch (error) {
    console.error('All character data fetch error:', error);
    return [];
  }
}