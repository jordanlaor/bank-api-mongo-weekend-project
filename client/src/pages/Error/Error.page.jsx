import React, { useContext } from "react";
import AppContext from "../../components/AppContext";
import "./error.css";

const Error = () => {
  const context = useContext(AppContext);
  console.log(context.error);
  return <div className="errorPage page">{context.error}</div>;
};

export default Error;
