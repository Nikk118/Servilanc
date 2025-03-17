import React, { useEffect ,useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import SignUp from "./pages/SignUp";
import LoginAdmin from "./pages/LoginAsAdmin";
import LoginAsUser from "./pages/LoginAsUser";
import LoginProfessional from "./pages/LoginProfessional"
import Home from "./pages/home";
import { useAuthStore } from "./store/useAuthStore";
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
import Profile from "./pages/ProfilePage";
import Userdetails from "./pages/Userdetails";
import UserBookings from "./pages/UserBookings";
import Footer from "./Components/footer";
import AboutUs from "./Components/footerComponents/AboutUs";
import Terms from "./Components/footerComponents/Terms";
import Privacy from "./Components/footerComponents/Privary";
import Reviews from "./Components/footerComponents/Reviews";
import ContactUs from "./Components/footerComponents/ContactUs";
import JoinUs from "./Components/footerComponents/JoinUs";
import Payment from "./Components/payment/Payment";
import SendSms from "./Components/SMS/SendSms";






export default function App() {
  const { authUser, checkAuth } = useAuthStore();
  const {authProfessional,checkProfessional}=useProfessionalStore()
  const {authAdmin,checkAdmin}=useAdminStore()
  const [selectedMenu, setSelectedMenu] = useState("Admin Dashboard");

  useEffect(() => {
    checkAuth();
    checkProfessional();
    checkAdmin();
},[]);

  return (
    <>
    {console.log(authAdmin)}
    {console.log(authProfessional)}
    {console.log(authUser)}

    {authUser && <Navbar />}
      
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
  {/* Home Route - Redirects Based on Auth State */}
  <Route path="/" 
    element={authAdmin ? <AdminHome /> 
           : authProfessional ? <ProfessionalHome /> 
           : authUser ? <Home /> 
           : <LandingPage />} 
  />



  {/* User Authentication Routes */}
  <Route path="/login" element={authUser ? <Home /> : <LoginAsUser />} />
  <Route path="/signup" element={authUser ? <Home /> : <SignUp />} />
  <Route path="/home" element={authUser ? <Home /> : <LoginAsUser />} />

  {/* Professional Authentication Routes */}
  <Route path="/professional/login" element={authProfessional ? <ProfessionalHome /> : <LoginProfessional />} />
  <Route path="/professional/home" element={authProfessional ? <ProfessionalHome /> : <LoginProfessional />} />

  {/* Admin Authentication Routes */}
  <Route path="/admin/login" element={authAdmin ? <AdminHome /> : <LoginAdmin />} />
  <Route path="/admin/home" element={authAdmin ? <AdminHome /> : <LoginAdmin />} />

  {/* Profile Page with Nested Routes */}
  <Route path="/profile" element={<Profile />}>
    <Route index element={<Userdetails />} />
    <Route path="userDetails" element={<Userdetails />} />
    <Route path="userBookings" element={<UserBookings />} />
  </Route>

  {/* Service Routes */}
  <Route path="/salon" element={<Salon />} />
  <Route path="/cleaning" element={<Cleaning />} />
  <Route path="/plumbing" element={<Plumbing />} />
  <Route path="/booking" element={<Booking />} />
  <Route path="/register" element={<JoinUs />} />

  {/* footer Routes */}
  <Route path="/about" element={<AboutUs/>}/>
  <Route path="/terms" element={<Terms/>}/>
  <Route path="/privacy" element={<Privacy/>}/>
  <Route path="/reviews" element={<Reviews/>}/>
  <Route path="/contact" element={<ContactUs/>}/>

  <Route path="/payment" element={<Payment/>}/>


      
  <Route path="/sms" element={<SendSms />} />

  {/* 404 Page */}
  <Route path="*" element={<NotFound />} />
      </Routes>

      {authUser && <Footer />}
       
    </>

  );
}
