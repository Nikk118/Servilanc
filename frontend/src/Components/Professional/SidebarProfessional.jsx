import { useState } from "react";
import { Menu } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { FaClipboardList, FaHourglassHalf, FaCheckCircle, FaHome } from "react-icons/fa";

const menuItems = [
  { name: "Professional Dashboard", icon: <FaHome /> },
  { name: "New Requests", icon: <FaClipboardList /> },
  { name: "Accepted Services", icon: <FaHourglassHalf /> },
  { name: "Completed Services", icon: <FaCheckCircle /> },
  { name: "Profile", icon: <User /> },
];


function ProfessionalSidebar({ setSelectedMenu, selectedMenu }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="md:hidden p-3 bg-gray-800 text-white fixed top-4 left-4 z-50 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-50 inset-y-0 left-0 w-64 bg-gray-800 p-6 shadow-lg overflow-y-auto transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <h2 className="text-xl font-bold mb-6 text-center text-white">
          Professional Panel
        </h2>
        <nav>
          {menuItems.map((item, index) => (
            <div key={item.name}>
              <motion.div
                onClick={() => {
                  setSelectedMenu(item.name);
                  setIsOpen(false); // Close sidebar on selection
                }}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-all text-white ${
                  selectedMenu === item.name ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon} <span>{item.name}</span>
              </motion.div>
              {index !== menuItems.length - 1 && <hr className="border-gray-600" />}
            </div>
          ))}
        </nav>
      </div>

      {/* Background overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default ProfessionalSidebar;
