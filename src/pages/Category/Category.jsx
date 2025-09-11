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
    This file is used to load and display categories of movies. You can select a category and the corresponding genres will be shown.
*/
const Category = ({ match }) => {
    const [page, setPage] = useState(2);
    const { url } = match;
    const slicedUrl = url.split("/");
    const { categoryName } = useParams();
    const categoryData = useRetrieveCategory(slicedUrl[1], categoryName, page); //retrieves a specific category's data
    const preventUndefinedSelector = () => undefined;
    const selector = categoryData ? categoryData.selector : preventUndefinedSelector; //sets selector to undefined if no category data is returned
    const selectedGenre = useSelector(selector);
    const handleLoadMore = () => setPage(page => page + 1);
    const [endPageRef, isIntersecting] = useLazyLoad(handleLoadMore); //calling imported function to handle intersection for loading

    return (
        <div className="Category">
            {/* If there is categoryData display it, else display the default skeleton page */}
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
                        {/* Checking to see if there is data in selectedGenre.
                            Then, for each datapoint in selectedGenre generate a poster element, passing in the corresponding
                            key, item, and the rest of the data.
                         */}
                        {selectedGenre.data && selectedGenre.data.length > 0
                            && selectedGenre.data.map(result => (
                                <Poster
                                    key={result.id}
                                    item={result}
                                    {...result}
                                />
                            ))
                        }
                        {/* If loading, show the default skeleton poster
                            If an error has occured show the error on the screen
                         */}
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
