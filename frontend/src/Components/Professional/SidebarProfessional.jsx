import React from "react";
import { motion } from "framer-motion";
import { FaClipboardList, FaHourglassHalf, FaCheckCircle, FaUser, FaHome } from "react-icons/fa";

const menuItems = [
  { name: "Professional Dashboard", icon: <FaHome /> }, // Added this as the first option
  { name: "New Requests", icon: <FaClipboardList /> },
  { name: "Accepted Services", icon: <FaHourglassHalf /> },
  { name: "Completed Services", icon: <FaCheckCircle /> },,
];

function ProfessionalSidebar({ setSelectedMenu, selectedMenu }) {
  return (
    <div className="w-64 bg-gray-800 p-6 shadow-lg min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-center text-white">Professional Panel</h2>
      <nav>
        {menuItems.map((item) => (
          <motion.div
            key={item.name}
            onClick={() => setSelectedMenu(item.name)}
            className={`flex items-center gap-3 p-3 my-2 rounded-md cursor-pointer transition-all text-white ${
              selectedMenu === item.name ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon} <span>{item.name}</span>
          </motion.div>
        ))}
      </nav>
    </div>
  );
}

export default ProfessionalSidebar;
