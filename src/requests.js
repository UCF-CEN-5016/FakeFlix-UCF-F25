import { getOneMonthAgoReleaseDate } from "./utils";

export const GITHUB_BASE_URL = "https://github.com/Th3Wall";
export const GITHUB_AVATAR_URL = "https://avatars.githubusercontent.com/u/25078541?v=4";
const GITHUB_ASSETS_BASE_URL = "https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix";
export const LANG = "en-US";
export const REGION = "US";
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
export const FALLBACK_IMG_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_readme.png`;
export const LOGO_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_logo.png`;
export const MOBILE_LOGO_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_favicon_192.png`;
export const PROFILE_PIC_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_profilepic.png`;
export const SIGNIN_BGIMG_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_auth_bg.jpg`;
export const TADUM_SOUND_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_TaDum.mp3`;
const ONEMONTHAGO = getOneMonthAgoReleaseDate();
const { REACT_APP_API_KEY } = process.env;

/*==================================================================================*/
// The instructions for this assignment states to comment each function of the code.// 
// Because there are no functions, and I have already created the issue, I will:    //
// 		- Describe what the program does in its own comment                         //
// 		- Comment each template for what they are supposed to do                    //
/*==================================================================================*/

/**
 * requests.js
 * 
 * The purpose of this program is to define URL strings and endpoint templates 
 * to use in queries for movies and shows from TMDB falling under certain 
 * categories to display in pages where movies and shows are to be shown to 
 * the user, as well as exporting other constants such as images and 
 * Github asset URLs.
 * 
 * Example: For trending movies...
 *  fetchTrendingMovies: '/trending/movie/week?api_key=...&sort_by=...&language=...) 
 **/

// requests: an object storing all request query templates assigned to their respective keys
const requests = {

	// template for query used to fetch the movies and shows which align with a user's search
	fetchSearchQuery: `/search/multi?api_key=${REACT_APP_API_KEY}&language=${LANG}&query=`,
	// template for query used to fetch all movies and shows which are trending 
	fetchTrendingAll: `/trending/all/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch movies and shows which released winthin the last month
	fetchReleasedMoviesByOneMonth: `/discover/movie?api_key=${REACT_APP_API_KEY}&primary_release_date.gte=${ONEMONTHAGO}&sort_by=popularity.desc&language=${LANG}`,
    
	/*===== Movies =====*/
	// template for query used to fetch movies which are currently trending
	fetchTrendingMovies: `/trending/movie/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch movies which have not been released yet
	fetchUpcomingMovies: `/movie/upcoming?api_key=${REACT_APP_API_KEY}&language=${LANG}`,
	// template for query used to fetch movies which were rated highly
	fetchTopRated: `/movie/top_rated?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&region=${REGION}`,
	// template for query used to fetch movies which fall under the 'action' genre
	fetchActionMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=28&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch movies which fall under the 'adventure' genre
	fetchAdventureMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=12&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch movies which fall under the 'comedy' genre
	fetchComedyMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=35&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch movies which fall under the 'horror' genre
	fetchHorrorMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=27&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch movies which fall under the 'romance' genre
	fetchRomanceMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=10749&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch movies which fall under the 'war' genre
	fetchWarMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=10752&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch movies which fall under the 'animation' category
	fetchAnimationMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=16&sort_by=popularity.desc&language=${LANG}`,
	// template for query which fetches broad selection of currently popular movies
	discoverMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
    
	/*===== Series =====*/
	// template for query which fetches broad selection of currently popular shows
	discoverSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch shows which are trending
	fetchTrendingSeries: `/trending/tv/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch shows which are Netflix originals
	fetchNetflixOriginals: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_networks=213&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch shows which fall under the 'action adventure' category
	fetchActionAdventureSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10759&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch shows which fall under the 'animation' category
	fetchAnimationSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=16&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch shows which fall under the 'comedy' category
	fetchComedySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=35&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch shows which fall under the 'crime' category
	fetchCrimeSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=80&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch shows which fall under the 'documentary' category
	fetchDocumentarySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=99&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch shows which fall under the 'family' category
	fetchFamilySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10751&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch shows which fall under the 'kids' category
	fetchKidsSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10762&sort_by=popularity.desc&language=${LANG}`,
	// template for query used to fetch shows which fall under the 'sci-fi' category
	fetchSciFiFantasySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10765&sort_by=popularity.desc&language=${LANG}`,
};

export default requests;
