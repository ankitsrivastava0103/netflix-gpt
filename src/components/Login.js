import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import Header from "./Header";
import { checkFormValidation } from "../utils/validation";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { BG_IMG } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errormessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmitClick = (event) => {
    event.preventDefault();
    const message = checkFormValidation(
      email.current?.value,
      password.current?.value,
      name.current?.value,
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
        email.current?.value,
        password.current?.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current?.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {});
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
        email.current?.value,
        password.current?.value
      )
        .then((userCredential) => {
          // const user = userCredential.user;
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
        <img className="h-screen object-cover" src={BG_IMG} alt="Logo" />
      </div>
      <form
        className="w-full md:w-4/12 absolute p-12 bg-black text-white my-36 mx-auto right-0 left-0 flex flex-col rounded-lg opacity-85"
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
