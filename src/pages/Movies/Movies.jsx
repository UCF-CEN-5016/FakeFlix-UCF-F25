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
    const rows = useRetrieveData('movies');

    return (
        <motion.div
            className="Movies"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
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
