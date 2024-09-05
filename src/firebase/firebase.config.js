// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6EsyQ6NyqmogQzdwzLwtJ-tSThKk0LNY",
  authDomain: "interactive-storytelling-e1ba1.firebaseapp.com",
  projectId: "interactive-storytelling-e1ba1",
  storageBucket: "interactive-storytelling-e1ba1.appspot.com",
  messagingSenderId: "967183182716",
  appId: "1:967183182716:web:24ff538441a526e189d2f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;