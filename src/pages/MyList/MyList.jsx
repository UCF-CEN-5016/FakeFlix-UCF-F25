// This file defines the MyList element for the page displaying to the user their saved favorite movies/shows list as found in the cache.
// It uses the Poster components in order to render the movie details.

import "./myList.scss"
import Poster from "../../components/Poster/Poster";
import Credits from "../../components/Credits/Credits";
import { motion } from "framer-motion";
import { staggerHalf, defaultPageFadeInVariants } from "../../motionUtils";
import { useSelector } from "react-redux"
import { selectFavouritesList } from "../../redux/favourites/favourites.selectors"

/**
 * Renders the MyList page Element by using the cached favorites list of the user, displaying it in a list of Poster components.
 *
 * @returns The Element for the page containing the user's favorites list (if they have favorites), as well as the site's credits.
 */
const MyList = () => {
    const favs = useSelector(selectFavouritesList); // get user's list of favorites from cache

    return (
        <motion.div
            className="MyList"
            variants={defaultPageFadeInVariants}    // import "fade in" animation defaults
            initial="initial"                       // key in defaultPageFadeInVariants for starting state (faded out)
            animate="animate"                       // key in defaultPageFadeInVariants for target state (faded in/visible)
            exit="exit"                             // key in defaultPageFadeInVariants for ending state (faded out)
        >
            {
                // if we have a favorites list, render the page title
            }
            {favs && favs.length > 0 && (
                <h2 className="MyList__title">My List</h2>
            )}
            <motion.div
                className="MyList__wrp"
                variants={staggerHalf}      // import "stagger" effect that adds a short delay between children appearing
                initial="initial"           // key in staggerHalf for starting state (no value for this key)
                animate="animate"           // key in staggerHalf for animation state (staggers children)
                exit="exit"                 // key in staggerHalf for ending state (no value for this key)
            >
                {favs && favs.length > 0    // if we have favorites, render the group of Posters for each favorite in our list
                    ? favs.map(result => (
                        <Poster
                            key={result.id}
                            item={result}
                            {...result}
                        />
                    ))
                    : (
                        // fallback for if we don't have favorites or there is an error getting them
                        <h2 className="MyList__title">
                            Sorry, you don&apos;t have a favourite movie or tv-show yet.
                        </h2>
                    )
                }
            </motion.div>
            {
                // render footer site credits
            }
            <Credits />
        </motion.div>
    )
}

export default MyList