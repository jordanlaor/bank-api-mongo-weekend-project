import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Nav from "../Nav/Nav.component";
import HomePage from "../../pages/Home/Home.page";
import CreateAccountPage from "../../pages/CreateAccount/CreateAccount.page";
import CreatedAccountPage from "../../pages/CreatedAccount/CreatedAccount.page";
import ErrorPage from "../../pages/Error/Error.page";
import SearchPage from "../../pages/Search/Search.page";
import AccountPage from "../../pages/Account/Account.page";
import ViewAccountsPage from "../../pages/ViewAccounts/ViewAccounts.page";
import ViewTransactionsPage from "../../pages/ViewTransactions/ViewTransaction.page";

const Router = () => {
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
          <ViewAccountsPage />
        </Route>
        <Route path="/view/transactions" exact>
          <ViewTransactionsPage />
        </Route>
        <Route path="/account/create" exact>
          <CreateAccountPage />
        </Route>
        <Route path="/account/created/:id" exact>
          <CreatedAccountPage />
        </Route>
        <Route path="/account/:id" exact>
          <AccountPage />
        </Route>
        <Route path="/search" exact>
          <SearchPage />
        </Route>
        <Route path="/error" exact>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
