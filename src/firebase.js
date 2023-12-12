// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
const firebaseConfig = {
  apiKey: "AIzaSyAdwWt-1WTkeGwAxBou_vSkGTyrJrEwAyc",
  authDomain: "databaseinventory-d9021.firebaseapp.com",
  projectId: "databaseinventory-d9021",
  storageBucket: "databaseinventory-d9021.appspot.com",
  messagingSenderId: "903220001267",
  appId: "1:903220001267:web:160e0e2b03e7db956aba86"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);