import "./input.css";
import React from "react";

const Input = (props) => {
  const { onChange, value, inputConf, children } = props;
  return (
    <>
      {children}
      <input {...inputConf} onChange={onChange} value={value} />
    </>
  );
};

export default Input;
