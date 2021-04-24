import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.css";

const Nav = () => {
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
    </div>
  );
};

export default Nav;
