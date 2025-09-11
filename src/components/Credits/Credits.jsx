// File: src/components/Credits/Credits.jsx
// This component displays the credits section for the Fakeflix app.
// It shows the developer's name, links to their GitHub, and an avatar image.
// Uses Framer Motion for animations and CSS from credits.scss for styling.

import "./credits.scss" // Import CSS/SCSS styles
import { motion } from "framer-motion"; // Import motion for animations
import { creditsFadeInUpVariants } from "../../motionUtils"; // Animation variants
import { GITHUB_AVATAR_URL, GITHUB_BASE_URL } from "../../requests"; // GitHub URLs

// Credits component definition
const Credits = () => {
	return (
		// Footer element with animation
		<motion.footer
			variants={creditsFadeInUpVariants} // Animation settings
			initial='initial' // Initial animation state
			animate='animate' // Animate to this state
			exit='exit' // Exit animation
			className='Credits' // CSS class
		>
			{/* Developer text */}
			<span>Developed by</span>

			{/* Link to GitHub profile */}
			<motion.a 
				whileTap={{scale: 0.9}} // Shrinks on tap
				className='Credits__linkwrp' // CSS class
				href={GITHUB_BASE_URL} // GitHub profile URL
				target='_blank' // Open in new tab
				rel='noreferrer' // Security attribute
			>
				{/* Developer name */}
				<span> Th3Wall</span>

				{/* Avatar image */}
				<img 
					className='Credits__avatar' 
					src={GITHUB_AVATAR_URL} 
					alt='Credits Avatar' 
				/>
			</motion.a>
		</motion.footer>
	)
}

// Export component for use in other parts of the app
export default Credits;
