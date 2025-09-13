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
    // Retrieve configuration objects for each movie category (row).
    // Each config includes a Redux selector and metadata used by the Row component.
    const rows = useRetrieveData('movies');

    return (
        <motion.div
            className="Movies"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            //Render a hero banner featuring a random trending movie.
            //Loop through each row configuration and render the corresponding Row. Spread the configuration object so that Row receives all required props: id, title, genre, selector, and isLarge.
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
