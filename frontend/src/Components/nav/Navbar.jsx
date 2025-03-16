import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { LogOut, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg flex justify-between items-center relative">
      {/* Left Side - Logo */}
      <div className="text-3xl font-extrabold tracking-wide text-blue-400">
        Servielliance
      </div>

      {/* Center - Navigation Links (Hidden on Small Screens) */}
      <div className="hidden sm:flex flex-grow justify-center space-x-8 text-lg text-white">
        {["home", "plumbing", "cleaning", "salon"].map((path) => (
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
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </NavLink>
        ))}
      </div>

      {/* Right Side - Profile & Logout + Hamburger Menu */}
      <div className="flex items-center space-x-4">
        {/* Profile & Logout (Visible on Large Screens) */}
        <div className="hidden sm:flex items-center space-x-6 text-white">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `transition ${isActive ? "text-blue-400" : "hover:text-blue-400"}`
            }
          >
            <FaUserCircle size={26} />
          </NavLink>
          {authUser && (
            <button
              className="flex gap-2 items-center hover:text-red-400 transition"
              onClick={handleLogout}
            >
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>

        {/* Hamburger Button (Visible on Small Screens) */}
        <button
          className="text-white sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div
  className={`absolute top-16 left-0 w-full bg-gray-800 text-white sm:hidden transition-all duration-300 z-50 ${
    isOpen ? "block" : "hidden"
  }`}
>

        {["home", "plumbing", "cleaning", "salon"].map((path) => (
          <NavLink
            key={path}
            to={`/${path}`}
            className="block p-3 transition hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </NavLink>
        ))}
        {/* Profile & Logout inside Mobile Menu */}
        <div className="border-t border-gray-600">
          <NavLink
            to="/profile"
            className="block p-3 text-white hover:text-blue-400 transition"
            onClick={() => setIsOpen(false)}
          >
            <FaUserCircle className="inline-block mr-2" />
            Profile
          </NavLink>
          {authUser && (
            <button
              className="block p-3 text-white hover:text-red-400 transition w-full text-left"
              onClick={handleLogout}
            >
              <LogOut className="inline-block mr-2" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
