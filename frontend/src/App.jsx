import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import SignUp from "./pages/SignUp";
import LoginAdmin from "./pages/LoginAsAdmin";
import LoginAsUser from "./pages/LoginAsUser";
import LoginProfessional from "./pages/LoginProfessional"
import Home from "./pages/home";
import { useAuthStore } from "./store/userAuthStore";
import Navbar from "./Components/nav/Navbar";
import { Toaster } from "react-hot-toast";
import { useProfessionalStore } from "./store/useProfessionalStore";
import ProfessionalHome from "./pages/ProfessionalHome";
import NotFound from "./pages/NotFound";
import AdminHome from "./pages/AdminHome";
import { useAdminStore } from "./store/useAdminStore";
import Salon from "./pages/services/salon";
import Cleaning from "./pages/services/Cleaning";
import Plumbing from "./pages/services/plumbing";
import Booking from "./pages/Booking";



export default function App() {
  const { authUser, checkAuth } = useAuthStore();
  const {authProfessional,checkProfessional}=useProfessionalStore()
  const {authAdmin,checkAdmin}=useAdminStore()

  useEffect(() => {
    checkAuth();
    checkProfessional();
    checkAdmin();
  }, [checkAuth, checkProfessional,checkAdmin]);

  return (
    <>
    {console.log(authAdmin)}
    {console.log(authProfessional)}
    {console.log(authUser)}

    {authUser && <Navbar />}
      
      <Toaster position="top-center" reverseOrder={false} />
       <Routes>
          <Route path="/" element={authUser ? <Home /> : <LandingPage />} />
            <Route path="/login" element={authUser ? <Home /> : <LoginAsUser />} />
            <Route path="/professional/login" element={authUser ? <Home /> : <LoginProfessional />} />
            <Route path="/professional/home" element={authProfessional?<ProfessionalHome/>:<LoginProfessional />}/>
            <Route path="/admin/login" element={authAdmin?<AdminHome />:<LoginAdmin />} />
            <Route path="/admin/home" element={authAdmin?<AdminHome />:<LoginAdmin />} />

            <Route path="/signup" element={authUser ? <Home /> : <SignUp />} />
            <Route path="/home" element={authUser ? <Home />:<LoginAsUser />} />
            <Route path="salon" element={<Salon/>} />
            <Route path="cleaning" element={<Cleaning/>} />
            <Route path="plumbing" element={<Plumbing/>} />
            <Route path="booking" element={<Booking/>} />
            <Route path="*" element={<NotFound/>}/>
       </Routes>
    </>
  );
}
