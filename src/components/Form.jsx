import React, { useState } from "react";
import Card from "../common/Card";
import useInput from "../hooks/use-input";
import Button from "../common/Button";

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const usernameInput = useInput("", (value) =>
    /^[A-Za-z0-9]{3,12}$/i.test(value.trim())
  );

  const emailInput = useInput("", (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim())
  );

  const passwordInput = useInput("", (value) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)
  );

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let formIsValid =
    usernameInput.isValid && emailInput.isValid && passwordInput.isValid;

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    } else {
      console.log(formData);
    }

    setFormData({ username: "", email: "", password: "" });
    usernameInput.reset();
    emailInput.reset();
    passwordInput.reset();
  };

  const inputClass =
    usernameInput.hasError && emailInput.hasError && passwordInput.hasError
      ? "bg-red-200 border-red-700"
      : "";

  const preStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100px",
    marginBottom: "30px",
  };

  return (
    <Card className={`max-w-sm m-auto mt-20`}>
      <div style={preStyle}>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
      <form onSubmit={submitFormHandler} className="flex flex-col">
        <input
          type="text"
          name="username"
          className={`${inputClass} hover:animate-bump shadow-md rounded-sm p-2 mb-3.5 outline-none`}
          onChange={(e) => {
            usernameInput.valueChangeHandler(e);
            inputChangeHandler(e);
          }}
          value={usernameInput.value}
          onBlur={usernameInput.inputBlurHandler}
          placeholder="Your Username"
          required
        />
        {usernameInput.hasError && (
          <p className="text-red-300 px-2 mb-3">Username is invalid!</p>
        )}

        <input
          type="email"
          name="email"
          className={`${inputClass} hover:animate-bump shadow-md rounded-sm p-2 mb-3.5 outline-none`}
          onChange={(e) => {
            emailInput.valueChangeHandler(e);
            inputChangeHandler(e);
          }}
          value={emailInput.value}
          onBlur={emailInput.inputBlurHandler}
          placeholder="Email address"
          required
          autoComplete="off"
        />
        {emailInput.hasError && (
          <p className="text-red-300 px-2 mb-3">Email is invalid!</p>
        )}

        <input
          type="password"
          name="password"
          className={`${inputClass} hover:animate-bump shadow-md rounded-sm p-2 mb-3.5 outline-none`}
          onChange={(e) => {
            passwordInput.valueChangeHandler(e);
            inputChangeHandler(e);
          }}
          value={passwordInput.value}
          onBlur={passwordInput.inputBlurHandler}
          placeholder="Password"
          required
        />
        {passwordInput.hasError && (
          <div className="text-red-300 px-2 mb-3">
            Password is invalid!
            <ul className="list-item">
              <li>At least 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one digit</li>
              <li>At least one special character</li>
            </ul>
          </div>
        )}

        <Button disabled={!formIsValid}>Submit</Button>
      </form>
    </Card>
  );
};

export default Form;
