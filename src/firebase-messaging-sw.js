// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyBfHYZ9qNctSKx-jI6OIbPZEFYysbJ_gcY",
    authDomain: "diario-12a43.firebaseapp.com",
    databaseURL: "https://diario-12a43-default-rtdb.firebaseio.com",
    projectId: "diario-12a43",
    storageBucket: "diario-12a43.appspot.com",
    messagingSenderId: "1049768546446",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.'
    };
  
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});