import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Input/Input.component";
import AppContext from "../../components/AppContext";
import "./createAccount.css";

const CreateAccount = () => {
  const context = useContext(AppContext);
  const history = useHistory();

  const validateInputs = () => {
    return id.length > 0 && credit >= 0 && cash >= -credit;
  };

  const submit = async () => {
    if (validateInputs()) {
      try {
        setLoading(true);
        const { data } = await axios.post("http://localhost:5000/api/accounts", { _id: id, isActive, credit, cash });
        setLoading(false);
        history.push(`/account/created/${id}`);
      } catch (error) {
        context.setError(error.message);
        try {
          const err = [];
          for (const e in error.response.data.errors) {
            err.push(error.response.data.errors[e].reason);
          }
          context.setError(err);
        } catch {}
        setLoading(false);
        history.push("/error");
      }
    }
  };

  const reset = () => {
    setId("");
    setIsActive(true);
    setCredit(0);
    setCash(0);
  };

  let [id, setId] = useState("");
  let [isActive, setIsActive] = useState(true);
  let [credit, setCredit] = useState(0);
  let [cash, setCash] = useState(0);
  let [loading, setLoading] = useState(false);
  return (
    <div className="createAccountPage page">
      <h1>Create a New Account!</h1>
      <Input inputConf={{ type: "text", minLength: 1, name: "id", id: "id" }} onChange={(e) => setId(e.target.value)} value={id}>
        <label htmlFor="id" className="inputLabel">
          Passport ID:
        </label>
      </Input>
      <Input
        inputConf={{ type: "checkbox", name: "isActive", id: "isActive", checked: isActive }}
        onChange={(e) => setIsActive(e.target.checked)}
        value={isActive}
      >
        <label htmlFor="isActive" className="inputLabel">
          Active:
        </label>
      </Input>
      <Input
        inputConf={{ type: "number", min: 0, name: "credit", id: "credit" }}
        onChange={(e) => setCredit(Number(e.target.value))}
        value={credit}
      >
        <label htmlFor="credit" className="inputLabel">
          Credit:
        </label>
      </Input>
      <Input inputConf={{ type: "number", name: "cash", id: "cash" }} onChange={(e) => setCash(Number(e.target.value))} value={cash}>
        <label htmlFor="cash" className="inputLabel">
          Cash:
        </label>
      </Input>
      <div className="btnsWrapper">
        <div className="actionBtnWrapper --greenBtn">
          <button className="actionBtn" onClick={submit} disabled={loading}>
            Create
          </button>
        </div>
        <div className="actionBtnWrapper --redBtn">
          <button className="actionBtn" onClick={reset} disabled={loading}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
