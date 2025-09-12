/**
 * This file defines a Redux reducer for handling all state related to search.
 *
 * A reducer in Redux is a pure function that takes the current state and an action,
 * and returns the next state. Reducers never mutate the existing state; they
 * create a new version of it based on the action that was dispatched.
 *
 * Purpose of this reducer:
 * - Keep track of the current search input value typed by the user.
 * - Manage the loading state during asynchronous search requests.
 * - Store search results when a fetch succeeds.
 * - Handle errors if a fetch fails.
 */

import { searchActionTypes } from "./search.types";

const initialState = {
	searchResults: [],
	inputValue: '',
	error: null,
	isLoading: false
}

const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case searchActionTypes.CHANGE_SEARCH_INPUT_VALUE:
			// Update controlled input value as the user types.
			return {
				...state,
				inputValue: action.payload
			}
		case searchActionTypes.CLEAR_SEARCH_INPUT_VALUE:
			// Clear only the input field; preserve prior results.
			return {
				...state,
				inputValue: ''
			}
		case searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST:
			// Begin async search; set loading flag.
			return {
				...state,
				isLoading: true
			}
		case searchActionTypes.FETCH_SEARCH_RESULTS_SUCCESS:
			// Store fresh results, clear error flag, stop loading.
			return {
				...state,
				searchResults: [...action.payload],
				error: false,
				isLoading: false
			}
		case searchActionTypes.FETCH_SEARCH_RESULTS_FAILURE:
			// Clear results, record error message, stop loading.
			return {
				...state,
				searchResults: [],
				error: action.payload,
				isLoading: false
			}
		default:
			// Unrecognized action: return current state unchanged.
			return state
	}
}

export default searchReducer
