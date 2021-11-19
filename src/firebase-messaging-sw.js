import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getMessaging, onBackgroundMessage, isSupported } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-sw.js';

const app = initializeApp({
  apiKey: "AIzaSyBfHYZ9qNctSKx-jI6OIbPZEFYysbJ_gcY",
  authDomain: "diario-12a43.firebaseapp.com",
  databaseURL: "https://diario-12a43-default-rtdb.firebaseio.com",
  projectId: "diario-12a43",
  storageBucket: "diario-12a43.appspot.com",
  messagingSenderId: "1049768546446",
  appId: "1:1049768546446:web:0c74e1ce14716094e9f9df"
});

isSupported().then(isSupported => {

  if (isSupported) {

    const messaging = getMessaging(app);

    onBackgroundMessage(messaging, ({ notification: { title, body, image } }) => {
      self.registration.showNotification(title, { body, icon: image || '/assets/icons/icon-72x72.png' });
    });

  }

});