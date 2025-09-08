import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { authFadeInUpVariants, staggerOne } from "../../motionUtils";
import {
  anonymousSignInStart,
  emailSignInStart,
  googleSignInStart,
} from "../../redux/auth/auth.actions";
import { selectAuthLoadingState } from "../../redux/auth/auth.selectors";
import InputField from "../InputField/InputField";
import Loader from "../Loader/Loader";
import "./signIn.scss";

/**
 * SignIn Component File Overall Summary
 *
 * This file contains a React component that renders a complete sign-in form with multiple
 * authentication options. Users can authenticate using email/password, Google account,
 * or anonymously. The component includes form validation, loading states, error handling,
 * and smooth animations. It integrates React Hook Form for form management, Redux for
 * state management, and Framer Motion for animations.
 */

/**
 * SignIn - This is the main component in this file that when called elsewhere in our codebase will render the sign-in form for users to see
 *
 * Creates a form with password/email inputs and three sign in options:
 * - Email / password
 * - Google sign in
 * - Anonymous sign in
 *
 * Uses React Hook Form for easier form management(register, handleSubmit), Redux for state management,
 * and Framer Motion for animations.
 *
 * @returns {JSX.Element} Animated form with input fields for user sign in information and sign in buttons
 */
const SignIn = () => {
  //Redux hooks for managing authentication state and dispatching actions
  const dispatch = useDispatch(); //Function sends actions to Redux store
  const isLoading = useSelector(selectAuthLoadingState); //Gets the loading state from Redux store
  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
  });

  /**
   * onSubmit function handles when the form gets submitted for email / password authentication only
   *
   * Grabs email and password from form data and dispatches the Redux action to start email sign-in process.
   *
   * To clarify this function only gets called when user clicks "Sign in" button, not Google or anonymous sign-in buttons.
   * When those are clicked since they are type "button", onSubmit gets skipped entirely and dispatches for Google sign-in and
   * anonymous sign-in get called depending on which button user clicks.
   *
   * @param {Object} data - Form data that contains the users email and password they typed in
   * @returns {void} - Does not return anything
   */
  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(emailSignInStart({ email, password }));
  };

  return (
    <motion.form
      variants={staggerOne}
      initial="initial"
      animate="animate"
      exit="exit"
      className="SignIn__form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <motion.div
        variants={authFadeInUpVariants}
        className="SignIn__form--inputwrp"
      >
        <InputField
          type="text"
          name="email"
          placeholder="E-mail"
          validationMessage="Please enter a valid email address."
          validation={register({
            required: true,
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
          errors={errors}
          disabled={isLoading}
        />
      </motion.div>
      <motion.div
        variants={authFadeInUpVariants}
        className="SignIn__form--inputwrp"
      >
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
      <motion.button
        type="submit"
        variants={authFadeInUpVariants}
        className={`SignIn__form--button button__submit ${
          isLoading && "loading"
        }`}
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : "Sign in"}
      </motion.button>
      <motion.button
        type="button"
        variants={authFadeInUpVariants}
        className={`SignIn__form--button button__google ${
          isLoading && "loading"
        }`}
        onClick={() => dispatch(googleSignInStart())}
        disabled={isLoading}
      >
        {!isLoading && <FcGoogle />}
        {isLoading ? <Loader /> : "Sign in with Google"}
      </motion.button>
      <motion.button
        type="button"
        variants={authFadeInUpVariants}
        className={`SignIn__form--button button__anonymous ${
          isLoading && "loading"
        }`}
        onClick={() => dispatch(anonymousSignInStart())}
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : "Sign in anonymously"}
      </motion.button>
    </motion.form>
  );
};

export default SignIn;
