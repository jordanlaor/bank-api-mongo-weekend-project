import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Input from "../../components/Input/Input.component";
import AppContext from "../../components/AppContext";

import "./signin.css";

const Signin = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);

  const context = useContext(AppContext);
  const history = useHistory();

  const login = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/admin/in", { username, password });
      if (!data.token.length) throw { message: "something went wrong" };
      console.dir(data);
      context.setToken(data.token);
      setLoading(false);
      history.push("/");
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };
  return (
    <div className="signinPage page">
      <h1>Welcome! to manage accounts you need to log in</h1>
      <Input
        inputConf={{ type: "text", minLength: 1, name: "username", id: "username" }}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      >
        <label htmlFor="username" className="inputLabel">
          Username:
        </label>
      </Input>
      <Input
        inputConf={{ type: "password", minLength: 1, name: "password", id: "password" }}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      >
        <label htmlFor="password" className="inputLabel">
          Password:
        </label>
      </Input>
      <div className="btnsWrapper">
        <div className="actionBtnWrapper --greenBtn">
          <button className="actionBtn" onClick={login} disabled={loading}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
