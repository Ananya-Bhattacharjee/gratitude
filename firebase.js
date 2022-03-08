// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfJ-qZAzzBkQSGvQ2NhgwK153rZrLE514",
  authDomain: "gratitude-52144.firebaseapp.com",
  projectId: "gratitude-52144",
  storageBucket: "gratitude-52144.appspot.com",
  messagingSenderId: "512411719467",
  appId: "1:512411719467:web:231f0d1d40dbd29427976e"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); //firebase database


/*
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}
else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };*/
