// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: true,
  apiKey: "AIzaSyARQ0VD9TA1KvR0FmHiUVNU3V5SAgn-mKU",
  authDomain: "task-list-ionic.firebaseapp.com",
  projectId: "task-list-ionic",
  storageBucket: "task-list-ionic.appspot.com",
  messagingSenderId: "353852127130",
  appId: "1:353852127130:web:b8c5466d829a4611b8ec23",
  measurementId: "G-XV35B7WKZM"
};

// Initialize Firebase
const app = initializeApp(environment);
const analytics = getAnalytics(app);