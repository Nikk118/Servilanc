import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { LogOut, Menu, User, CalendarCheck } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 px-4 py-2 shadow-md flex justify-between items-center fixed left-0 right-0 z-50 h-20">
      {/* Logo */}
      <div
        className="text-2xl font-extrabold tracking-wide text-blue-400 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Servielliance
      </div>

      {/* Center Links */}
      <div className="hidden sm:flex flex-grow justify-center space-x-6 text-lg text-white">
        {["home", "plumbing", "cleaning", "salon", "my-bookings"].map((path) => (
          <NavLink
            key={path}
            to={`/${path}`}
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400"
                  : "hover:text-blue-400"
              }`
            }
          >
            {path.replace("-", " ").charAt(0).toUpperCase() + path.replace("-", " ").slice(1)}
          </NavLink>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-3">
        {authUser && (
          <div className="relative">
            {/* Profile Image & Name */}
            <div
              className="flex items-center cursor-pointer bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <img
                src={authUser.profileImage || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-400"
              />
              <span className="ml-2 text-white text-sm font-semibold">{authUser.username}</span>
              {authUser.role === "admin" && (
                <span className="ml-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  Admin
                </span>
              )}
            </div>

            {/* Profile Dropdown Menu */}
            {profileMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-gray-900 bg-opacity-80 backdrop-blur-lg border border-gray-700 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100"
              >
                <NavLink
                  to="/profile"
                  className="flex items-center px-4 py-3 text-sm text-white hover:bg-gray-700 transition transform hover:scale-105"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  <User className="mr-2 text-blue-400" size={18} />
                  View Profile
                </NavLink>
                <NavLink
                  to="/my-bookings"
                  className="flex items-center px-4 py-3 text-sm text-white hover:bg-gray-700 transition transform hover:scale-105"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  <CalendarCheck className="mr-2 text-green-400" size={18} />
                  My Bookings
                </NavLink>
                <button
                  className="flex items-center w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-700 transition transform hover:scale-105"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2" size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="text-white sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-gray-800 text-white sm:hidden transition-all duration-300 z-50 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {["home", "plumbing", "cleaning", "salon", "my-bookings"].map((path) => (
          <NavLink
            key={path}
            to={`/${path}`}
            className="block p-3 text-sm transition hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            {path.replace("-", " ").charAt(0).toUpperCase() + path.replace("-", " ").slice(1)}
          </NavLink>
        ))}

        {/* Profile & Logout inside Mobile Menu */}
        {authUser && (
          <div className="border-t border-gray-600">
            <NavLink
              to="/profile"
              className="block p-3 text-sm text-white hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              <FaUserCircle className="inline-block mr-2" />
              Profile
            </NavLink>
            <NavLink
              to="/my-bookings"
              className="block p-3 text-sm text-white hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              My Bookings
            </NavLink>
            <button
              className="block p-3 text-sm text-white hover:text-red-400 transition w-full text-left"
              onClick={handleLogout}
            >
              <LogOut className="inline-block mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
