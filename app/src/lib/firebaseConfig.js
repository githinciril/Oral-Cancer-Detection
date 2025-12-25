// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";

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

// Initialize auth with React Native AsyncStorage persistence when available
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (_e) {
  // Fallback for environments where initializeAuth isn't available
  auth = getAuth(app);
}

export { analytics, app, auth };

// Provide a harmless default export so Expo Router stops warning about missing default export
export default function FirebaseConfig() {
  return null;
}

