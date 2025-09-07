import "./banner.scss";
import React from "react";
import { motion } from "framer-motion";
import { staggerOne, bannerFadeInLoadSectionVariants, bannerFadeInVariants, bannerFadeInUpVariants } from "../../motionUtils";
import { BASE_IMG_URL } from "../../requests";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { randomize, truncate } from "../../utils";
import { Link } from "react-router-dom";
import SkeletonBanner from "../SkeletonBanner/SkeletonBanner";
import { useDispatch, useSelector } from "react-redux";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { selectTrendingMovies, selectNetflixMovies } from "../../redux/movies/movies.selectors";
import { selectNetflixSeries } from "../../redux/series/series.selectors";

const Banner = ({ type }) => {
  // Determine which Redux selector to use based on the type prop
  let selector;
  switch (type) {
    case 'movies':
      selector = selectTrendingMovies;
      break;
    case 'series':
      selector = selectNetflixSeries;
      break;
    default:
      selector = selectNetflixMovies;
      break;
  }

  // Get data from Redux store using the selected selector
  const myData = useSelector(selector);
  const { loading, error, data: results } = myData;

  // Randomly select one item from the results array to feature in the banner
  const finalData = results[randomize(results)];

  // Determine the display title (different content types use different title properties)
  const fallbackTitle =
    finalData?.title || finalData?.name || finalData?.original_name;

  // Truncate the overview text to 150 characters for consistent display
  const description = truncate(finalData?.overview, 150);

  // Get the dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  // Prevent event bubbling when play button is clicked
  const handlePlayAnimation = (event) => {
    event.stopPropagation();
  };

  // Open modal with detailed information about the selected content
  const handleModalOpening = () => {
    dispatch(showModalDetail({ ...finalData, fallbackTitle }));
  };

  return (
    <>
      {/* Loading and error section - shows skeleton or error message */}
      <motion.section
        variants={bannerFadeInLoadSectionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        className='Banner__loadsection'
      >
        {loading && <SkeletonBanner />}
        {error && <div className='errored'>Oops, an error occurred.</div>}
      </motion.section>

      {/* Main banner section - only renders when not loading and data is available */}
      {!loading && finalData && (
        <motion.header
          variants={bannerFadeInVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          className='Banner'
          style={{
            backgroundImage: `url(${BASE_IMG_URL}/${finalData?.backdrop_path})`,
          }}
        >
          {/* Content section with staggered animation for child elements */}
          <motion.div
            className='Banner__content'
            variants={staggerOne}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            {/* Title */}
            <motion.h1
              variants={bannerFadeInUpVariants}
              className='Banner__content--title'
            >
              {fallbackTitle}
            </motion.h1>

            {/* Action buttons container */}
            <motion.div
              variants={bannerFadeInUpVariants}
              className='Banner__buttons'
            >
              {/* Play button */}
              <Link
                className='Banner__button'
                onClick={handlePlayAnimation}
                to={'/play'}
              >
                <FaPlay />
                <span>Play</span>
              </Link>

              {/* More info button */}
              <button
                className='Banner__button'
                onClick={handleModalOpening}
              >
                <BiInfoCircle size='1.5em' />
                <span>More info</span>
              </button>
            </motion.div>

            {/* Description text */}
            <motion.p
              variants={bannerFadeInUpVariants}
              className='Banner__content--description'
            >
              {description}
            </motion.p>
          </motion.div>

          {/* Decorative panel and shadow elements */}
          <div className='Banner__panel' />
          <div className='Banner__bottom-shadow' />
        </motion.header>
      )}
    </>
  );
}

// Memoize component to prevent unnecessary re-renders when props haven't changed
export default React.memo(Banner);