/*
    Movie Selectors:
    This file contains two types of selectors: base selectors
    and memoized selectors for movies in the Redux state tree. 
    
    The base selectors return the full slice object for each 
    genre, including (error '', loading (boolean), and data []).

    The memoized selectors return only the data array.
*/

import { createSelector } from "reselect";

// Base Selectors

// Get full slice for action movies
export const selectActionMovies = state => state.movies.actionMovies;

// Get full slice for adventure movies
export const selectAdventureMovies = state => state.movies.adventureMovies;

// Get full slice for animation movies
export const selectAnimationMovies = state => state.movies.animationMovies;

// Get full slice for comedy movies
export const selectComedyMovies = state => state.movies.comedyMovies;

// Get full slice for horror movies
export const selectHorrorMovies = state => state.movies.horrorMovies;

// Get full slice for Netflix movies
export const selectNetflixMovies = state => state.movies.netflixMovies;

// Get full slice for romance movies
export const selectRomanceMovies = state => state.movies.romanceMovies;

// Get full slice for top rated movies
export const selectTopRatedMovies = state => state.movies.topRatedMovies;

// Get full slice for trending movies
export const selectTrendingMovies = state => state.movies.trendingMovies;

// Get full slice for upcoming movies
export const selectUpcomingMovies = state => state.movies.upcomingMovies;

// Get full slice for latest movies
export const selectLatestMovies = state => state.movies.latestMovies;


// Memoized Selectors

// Get only data [] for action movies
export const selectActionMoviesSelector = createSelector(
    [selectActionMovies],
    actionMovies => actionMovies.data
)

// Get only data [] for adventure movies
export const selectAdventureMoviesSelector = createSelector(
    [selectAdventureMovies],
    adventureMovies => adventureMovies.data
)

// Get only data [] for animation movies
export const selectAnimationMoviesSelector = createSelector(
    [selectAnimationMovies],
    animationMovies => animationMovies.data
)

// Get only data [] for comedy movies
export const selectComedyMoviesSelector = createSelector(
    [selectComedyMovies],
    comedyMovies => comedyMovies.data
)

// Get only data [] for horror movies
export const selectHorrorMoviesSelector = createSelector(
    [selectHorrorMovies],
    horrorMovies => horrorMovies.data
)

// Get only data [] for Netflix movies
export const selectNetflixMoviesSelector = createSelector(
    [selectNetflixMovies],
    netflixMovies => netflixMovies.data
)

// Get only data [] for romance movies
export const selectRomanceMoviesSelector = createSelector(
    [selectRomanceMovies],
    romanceMovies => romanceMovies.data
)

// Get only data [] for top rated movies
export const selectTopRatedMoviesSelector = createSelector(
    [selectTopRatedMovies],
    topRatedMovies => topRatedMovies.data
)

// Get only data [] for trending movies
export const selectTrendingMoviesSelector = createSelector(
    [selectTrendingMovies],
    trendingMovies => trendingMovies.data
)

// Get only data [] for upcoming movies
export const selectUpcomingMoviesSelector = createSelector(
    [selectUpcomingMovies],
    upcomingMovies => upcomingMovies.data
)

// Get only data [] for latest movies
export const selectLatestMoviesSelector = createSelector(
    [selectLatestMovies],
    latestMovies => latestMovies.data
)