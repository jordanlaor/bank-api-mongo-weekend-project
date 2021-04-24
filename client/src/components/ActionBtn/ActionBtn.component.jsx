import React from "react";
import { Link } from "react-router-dom";
import "./actionBtn.css";

const ActionBtn = (props) => {
  const className = `actionBtnWrapper ${props.className}`;
  return (
    <Link className={className} to={props.destination}>
      {props.children}
    </Link>
  );
};

export default ActionBtn;
