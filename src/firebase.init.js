// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyAiZQeoqvrJzI1CZAhDvyngi-y01PJ8H8k",
  // authDomain: "ellsker.firebaseapp.com",
  // projectId: "ellsker",
  // storageBucket: "ellsker.appspot.com",
  // messagingSenderId: "828859403116",
  // appId: "1:828859403116:web:192b604374939da6264149"
  // apiKey: "AIzaSyCuYpuASPzr-CO5tU61OhcrE-sBn0UAteg",
  // authDomain: "genius-car-9f30a.firebaseapp.com",
  // projectId: "genius-car-9f30a",
  // storageBucket: "genius-car-9f30a.appspot.com",
  // messagingSenderId: "941164527550",
  // appId: "1:941164527550:web:813dc3e10ef168e63d43ef"

  apiKey: 'AIzaSyAiZQeoqvrJzI1CZAhDvyngi-y01PJ8H8k',
  authDomain: 'ellsker.firebaseapp.com',
  projectId: 'ellsker',
  storageBucket: 'ellsker.appspot.com',
  messagingSenderId: '828859403116',
  appId: '1:828859403116:web:192b604374939da6264149',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
export default auth