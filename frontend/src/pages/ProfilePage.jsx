import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">
        🔹 Profile Dashboard
      </h2>

      {/* Navigation Tabs */}
      <nav className="bg-gray-800 p-3 rounded-lg flex justify-center gap-5 shadow-md border border-gray-700 w-full max-w-md">
        <NavLink
          to="userDetails"
          className={({ isActive }) =>
            `px-5 py-2 font-medium rounded-md text-sm transition ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-300 hover:bg-blue-500 hover:text-white"
            }`
          }
        >
          👤 User Details
        </NavLink>
        <NavLink
          to="userBookings"
          className={({ isActive }) =>
            `px-5 py-2 font-medium rounded-md text-sm transition ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-300 hover:bg-blue-500 hover:text-white"
            }`
          }
        >
          📅 Bookings
        </NavLink>
      </nav>

      {/* User Details Container - Adjusted Width for Perfect Fit */}
      <div className="mt-6 bg-gray-800 rounded-lg shadow-md border border-gray-700 w-full max-w-2xl p-6 flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilePage;
