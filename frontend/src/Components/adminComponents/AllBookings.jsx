import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";

// Register Pie Chart components
ChartJS.register(ArcElement, Tooltip, Legend);

function AllBookings() {
  const { bookingsStats, setBookingsStats } = useAdminStore();

  useEffect(() => {
    setBookingsStats();
  }, [setBookingsStats]);

  // Pie Chart Data
  const pieData = {
    labels: ["Pending", "Cancelled", "Completed", "Accepted"],
    datasets: [
      {
        data: [
          bookingsStats?.Pending || 0,
          bookingsStats?.Cancelled || 0,
          bookingsStats?.Completed || 0,
          bookingsStats?.Accepted || 0,
        ],
        backgroundColor: ["#F4B400", "#DB4437", "#0F9D58", "#673AB7"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // Pie Chart Options (Bigger Labels)
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16, // Bigger labels
            weight: "bold",
          },
          color: "#fff",
        },
      },
    },
  };

  return (
    <div className="p-4 md:p-6">
      <h3 className="text-2xl font-bold text-white mb-6 text-center md:text-left">Bookings Overview</h3>
  
      {!bookingsStats ? (
        <motion.p
          className="text-blue-400 text-lg text-center md:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.p>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          
          {/* Pie Chart */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[400px]">
              <Pie data={pieData} options={{ ...pieOptions, maintainAspectRatio: false }} />
            </div>
          </div>
  
          {/* Booking Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <StatCard title="Total Bookings" value={bookingsStats.totalBookings} color="text-blue-400" />
            <StatCard title="Pending" value={bookingsStats.Pending} color="text-yellow-400" />
            <StatCard title="Cancelled" value={bookingsStats.Cancelled} color="text-red-500" />
            <StatCard title="Completed" value={bookingsStats.Completed} color="text-green-400" />
            <StatCard title="Accepted" value={bookingsStats.Accepted} color="text-purple-400" />
          </div>
        </div>
      )}
    </div>
  );
  
}

const StatCard = ({ title, value, color }) => (
  <motion.div
    className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-all"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <h4 className="text-lg font-semibold text-white">{title}</h4>
    <p className={`text-xl font-bold ${color}`}>{value ?? 0}</p>
  </motion.div>
);

export default AllBookings;
