// Movies page component for FakeFlix.
// fade‑in animations via Framer Motion.
import "./movies.scss"
// Renders the movies landing page with a banner, multiple rows of movie categories,
import Banner from "../../components/Banner/Banner"
import Row from "../../components/Row/Row"
// and a footer credit. Uses the custom hook `useRetrieveData('movies')` to retrieve
import Credits from "../../components/Credits/Credits";
// configuration for each row and passes it to the Row component. Includes page
import { useRetrieveData } from "../../hooks/useRetrieveData";
// fade‑in animations via Framer Motion.
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
