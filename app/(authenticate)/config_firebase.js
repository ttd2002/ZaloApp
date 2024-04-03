// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore'

// export const firebaseConfig = {
//     apiKey: "AIzaSyCROZqoc3F7QJP83d4QewNvu4MbHdedjNo",
//     authDomain: "otp-zalo-15b8f.firebaseapp.com",
//     projectId: "otp-zalo-15b8f",
//     storageBucket: "otp-zalo-15b8f.appspot.com",
//     messagingSenderId: "608484559999",
//     appId: "1:608484559999:web:e5a6fc56c7930cd818034a",
//     measurementId: "G-S6MDL4EZEG"
// };

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
// }
import { initializeApp } from 'firebase/app';

// // Optionally import the services that you want to use
import "firebase/auth";
// // import {...} from "firebase/database";
import "firebase/firestore";
// // import {...} from "firebase/functions";
// // import {...} from "firebase/storage";

// // Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCROZqoc3F7QJP83d4QewNvu4MbHdedjNo",
    authDomain: "otp-zalo-15b8f.firebaseapp.com",
    projectId: "otp-zalo-15b8f",
    storageBucket: "otp-zalo-15b8f.appspot.com",
    messagingSenderId: "608484559999",
    appId: "1:608484559999:web:e5a6fc56c7930cd818034a",
    measurementId: "G-S6MDL4EZEG"
};

const app = initializeApp(firebaseConfig);
// // For more information on how to access Firebase in your project,
// // see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
