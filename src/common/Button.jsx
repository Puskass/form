import React from "react";

const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`disabled:bg-blue-400 hover:bg-blue-700 bg-blue-600 text-white font-semibold rounded-md mt-2 py-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
