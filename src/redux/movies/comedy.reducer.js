/*
This file contains the reducer for managing the state of comedy movies.
It handles fetching, loading, and errors for comedy movie data, and then updates the state accordingly.
*/
import { moviesActionTypes } from './movies.types';

// The initial state of the comedy movies reducer before any actions are used.
const initialState = {
    loading: false,
    error: '',
    data: []
}

/**
 * This is a reducer function that handles state transitions based on action types for comedy movies.
 * @param {Object} state - the current state of comedy movies; defaults to initalState if undefined.
 * @param {Object} action - the Redux action with type (action type) and payload (data associated with the action).
 * @returns {Object} -  the new state after applying the action.
 */
const comedyMoviesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // Triggers when a request to fetch comedy movies is initiated.
        case moviesActionTypes.FETCH_COMEDY_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        // Triggers when comedy movies are fetched successfully.
        case moviesActionTypes.FETCH_COMEDY_MOVIES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        // Triggers when more comedy movies are loaded successfully.
        case moviesActionTypes.LOAD_MORE_COMEDY_MOVIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],
                loading: false,
                error: ''
            }
        // Triggers when comedy movies fail to be fetched.
        case moviesActionTypes.FETCH_COMEDY_MOVIES_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: payload
            }
        // Returns the current state when no actions above are triggered.
        default:
            return state;
    }
}

export default comedyMoviesReducer;
