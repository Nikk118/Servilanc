import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaChartBar, FaClipboardList, FaUserTie, FaUsers, FaPlus, FaComment } from "react-icons/fa";
import { MessageCircle, UserPlus, FileText, UserX } from "lucide-react";

const menuItems = [
  { name: "Admin Dashboard", icon: <FaChartBar /> },
  { name: "All Bookings", icon: <FaClipboardList /> },
  { name: "All Professionals", icon: <FaUserTie /> },
  { name: "Add Professional", icon: <FaPlus /> },
  { name: "All Users", icon: <FaUsers /> },
  { name: "BookingWithDetails", icon: <FileText /> },
  { name: "User Messages", icon: <MessageCircle /> },
  { name: "New Registration", icon: <UserPlus /> },
  { name: "Feedback", icon: <FaComment /> },
  { name: "Professional Cancel Services", icon: <UserX /> },
  { name: "Users Cancel Services", icon: <UserX /> },
];

function Sidebar({ selectedMenu, setSelectedMenu }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-3 rounded-md text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 w-64 bg-gray-800 p-6 shadow-lg h-screen overflow-y-auto transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6 text-center text-white">Admin Panel</h2>

        <nav>
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              onClick={() => { setSelectedMenu(item.name); setIsOpen(false); }}
              className={`flex items-center gap-3 p-3 my-2 rounded-md cursor-pointer transition-all ${
                selectedMenu === item.name ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon} <span className="text-white">{item.name}</span>
            </motion.div>
          ))}

          {/* Generic Services Option */}
          <motion.div
            key="Services"
            onClick={() => { setSelectedMenu("Services"); setIsOpen(false); }}
            className={`flex items-center gap-3 p-2 my-2 rounded-md cursor-pointer transition-all ${
              selectedMenu === "Services" ? "bg-blue-500" : "hover:bg-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus /> <span className="text-white">Services</span>
          </motion.div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
