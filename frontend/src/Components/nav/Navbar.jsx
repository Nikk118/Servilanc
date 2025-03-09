import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg flex justify-between items-center">
      {/* Logo */}
      <div className="text-3xl font-extrabold tracking-wide text-blue-400">
        Servielliance
      </div>

      {/* Navigation Links */}
      {authUser && (
        <div className="space-x-8 text-lg text-white">
          {["home", "plumbing", "cleaning", "salon"].map((path) => (
            <NavLink
              key={path}
              to={`/${path}`}
              className={({ isActive }) =>
                `transition ${
                  isActive ? "text-blue-400 font-semibold border-b-2 border-blue-400" : "hover:text-blue-400"
                }`
              }
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </NavLink>
          ))}
        </div>
      )}

      {/* User Profile & Logout */}
      <div className="flex items-center space-x-6 text-white">
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
    </nav>
  );
}

export default Navbar;
