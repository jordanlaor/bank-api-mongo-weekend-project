import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input/Input.component";
import "./search.css";

const Search = () => {
  let [id, setId] = useState("");
  const history = useHistory();
  const searchOnClick = () => {
    if (id.length) {
      history.push(`/account/${id}`);
    }
  };
  return (
    <div className="searchPage page">
      <h1>Search for an account by Passport ID</h1>
      <Input inputConf={{ type: "text", minLength: 1, name: "id", id: "id" }} onChange={(e) => setId(e.target.value)} value={id}>
        <label htmlFor="id" className="inputLabel">
          Passport ID:
        </label>
      </Input>
      <div className="btnsWrapper">
        <div className="actionBtnWrapper">
          <button className="actionBtn" onClick={searchOnClick}>
            search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
