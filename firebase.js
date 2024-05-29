// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
import { getDatabase, ref, set } from 'firebase/database';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPJzSPXmOROGizZECG-wUW_l2KWS2c_nM",
  authDomain: "party-project-9ab79.firebaseapp.com",
  projectId: "party-project-9ab79",
  storageBucket: "party-project-9ab79.appspot.com",
  messagingSenderId: "398841353411",
  appId: "1:398841353411:web:5d41d6efd2568baf48be76",
  measurementId: "G-PW3B3847HZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});



const db = getFirestore();

export { auth, db };
const database = getDatabase(app);

// const analytics = getAnalytics(app);