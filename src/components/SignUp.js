import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { storeCurrentUser } from "../utils/auth";
import { clearCurrentData } from "../utils/auth";

const url =
  "https://fitnesstrac-kr.herokuapp.com/api/2206-FTB-ET-WEB-FT/users/register";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="base-container">
      <div className="header">register</div>
      <div className="content">
        <div className="form">
          <div className="form group">
            <label htmlFor="username">username</label>
            <input type="text" name="username" placeholder="username" />
          </div>
          <div className="form group">
            <label htmlFor="password">password</label>
            <input type="password" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn">
          register
        </button>
      </div>
    </div>
  );
};

export default SignUp;
