import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../components/AppContext";
import ActionBtn from "../../components/ActionBtn/ActionBtn.component";
import "./viewAccounts.css";
import { useHistory } from "react-router";

const ViewAccounts = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  let [accounts, setAccounts] = useState(null);

  const getAllAccounts = async () => {
    try {
      const { data } = await axios.get("/api/accounts", { headers: { Authorization: `Bearer ${context.token}` } });
      setAccounts(data.map((account) => ({ id: account._id, credit: account.credit, cash: account.cash, isActive: account.isActive })));
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

  useEffect(() => getAllAccounts(), []);
  return (
    <div className="viewAccountsPage page">
      {accounts &&
        accounts.map((account) => {
          return (
            <div className="accountRow" key={account.id}>
              <div className="cell">
                <span className="cellCategory">Passport ID:</span>
                {account.id}
              </div>
              <div className="cell">
                <span className="cellCategory">Active Status:</span>
                {String(account.isActive)}
              </div>
              <div className="cell">
                <span className="cellCategory">Credit:</span>
                {account.credit}
              </div>
              <div className="cell">
                <span className="cellCategory">Cash:</span>
                {account.cash}
              </div>
              <div className="cell">
                <ActionBtn className="" destination={`/account/${account.id}`}>
                  <div className="actionBtn">Manage Account</div>
                </ActionBtn>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ViewAccounts;
