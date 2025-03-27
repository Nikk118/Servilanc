import React, { useState } from "react";
import Sidebar from "../Components/adminComponents/Sidebar";
import AdminDashboard from "../Components/adminComponents/AdminDashboard";
import AllBookings from "../Components/adminComponents/AllBookings";
import Salon from "../Components/adminComponents/Salon";
import Plumbing from "../Components/adminComponents/Plumbing";
import Cleaning from "../Components/adminComponents/Cleaning";
import AllProfessionals from "../Components/adminComponents/AllProfessionals";
import AddProfessional from "../Components/adminComponents/AddProfessional";
import AllUsers from "../Components/adminComponents/AllUsers";
import UserContacts from "../Components/adminComponents/UserContacts";
import { useAdminStore } from "../store/useAdminStore";
import NewRegistration from "../Components/adminComponents/NewRegistration";
import FeedbackManagement from "../Components/adminComponents/FeedbackManagement";
import Electrician from "../Components/adminComponents/Electrician";
import Carpentry from "../Components/adminComponents/Carpenty"
import PestControl from "../Components/adminComponents/PestControl";
import BookingWithDetails from "../Components/adminComponents/BookingWithDetails";
import ProfessionalServicesCanceled from "../Components/adminComponents/ProfessionalServicesCanceled";

function AdminHome() {
  const { adminLogout, authAdmin } = useAdminStore();
  const [selectedMenu, setSelectedMenu] = useState("Admin Dashboard");

  const renderContent = () => {
    switch (selectedMenu) {
      case "Admin Dashboard":
        return <AdminDashboard />;
      case "All Bookings":
        return <AllBookings />;
      case "Salon":
        return <Salon />;
      case "Plumbing":
        return <Plumbing />;
      case "Cleaning":
        return <Cleaning />;
      case "BookingWithDetails":
        return <BookingWithDetails/>
      case "Pest Control":
        return <PestControl/>
      case "Electrician":
        return <Electrician/>
      case "Carpentry":
        return <Carpentry/>
      case "All Professionals":
        return <AllProfessionals />;
      case "Add Professional":
        return <AddProfessional />;
      case "All Users":
        return <AllUsers />;
      case "User Messages":
        return <UserContacts />;
      case "New Registration":
        return <NewRegistration />;
      case "Feedback":
        
        return <FeedbackManagement />;
        case "Professional Cancel Services":
          return <ProfessionalServicesCanceled/>
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar (Already Responsive) */}
      <div className="w-1/5 bg-gray-800 min-h-screen shadow-lg">
        <Sidebar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
      </div>
  
      {/* Main Content */}
      <div className="w-full md:w-4/5 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-800 px-6 py-4 flex flex-wrap justify-between items-center shadow-lg border-b border-gray-700">
          <h2 className="text-lg font-bold text-blue-400 tracking-wide uppercase text-center w-full md:w-auto">
            {selectedMenu}
          </h2>
  
          <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0 justify-center md:justify-end w-full md:w-auto">
            <div className="bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
              <span className="text-gray-300 text-sm">Welcome,</span>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {authAdmin.username}
              </span>
              <span className="bg-blue-500 text-xs px-2 py-1 rounded-full text-white font-bold">Admin</span>
            </div>
  
            <button
              onClick={adminLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-md"
            >
              Logout 🚀
            </button>
          </div>
        </div>
  
        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-md">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default AdminHome;
