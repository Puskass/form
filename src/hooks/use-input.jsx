import { useState } from "react";

const useInput = (initialValue, validateValue) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(value);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue(initialValue);
    setIsTouched(false);
  };

  return {
    value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
