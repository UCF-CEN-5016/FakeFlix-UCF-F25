import { moviesActionTypes } from './movies.types';

// Initial state object - defines the default structure and values for the Netflix movies state
const initialState = {
    loading: false,  // Boolean to track if data is currently being fetched
    error: '',       // String to store any error messages
    data: []         // Array to store the Netflix movies data
}

// Main reducer function - handles all Netflix movies related state changes
const netflixMoviesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // Handle the start of a Netflix movies fetch request
        case moviesActionTypes.FETCH_NETFLIX_MOVIES_REQUEST:
            return {
                ...state,           // Spread existing state
                loading: true       // Set loading to true to show loading indicator
            }
        
        // Handle successful Netflix movies fetch (initial load/refresh)
        case moviesActionTypes.FETCH_NETFLIX_MOVIES_SUCCESS:
            return {
                ...state,           // Spread existing state
                data: payload,      // Replace data array with new movies from API
                loading: false,     // Set loading to false since request completed
                error: ''           // Clear any previous errors
            }
        
        // Handle successful load more Netflix movies (pagination/infinite scroll)
        case moviesActionTypes.LOAD_MORE_NETFLIX_MOVIES_SUCCESS:
            return {
                ...state,                           // Spread existing state
                data: [...state.data, ...payload], // Append new movies to existing data array
                loading: false,                     // Set loading to false since request completed
                error: ''                           // Clear any previous errors
            }
        
        // Handle failed Netflix movies fetch request
        case moviesActionTypes.FETCH_NETFLIX_MOVIES_FAILURE:
            return {
                ...state,           // Spread existing state
                data: [],           // Clear data array on error
                loading: false,     // Set loading to false since request completed (with error)
                error: payload      // Store error message from payload
            }
        
        // Default case - return current state unchanged for unhandled action types
        default:
            return state;
    }
}

// Export the reducer function to be used in the Redux store
export default netflixMoviesReducer;