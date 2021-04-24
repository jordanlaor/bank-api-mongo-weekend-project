import React, { useState } from "react";
import Router from "./components/Router/Router.component";
import AppContext from "./components/AppContext";
import "./App.css";

const App = () => {
  let [error, setError] = useState("");
  return (
    <div className="app">
      <AppContext.Provider value={{ error, setError }}>
        <Router />
      </AppContext.Provider>
    </div>
  );
};

export default App;
