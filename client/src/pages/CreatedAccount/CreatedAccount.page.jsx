import React from "react";
import { useParams } from "react-router-dom";
import "./createdAccount.css";

const CreatedAccount = () => {
  const { id } = useParams();
  return <div>Account with passport ID {id} was successfully created</div>;
};

export default CreatedAccount;
