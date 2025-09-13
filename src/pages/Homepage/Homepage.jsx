import "./homepage.scss"
import Banner from "../../components/Banner/Banner"
import Row from "../../components/Row/Row"
import Credits from "../../components/Credits/Credits";
import { useRetrieveData } from "../../hooks/useRetrieveData";
import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../motionUtils";

/**
 * FakeFlix HomePage
 * 
 * Summery: 
 * This is the main home page for Fakeflix.
 * - This component is under the navbar.
 * - This retrevies movie data for the titles displayed.
 * - Fades in and out of the the home page with an animation.
 * - There is a banner that displays a recommended popular title.
 * - It generates rows of shows and moves.
 * - At the bottom of the rows are credits to the developer.
 * 
 * @component
 * @returns {JSX.Element} Homepage with recommended title banner, rows of shows and movies, and credits at the bottom. 
 */

const Homepage = () => {

    /**
     * Function to retreive data of shows and movies for the rows.
     * Specifically retreives array of movies.
     * Containd data like url, name, and genere. 
     */
    const rows = useRetrieveData('movies');

    return (
        <motion.div
            className="Homepage"
            /* Variations on defualt page fade in, out and transitions. */
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Component for banner for recommended movie at the top.*/}
            <Banner />
            {/* Checks fetched data, and layout. Then maps an array of row objects using ids to generate rows of content. */}
            {rows && rows.map(props => (
                <Row key={props.id} {...props} />
            ))}
            {/* Component for credits to developer.*/}
            <Credits />
        </motion.div>
    )
}

export default Homepage
