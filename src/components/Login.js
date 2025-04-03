import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Header from "./Header";
import { checkFormValidation } from "../utils/validation";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errormessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmitClick = (event) => {
    event.preventDefault();
    const message = checkFormValidation(
      email.current.value,
      password.current.value,
      name.current.value,
      isSignInForm
    );
    setErrorMessage(message);

    if (message) {
      return;
    }

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  const handleFormToggle = (event) => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Logo"
        />
      </div>
      <form
        className="w-4/12 absolute p-12 bg-black text-white my-36 mx-auto right-0 left-0 flex flex-col rounded-lg opacity-85"
        onSubmit={handleSubmitClick}
      >
        <h1 className="font-bold text-3xl py-4 my-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            className="p-4 my-2 bg-gray-700 rounded-lg"
            type="ntext"
            placeholder="Name"
            required
          />
        )}

        <input
          ref={email}
          className="p-4 my-2 bg-gray-700 rounded-lg"
          type="email"
          placeholder="Email"
          required
        />
        <input
          ref={password}
          className="p-4 my-2 bg-gray-700 rounded-lg"
          type="password"
          placeholder="Password"
          required
        />
        <p className="text-red-700 font-bold text-lg py-2">{errormessage}</p>
        <button type="submit" className="py-4 my-8 bg-red-700 rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer" onClick={handleFormToggle}>
          {isSignInForm
            ? " New to NetflixGPT ? Sign Up Now"
            : "Already registered ? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
