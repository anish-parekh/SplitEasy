// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCCRTOS6osQUCh-GOoDzI5p_ZV0kNHgpXY",
    authDomain: "spliteasy-96f81.firebaseapp.com",
    projectId: "spliteasy-96f81",
    storageBucket: "spliteasy-96f81.appspot.com",
    messagingSenderId: "392832474569",
    appId: "1:392832474569:web:5923666460405f6e55dc18",
    measurementId: "G-1GV1078ZXC"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;