/* 
 * File summary:
 * - Shows a page of movies/shows for a chosen category.
 * - Figures out which category to load from the URL.
 * - Reads data (list/loading/error) from Redux using a selector provided by a custom hook.
 * - Renders Poster cards, shows skeletons while loading, and an error message on failure.
 * - Adds an invisible "sentinel" at the bottom to load more items when scrolled into view (infinite scroll).
 */


import "./category.scss"
import Poster from "../../components/Poster/Poster";
import SkeletonPage from "../../components/SkeletonPage/SkeletonPage";
import SkeletonPoster from "../../components/SkeletonPoster/SkeletonPoster";
import { motion } from "framer-motion";
import { staggerHalf } from "../../motionUtils";
import { useState } from "react";
import { useRetrieveCategory } from "../../hooks/useRetrieveCategory";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useLazyLoad from "../../hooks/useLazyLoad";

/*
 * Category component:
 * - Manages the current "page" for pagination.
 * - Determines the category from the route.
 * - Uses a custom hook to get category metadata (title + Redux selector).
 * - Selects the category data from Redux and renders it.
 * - Sets up lazy loading to fetch more when the user scrolls down.
 */

const Category = ({ match }) => {
    const [page, setPage] = useState(2);
    const { url } = match;
    const slicedUrl = url.split("/");
    const { categoryName } = useParams();
    const categoryData = useRetrieveCategory(slicedUrl[1], categoryName, page);
    const preventUndefinedSelector = () => undefined;
    const selector = categoryData ? categoryData.selector : preventUndefinedSelector;
    const selectedGenre = useSelector(selector);
    const handleLoadMore = () => setPage(page => page + 1);
    const [endPageRef, isIntersecting] = useLazyLoad(handleLoadMore);

    return (
        <div className="Category">
            {categoryData ? (
                <>
                    <h2 className="Category__title">{categoryData.title}</h2>

                    <motion.div
                        className="Category__wrp"
                        variants={staggerHalf}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {selectedGenre.data && selectedGenre.data.length > 0
                            && selectedGenre.data.map(result => (
                                <Poster
                                    key={result.id}
                                    item={result}
                                    {...result}
                                />
                            ))
                        }
                        {selectedGenre.loading && <div className='Category__subtitle'><SkeletonPoster /></div>}
                        {selectedGenre.error && <div className='Category__subtitle'>Oops, an error occurred.</div>}
                        <div className={`Category__endPage ${isIntersecting ? 'intersected' : null}`} ref={endPageRef} />
                    </motion.div>
                </>
            ) : <SkeletonPage />}
        </div>
    )
}

export default Category
