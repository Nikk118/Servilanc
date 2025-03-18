import React, { useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion"; // Smooth animations

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function AllBookings() {
  const { bookingsStats, setBookingsStats } = useAdminStore();

  useEffect(() => {
    setBookingsStats();
  }, [setBookingsStats]);


  const chartData = {
    labels: ["Total", "Pending", "Cancelled", "Completed", "Accepted"],
    datasets: [
      {
        label: "Bookings Overview",
        data: [
          bookingsStats?.totalBookings || 0,
          bookingsStats?.Pending || 0,
          bookingsStats?.Cancelled || 0,
          bookingsStats?.Completed || 0,
          bookingsStats?.Accepted || 0
        ],
        borderColor: "#00C2FF",
        backgroundColor: "rgba(0, 194, 255, 0.2)",
        pointBackgroundColor: "#00C2FF",
        pointBorderColor: "#fff",
        tension: 0.4, // Smooth curve
      },
    ],
  };

  // 📊 Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Bookings Statistics",
        color: "white",
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        ticks: { color: "white", font: { size: 12 } },
      },
      y: {
        ticks: { color: "white", font: { size: 12 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-6"> Bookings Overview</h3>

      {/** 🔹 Show Loading State */}
      {!bookingsStats ? (
        <motion.p
          className="text-blue-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.p>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          {/** 🔹 Chart Component */}
          <div className="h-[350px] mb-6">
            <Line data={chartData} options={chartOptions} />
          </div>

          {/** 🔹 Booking Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
