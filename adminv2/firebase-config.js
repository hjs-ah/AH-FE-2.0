// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD94u-0_4ViLAVgi_gLBy-xztQfs7z6twE",
  authDomain: "ah-fe-6a0c0.firebaseapp.com",
  projectId: "ah-fe-6a0c0",
  storageBucket: "ah-fe-6a0c0.firebasestorage.app",
  messagingSenderId: "225964347020",
  appId: "1:225964347020:web:87ebe0ffb82fc492daf5a9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Export for use in other files
window.firebaseApp = {
  auth,
  db,
  storage
};
