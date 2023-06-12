/**
 * React Component for a Button
 */
import React from "react";
import "./ComponentStyles.css";

const Button = ({ children, onClick, className, onMouseDown, onMouseUp }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </button>
  );
};

export default Button;
