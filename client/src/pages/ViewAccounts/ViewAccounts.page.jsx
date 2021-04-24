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
      const { data } = await axios.get("http://localhost:5000/api/accounts");
      setAccounts(data.map((account) => ({ id: account._id, credit: account.credit, cash: account.cash, isActive: account.isActive })));
    } catch (error) {
      context.setError(error.message);
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
                {account.isActive}
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
