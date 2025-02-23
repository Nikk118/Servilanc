import React from "react";
import { useAuthStore } from "../../store/userAuthStore";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="bg-gray-800 p-4 shadow-lg flex justify-between items-center">
      {/* Logo */}
      <Link to="/home" className="text-3xl font-extrabold tracking-wide text-blue-400">
        Servielliance
      </Link>

      {/* Navigation Links */}
      {authUser&&(

          
          <div className="space-x-8 text-lg text-white">
        <Link to="/home" className="hover:text-blue-400 transition">Home</Link>
        <Link to="/plumbing" className="hover:text-blue-400 transition">Plumbing</Link>
        <Link to="/cleaning" className="hover:text-blue-400 transition">Cleaning</Link>
        <Link to="/salon" className="hover:text-blue-400 transition">Salon</Link>
      </div>
        )
    }

      {/* User Profile & Logout */}
      <div className="flex items-center space-x-6 text-white">
        <Link to="/profile" className="hover:text-blue-400">
          <FaUserCircle size={26} />
        </Link>
        {authUser && (
          <button
            className="flex gap-2 items-center hover:text-red-400 transition"
            onClick={async () => await logout()}
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
