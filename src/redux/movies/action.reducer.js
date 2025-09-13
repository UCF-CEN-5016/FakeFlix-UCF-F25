// Reducer file for handling action movies state in Redux.
// Manages loading, success, failure, and load more actions for action movies.

import { moviesActionTypes } from './movies.types';

const initialState = {
    loading: false,
    error: '',
    data: []
}

// This function is a redux reducer that manages the state of action movies. 
// It handles actions related to fetching action movies data, including: 
// FETCH_ACTION_MOVIES_REQUEST, FETCH_ACTION_MOVIES_SUCCESS, LOAD_MORE_ACTION_MOVIES_SUCCESS, and FETCH_ACTION_MOVIES_FAILURE. 
// Depending on the action type, it updates the state to track loading status, store fetched data, append more movies, or capture errors.
// In all other cases, it returns the current state unchanged.

const actionMoviesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case moviesActionTypes.FETCH_ACTION_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case moviesActionTypes.FETCH_ACTION_MOVIES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        case moviesActionTypes.LOAD_MORE_ACTION_MOVIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],
                loading: false,
                error: ''
            }
        case moviesActionTypes.FETCH_ACTION_MOVIES_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export default actionMoviesReducer;