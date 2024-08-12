import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQG9kxux9FtePGipyMXNlGAJz2T2TOfcs",
  authDomain: "buzzys-bb506.firebaseapp.com",
  projectId: "buzzys-bb506",
  storageBucket: "buzzys-bb506.appspot.com",
  messagingSenderId: "341078977294",
  appId: "1:341078977294:web:b45e2d0fadb7183552055f",
  measurementId: "G-DY0JTJTL20",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
