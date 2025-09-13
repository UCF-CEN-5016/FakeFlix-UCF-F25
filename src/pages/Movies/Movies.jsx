/**
 * Movies page component for FakeFlix.
 *
 * - Retrieves row configurations via `useRetrieveData('movies')`. Under the hood,
 *   this selects `fetchMovieDataConfig` (see dataConfig.js), dispatches each
 *   row’s thunk (e.g., fetchTrendingMoviesAsync) with its endpoint, and returns
 *   metadata (id/title/genre/selector/isLarge) for rendering.
 * - Displays a Banner configured for movies (random trending pick + actions).
 * - Maps each row config to a <Row />. Row uses the provided `selector` to
 *   read its Redux slice (loading/error/results) and renders a Swiper carousel.
 * - Adds Credits at the bottom. The whole page is wrapped in a motion.div that
 *   applies `defaultPageFadeInVariants` for page transitions.
 */



// Movies page component for FakeFlix.
// fade‑in animations via Framer Motion.
import "./movies.scss"
// Renders the hero area. With type="movies", it selects trending movies
// from Redux (via selectTrendingMovies) and picks a random item to feature.
import Banner from "../../components/Banner/Banner"
// Renders a horizontally scrollable slider for a movie category.
// Each Row consumes a Redux selector (from the config) to read its slice,
// shows skeletons while loading, and uses Swiper for the carousel.
import Row from "../../components/Row/Row"
// Footer with developer credit; animated in with creditsFadeInUpVariants.
import Credits from "../../components/Credits/Credits";

// Custom hook that (1) chooses the proper dataConfig array for "movies",
// (2) dispatches each row’s thunk with its URL (isPage=true),
// and (3) returns an array of row configs: { id, title, genre, selector, isLarge }.
import { useRetrieveData } from "../../hooks/useRetrieveData";
// Shared animation variants. defaultPageFadeInVariants provides a simple fade
// for initial/animate/exit, consistent with other pages (see motionUtils.js).
import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../motionUtils";


const Movies = () => {
   // Pull structured row configs (ids, selectors, titles, etc.) for the Movies page.
    // These configs are derived from `fetchMovieDataConfig` and power each <Row />.
    const rows = useRetrieveData('movies');

    return (
        <motion.div
            className="Movies"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            // Hero banner for Movies. With type='movies', Banner selects trending movies from Redux (selectTrendingMovies), randomizes one item, truncates its overview, shows Play/More Info actions, and uses BASE_IMG_URL for backdrop. 
            //Render one Row per config. Each config includes:- title/genre: used for the section header and route link (/movies/:genre) - selector: Redux selector Row uses to read {loading, error, data}- isLarge: optional larger poster style for certain rows (e.g., Originals)The Row handles skeletons, Swiper navigation, and responsive breakpoints. 
            //Display footer credits acknowledging the developer th3wall
        >
            <Banner type='movies' />
            {rows && rows.map(props => (
                <Row key={props.id} {...props} />
            ))}
            <Credits />
        </motion.div>
    )
}
export default Movies
