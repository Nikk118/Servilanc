import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { LogOut, Menu, User, CalendarCheck, Wrench } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useServiceStore } from "../../store/useServiceStore";

function Navbar() {
  const { logout, authUser } = useAuthStore();
  const { services, fetchServices } = useServiceStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
    setProfileMenuOpen(false);
  };

  useEffect(() => {
    if (!services || services.length === 0) fetchServices();
  }, [fetchServices, services]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(services.map((s) => s.category)),
    ];
    setCategories(uniqueCategories);
  }, [services]);

  const toSlug = (text) => text.toLowerCase().replace(/\s+/g, "-");

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
              {categories.length > 0 ? (
                categories.map((category) => (
                  <NavLink
                    key={category}
                    to={`/category/${toSlug(category)}`}
                    className="block px-4 py-3 text-sm text-white hover:bg-gray-700 transition transform hover:scale-105"
                    onClick={() => setServicesMenuOpen(false)}
                  >
                    {category}
                  </NavLink>
                ))
              ) : (
                <p className="text-gray-400 px-4 py-3 text-sm">No services</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-3">
        {authUser && (
          <div className="relative">
            <div
              className="flex items-center cursor-pointer bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <User className="w-10 h-10 rounded-full border-2 border-blue-400 text-blue-400 bg-gray-100 p-2" />
              <span className="ml-2 text-white text-sm font-semibold">{authUser.username}</span>
            </div>

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
              {categories.length > 0 ? (
                categories.map((category) => (
                  <NavLink
                    key={category}
                    to={`/category/${toSlug(category)}`}
                    className="block p-3 text-sm transition hover:text-blue-400"
                    onClick={() => {
                      setIsOpen(false);
                      setServicesMenuOpen(false);
                    }}
                  >
                    {category}
                  </NavLink>
                ))
              ) : (
                <p className="px-3 py-2 text-gray-400 text-sm">No services</p>
              )}
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
