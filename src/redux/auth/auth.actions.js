/*
This file contains a collection of Redux acion creators related to user authentication processes.
Each function returns an action object with a type and often a payload, 
type identifies the action and payload contains necessary data
These actions handle user session checks, sign-ins(google, email, anonymous), 
sign-out, as well as success and failure states
*/

import { authActionTypes } from "./auth.types"

// Checks the user's current session status
export const checkUserSession = () => ({
    type: authActionTypes.CHECK_USER_SESSION
})

// Initiates the sign-in process using email and password
export const emailSignInStart = emailAndPassword => ({
    type: authActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

// Initiates the sign-in process using a google account
export const googleSignInStart = () => ({
    type: authActionTypes.GOOGLE_SIGN_IN_START
})

// Initiates the sign-in process for an anonymous user
export const anonymousSignInStart = () => ({
    type: authActionTypes.ANONYMOUS_SIGN_IN_START
})

// Action dispatched when a user successfully signs in
export const signInSuccess = user => ({
    type: authActionTypes.SIGN_IN_SUCCESS,
    payload: user
})
 // Action dispatched when a user fails to sign in
export const signInFailure = error => ({
    type: authActionTypes.SIGN_IN_FAILURE,
    payload: error
})

// Initiates the sign-out process
export const signOutStart = () => ({
    type: authActionTypes.SIGN_OUT_START
})

// Action dispatched when a user successfully signs out
export const signOutSuccess = () => ({
    type: authActionTypes.SIGN_OUT_SUCCESS
})

// Action dispatched when a user fails to sign-out
export const signOutFailure = error => ({
    type: authActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

// Initiates the the sign-up process with user user credentials
export const signUpStart = userCredentials => ({
    type: authActionTypes.SIGN_UP_START,
    payload: userCredentials
})

// Action dispatched at successful sign-up
export const signUpSuccess = ({ user, additionalData }) => ({
    type: authActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
})

// Action dispatched at sign-up failure
export const signUpFailure = error => ({
    type: authActionTypes.SIGN_UP_FAILURE,
    payload: error
})