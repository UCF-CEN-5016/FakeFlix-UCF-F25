import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import { changeSearchInputValue, clearSearchInputValue, fetchSearchResultsAsync } from "../../redux/search/search.actions";
import "./searchbar.scss";

const Searchbar = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [searchInputToggle, setSearchInputToggle] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const searchbarRef = useRef();
    const searchInputRef = useRef();

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
