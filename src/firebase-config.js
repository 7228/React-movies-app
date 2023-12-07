import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "movie-app-83464.appspot.com",
    messagingSenderId: "438390880363",
    appId: process.env.REACT_APP_APP_ID ,
    measurementId: "G-0SK6KX1QTY"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
