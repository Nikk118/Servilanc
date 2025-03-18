import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import AdminDashboard from "../Components/AdminDashboard";
import AllBookings from "../Components/AllBookings";
import Salon from "../Components/Salon";
import Plumbing from "../Components/Plumbing";
import Cleaning from "../Components/Cleaning";
import AllProfessionals from "../Components/AllProfessionals";
import AddProfessional from "../Components/AddProfessional";
import AllUsers from "../Components/AllUsers";
import UserContacts from "../Components/UserContacts";
import { useAdminStore } from "../store/useAdminStore";
import NewRegistration from "../Components/NewRegistration";
import FeedbackManagement from "../Components/FeedbackManagement";

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
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 min-h-screen shadow-lg">
        <Sidebar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
      </div>

      {/* Main Content */}
      <div className="w-4/5 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-800 px-6 py-4 flex justify-between items-center shadow-lg border-b border-gray-700">
          <h2 className="text-lg font-bold text-blue-400 tracking-wide uppercase">{selectedMenu}</h2>
          
          <div className="flex items-center gap-4">
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
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
