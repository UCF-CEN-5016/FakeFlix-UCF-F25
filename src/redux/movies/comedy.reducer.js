import { moviesActionTypes } from './movies.types';

// Initial state object - defines the default structure and values for the comedy movies state
const initialState = {
    loading: false,  // Boolean to track if data is currently being fetched
    error: '',       // String to store any error messages
    data: []         // Array to store the comedy movies data
}

// Main reducer function - handles all comedy movies related state changes
const comedyMoviesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // Handle the start of a comedy movies fetch request
        case moviesActionTypes.FETCH_COMEDY_MOVIES_REQUEST:
            return {
                ...state,           // Spread existing state
                loading: true       // Set loading to true to show loading indicator
            }
        
        // Handle successful comedy movies fetch (initial load/refresh)
        case moviesActionTypes.FETCH_COMEDY_MOVIES_SUCCESS:
            return {
                ...state,           // Spread existing state
                data: payload,      // Replace data array with new movies from API
                loading: false,     // Set loading to false since request completed
                error: ''           // Clear any previous errors
            }
        
        // Handle successful load more comedy movies (pagination/infinite scroll)
        case moviesActionTypes.LOAD_MORE_COMEDY_MOVIES_SUCCESS:
            return {
                ...state,                           // Spread existing state
                data: [...state.data, ...payload], // Append new movies to existing data array
                loading: false,                     // Set loading to false since request completed
                error: ''                           // Clear any previous errors
            }
        
        // Handle failed comedy movies fetch request
        case moviesActionTypes.FETCH_COMEDY_MOVIES_FAILURE:
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
export default comedyMoviesReducer;