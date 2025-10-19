// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUmqScOqy_LHxcSX_TgWfkSAcjB_PlkNU",
  authDomain: "oral-cancer-detection-c0209.firebaseapp.com",
  projectId: "oral-cancer-detection-c0209",
  storageBucket: "oral-cancer-detection-c0209.appspot.com",
  messagingSenderId: "928528033137",
  appId: "1:928528033137:web:5be7604e2ee5a777adc2d0",
  measurementId: "G-20GH5N1MYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize analytics safely (may fail in non-browser environments)
let analytics = null;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export const auth = getAuth(app);
export { analytics, app };
