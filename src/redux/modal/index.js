
/**
 * Redux reducer for controlling the Fakeflix modal state.
 * Manages whether the modal is open and what content it displays.
 */

import { modalActionTypes } from "./modal.types"

// The initial Redux state for the modal.
const initialState = {
    modalIsClosed: true,
    modalContent: {}
}

/**
 * Handles modal-related actions:
 * - SHOW_MODAL_DETAILS: opens the modal and stores provided content
 * - HIDE_MODAL_DETAILS: closes the modal and clears content
 *
 * @param {Object} state  Current modal state
 * @param {Object} action Redux action with a 'type' and optional 'payload'
 * @returns {Object}      New modal state after applying the action
 */
const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case modalActionTypes.SHOW_MODAL_DETAILS:
            return {
                ...state,
                modalIsClosed: false,
                modalContent: { ...action.payload }
            }
        case modalActionTypes.HIDE_MODAL_DETAILS:
            return {
                ...state,
                modalIsClosed: true,
                modalContent: {}
            }
        default:
            return state
    }
}

export default modalReducer

