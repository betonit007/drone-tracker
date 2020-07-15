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

//GET FLAMES
export const getFlames = async () => {
  const flamesRef = firestore.collection(`flames`);

  const flames = await flamesRef.get();
 
};

//CREATE FLAME
export const addDrone = async ({lat, lng}) => {
  
  try {
    console.log(lat, lng)
    const flameRef = firestore.collection('drones')
    await flameRef.add({ 
      lat,
      lng,
      time: new Date()
    })

  } catch (err) {
    console.log(err.message)
  }
}

//VERIFY USER / CREATE USER IF DOESN'T EXIT
export const createUserProfileDocument = async (userAuth, additionalData) => {
  
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        photoURL,
        ...additionalData,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  return userRef;
};
