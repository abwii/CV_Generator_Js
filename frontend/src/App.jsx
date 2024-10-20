import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import MyCv from "./pages/MyCv";
import AllCvs from "./pages/AllCvs";
import GenerateCV from "./pages/GenerateCV";

function App() {
  return (
    <>
      <div>
        <Header />
      </div>
      <Routes>
        {/* <Route index path="/api" element={<Home />} /> */}
        <Route index path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/mycv" element={<MyCv />} />
        <Route path="/allcvs" element={<AllCvs />} />
        <Route path="login/generatemycv" element={<GenerateCV />} />
      </Routes>
    </>
  );
}

export default App;
