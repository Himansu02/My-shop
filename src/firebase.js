// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdKGrmE5L9zhZu6KFebk07AfPaydlxt6Y",
  authDomain: "myshop-f1ae6.firebaseapp.com",
  projectId: "myshop-f1ae6",
  storageBucket: "myshop-f1ae6.appspot.com",
  messagingSenderId: "922299482634",
  appId: "1:922299482634:web:cf6926a4d15146954dd5f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app