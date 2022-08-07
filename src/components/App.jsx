import React, { useState } from "react";
import { Login, Posts, Profile, NavBar, Register, NewPost, ModPost, Routines, Activities, ActivityMod } from ".";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Home";
const App = () => {
  const [messageFlag, setMessageFlag] = useState(false);
  const [singlePost, setSinglePost] = useState({});
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
        <Route path="/routines" element={<Routines />} />
        <Route path="/activities" element={<Activities />} />
        {/* <Route path="/activities/:id" element={<ActivityMod />} /> */}
      </Routes>
    </>
  );
};

export default App;
