/*
    The searchbar component provides functions to open and
    close search bar, update and clear search text, and navigate
    to search or browse page when necessary.
*/

import "./searchbar.scss"
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeSearchInputValue, clearSearchInputValue, fetchSearchResultsAsync } from "../../redux/search/search.actions";
import { FiSearch } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import useOutsideClick from "../../hooks/useOutsideClick";

const Searchbar = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [searchInputToggle, setSearchInputToggle] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const searchbarRef = useRef();
    const searchInputRef = useRef();

    /*
        This hook listens for clicks outside of
        searchbarRef. If triggered while the search input
        is open, it clears the field and closes search.
    */
    useOutsideClick(searchbarRef, () => {
        if (searchInputToggle) {
            setSearchInput("");
            setSearchInputToggle(false);
        }
    });

    /*
        This function toggles the visibility of
        the search input field. It puts focus on
        the input element when opened.
    */
    const handleSearchInputToggle = () => {
        searchInputRef.current.focus();
        setSearchInputToggle(!searchInputToggle);
    };

    /*
        This function clears the search input
        field by setting the field to an empty
        string and dispatching an action to globally
        clear the Redux search value.
        It also redirects the user to the browse page.
    */
    const clearSearchInputToggle = () => {
        setSearchInput("");
        dispatch(clearSearchInputValue());
        history.push("/browse");
    };

    /*
        This function takes care of input being
        typed in the search field. It updates the
        state of the search input and Redux store.
        If the input has text, it goes to the search results
        page and fetches results. Otherwise, it goes
        back to the browse page.
    */
    const handleSearchInput = event => {
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
                className={`Searchbar--search ${searchInputToggle && "Searchbar--active"}`}
            />
            <div
                className="Searchbar--toggler"
                onClick={handleSearchInputToggle}
            >
                <FiSearch size="1.5em" />
            </div>
            <div
                className={`Searchbar--clear ${searchInputToggle && searchInput.length && "typing"}`}
                onClick={clearSearchInputToggle}
            >
                <RiCloseFill />
            </div>
        </div>
    )
}

export default Searchbar
