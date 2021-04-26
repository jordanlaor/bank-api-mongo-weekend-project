import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Nav from "../Nav/Nav.component";
import HomePage from "../../pages/Home/Home.page";
import CreateAccountPage from "../../pages/CreateAccount/CreateAccount.page";
import CreatedAccountPage from "../../pages/CreatedAccount/CreatedAccount.page";
import ErrorPage from "../../pages/Error/Error.page";
import SearchPage from "../../pages/Search/Search.page";
import AccountPage from "../../pages/Account/Account.page";
import ViewAccountsPage from "../../pages/ViewAccounts/ViewAccounts.page";
import ViewTransactionsPage from "../../pages/ViewTransactions/ViewTransaction.page";
import SigninPage from "../../pages/Signin/Signin.page";
import AppContext from "../AppContext";
import Signin from "../../pages/Signin/Signin.page";

const Router = () => {
  const { token } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Route>
        <Nav />
      </Route>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/view/accounts" exact>
          {token ? <ViewAccountsPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/view/transactions" exact>
          {token ? <ViewTransactionsPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/account/create" exact>
          {token ? <CreateAccountPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/account/created/:id" exact>
          {token ? <CreatedAccountPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/account/:id" exact>
          {token ? <AccountPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/search" exact>
          {token ? <SearchPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/error" exact>
          <ErrorPage />
        </Route>
        <Route path="/login" exact>
          <SigninPage />
        </Route>
        <Route>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
