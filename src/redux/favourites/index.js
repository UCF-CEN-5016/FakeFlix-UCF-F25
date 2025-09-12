/*
    This file handles the removal and adding of 
    media to the user's personal favorites list.
*/

import { favouritesActionTypes } from "./favourites.types"
import { addToFavouritesUtil, removeFromFavouritesUtil } from "./favourites.utils"

// initialize the user's list of favorites to be an empty array
const initialState = {
    favouritesList: []
}

// accept as input the current state of the user's favorite list (initialize as empty)
// accept as input the action (add  or  remove) that the user wants to perform
// if action is add, append the payload to state array
// if action is remove, remove payload from state array
// otherwise, return state array as is
const favouritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case favouritesActionTypes.ADD_TO_FAVOURITES:
            return {
                ...state,
                favouritesList: addToFavouritesUtil(state.favouritesList, action.payload)
            }
        case favouritesActionTypes.REMOVE_FROM_FAVOURITES:
            return {
                ...state,
                favouritesList: removeFromFavouritesUtil(state.favouritesList, action.payload)
            }
        default:
            return state
    }
}

export default favouritesReducer
