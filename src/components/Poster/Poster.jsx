import "./poster.scss"
import { motion } from "framer-motion";
import { posterFadeInVariants } from "../../motionUtils";
import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests";
import { FaChevronDown, FaMinus, FaPlay, FaPlus } from "react-icons/fa";
import useGenreConversion from "../../hooks/useGenreConversion";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { useDispatch } from "react-redux";
import { addToFavourites, removeFromFavourites } from "../../redux/favourites/favourites.actions";
import { Link } from "react-router-dom";

// This code is the component that renders each movie/TV show poster in a modal view when the thumbnail is clicked in the main menu.
// It displays the media item's image and description, along with interactive controls for playing content, and adding/removing from favorites. The component also handles fallback content when images are not available and manages user interactions with the media item.
const Poster = result => {
    const { item, item: { title, original_name, original_title, name, genre_ids, backdrop_path }, isFavourite } = result;
    let fallbackTitle = title || original_title || name || original_name; // Creates a backup title using whichever title property is available in the data
    const genresConverted = useGenreConversion(genre_ids); // Converts genre IDs to human-readable genre names using a custom hook
    const dispatch = useDispatch(); // Provides access to the Redux dispatch function for state management

    // Handlers that import the add/remove events from the redux folder, which adds/removes items from favourites.
    // These handlers also stop any other event propagation to avoid triggering other click events.
    const handleAdd = event => {
        event.stopPropagation();
        dispatch(addToFavourites({ ...item, isFavourite }));
    };
    const handleRemove = event => {
        event.stopPropagation();
        dispatch(removeFromFavourites({ ...item, isFavourite }));
    };

    // Handler that opens the modal view when the thumbnail is clicked in the main menu, passing in the item details as props.
    const handleModalOpening = () => {
        dispatch(showModalDetail({ ...item, fallbackTitle, genresConverted, isFavourite }));
    }

    // Handler that closes the modal view when the play button is clicked.
    const handlePlayAction = event => {
        event.stopPropagation();
    };

    return (
        <motion.div
            variants={posterFadeInVariants}
            className='Poster'
            onClick={handleModalOpening}
        >
            {backdrop_path ? (
                <img src={`${BASE_IMG_URL}/${backdrop_path}`} alt={fallbackTitle} />
            ) : (
                <>
                    <img src={FALLBACK_IMG_URL} alt={fallbackTitle} />
                    <div className='Poster__fallback'>
                        <span>{fallbackTitle}</span>
                    </div>
                </>
            )}
            <div className="Poster__info">
                <div className="Poster__info--iconswrp">
                    <Link
                        className="Poster__info--icon icon--play"
                        onClick={handlePlayAction}
                        to={'/play'}
                    >
                        <FaPlay />
                    </Link>
                    {!isFavourite
                        ? (
                            <button className='Poster__info--icon icon--favourite' onClick={handleAdd}>
                                <FaPlus />
                            </button>
                        ): (
                            <button className='Poster__info--icon icon--favourite' onClick={handleRemove}>
                                <FaMinus />
                            </button>
                        )}
                    <button className='Poster__info--icon icon--toggleModal'>
                        <FaChevronDown onClick={handleModalOpening}/>
                    </button>
                </div>
                <div className="Poster__info--title">
                    <h3>{fallbackTitle}</h3>
                </div>
                <div className="Poster__info--genres">
                    {genresConverted && genresConverted.map(genre => (
                        <span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default Poster
