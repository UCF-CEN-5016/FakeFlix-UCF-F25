import './signUp.scss';
import InputField from "../InputField/InputField";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { authFadeInUpVariants, staggerOne } from "../../motionUtils";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../../redux/auth/auth.actions";
import { selectAuthLoadingState } from "../../redux/auth/auth.selectors";

/*
	The overall functionality of SignUp.jsx is to:

	1. 	Provide code for transferring and preserving form submission data via the Redux store
		and dispatch handler
	2.	Submit data to the server via the dispatch handler
	3.	Set up the HTML structure needed to display the signup form to the user
*/

const SignUp = () => {

	// Detects if the webpage is loading and when the signup form is selected
	const dispatch = useDispatch();
	const isLoading = useSelector(selectAuthLoadingState);
	const { register, handleSubmit, errors, getValues } = useForm({
		mode: "onTouched"
	})

	// Sends inputted data to web server via dispatch function when called
	const onSubmit = data => {
		const { displayName, email, password } = data;
		dispatch(signUpStart({ displayName, email, password }));
	}

	/*
		The following section contains the HTML elements for the following features:

		1. 	SignUp__form: Handles overall form setup. This allows the entries in the forms to be
			sent to the submission handler.
		2. 	Name input field: Div wrapper containing a text field for a name. Must be between 2-60
			characters.
		3. 	Email input field: Div wrapper containing a text field for a valid email. It detects
			the email format by only accepting char sequences of [text]@[text].[text].
		4. 	Password entry field: Div wrapper containing a field for a password. The div uses
			the password type to hide the entered characters, and the password must be between
			6-30 characters.
		5.	Password confirmation field: Div wrapper containing a field for password confirmation.
			Same criteria as the password entry field, except it must match the previous field.
		6. 	Form submission button: When clicked, signals to SignUp__form that the user is ready
			to submit entered information to the server, executing handleSubmit.
	*/
	return (
		<motion.form
			variants={staggerOne}
			initial="initial"
			animate="animate"
			exit="exit"
			className="SignUp__form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<motion.div variants={authFadeInUpVariants} className="SignUp__form--inputwrp">
				<InputField
					type="text"
					name="displayName"
					placeholder="Your name"
					validationMessage="Please enter your name."
					validation={register({
						required: true,
						minLength: 2,
						maxLength: 60
					})}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>
			<motion.div variants={authFadeInUpVariants} className="SignUp__form--inputwrp">
				<InputField
					type="text"
					name="email"
					placeholder="E-mail"
					validationMessage="Please enter a valid email address."
					validation={register({
						required: true,
						pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
					})}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>
			<motion.div variants={authFadeInUpVariants} className="SignUp__form--inputwrp">
				<InputField
					type="password"
					name="password"
					placeholder="Password"
					validationMessage="The password should have a length between 6 and 30 characters."
					validation={register({
						required: true,
						minLength: 6,
						maxLength: 30,
					})}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>
			<motion.div variants={authFadeInUpVariants} className="SignUp__form--inputwrp">
				<InputField
					type="password"
					name="check_password"
					placeholder="Repeat your password"
					validationMessage="Passwords should match"
					validation={register({
						validate: {
							matchesPreviousPassword: (value) => {
								const { password } = getValues();
								return value && password === value || "Passwords should match!";
							}
						}
					})}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>
			<motion.button
				type="submit"
				variants={authFadeInUpVariants}
				className={`SignUp__form--button button__submit ${isLoading && 'loading'}`}
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : 'Sign Up'}
			</motion.button>
		</motion.form>
	)
}

export default SignUp;