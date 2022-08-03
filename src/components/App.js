import React from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import { LogIn } from "./LogIn";
import SignUp from "./SignUp";
import NotFound from "./NotFound";

function App() {
  return (
    <div>
      <main className="main">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
