import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbwQ3KcOgeSSVk98-oSSqgbaqSvT_UfEQ",
  authDomain: "crediblemind-exam.firebaseapp.com",
  projectId: "crediblemind-exam",
  storageBucket: "crediblemind-exam.appspot.com",
  messagingSenderId: "856175528326",
  appId: "1:856175528326:web:2fac1e7333a8d9b34a0407",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storageRef = firebase.storage();

export { db, storageRef };
