/**
 * The file contains a custom React Hook to retrieve category data based on the 
 * current route ("browse", "movies", "tvseries", "popular") and category name.
 */

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchMovieDataConfig, fetchPopularDataConfig, fetchSeriesDataConfig } from "../dataConfig";

/**
	the useRetrieveCategory has the parameters:
		- slicedUrl = the slice which contains the current route (browse, tvseries, popular)
		- categoryName = which is obtained from the url parameters
		- page = the current page number we are

	The function behaves as a React Hook, where it redraws the screen when data changes
	or loads. 

	Upon the change of "dispatch, categoryName, slicedUrl, page" it updates the 
	selectedConfigArray to the appropriate type of data fetch configuration.
	Then dispatches the thunk action to the Redux store to fetch 
	the requested series/movies/popular data for the specified "page" number 
	finally returns the categoryData. 
*/


export const useRetrieveCategory = (slicedUrl, categoryName, page) => {

	const dispatch = useDispatch();
	const [categoryData, setCategoryData] = useState();

	useEffect(() => {
		let selectedConfigArray = null;
		switch (slicedUrl) {
			case "browse":
			case "movies":
				selectedConfigArray = fetchMovieDataConfig;
				break;
			case "tvseries":
				selectedConfigArray = fetchSeriesDataConfig;
				break;
			case "popular":
				selectedConfigArray = fetchPopularDataConfig;
				break;
			default:
				break;
		}

		const [data] = selectedConfigArray.filter(el => el.genre === categoryName);
		dispatch(data.thunk(`${data.url}&page=${page}`));
		setCategoryData(data);

	}, [dispatch, categoryName, slicedUrl, page])

	return categoryData;
}