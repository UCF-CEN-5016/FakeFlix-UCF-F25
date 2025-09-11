// adventure.reducer.js

/*
This file contains the Redux reducer responsible for managing the state of adventure 
movies. It handles fetching, loading, and errors for adventure movie data and 
updates the state accordingly.
*/
import { moviesActionTypes } from './movies.types';

const initialState = {
    loading: false,
    error: '',
    data: []
}

/**
 * Reducer function to handle state transitions based on action types for adventure movies
 * @param {Object} state - the current state of adventure movies
 * @param {Object} action - the Redux action with type (action type) and payload (data associated with the action)
 * @returns {Object} -  the new state after applying the action
 */
const adventureMoviesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // when a request to fetch adventure movies is initiated
        case moviesActionTypes.FETCH_ADVENTURE_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        // when adventure movies are fetched successfully
        case moviesActionTypes.FETCH_ADVENTURE_MOVIES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        // when more adventure movies are loaded successfully
        case moviesActionTypes.LOAD_MORE_ADVENTURE_MOVIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],
                loading: false,
                error: ''
            }
        // when fetching adventure movies fails
        case moviesActionTypes.FETCH_ADVENTURE_MOVIES_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: payload
            }
        // fallback: return the current state
        default:
            return state;
    }
}

export default adventureMoviesReducer;