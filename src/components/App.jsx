import React, { useState, useEffect } from "react";
import { Login, Posts, Profile, NavBar, Register, Routines, Activities, ActivityMod } from ".";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import {getProfile} from '../api';
const App = () => {
  const [messageFlag, setMessageFlag] = useState(false);
  const [singlePost, setSinglePost] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const getLoggedInUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const _user = await getProfile(token);
        setUser(_user)
      }
    }
    getLoggedInUser();
  }, [])
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <Profile
              setMessageFlag={setMessageFlag}
              setSinglePost={setSinglePost}
              singlePost={singlePost}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/routines" element={<Routines user={user}/>} />
        <Route path="/activities" element={<Activities />} />
        {/* <Route path="/activities/:id" element={<ActivityMod />} /> */}
      </Routes>
    </>
  );
};

export default App;
