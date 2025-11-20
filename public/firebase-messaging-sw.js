importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

//the Firebase config object
const firebaseConfig = {
  apiKey: 'AIzaSyAucuhzqLGuEteT8WkspZi1siE8BUVrs5U',
  authDomain: 'wip-work.firebaseapp.com',
  projectId: 'wip-work',
  storageBucket: 'wip-work.firebasestorage.app',
  messagingSenderId: '119803414077',
  appId: '1:119803414077:web:4d3bf6c8424f6ff4cecc54',
  measurementId: 'G-D6LHSJ75S5',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
