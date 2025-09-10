import "./searchbar.scss";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changeSearchInputValue,
  clearSearchInputValue,
  fetchSearchResultsAsync,
} from "../../redux/search/search.actions";
import { FiSearch } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import useOutsideClick from "../../hooks/useOutsideClick";

/**
 * Searchbar component for searching movies from themoviedb database.
 * @component
 * @returns {JSX.Element} Searchbar UI component
 */

const Searchbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //  Internal State
  const [searchInputToggle, setSearchInputToggle] = useState(false); 
  const [searchInput, setSearchInput] = useState(""); 

  // Refs
  const searchbarRef = useRef();
  const searchInputRef = useRef(); 

  /**
   * Close the search bar when clicking outside of it.
   *
   * Attaches an outside-click listener on `searchbarRef`.
   * If the search bar is open, it clears the search input
   * and toggles the search bar closed.
   *
   * @function useOutsideClick
   * @param {React.RefObject<HTMLElement>} searchbarRef - Ref to the search bar element.
   * @param {() => void} handler - Callback invoked when an outside click occurs.
   */
  useOutsideClick(searchbarRef, () => {
    if (searchInputToggle) {
      setSearchInput("");
      setSearchInputToggle(false);
    }
  });

  /**
   * Toggle the search bar's visibility and focus the input field.
   *
   * @function handleSearchInputToggle
   * @returns {void}
   */
  const handleSearchInputToggle = () => {
    searchInputRef.current.focus();
    setSearchInputToggle(!searchInputToggle);
  };

  /**
   * Clear the search input, reset Redux search state, and redirect to /browse.
   *
   * @function clearSearchInputToggle
   * @returns {void}
   */
  const clearSearchInputToggle = () => {
    setSearchInput("");
    dispatch(clearSearchInputValue());
    history.push("/browse");
  };

  /**
   * Handle search input changes:
   * - Updates local and Redux value of the search input.
   * - If non-empty, navigates to `/search?q=<value>` and 
   * - dispatches an action to fetch search results.
   * - If empty, redirects to `/browse` page.
   *
   * @function handleSearchInput
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   * @returns {void}
   */
  const handleSearchInput = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    dispatch(changeSearchInputValue(value));

    if (value.length > 0) {
      history.push(`/search?q=${value}`);
      dispatch(fetchSearchResultsAsync(value));
    } else history.push("/browse");
  };

  return (
    <div className="Searchbar" ref={searchbarRef}>
      <input
        type="text"
        placeholder="Search titles, people"
        value={searchInput}
        onChange={handleSearchInput}
        ref={searchInputRef}
        className={`Searchbar--search ${
          searchInputToggle && "Searchbar--active"
        }`} // Dynamically applies an "active" class based on the `searchInputToggle` state.
      />

      {/* Search toggle icon (opens/closes search bar) */}
      <div className="Searchbar--toggler" onClick={handleSearchInputToggle}>
        <FiSearch size="1.5em" />
      </div>

      {/* /The clear icon, which is only visible via class `typing` when the searchInputToggle is true and the length of the searchinput has a value */}
      <div
        className={`Searchbar--clear ${
          searchInputToggle && searchInput.length && "typing"
        }`}
        onClick={clearSearchInputToggle} // Calls the function to clear the search input, resets state and redirect appropiately
      >
        <RiCloseFill />
      </div>
    </div>
  );
};

export default Searchbar;
