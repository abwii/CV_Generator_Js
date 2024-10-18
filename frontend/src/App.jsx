import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import Mycv from "./pages/Mycv";
import AllCvs from "./pages/AllCvs";

function App() {
  return (
    <>
      <div>
        <Header />
      </div>
      <Routes>
        {/* <Route index path="/api" element={<Home />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/mycv" element={<Mycv />} />
        <Route path="/allcvs" element={<AllCvs />} />
      </Routes>
    </>
  );
}

export default App;
