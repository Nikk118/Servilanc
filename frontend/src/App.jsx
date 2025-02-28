import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import SignUp from "./Components/SignUp/SignUp";
import LoginAsAdmin from "./pages/LoginAsAdmin";
import LoginAsUser from "./Components/LoginAsUser/LoginAsUser";
import LoginProfessional from "./pages/LoginProfessional"
import Home from "./Components/home/home";
import { useAuthStore } from "./store/userAuthStore";
import Navbar from "./Components/nav/Navbar";
import { Toaster } from "react-hot-toast";



export default function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <LandingPage />} />
        <Route path="/login" element={authUser ? <Home /> : <LoginAsUser />} />
        <Route path="/professional/login" element={authUser ? <Home /> : <LoginProfessional />} />
        <Route path="/admin/login" element={<LoginAsAdmin />} />
        <Route path="/signup" element={authUser ? <Home /> : <SignUp />} />
        <Route path="/home" element={authUser ? <Home />:<LoginAsUser />} />
      </Routes>
    </>
  );
}
