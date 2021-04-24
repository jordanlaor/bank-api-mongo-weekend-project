import React from "react";

import ActionBtn from "../../components/ActionBtn/ActionBtn.component";

import "./home.css";

const Home = () => {
  return (
    <div className="homePage page">
      <ActionBtn className="--greenBtn" destination="/account/create">
        <div className="actionBtn">Create an account</div>
      </ActionBtn>
    </div>
  );
};

export default Home;
