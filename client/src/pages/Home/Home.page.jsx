import React from "react";

import ActionBtn from "../../components/ActionBtn/ActionBtn.component";

import "./home.css";

const Home = () => {
  return (
    <div className="homePage page">
      <div className="actionBtnsWrapper">
        <ActionBtn className="" destination="/account/create">
          <div className="actionBtn">Create an Account</div>
        </ActionBtn>
        <ActionBtn className="" destination="/search">
          <div className="actionBtn">Search</div>
        </ActionBtn>
        <ActionBtn className="" destination="/view/accounts">
          <div className="actionBtn">View All Accounts</div>
        </ActionBtn>
        <ActionBtn className="" destination="/view/transactions">
          <div className="actionBtn">View All Transactions</div>
        </ActionBtn>
      </div>
    </div>
  );
};

export default Home;
