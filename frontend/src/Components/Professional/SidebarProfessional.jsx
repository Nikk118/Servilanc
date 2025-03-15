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
  return (
    <div className="w-64 bg-gray-800 p-6 shadow-lg h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-6 text-center text-white">Professional Panel</h2>
      <nav>
        {menuItems.map((item, index) => (
          <div key={item.name}>
            <motion.div
              onClick={() => setSelectedMenu(item.name)}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-all text-white ${
                selectedMenu === item.name ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon} <span>{item.name}</span>
            </motion.div>
            {/* Add a separator except for the last item */}
            {index !== menuItems.length - 1 && <hr className="border-gray-600" />}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default ProfessionalSidebar;
