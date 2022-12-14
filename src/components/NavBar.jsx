import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const isUserLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const logOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="NavBar">
      <div className="linkHomeContainer">
        <NavLink className="linkHome" to = "/Home">Home</NavLink>
       
      </div>
      <div className="otherLinkContainer">
        {isUserLoggedIn() ? (
          <>
            <NavLink className="link" to="/Routines">
              Routines
            </NavLink>
            <NavLink className="link" to="/Activities">
              Activities
            </NavLink>
            <NavLink className="link" to="/Profile">
              My Routines
            </NavLink>
            <NavLink className="link" onClick={logOut} to="/Home">
              Log Out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="link" to="/Register">
              Register
            </NavLink>
            <NavLink className="link" to="/Login">
              Login
            </NavLink>
            <NavLink className="link" to="/Routines">
              Routines
            </NavLink>
            <NavLink className="link" to="/Activities">
              Activities
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
