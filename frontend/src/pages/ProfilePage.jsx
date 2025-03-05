import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Profile</h2>

      {/* Inner Navigation */}
      <nav className="bg-white p-3 rounded-xl flex justify-center gap-6 shadow-md">
        <NavLink
          to="userDetails"
          className={({ isActive }) =>
            `px-4 py-2 font-medium rounded-lg transition duration-300 ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-500 hover:text-white"
            }`
          }
        >
          User Details
        </NavLink>
        <NavLink
          to="userBookings"
          className={({ isActive }) =>
            `px-4 py-2 font-medium rounded-lg transition duration-300 ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-500 hover:text-white"
            }`
          }
        >
          Bookings
        </NavLink>
      </nav>

      {/* Nested Content */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilePage;
