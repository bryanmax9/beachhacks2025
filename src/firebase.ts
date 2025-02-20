// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDBxmxtH1BmbT4EMGH7ZPD5d1JUtmClX5A",
//   authDomain: "beachhacks2025.firebaseapp.com",
//   projectId: "beachhacks2025",
//   storageBucket: "beachhacks2025.firebasestorage.app",
//   messagingSenderId: "1082847107380",
//   appId: "1:1082847107380:web:98eda34870ae1b96216d61",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDBxmxtH1BmbT4EMGH7ZPD5d1JUtmClX5A",
  authDomain: "beachhacks2025.firebaseapp.com",
  projectId: "beachhacks2025",
  storageBucket: "beachhacks2025.firebasestorage.app",
  messagingSenderId: "1082847107380",
  appId: "1:1082847107380:web:98eda34870ae1b96216d61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Auth instance for use in your components
export const auth = getAuth(app);

//  Export Firestore
export const db = getFirestore(app);

export default app;
