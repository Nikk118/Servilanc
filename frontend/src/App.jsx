import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/landing/Landing";
import SignUp from "./Components/SignUp/SignUp";
import LoginAsAdmin from "./Components/LoginAsAdmin/LoginAsAdmin";
import LoginAsUser from "./Components/LoginAsUser/LoginAsUser";
import Home from "./Components/home/home";
import { useAuthStore } from "./store/userAuthStore";
import Navbar from "./Components/nav/Navbar";

function LoginProfessional() {
  return <h2>Login as Professional Page</h2>;
}

export default function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <LandingPage />} />
        <Route path="/login" element={authUser ? <Home /> : <LoginAsUser />} />
        <Route path="/professional/login" element={<LoginProfessional />} />
        <Route path="/admin/login" element={<LoginAsAdmin />} />
        <Route path="/signup" element={authUser ? <Home /> : <SignUp />} />
        <Route path="/home" element={authUser ? <Home />:<LoginAsUser />} />
      </Routes>
    </>
  );
}
