import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserTie, FaUsers, FaClipboardList, FaPlus, FaWrench, FaBroom, FaCut, FaChartBar,FaCheckCircle,FaClock } from "react-icons/fa";
import { useAdminStore } from "../store/useAdminStore";

function AdminHome() {
  const { authAdmin, adminLogout } = useAdminStore();
  const [selectedMenu, setSelectedMenu] = useState("Admin Dashboard");
  const [stats, setStats] = useState({ totalServices: 0, completedServices: 0, pendingServices: 0, earnings: "₹0" });

  const menuItems = [
    { name: "Admin Dashboard", icon: <FaChartBar />, category: null },
    { name: "All Bookings", icon: <FaClipboardList />, category: null },
    { name: "Salon", icon: <FaCut />, category: "Salon" },
    { name: "Plumbing", icon: <FaWrench />, category: "Plumbing" },
    { name: "Cleaning", icon: <FaBroom />, category: "Cleaning" },
    { name: "All Professionals", icon: <FaUserTie />, category: null },
    { name: "Add Professional", icon: <FaPlus />, category: null },
    { name: "All Users", icon: <FaUsers />, category: null },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const category = menuItems.find((item) => item.name === selectedMenu)?.category;
        if (category) {
          const response = await axios.get(`http://localhost:3000/api/admin/stats?category=${category}`);
          setStats(response.data);
        } else {
          setStats({ totalServices: 0, completedServices: 0, pendingServices: 0, earnings: "N/A" });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();
  }, [selectedMenu]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>
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
              {item.icon} <span>{item.name}</span>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-800 px-6 py-4 flex justify-between items-center shadow-lg">
          <h2 className="text-lg font-semibold">{selectedMenu}</h2>
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Admin"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            <span className="font-semibold">Admin</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          <motion.div
            key={selectedMenu}
            className="bg-gray-800 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4">{selectedMenu}</h3>
            {menuItems.find((item) => item.name === selectedMenu)?.category ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center" whileHover={{ scale: 1.05 }}>
                  <FaClipboardList size={40} className="mx-auto text-blue-400" />
                  <h2 className="text-xl font-bold mt-3">{stats.totalServices}</h2>
                  <p className="text-gray-400">Total Services</p>
                </motion.div>
                <motion.div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center" whileHover={{ scale: 1.05 }}>
                  <FaCheckCircle size={40} className="mx-auto text-green-400" />
                  <h2 className="text-xl font-bold mt-3">{stats.completedServices}</h2>
                  <p className="text-gray-400">Completed Services</p>
                </motion.div>
                <motion.div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center" whileHover={{ scale: 1.05 }}>
                  <FaClock size={40} className="mx-auto text-red-400" />
                  <h2 className="text-xl font-bold mt-3">{stats.pendingServices}</h2>
                  <p className="text-gray-400">Pending Services</p>
                </motion.div>
                <motion.div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center" whileHover={{ scale: 1.05 }}>
                  <FaChartBar size={40} className="mx-auto text-purple-400" />
                  <h2 className="text-xl font-bold mt-3">{stats.earnings}</h2>
                  <p className="text-gray-400">Total Earnings</p>
                </motion.div>
              </div>
            ) : (
              <p className="text-gray-400">This section will display relevant details soon.</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
