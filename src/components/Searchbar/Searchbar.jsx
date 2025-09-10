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

  const handleSearchInputToggle = () => {
    searchInputRef.current.focus();
    setSearchInputToggle(!searchInputToggle);
  };

  const clearSearchInputToggle = () => {
    setSearchInput("");
    dispatch(clearSearchInputValue());
    history.push("/browse");
  };

  const handleSearchInput = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    dispatch(changeSearchInputValue(value));

    if (value.length > 0) {
      history.push(`/search?q=${value}`);
      dispatch(fetchSearchResultsAsync(value));
    } else history.push("/browse");
  };

  // The component's JSX structure.
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
      <div className="Searchbar--toggler" onClick={handleSearchInputToggle}>
        <FiSearch size="1.5em" />
      </div>

      {/* /The clear icon, which is only visible when the searchInputToggle is true and the length of the search input has a value(truthy) */}
      <div
        className={`Searchbar--clear ${
          searchInputToggle && searchInput.length && "typing"
        }`}
        onClick={clearSearchInputToggle} // Calls the function to clear the search input state
      >
        <RiCloseFill />
      </div>
    </div>
  );
};

export default Searchbar;
