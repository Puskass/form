import React from "react";
import Card from "../common/Card";
import useInput from "../hooks/use-input";
import Button from "../common/Button";

const Form = () => {
  const {
    value: enteredUsername,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    isValid: usernameIsValid,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim().length > 2 && value.trim().length <= 14);

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    reset: resetEmailInput,
  } = useInput((value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim())
  );

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    isValid: passwordIsValid,
    reset: resetPasswordInput,
  } = useInput((value) => /^(?=.*[A-Z])(?=.*\d).{6,15}$/.test(value));

  let formIsValid = false;
  if (usernameIsValid && emailIsValid && passwordIsValid) formIsValid = true;

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetUsernameInput();
    resetEmailInput();
    resetPasswordInput();
  };

  const inputClass =
    usernameInputHasError && emailInputHasError && passwordInputHasError
      ? "bg-red-200 border-red-700"
      : "";

  return (
    <Card className={`max-w-sm m-auto mt-20`}>
      <form onSubmit={submitFormHandler} className="flex flex-col">
        <input
          type="text"
          name="username"
          className={`${inputClass} hover:animate-bump shadow-md rounded-sm p-2 mb-3.5 outline-none`}
          onChange={usernameChangeHandler}
          value={enteredUsername}
          onBlur={usernameBlurHandler}
          placeholder="Your Username"
          required
        />
        {usernameInputHasError && (
          <p className="text-red-300 px-2 mb-3">Username is invalid!</p>
        )}

        <input
          type="email"
          name="email"
          className={`${inputClass} hover:animate-bump shadow-md rounded-sm p-2 mb-3.5 outline-none`}
          onChange={emailChangeHandler}
          value={enteredEmail}
          onBlur={emailBlurHandler}
          placeholder="Email address"
          required
          autoComplete="off"
        />
        {emailInputHasError && (
          <p className="text-red-300 px-2 mb-3">Email is invalid!</p>
        )}

        <input
          type="password"
          name="password"
          className={`${inputClass} hover:animate-bump shadow-md rounded-sm p-2 mb-3.5 outline-none`}
          onChange={passwordChangeHandler}
          value={enteredPassword}
          onBlur={passwordBlurHandler}
          placeholder="Password"
          required
        />
        {passwordInputHasError && (
          <p className="text-red-300 px-2 mb-3">
            Password is invalid!
            <ul className="list-item">
              <li>At least 6 characters</li>
              <li>At most 15 characters</li>
              <li>At least one capitalized letter</li>
              <li>At least one number</li>
            </ul>
          </p>
        )}

        <Button disabled={!formIsValid}>Submit</Button>
      </form>
    </Card>
  );
};

export default Form;
