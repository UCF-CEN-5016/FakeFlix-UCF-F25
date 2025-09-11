//PlayAnimation.jsx

/** 
	Splash screen component.
	On mount, it plays the Netflix sound, shows the FAKEFLIX logo, and redirects the user to the browse page after 4.2 seconds.
**/

import "./playAnimation.scss"
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { TADUM_SOUND_URL } from "../../requests";

const PlayAnimation = () => {

	let history = useHistory();

	//Reference to the audio var that will play the Netflix sound
	const soundRef = useRef(null);

	/**
		Plays the ta-dum sound from the beginning.
		Ensures the audio starts fresh each time this is triggered.
	**/
	const handleTadum = () => {
		soundRef.current.currentTime = 0;
		soundRef.current.play();
	}

	/**
		useEffect hook runs once on component mount
	 	-Plays the ta-dum audio
	 	-After 4200ms, navigates user to the /browse route
	**/
	useEffect(() => {
		handleTadum();
		setTimeout(() => {
			history.push('/browse')
		}, 4200)
	}, [history])

	return (
		<div className='PlayAnimation__wrp'>
			<audio ref={soundRef} src={TADUM_SOUND_URL} />
			<span className="PlayAnimation__text">
				FAKEFLIX
			</span>
		</div>
	)
}

export default PlayAnimation
