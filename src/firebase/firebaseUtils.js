/*
    Summary of whole thing
*/
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET, REACT_APP_FIREBASE_MESSAGING_SENDER_ID, REACT_APP_FIREBASE_APP_ID, REACT_APP_FIREBASE_MEASUREMEMT_ID } = process.env;

// Firebase Configuration Object
const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMEMT_ID
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    // Is this a function?
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    // Is this a function?
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email, photoURL } = userAuth;
        // Is this a function?
        const createdAt = new Date();
        try {
            // Is this a function?
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData,
            })
        } catch (error) {
            // Is this a function?
            console.log("error creating user", error.message)
        }
    }

    return userRef;
}

export const getCurrentUser = () => {
    // Is this a function?
    return new Promise((resolve, reject) => {
        // Is this a function?
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}

// Firebase web app init
firebase.initializeApp(firebaseConfig)

// Is this a function?
export const auth = firebase.auth()
// Is this a function?
export const firestore = firebase.firestore()

// Sign in With Google Setup with popup
// Is this a function?
export const googleProvider = new firebase.auth.GoogleAuthProvider()
// Is this a function?
googleProvider.setCustomParameters({ prompt: "select_account" })
// Is this a function?
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase
