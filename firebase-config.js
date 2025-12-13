// Firebase Configuration for BIORGANIX Web
const firebaseConfig = {
    apiKey: "AIzaSyAAsnon-YClnsMPaOu5x1gjbQexbAmfXgQ",
    authDomain: "inventario-2c4f7.firebaseapp.com",
    projectId: "inventario-2c4f7",
    storageBucket: "inventario-2c4f7.firebasestorage.app",
    messagingSenderId: "250448151120",
    appId: "1:250448151120:web:d4a56ba4a82bf351784755",
    measurementId: "G-5NDRNRS3GD"
};

// Initialize Firebase
if (typeof firebase === 'undefined') {
    console.error('❌ Firebase SDK not loaded. Make sure firebase-app-compat.js is included before this script.');
} else {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    window.db = firebase.firestore();
    console.log('✅ Firebase initialized successfully');
}
