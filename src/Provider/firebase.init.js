// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8QRFejs_ofWN1ZlDE3OW3TSXa3vsAe9c",
    authDomain: "my-life-210c1.firebaseapp.com",
    projectId: "my-life-210c1",
    storageBucket: "my-life-210c1.appspot.com",
    messagingSenderId: "258295417488",
    appId: "1:258295417488:web:06e5f7d03423675be82615"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;