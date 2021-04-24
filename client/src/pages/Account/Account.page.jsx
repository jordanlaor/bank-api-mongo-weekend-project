import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "../../components/AppContext";
import Input from "../../components/Input/Input.component";
import "./account.css";

const Account = () => {
  const { id } = useParams();
  let [credit, setCredit] = useState(0);
  let [creditOriginal, setCreditOriginal] = useState(0);
  let [cash, setCash] = useState(0);
  let [cashOriginal, setCashOriginal] = useState(0);
  let [isActive, setIsActive] = useState(false);
  let [isActiveOriginal, setIsActiveOriginal] = useState(false);
  let [amount, setAmount] = useState(0);
  let [toId, setToId] = useState("");
  let [loading, setLoading] = useState(false);
  let [fetched, setFetched] = useState(false);

  const history = useHistory();
  const context = useContext(AppContext);

  const searchAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:5000/api/accounts/${id}`);
      setCredit(Number(data.credit));
      setCreditOriginal(Number(data.credit));
      setCash(Number(data.cash));
      setCashOriginal(Number(data.cash));
      setIsActive(Boolean(data.isActive));
      setIsActiveOriginal(Boolean(data.isActive));
      setFetched(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      context.setError(error.message);
      history.push("/error");
    }
  };

  const validateInputs = () => {
    return credit >= 0 && cash >= -credit && amount > 0 && isActive;
  };

  const updateCredit = async () => {
    if (validateInputs()) {
      try {
        setLoading(true);
        const { data } = await axios.patch(`http://localhost:5000/api/accounts/${id}/credit`, { _id: id, credit });
        setLoading(false);
        setCredit(data.credit);
        setCreditOriginal(data.credit);
      } catch (error) {
        context.setError(error.message);
        setLoading(false);
        history.push("/error");
      }
    }
  };

  const deposit = async () => {
    if (validateInputs()) {
      try {
        setLoading(true);
        const { data } = await axios.patch(`http://localhost:5000/api/accounts/${id}/deposit`, { _id: id, amount });
        setLoading(false);
        setCash(data.cash);
        setCashOriginal(data.cash);
      } catch (error) {
        context.setError(error.message);
        setLoading(false);
        history.push("/error");
      }
    }
  };

  const withdraw = async () => {
    if (validateInputs()) {
      try {
        setLoading(true);
        const { data } = await axios.patch(`http://localhost:5000/api/accounts/${id}/withdraw`, { _id: id, amount });
        setLoading(false);
        setCash(data.cash);
        setCashOriginal(data.cash);
      } catch (error) {
        context.setError(error.message);
        setLoading(false);
        history.push("/error");
      }
    }
  };

  const transfer = async () => {
    if (validateInputs() && toId.length > 0) {
      try {
        setLoading(true);
        const { data } = await axios.patch(`http://localhost:5000/api/accounts/transaction`, { fromId: id, toId: toId, amount });
        setLoading(false);
        console.log(data);
        setCash(data.fromAccount.cash);
        setCashOriginal(data.fromAccount.cash);
      } catch (error) {
        context.setError(error.message);
        setLoading(false);
        history.push("/error");
      }
    }
  };

  const reset = () => {
    setIsActive(isActiveOriginal);
    setCredit(creditOriginal);
    setCash(cashOriginal);
    setAmount(0);
    setToId("");
  };

  const toggleActive = async (e) => {
    try {
      const { data } = await axios.patch(`http://localhost:5000/api/accounts/${id}/active`, { isActive: e.target.checked });
      setIsActive(Boolean(data.isActive));
    } catch (error) {
      context.setError(error.message);
      setLoading(false);
      history.push("/error");
    }
  };

  useEffect(() => searchAccount(), []);
  return (
    <div className="accountPage page">
      {fetched && (
        <>
          <div className="fieldWrapper">
            <Input inputConf={{ type: "text", minLength: 1, name: "id", id: "id", disabled: true }} onChange={(e) => null} value={id}>
              <label htmlFor="id" className="inputLabel">
                Passport ID:
              </label>
            </Input>
          </div>
          <div className="fieldWrapper">
            <Input
              inputConf={{ type: "checkbox", name: "isActive", id: "isActive", checked: isActive }}
              onChange={toggleActive}
              value={isActive}
            >
              <label htmlFor="isActive" className="inputLabel">
                Active:
              </label>
            </Input>
          </div>
          <div className="fieldWrapper">
            <Input
              inputConf={{ type: "number", min: 0, name: "credit", id: "credit", disabled: !isActive || loading }}
              onChange={(e) => setCredit(Number(e.target.value))}
              value={credit}
            >
              <label htmlFor="credit" className="inputLabel">
                Credit:
              </label>
            </Input>
            <div className="actionBtnWrapper">
              <button className="actionBtn" onClick={updateCredit} disabled={!isActive || loading}>
                Update
              </button>
            </div>
          </div>
          <div className="fieldWrapper">
            <Input
              inputConf={{ type: "number", name: "cash", id: "cash", disabled: true }}
              onChange={(e) => setCash(Number(e.target.value))}
              value={cash}
            >
              <label htmlFor="cash" className="inputLabel">
                Cash:
              </label>
            </Input>
            <Input
              inputConf={{ type: "number", name: "cash", id: "cash", disabled: !isActive || loading }}
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount}
            >
              <label htmlFor="cash" className="inputLabel">
                Amount:
              </label>
            </Input>
            <div className="actionBtnWrapper">
              <button className="actionBtn" onClick={deposit} disabled={!isActive || loading}>
                Deposit
              </button>
            </div>
            <div className="actionBtnWrapper">
              <button className="actionBtn" onClick={withdraw} disabled={!isActive || loading}>
                Withdraw
              </button>
            </div>
            <Input
              inputConf={{ type: "text", minLength: 1, name: "to", id: "to", disabled: !isActive || loading }}
              onChange={(e) => setToId(e.target.value)}
              value={toId}
            >
              <label htmlFor="to" className="inputLabel">
                Transfer to:
              </label>
            </Input>
            <div className="actionBtnWrapper">
              <button className="actionBtn" onClick={transfer} disabled={!isActive || loading}>
                transfer
              </button>
            </div>
          </div>
          <div className="btnsWrapper">
            <div className="actionBtnWrapper --redBtn">
              <button className="actionBtn" onClick={reset} disabled={!isActive || loading}>
                Reset
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
