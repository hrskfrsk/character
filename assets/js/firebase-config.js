// Firebase設定ファイル
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Firebase設定
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtwR0-ZkF_FSV6ffDTBj7KAvihhR9S-8c",
  authDomain: "hatake-ffb62.firebaseapp.com",
  projectId: "hatake-ffb62",
  storageBucket: "hatake-ffb62.firebasestorage.app",
  messagingSenderId: "883954002398",
  appId: "1:883954002398:web:91c3ae34dda9b94f5e154f",
  measurementId: "G-GH29QKND4X",
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 匿名認証
let currentUser = null;
signInAnonymously(auth).catch((error) => {
  console.error("認証エラー:", error);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log("ユーザー認証完了:", user.uid);
  }
});

export { db, auth, currentUser };
