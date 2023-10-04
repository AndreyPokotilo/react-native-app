import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCVoChC0imZxC4cVJ-dwu-VLDPg-RnQ5IU",
    authDomain: "reac-native-app-8af51.firebaseapp.com",
    projectId: "reac-native-app-8af51",
    storageBucket: "reac-native-app-8af51.appspot.com",
    messagingSenderId: "754325020533",
    appId: "1:754325020533:web:5c60ecd09f4025f760bd3c"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
