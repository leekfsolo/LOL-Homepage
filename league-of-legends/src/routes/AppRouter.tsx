import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChampionsPage from "../app/champions";
import HomePage from "../app/home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/champions" element={<ChampionsPage />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
