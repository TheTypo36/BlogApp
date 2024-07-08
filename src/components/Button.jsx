import React from "react";

const Button = ({
  BtnText,
  type = "button",
  bgColor = "bg-value-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${textColor} ${bgColor}`}
      {...props}
    >
      {BtnText}
    </button>
  );
};

export default Button;
