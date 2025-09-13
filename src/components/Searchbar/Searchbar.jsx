/**
 * Searchbar
 *
 * What this component does (in normal words):
 * - Shows a search box when you click the magnifying glass.
 * - As you type, it saves the text and takes you to the Search page.
 * - If you clear the text, it takes you back to Browse.
 * - Clicking anywhere outside the search box closes it.
 *
 * Tips:
 * - We keep the current text in local state (for the input box)
 *   and also send it to Redux (so other parts of the app can use it).
 * - We use react-router to move between pages.
 */

import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import { changeSearchInputValue, clearSearchInputValue, fetchSearchResultsAsync } from "../../redux/search/search.actions";
import "./searchbar.scss";

const Searchbar = () => {
    // Lets us change the page in code (go to /search or /browse).
    const history = useHistory();

    // Lets us send actions to Redux (save text, clear text, fetch results).
    const dispatch = useDispatch();

    // If true, the input is “open/visible”. If false, it’s hidden.
    const [searchInputToggle, setSearchInputToggle] = useState(false);

    // The actual text the user typed in the box.
    const [searchInput, setSearchInput] = useState("");

    // We use these to 1) detect clicks outside the whole searchbar
    // and 2) focus the input when it opens.
    const searchbarRef = useRef();
    const searchInputRef = useRef();

    // If the user clicks outside the search area, close the input and clear text.
    useOutsideClick(searchbarRef, () => {
        if (searchInputToggle) {
            setSearchInput("");
            setSearchInputToggle(false);
        }
    });

    // When the magnifying glass is clicked:
    // - focus the input
    // - show/hide the input box
    const handleSearchInputToggle = () => {
        searchInputRef.current.focus();
        setSearchInputToggle(!searchInputToggle);
    };

    // When the “X” is clicked:
    // - clear the text (both local and in Redux)
    // - go back to the Browse page
    const clearSearchInputToggle = () => {
        setSearchInput("");
        dispatch(clearSearchInputValue());
        history.push("/browse");
    };

    // Every time the user types:
    // - save the new value locally
    // - save it to Redux
    // - if there’s text, go to /search?q=... and fetch results
    // - if empty, go back to /browse
    const handleSearchInput = (event) => {
        const { value } = event.target;
        setSearchInput(value);
        dispatch(changeSearchInputValue(value));

        if (value.length > 0) {
            history.push(`/search?q=${value}`);
            dispatch(fetchSearchResultsAsync(value));
        } else {
            history.push("/browse");
        }
    };
    return (
        <div className="Searchbar" ref={searchbarRef}>
            {/* The text box the user types in.
          We add a CSS class when it’s open to style it differently. */}
            <input
                type="text"
                placeholder="Search titles, people"
                value={searchInput}
                onChange={handleSearchInput}
                ref={searchInputRef}
                className={`Searchbar--search ${searchInputToggle && "Searchbar--active"}`}
            />

            {/* Button to open/close the search box */}
            <div
                className="Searchbar--toggler"
                onClick={handleSearchInputToggle}
            >
                <FiSearch size="1.5em" />
            </div>

            {/* Clear button. It shows the “typing” style only when open AND not empty. */}
            <div
                className={`Searchbar--clear ${searchInputToggle && searchInput.length && "typing"}`}
                onClick={clearSearchInputToggle}
            >
                <RiCloseFill />
            </div>
        </div>
    );
};

export default Searchbar;
