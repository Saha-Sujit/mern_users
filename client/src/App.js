import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import { useState } from "react";
import LocalData from "./Components/LocalData";

function App() {
  const user = localStorage.getItem("user");
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            {user ? (
              <Route exact path="/" element={<Home />} />
            ) : (
              <Route
                exact
                path="/"
                element={<Navigate replace to="/signin" />}
              />
            )}

            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            {user ? (
              <Route path="/localdata" element={<LocalData />} />
            ) : (
              <Route
                exact
                path="/"
                element={<Navigate replace to="/signin" />}
              />
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
