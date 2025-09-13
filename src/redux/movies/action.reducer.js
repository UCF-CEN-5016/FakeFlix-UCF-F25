import { moviesActionTypes } from './movies.types';

// Default initial state
const initialState = {
    loading: false,		// Is a request in progress?
    error: '',			// What is the error if we have one
    data: []			// List of action movies
}

// Reducer function to handle action movies states
const actionMoviesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
		// Request to fetch move
        case moviesActionTypes.FETCH_ACTION_MOVIES_REQUEST:
            return {
                ...state,
                loading: true // Start loading
            }
		// Fetch movie success
        case moviesActionTypes.FETCH_ACTION_MOVIES_SUCCESS:
            return {
                ...state,
                data: payload,		// Replace old data with new 
                loading: false,		// Not laoding anymore
                error: ''			// No error, clear
            }
		// Successfully loaded more movies
        case moviesActionTypes.LOAD_MORE_ACTION_MOVIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],	// Add in the additional movies
                loading: false,		// Not laoding anymore
                error: ''			// No error, clear
            }
		// Fetch movie failure
        case moviesActionTypes.FETCH_ACTION_MOVIES_FAILURE:
            return {
                ...state,
                data: [],			// No data since we failed
                loading: false,		// Not laoding anymore
                error: payload		// Return the error
            }
		// Unrecognized action, return default state
        default:
            return state;
    }
}

// Export reducer
export default actionMoviesReducer;