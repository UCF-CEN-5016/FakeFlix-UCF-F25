import "./auth.scss";
import { useState } from "react";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerOne, authFadeInUpVariants, modalVariants, authPageFadeInVariants } from "../../motionUtils";
import { LOGO_URL, SIGNIN_BGIMG_URL } from "../../requests.js";
import { useSelector } from "react-redux";
import { selectAuthErrors } from "../../redux/auth/auth.selectors";

// Auth page for sign in and sign up views
const Auth = () => {
  // State to toggle between sign in and sign up
	const [isSignedUp, setIsSignedUp] = useState(true);
  // Get authentication errors from Redux store
	const authError = useSelector(selectAuthErrors);

	return (
    // Main container with page transition animations
		<motion.div
			className="Auth"
			variants={authPageFadeInVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
      {/* Opacity effect */}
			<div className="Auth__opacityLayer" />
      {/* Background image */}
			<div className="Auth__bgLayer" style={{ backgroundImage: `url(${SIGNIN_BGIMG_URL})` }} />
      {/* Logo linking to home */}
			<Link to="/" className="Auth__logo">
				<img className="Auth__logo--img" src={LOGO_URL} alt="Fakeflix_logo" />
			</Link>
      {/* Handles entrance/exit for the entire auth content */}
			<motion.div
				className="Auth__content"
				variants={modalVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
        {/* Staggered animations for child elements */}
				<motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit">
          {/* Title fades in and up */}
					<motion.h2 variants={authFadeInUpVariants} className="Auth__content--title">
						{isSignedUp ? "Sign In" : "Sign Up"}
					</motion.h2>
          {/* Conditional rendering of top text */}
					<motion.small variants={authFadeInUpVariants} className="Auth__content--disclaimer">
						{`Pay attention: this is not the original Netflix ${isSignedUp ? "sign in" : "sign up"}. Don't insert your real credentials here!`}
					</motion.small>
          {/* Conditional rendering of SignIn or SignUp component */}
					{isSignedUp ? <SignIn /> : <SignUp />}
          {/* Display authentication errors if any */}
					{authError && <motion.p variants={authFadeInUpVariants} className='Auth__content--errors'>{authError}</motion.p>}
          {/* Divider line */}
					<motion.hr variants={authFadeInUpVariants} className="Auth__content--divider" />
          {/* Conditional rendering of bottom text */}
					<motion.small variants={authFadeInUpVariants} className="Auth__content--toggleView">
						{isSignedUp
							? `Haven't you registered yet? `
							: "Do you already have an account? "}
						<span className="toggler" onClick={() => setIsSignedUp(!isSignedUp)}>
							{isSignedUp ? "Sign Up" : "Sign In"}
						</span>
					</motion.small>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Auth;
