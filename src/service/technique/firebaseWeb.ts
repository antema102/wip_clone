import CryptoJS from 'crypto-js';
import config from '../../data/constants/config';
import { getMessaging, getToken, deleteToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAucuhzqLGuEteT8WkspZi1siE8BUVrs5U',
  authDomain: 'wip-work.firebaseapp.com',
  projectId: 'wip-work',
  storageBucket: 'wip-work.firebasestorage.app',
  messagingSenderId: '119803414077',
  appId: '1:119803414077:web:4d3bf6c8424f6ff4cecc54',
  measurementId: 'G-D6LHSJ75S5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const getGoogleToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }

    const currentToken = await getToken(messaging, {
      vapidKey:
        'BBwWoi2e0oftWs1LqAqASVRdkllRywXHPlQ0Nfb9x4ql0EtY0q8kQ-ttxJLFNHBKRFccLuoCceXwvskNIbY-v3I',
    });

    if (currentToken) {
      return currentToken;
    } else {
      console.warn('Aucun token reçu. Peut-être déjà bloqué ?');
      return null;
    }
  } catch (err) {
    console.error('Erreur lors de la récupération du token :', err);
    return null;
  }
};

export const deleteGoogleToken = async () => {
  try {
    await deleteToken(messaging);
  } catch (err) {
    console.error('Erreur lors de la suppression du token :', err);
  }
};
