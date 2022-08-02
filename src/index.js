import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { App } from "./components";

const root = ReactDom.createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <App />;
  </BrowserRouter>
);
