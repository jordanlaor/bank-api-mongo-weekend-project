import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../components/AppContext";
import "./viewTransactions.css";

const ViewTransactions = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  let [transactions, setTransactions] = useState(null);

  const getAllTransactions = async () => {
    try {
      const actionsRes = axios.get("/api/actions", { headers: { Authorization: `Bearer ${context.token}` } });
      const transactionsRes = axios.get("/api/transactions", { headers: { Authorization: `Bearer ${context.token}` } });
      const allData = await axios.all([actionsRes, transactionsRes]);
      const allActions = [];
      allData.forEach((el) => allActions.push(...el.data));
      setTransactions(
        allActions
          .map((action) => {
            const actionEl = { date: new Date(action.date), amount: action.amount, action: action.actionType, id: action._id };
            if (actionEl.action === "transaction") {
              actionEl.fromAccount = action.fromAccount;
              actionEl.toAccount = action.toAccount;
            } else {
              actionEl.account = action.account;
            }
            return actionEl;
          })
          .sort((a, b) => b.date - a.date)
      );
    } catch (error) {
      context.setError(error.message);
      try {
        if (error.response.data.errors) {
          const errors = error.response.data.errors;
          const err = [];
          for (const e in errors) {
            err.push(errors[e].reason);
          }
          context.setError(err);
        } else if (error.response.data.message) {
          if (error.response.data.message === "Please authenticate") {
            history.push("/login");
          }
          context.setError(error.response.data.message);
        }
        console.log(context.error);
      } catch {}
      history.push("/error");
    }
  };

  useEffect(() => getAllTransactions(), []);
  return (
    <div className="viewTransactionsPage page">
      <h1>Transactions</h1>
      {transactions &&
        transactions.map((transaction) => {
          return (
            <div className="transactionRow" key={transaction.id}>
              <div className="cell">
                <span className="cellCategory">Date:</span>
                {transaction.date.toDateString()}
              </div>
              {transaction.account ? (
                <div className="cell">
                  <span className="cellCategory">Account:</span>
                  {transaction.account}
                </div>
              ) : (
                <>
                  <div className="cell">
                    <span className="cellCategory">From:</span>
                    {transaction.fromAccount}
                  </div>
                  <div className="cell">
                    <span className="cellCategory">To:</span>
                    {transaction.toAccount}
                  </div>
                </>
              )}
              <div className="cell">
                <span className="cellCategory">Amount:</span>
                {transaction.amount}
              </div>
              <div className="cell">
                <span className="cellCategory">Action:</span>
                {transaction.action}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ViewTransactions;
