// Import the action type constants related to movies
import { moviesActionTypes } from './movies.types';

// Define the initial state for the reducer
// - loading: indicates if data is currently being fetched
// - error: stores any error message from failed API calls
// - data: holds the list of action movies
const initialState = {
    loading: false,
    error: '',
    data: []
}

// Reducer function to manage state transitions for "action movies"
// It takes the current state and an action, and returns the new state.
const actionMoviesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // Triggered when fetching action movies begins
        case moviesActionTypes.FETCH_ACTION_MOVIES_REQUEST:
            return {
                ...state,
                loading: true // Set loading flag while request is in progress
            }
        // Triggered when action movies are successfully fetched
        case moviesActionTypes.FETCH_ACTION_MOVIES_SUCCESS:
            return {
                ...state,
                data: payload, // Replace movie list with new data
                loading: false,
                error: '' // Clear any previous errors
            }
        // Triggered when more action movies are loaded (pagination/infinite scroll)
        case moviesActionTypes.LOAD_MORE_ACTION_MOVIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload], // Append new movies to existing list
                loading: false,
                error: ''
            }
        // Triggered when fetching action movies fails
        case moviesActionTypes.FETCH_ACTION_MOVIES_FAILURE:
            return {
                ...state,
                data: [], // Clear data on failure
                loading: false,
                error: payload // Store error message
            }
        // Default: return the current state if action type is unrecognized
        default:
            return state;
    }
}

// Export the reducer to be combined in the root reducer
// and used in the Redux store.
export default actionMoviesReducer;