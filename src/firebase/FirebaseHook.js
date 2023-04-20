import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAHGc_R9tfURMHeySxq_SKlc2mM5LvRFE",
  authDomain: "csc131dreamteam-883ba.firebaseapp.com",
  projectId: "csc131dreamteam-883ba",
  storageBucket: "csc131dreamteam-883ba.appspot.com",
  messagingSenderId: "1078873703167",
  appId: "1:1078873703167:web:510a64162da8556958c2ca",
  measurementId: "G-N7K7KZ6N9J"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export const auth = getAuth();

export default firebaseApp;