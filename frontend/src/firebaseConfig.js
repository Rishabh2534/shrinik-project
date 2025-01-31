// frontend/firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/storage';
/*
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};*/
const firebaseConfig = {
  apiKey: "AIzaSyBLbCwTtZXEiP2BM-s3M3zaW2PGygmnF8k",
  authDomain: "shrinik-35304.firebaseapp.com",
  projectId: "shrinik-35304",
  storageBucket: "shrinik-35304.firebasestorage.app",
  messagingSenderId: "816557989104",
  appId: "1:816557989104:web:4f776b924c5bc9f8c8f635",
  measurementId: "G-HKJEZ2QXCJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { storage, firebase as default };

