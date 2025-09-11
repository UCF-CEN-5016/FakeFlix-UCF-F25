// Navbar component - main navigation bar for FakeFlix application.
// Provides responsive navigation with desktop/mobile layouts, user authentication, search functionality,
// and dynamic styling based on scroll position. Implements dropdown menus for mobile navigation
// and profile management with outside click detection for better UX.

import "./navbar.scss";

// React hooks for state management and refs.
import { useState, useRef } from "react";

// Custom hooks for viewport detection, scroll tracking, and outside click handling.
import useViewport from "../../hooks/useViewport";
import useScroll from "../../hooks/useScroll";
import useOutsideClick from "../../hooks/useOutsideClick";

// Framer motion for animations and navbar fade-in variants.
import { motion } from "framer-motion";
import { navbarFadeInVariants } from "../../motionUtils";

// URLs for logo images and profile pictures.
import { LOGO_URL, MOBILE_LOGO_URL, PROFILE_PIC_URL } from "../../requests";

// Icon for dropdown arrows.
import { FaCaretDown } from "react-icons/fa";

// Router components for navigation.
import { Link, NavLink } from "react-router-dom";

// Search component for movie/TV series search.
import Searchbar from "../Searchbar/Searchbar";

// Redux hooks for state management and user authentication.
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/auth.selectors";
import { signOutStart } from "../../redux/auth/auth.actions";

const Navbar = () => {
	// Hooks for responsive design and scroll detection.
	const { width } = useViewport();
	const isScrolled = useScroll(70);
	
	// State management for dropdown menu visibility.
	// genresNav controls the mobile navigation dropdown, profileNav controls the user profile dropdown.
	const [genresNav, setGenresNav] = useState(false);
	const [profileNav, setProfileNav] = useState(false);
	
	// Refs for outside click detection on dropdown menus.
	// These refs are attached to dropdown containers to detect clicks outside their boundaries.
	const genresNavRef = useRef();
	const profileNavRef = useRef();
	
	// Redux state for user authentication and dispatch.
	// currentUser contains the authenticated user data, dispatch is used to trigger Redux actions.
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	// Outside click handlers to close dropdown menus when clicking outside.
	// These handlers use the useOutsideClick hook to detect clicks outside the dropdown containers.
	// If a dropdown is open and user clicks outside, it automatically closes the dropdown.
	useOutsideClick(genresNavRef, () => {
		if (genresNav) setGenresNav(false);
	});
	useOutsideClick(profileNavRef, () => {
		if (profileNav) setProfileNav(false);
	});

	return (
		<>
			{/* Main navigation bar with framer motion animations and scroll-based styling. */}
			{/* The navbar applies 'Navbar__fixed' class when user scrolls past 70px threshold. */}
			<motion.nav
				className={`Navbar ${isScrolled && "Navbar__fixed"}`}
				variants={navbarFadeInVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				{/* Responsive logo that changes based on viewport width. */}
				{/* Condition: if viewport width >= 600px, use full logo, otherwise use mobile logo. */}
				<Link to="/">
					<img className="Navbar__logo" src={width >= 600 ? LOGO_URL : MOBILE_LOGO_URL} alt="" />
				</Link>
				{/* Desktop navigation - horizontal nav links for large screens. */}
				{/* Condition: if viewport width >= 1024px, render full horizontal navigation. */}
				{width >= 1024 ? (
					<ul className="Navbar__primarynav Navbar__navlinks">
						<li className="Navbar__navlinks--link">
							<NavLink to="/browse" activeClassName="activeNavLink">
								Home
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/tvseries" activeClassName="activeNavLink">
								TV Series
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/movies" activeClassName="activeNavLink">
								Movies
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/popular" activeClassName="activeNavLink">
								New & Popular
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/mylist" activeClassName="activeNavLink">
								My list
							</NavLink>
						</li>
					</ul>
				) : (
					<div
						className={`Navbar__primarynav Navbar__navlinks ${isScrolled && "Navbar__primarynav--scrolled"}`}
						onClick={() => setGenresNav(!genresNav)}
					>
						{/* Mobile navigation - dropdown menu for smaller screens. */}
						{/* Condition: if viewport width < 1024px, render collapsible dropdown navigation. */}
						<span className="Navbar__navlinks--link">Discover</span>
						<FaCaretDown className="Navbar__primarynav--toggler Navbar__primarynav--caret" />
						<div
							className={`Navbar__primarynav--content ${genresNav ? "active" : ""}`}
						>
							{/* Conditional rendering of dropdown menu content. */}
							{/* Condition: only render dropdown content if genresNav state is true (dropdown is open). */}
							{genresNav && (
								<ul
									className="Navbar__primarynav--content-wrp"
									ref={genresNavRef}
								>
									<li className="Navbar__navlinks--link">
										<NavLink to="/browse" activeClassName="activeNavLink">
											Home
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/tvseries" activeClassName="activeNavLink">
											TV Series
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/movies" activeClassName="activeNavLink">
											Movies
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/popular" activeClassName="activeNavLink">
											New & Popular
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/mylist" activeClassName="activeNavLink">
											My list
										</NavLink>
									</li>
								</ul>
							)}
						</div>
					</div>
				)}
				
				{/* Secondary navigation containing search and profile sections. */}
				<div className="Navbar__secondarynav">
					{/* Search component for movie/TV series search. */}
					<div className="Navbar__navitem">
						<Searchbar />
					</div>
					
					{/* User profile dropdown with authentication state. */}
					<div className="Navbar__navitem">
						<div
							className={`Navbar__navprofile ${profileNav && "active"}`}
							onClick={() => setProfileNav(!profileNav)}
						>
							{/* Profile avatar - uses user photo or default image. */}
							{/* Condition: if currentUser exists and has photoURL, use user photo, otherwise use default. */}
							<img
								className="Navbar__navprofile--avatar Navbar__navprofile--toggler"
								src={currentUser && currentUser.photoURL ? currentUser.photoURL : PROFILE_PIC_URL}
								alt="Profile Picture"
							/>
							<FaCaretDown className="Navbar__navprofile--toggler Navbar__navprofile--caret" />
							
							{/* Profile dropdown menu with sign out option. */}
							{/* Condition: only render dropdown content if profileNav state is true (dropdown is open). */}
							<div className={`Navbar__navprofile--content ${profileNav ? "active" : ""}`}>
								{profileNav && (
									<ul
										className="Navbar__navprofile--content-wrp"
										ref={profileNavRef}
									>
										{/* Conditional sign out button for authenticated users. */}
										{/* Condition: only show sign out option if currentUser exists (user is authenticated). */}
										{currentUser && (
											<li
												className="Navbar__navlinks--link"
												onClick={() => dispatch(signOutStart())}
											>
												Sign Out
											</li>
										)}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</motion.nav>
		</>
	);
};

export default Navbar;
