import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDW5FYOCbw_UwAgKx-B0F8omEIquAV2Kps",
    authDomain: "drone-tracker-41.firebaseapp.com",
    databaseURL: "https://drone-tracker-41.firebaseio.com",
    projectId: "drone-tracker-41",
    storageBucket: "drone-tracker-41.appspot.com",
    messagingSenderId: "493350744720",
    appId: "1:493350744720:web:51e28e6ea8375d1502de15",
    measurementId: "G-LXPW5BSMQ4"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;



