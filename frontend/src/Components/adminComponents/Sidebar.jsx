import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { UserPlus, FileText } from "lucide-react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for toggle
import {
  FaUserTie,
  FaUsers,
  FaClipboardList,
  FaPlus,
  FaWrench,
  FaBroom,
  FaCut,
  FaChartBar,
  FaComment,
  FaBug,
  FaHammer,
  FaBolt,
} from "react-icons/fa";

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
];

const categories = [
  { name: "Salon", icon: <FaCut /> },
  { name: "Cleaning", icon: <FaBroom /> },
  { name: "Plumbing", icon: <FaWrench /> },
  { name: "Pest Control", icon: <FaBug /> },
  { name: "Carpentry", icon: <FaHammer /> },
  { name: "Electrician", icon: <FaBolt /> },
];

function Sidebar({ setSelectedMenu, selectedMenu }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

  return (
    <>
      {/* Hamburger Menu Button */}
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
        <h2 className="text-xl font-bold mb-6 text-center text-white">
          Admin Panel
        </h2>

        <nav>
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              onClick={() => {
                setSelectedMenu(item.name);
                setIsOpen(false); // Close sidebar on selection
              }}
              className={`flex items-center gap-3 p-3 my-2 rounded-md cursor-pointer transition-all ${
                selectedMenu === item.name ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon} <span className="text-white">{item.name}</span>
            </motion.div>
          ))}

          {/* 🔽 Category Dropdown 🔽 */}
          <div className="mt-4">
            <h3 className="text-white text-sm mb-2">Select Category</h3>
            <div className="bg-gray-700 p-2 rounded-md">
              {categories.map((category) => (
                <motion.div
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setSelectedMenu(category.name);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 p-2 my-1 rounded-md cursor-pointer transition-all ${
                    selectedCategory === category.name
                      ? "bg-blue-500"
                      : "hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon} <span className="text-white">{category.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
