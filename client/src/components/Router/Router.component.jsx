import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Nav from "../Nav/Nav.component";
import HomePage from "../../pages/Home/Home.page";

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/:anything">
        <Nav />
      </Route>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
