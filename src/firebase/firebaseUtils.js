/*
    This file stores important functionality for basic client-service
    interaction. A connection to Firebase is established and is used to
    update a user's profile, check for login/logout activity, and provide
    basic user authentication.
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

/*
    Endpoint which takes in user authentication and data,
    returns with a new user profile to be linked with the user itself
*/
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    // Is Gets user information from Firebase database
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    // Can return a Document Snapshot linked to user or an undefined object
    // Next if-statements checks if it returned a valid snapshot or not
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email, photoURL } = userAuth;
        // Construction call which gets us the current date
        const createdAt = new Date();
        try {
            // Edits userRef with data passed from endpoint parameters
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData,
            })
        } catch (error) {
            // Display error message in the event no snapshot is detected
            console.log("error creating user", error.message)
        }
    }

    return userRef;
}

// Checks for login/logout state changes in user
export const getCurrentUser = () => {
    // Lets the unsubscribe check be performed async
    return new Promise((resolve, reject) => {
        // Listens for any changes in logged in/logged out states in Firebase
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}

// Firebase web app init
firebase.initializeApp(firebaseConfig)

// Make calls to access firebase auth and firestore and store to local vars
export const auth = firebase.auth()
export const firestore = firebase.firestore()

// Sign in With Google Setup with popup
// Use constructor to create and save GoogleAuthProvider object
export const googleProvider = new firebase.auth.GoogleAuthProvider()
// Edit our new auth provider object
googleProvider.setCustomParameters({ prompt: "select_account" })
// Let's user authenticate by signing in with Google account
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase
