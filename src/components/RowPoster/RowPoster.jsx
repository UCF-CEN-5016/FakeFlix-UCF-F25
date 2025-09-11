import "./rowPoster.scss";
import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests";
import { useDispatch } from "react-redux";
import { addToFavourites, removeFromFavourites } from "../../redux/favourites/favourites.actions";
import { FaPlus, FaMinus, FaPlay, FaChevronDown } from "react-icons/fa";
import useGenreConversion from "../../hooks/useGenreConversion";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { Link } from "react-router-dom";

// Component for displaying a poster in a row, with options to add to favourites, play, and view details.
const RowPoster = result => {
	const { item, item: { title, original_name, original_title, name, genre_ids, poster_path, backdrop_path }, isLarge, isFavourite } = result;
	let fallbackTitle = title || original_title || name || original_name;
	const genresConverted = useGenreConversion(genre_ids);
	const dispatch = useDispatch();

	// Handlers for adding/removing favourites, opening modal, and play action.
	// Handler for adding to favourites
	const handleAdd = event => {
		event.stopPropagation();
		dispatch(addToFavourites({ ...item, isFavourite }));
	};
	// Handler for removing from favourites
	const handleRemove = event => {
		event.stopPropagation();
		dispatch(removeFromFavourites({ ...item, isFavourite }));
	};
	// Handler for opening the modal with item details
	const handleModalOpening = () => {
		dispatch(showModalDetail({ ...item, fallbackTitle, genresConverted, isFavourite }));
	}
	// Handler for play action (currently a placeholder)
	const handlePlayAction = event => {
		event.stopPropagation();

	};
	// Structure for the poster component, including image, title, genres, and action icons.
	return (
		<div
			className={`Row__poster ${isLarge && "Row__poster--big"}`}
			onClick={handleModalOpening}
		>
			{isLarge ? (
				poster_path ? (
					<img src={`${BASE_IMG_URL}/${poster_path}`} alt={fallbackTitle} />
				) : ""
			) : backdrop_path ? (
				<img src={`${BASE_IMG_URL}/${backdrop_path}`} alt={fallbackTitle} />
			) : (
				<>
					<img src={FALLBACK_IMG_URL} alt={fallbackTitle} />
					<div className="Row__poster__fallback">
						<span>{fallbackTitle}</span>
					</div>
				</>
			)}
			{/* Info section with action icons and title/genres */}
			<div className="Row__poster-info">
				<div className="Row__poster-info--iconswrp">
					{/* Link to play the item */}
					<Link
						className="Row__poster-info--icon icon--play"
						onClick={handlePlayAction}
						to={'/play'}
					>
						<FaPlay />
					</Link>
					{/* Conditional rendering of add/remove favourite button */}
					{!isFavourite
						? (
							<button className='Row__poster-info--icon icon--favourite' onClick={handleAdd}>
								<FaPlus />
							</button>
						): (
							<button className='Row__poster-info--icon icon--favourite' onClick={handleRemove}>
								<FaMinus />
							</button>
						)}
					{/* Button to open modal with more details */}
					<button className='Row__poster-info--icon icon--toggleModal'>
						<FaChevronDown onClick={handleModalOpening}/>
					</button>
				</div>
				{/* Display the title of the item */}
				<div className="Row__poster-info--title">
					<h3>{fallbackTitle}</h3>
				</div>
				{/* Display the genres of the item */}
				<div className="Row__poster-info--genres">
					{genresConverted && genresConverted.map(genre => (
						<span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default RowPoster;