import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  FaUserTie,
  FaUsers,
  FaClipboardList,
  FaPlus,
  FaWrench,
  FaBroom,
  FaCut,
  FaChartBar,
} from "react-icons/fa";

const menuItems = [
  { name: "Admin Dashboard", icon: <FaChartBar /> },
  { name: "All Bookings", icon: <FaClipboardList /> },
  { name: "Salon", icon: <FaCut /> },
  { name: "Plumbing", icon: <FaWrench /> },
  { name: "Cleaning", icon: <FaBroom /> },
  { name: "All Professionals", icon: <FaUserTie /> },
  { name: "Add Professional", icon: <FaPlus /> },
  { name: "All Users", icon: <FaUsers /> },
  {name:"User Messages", icon:<MessageCircle/>}
];

function Sidebar({ setSelectedMenu, selectedMenu }) {
  return (
    <div className="w-64 bg-gray-800 p-6 shadow-lg h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-6 text-center text-white">Admin Panel</h2>
      <nav>
        {menuItems.map((item) => (
          <motion.div
            key={item.name}
            onClick={() => setSelectedMenu(item.name)}
            className={`flex items-center gap-3 p-3 my-2 rounded-md cursor-pointer transition-all ${
              selectedMenu === item.name ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon} <span className="text-white">{item.name}</span>
          </motion.div>
        ))}
      </nav>
    </div>
  );
}


export default Sidebar;
