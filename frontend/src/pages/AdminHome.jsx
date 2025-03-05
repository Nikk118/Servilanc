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
import { useAdminStore } from "../store/useAdminStore";

function AdminHome() {
  const { adminLogout } = useAdminStore();
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
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-800 px-6 py-4 flex justify-between items-center shadow-lg">
          <h2 className="text-lg font-semibold">{selectedMenu}</h2>
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Admin"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            <span className="font-semibold">Admin</span>
            <button
              onClick={adminLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminHome;
