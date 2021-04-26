import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AppContext from "../AppContext";
import axios from "axios";
import "./nav.css";

const Nav = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  const signout = async () => {
    try {
      const { data } = await axios.post("/api/admin/out", {}, { headers: { Authorization: `Bearer ${context.token}` } });
      context.setToken(null);
      history.push("/login");
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
  return (
    <div className="nav">
      <NavLink className="navLink" activeClassName="currentNavLink" to="/" exact>
        BC Bank
      </NavLink>
      <NavLink className="navLink" activeClassName="currentNavLink" to="/account/create" exact>
        Create Account
      </NavLink>
      <NavLink className="navLink" activeClassName="currentNavLink" to="/search" exact>
        Search
      </NavLink>
      <NavLink className="navLink" activeClassName="currentNavLink" to="/view/accounts" exact>
        All Accounts
      </NavLink>
      <NavLink className="navLink" activeClassName="currentNavLink" to="/view/transactions" exact>
        All Transactions
      </NavLink>
      <div className="navLink noBorder" onClick={signout}>
        Sign Out
      </div>
    </div>
  );
};

export default Nav;
