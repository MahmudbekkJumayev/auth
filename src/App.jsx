import React from "react";
import Home from "./Home";
import Success from "./Success"; // Success bileşenini import edin
import { Route, Routes } from "react-router-dom";
import Login from "./Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
};

export default App;
