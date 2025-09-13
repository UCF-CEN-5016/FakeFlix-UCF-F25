/*
 This reducer handles all state changes related to horror movies including:
 - Fetching horror movies from API
 - Loading more horror movies
 - Error handling for failed requests
 - Loading state management
*/

import { moviesActionTypes } from "./movies.types";

/*
 Initial state for horror movies reducer
 loading - Indicates if horror movies are being fetched
 error - Error message if fetching fails
 data - Array of horror movie objects
*/
const initialState = {
  loading: false,
  error: "",
  data: [],
};

/*
  Horror movies reducer function
  
  Manages the state for horror movies including loading states, error handling,
  and data management for both initial fetch and pagination scenarios.

  Arguments:
    state - Current state (defaults to initialState)
    type - Action type from moviesActionTypes
    payload - Action payload (movie data or error message)

  Returns: 
    Updated state based on action type
 */
const horrorMoviesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Handle initial horror movies fetch request
    case moviesActionTypes.FETCH_HORROR_MOVIES_REQUEST:
      console.log("Horror movies request initiated");
      return {
        ...state,
        loading: true, // Set loading to true while fetching
      };

    // Handle successful horror movies fetch
    case moviesActionTypes.FETCH_HORROR_MOVIES_SUCCESS:
      console.log("Horror movies fetched successfully");
      return {
        ...state,
        data: payload, // Replace existing data with new movie list
        loading: false, // Set loading to false after successful fetch
        error: "", // Clear any previous errors
      };

    // Handle successful load more horror movies (pagination)
    case moviesActionTypes.LOAD_MORE_HORROR_MOVIES_SUCCESS:
      console.log("Horror movies loaded successfully");
      return {
        ...state,
        data: [...state.data, ...payload], // Append new movies to existing data
        loading: false, // Set loading to false after successful load
        error: "", // Clear any previous errors
      };

    // Handle failed horror movies fetch
    case moviesActionTypes.FETCH_HORROR_MOVIES_FAILURE:
      console.error("Error fetching horror movies:", payload);
      return {
        ...state,
        data: [], // Clear data array on error
        loading: false, // Set loading to false after error
        error: payload, // Store error message for UI display
      };

    // Default case: return current state unchanged
    default:
      return state;
  }
};

export default horrorMoviesReducer;
