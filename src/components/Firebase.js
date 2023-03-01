import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDX2AXtzrM0T5kaJUJyWMu39ut11N5n-cI",
  authDomain: "csc131dreamteam.firebaseapp.com",
  projectId: "csc131dreamteam",
  storageBucket: "csc131dreamteam.appspot.com",
  messagingSenderId: "503706823521",
  appId: "1:503706823521:web:3b77d6a59dbc34d0fc3320",
  measurementId: "G-PS0V7G38XL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);