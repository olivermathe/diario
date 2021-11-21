importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBfHYZ9qNctSKx-jI6OIbPZEFYysbJ_gcY",
    authDomain: "diario-12a43.firebaseapp.com",
    databaseURL: "https://diario-12a43-default-rtdb.firebaseio.com",
    projectId: "diario-12a43",
    storageBucket: "diario-12a43.appspot.com",
    messagingSenderId: "1049768546446",
    appId: "1:1049768546446:web:0c74e1ce14716094e9f9df",
});

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
        console.log('onBackgroundMessage', { notification: { title, body, image } });
        self.registration.showNotification(title, { body, icon: image || '/assets/icons/72x72.png' });
    });
}