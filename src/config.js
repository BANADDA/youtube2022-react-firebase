// Import firebase and the modules you need
import firebase from "firebase/compat/app";
import "firebase/compat/database";

// Define your firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyA09dIIzv_Zbhn_cyVkf6VHdvF3H436fFA",
    authDomain: "maizedisease.firebaseapp.com",
    projectId: "maizedisease",
    storageBucket: "maizedisease.appspot.com",
    messagingSenderId: "182965644044",
    appId: "1:182965644044:web:53c31371b589188ccab729",
    measurementId: "G-6GF6XM6KJB"
};

// Initialize firebase with your config
const app = firebase.initializeApp(firebaseConfig);

// Export firebase and the app instance
export { firebase, app };
