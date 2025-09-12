// This file defines a custom React hook (useRetrieveData) that retrieves and organizes
// data from different API configurations (movies, series, popular) using Redux dispatch.
// It dynamically selects the appropriate data configuration based on the given type,
// dispatches async thunks to fetch the data, and stores a processed version of the
// configuration in state for use within components.

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchMovieDataConfig,
  fetchPopularDataConfig,
  fetchSeriesDataConfig,
} from "../dataConfig";

/**
 * Custom React hook to retrieve and prepare data based on the provided type.
 *
 * @param {string} type - Determines which set of data configurations to use ("movies", "series", or "popular").
 * @returns {Array|null} - Returns an array of row data objects containing metadata and selectors, or null if not loaded yet.
 */

export const useRetrieveData = (type) => {
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // State to hold the processed data rows
  const [data, setData] = useState(null);

  /**
   * Effect hook that runs whenever the type changes.
   * Selects the correct configuration array, dispatches fetch actions,
   * and constructs metadata rows to be stored in state.
   */
  useEffect(() => {
    let selectedConfigArray = null;

    // Choose the correct data configuration based on the type
    switch (type) {
      case "movies":
        selectedConfigArray = fetchMovieDataConfig;
        break;
      case "series":
        selectedConfigArray = fetchSeriesDataConfig;
        break;
      case "popular":
        selectedConfigArray = fetchPopularDataConfig;
        break;
      default:
        break;
    }

    // Flag indicating data is being fetched for a page load
    let isPage = true;

    // For each config entry, dispatch its associated async fetch function
    // and return a simplified metadata object for later rendering
    const rowsData = selectedConfigArray.map((el) => {
      dispatch(el.thunk(el.url, isPage));
      return {
        id: el.id,
        title: el.title,
        genre: el.genre,
        selector: el.selector,
        isLarge: el.isLarge,
      };
    });

    // Store the constructed rows in component state
    setData(rowsData);
  }, [type, dispatch]); // Dependencies: re-run effect when type or dispatch changes

  // Return the prepared data rows
  return data;
};
