export const checkFormValidation = (email, password, name, isSignInForm) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  const isNameValid = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(name);

  if (!isEmailValid) {
    return "Enter Valid Email ID";
  }

  if (!isPasswordValid) {
    return "Enter Valid Password";
  }

  if (!isSignInForm && !isNameValid) {
    return "Enter Valid Name";
  }

  return null;
};
