import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { LogOut, Menu, User, CalendarCheck, Wrench } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

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
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `transition ${isActive ? "text-blue-400 font-semibold border-b-2 border-blue-400" : "hover:text-blue-400"}`
          }
        >
          Home
        </NavLink>

        {/* Services Dropdown */}
        <div className="relative">
          <button
            className="text-white hover:text-blue-400 flex items-center"
            onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
          >
            Services <Wrench className="ml-2" size={18} />
          </button>
          {servicesMenuOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
              {["Plumbing", "Cleaning", "Salon", "Electrician", "Carpentry", "Pest Control"].map((service) => (
                <NavLink
                  key={service}
                  to={`/${service.toLowerCase()}`}
                  className="block px-4 py-3 text-sm text-white hover:bg-gray-700 transition transform hover:scale-105"
                  onClick={() => setServicesMenuOpen(false)}
                >
                  {service}
                </NavLink>
              ))}
            </div>
          )}
        </div>
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
              <User className="w-10 h-10 rounded-full border-2 border-blue-400 text-blue-400 bg-gray-100 p-2" />
              <span className="ml-2 text-white text-sm font-semibold">{authUser.username}</span>
            </div>

            {/* Profile Dropdown Menu */}
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-xl">
                <NavLink
                  to="/profile"
                  className="flex items-center px-4 py-3 text-sm text-white hover:bg-gray-700 transition transform hover:scale-105"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  <User className="mr-2 text-blue-400" size={18} />
                  View Profile
                </NavLink>
                <NavLink
                  to="/userBookings"
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
        <NavLink
          to="/home"
          className="block p-3 text-sm transition hover:text-blue-400"
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>

        {/* Mobile Services Dropdown */}
        <div className="border-t border-gray-600">
          <button
            className="block w-full p-3 text-sm text-white hover:text-blue-400 transition text-left"
            onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
          >
            Services
          </button>
          {servicesMenuOpen && (
            <div className="pl-5">
              {["Plumbing", "Cleaning", "Salon", "Electrician", "Carpentry", "Pest Control"].map((service) => (
                <NavLink
                  key={service}
                  to={`/${service.toLowerCase()}`}
                  className="block p-3 text-sm transition hover:text-blue-400"
                  onClick={() => {
                    setIsOpen(false);
                    setServicesMenuOpen(false);
                  }}
                >
                  {service}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Profile & Logout inside Mobile Menu */}
        {authUser && (
          <div className="border-t border-gray-600">
            <NavLink
              to="/profile"
              className="block p-3 text-sm text-white hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              View Profile
            </NavLink>
            <NavLink
              to="/userBookings"
              className="block p-3 text-sm text-white hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              My Bookings
            </NavLink>
            <button
              className="block p-3 text-sm text-white hover:text-red-400 transition w-full text-left"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
