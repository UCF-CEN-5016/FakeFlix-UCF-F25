// See Redux Fundamentals Parts 2 & 3 for more information.
// https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// This file provides a reducer for the management of authentication states.

import { authActionTypes } from "./auth.types"

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

// Create a reducer, a function that determines the next program state
// given a previous state and an action.
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.EMAIL_SIGN_IN_START:
        case authActionTypes.GOOGLE_SIGN_IN_START:
        case authActionTypes.ANONYMOUS_SIGN_IN_START:
        case authActionTypes.SIGN_UP_START:
            return {
                ...state,
                loading: true
            }
        case authActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
                error: null
            }
        case authActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                loading: false,
                error: null
            }
        // Failures are the only cases where we can expect
        // a non-null error value.
        case authActionTypes.SIGN_IN_FAILURE:
        case authActionTypes.SIGN_UP_FAILURE:
        case authActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        // Some valid auth action types will result in no auth state change.
        // For example, if a user initiates a signout, it isn't necessary to
        // change state for that operation, only to change state when it is
        // known if the operation was a success or a failure.
        default:
            return state
    }
}

export default authReducer
