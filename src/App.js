/**
 * @file App.js
 * @description This is the main root component for the Fakeflix application.
 * It sets up the primary routing for all pages, handles conditional rendering
 * based on user authentication status, and includes shared components like
 * the Navbar and DetailModal. Apart from these, it also dispatches an action on load to check
 * for an existing user session.
 */

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar"
import Homepage from "./pages/Homepage/Homepage"
import Movies from "./pages/Movies/Movies"
import TVSeries from './pages/TVSeries/TVSeries';
import Popular from "./pages/Popular/Popular";
import MyList from './pages/MyList/MyList';
import Auth from "./pages/Auth/Auth";
import Search from "./pages/Search/Search";
import Category from "./pages/Category/Category";
import DetailModal from "./components/DetailModal/DetailModal";
import SplashAnimation from "./components/SplashAnimation/SplashAnimation";
import PlayAnimation from "./components/PlayAnimation/PlayAnimation";
import { selectCurrentUser } from './redux/auth/auth.selectors';
import { selectSearchResults } from "./redux/search/search.selectors";
import { checkUserSession } from "./redux/auth/auth.actions";

/**
 * The main functional component for the application.
 * It manages routing and renders pages based on the current URL path
 * and the user's authentication state.
 * @returns {JSX.Element} The rendered App component.
 */
const App = () => {
    const currentUser = useSelector(selectCurrentUser);
    const searchResults = useSelector(selectSearchResults);
    const dispatch = useDispatch();
    const location = useLocation();

    /**
     * An effect hook that runs once on component mount to check if a user
     * session already exists. The hook ensures user state is persisted while reloading.
     */
    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch])

    return (
        <div className="App">
            {/* Renders Navbar and DetailModal only if a user is logged in. */}
            {currentUser && (
                <>
                    <Navbar />
                    <DetailModal />
                </>
            )}
            <AnimatePresence exitBeforeEnter>
                {/* Switch component ensures only one route is rendered at a time. */}
                <Switch location={location} key={location.pathname}>
                    {/* Default route redirects to the login page. */}
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <Route path="/splash" component={SplashAnimation} />
                    <Route path="/play" component={PlayAnimation} />
                    {/* Protected routes that render content only if a user is logged in, otherwise redirects to /login. */}
                    <Route
                        path="/search"
                        render={() => currentUser
                            ? (searchResults && <Search results={searchResults}/>)
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/browse"
                        render={() => currentUser
                            ? <Homepage />
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/browse/:categoryName"
                        render={(props) => currentUser
                            ? <Category {...props} />
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/tvseries"
                        render={() => currentUser ? <TVSeries /> : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/tvseries/:categoryName"
                        render={(props) => currentUser
                            ? <Category {...props} />
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/movies"
                        render={() => currentUser ? <Movies /> : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/movies/:categoryName"
                        render={(props) => currentUser
                            ? <Category {...props} />
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/popular"
                        render={() => currentUser ? <Popular /> : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/popular/:categoryName"
                        render={(props) => currentUser
                            ? <Category {...props} />
                            : <Redirect to="/login" />}
                    />
                    <Route
                        exact
                        path="/mylist"
                        render={() => currentUser ? <MyList /> : <Redirect to="/login" />}
                    />
                    {/* Auth route: if user is logged in, redirect to splash, otherwise show Auth page. */}
                    <Route
                        exact
                        path="/login"
                        render={() => currentUser ? <Redirect to="/splash"/> : <Auth />}
                    />
                    {/* Fallback route for any other path. */}
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </AnimatePresence>
        </div>
    )
}

export default App;