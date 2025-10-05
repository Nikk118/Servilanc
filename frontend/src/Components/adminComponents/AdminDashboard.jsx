import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const { setServicesStats, servicesStats, setUserStats, userstats } = useAdminStore();

  useEffect(() => {
    setServicesStats();
    setUserStats();
  }, []);

  // Get all service categories dynamically
  const serviceCategories = servicesStats
    ? Object.keys(servicesStats).filter((key) => key !== "totalCount")
    : [];

  // Data for Bar chart
  const barData = {
    labels: ["Users", "Professionals", "Total Services", ...serviceCategories],
    datasets: [
      {
        label: "Statistics",
        data: [
          userstats?.users || 0,
          userstats?.professionals || 0,
          servicesStats?.totalCount || 0,
          ...serviceCategories.map((cat) => servicesStats[cat] || 0),
        ],
        backgroundColor: [
          "#00E676", "#FF4081", "#FFD700",
          "#FF5722", "#3D5AFE", "#00BCD4", "#FFA500", "#8E44AD", "#2ECC71",
        ].slice(0, serviceCategories.length + 3), // make sure colors match
        borderRadius: 8,
      },
    ],
  };

  const totalServices = servicesStats?.totalCount || 1; // avoid division by zero

  // Data for Pie chart
  const pieData = {
    labels: serviceCategories,
    datasets: [
      {
        data: serviceCategories.map((cat) => ((servicesStats[cat] || 0) / totalServices) * 100),
        backgroundColor: [
          "#FF5722", "#3D5AFE", "#00BCD4", "#FFA500", "#8E44AD", "#2ECC71", "#FFC107", "#E91E63",
        ].slice(0, serviceCategories.length), // dynamic colors
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Admin Dashboard - Statistics Overview",
        color: "#FFD700",
        font: { size: 20, weight: "bold" },
      },
    },
    scales: {
      x: { ticks: { color: "#A7FFEB" }, grid: { color: "rgba(255, 255, 255, 0.2)" } },
      y: { ticks: { color: "#A7FFEB" }, grid: { color: "rgba(255, 255, 255, 0.2)" }, beginAtZero: true },
    },
  };

  const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { font: { size: 16, weight: "bold" }, color: "#FFFFFF" },
        position: "top",
      },
    },
  };

  // Stats blocks dynamically
  const stats = [
    { title: "Users", value: userstats?.users || 0, color: "bg-green-600" },
    { title: "Professionals", value: userstats?.professionals || 0, color: "bg-pink-500" },
    { title: "Total Services", value: servicesStats?.totalCount || 0, color: "bg-yellow-500" },
    ...serviceCategories.map((cat, idx) => ({
      title: cat,
      value: servicesStats[cat] || 0,
      color: [
        "bg-red-500", "bg-blue-600", "bg-cyan-500",
        "bg-orange-500", "bg-purple-700", "bg-green-500",
      ][idx % 6], // loop colors if more than 6 categories
    })),
  ];

  return (
    <div className="p-4 md:p-6">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">📊 Admin Dashboard</h3>

      {!servicesStats && !userstats ? (
        <p className="text-yellow-400 text-lg text-center animate-pulse">Loading data...</p>
      ) : (
        <div className="bg-gray-900 p-6 md:p-8 rounded-xl shadow-lg border border-gray-700">
          {/* Bar Chart */}
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-yellow-400 text-xl font-bold mb-4">📊 Service Stats Breakdown</h3>
            <div className="w-full h-[500px]">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="flex flex-col items-center my-10 md:my-20">
            <h3 className="text-pink-400 text-2xl font-bold mb-6 text-center">🍰 Service Share Pie</h3>
            <div className="w-full bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 flex flex-col items-center">
              <h4 className="text-white text-lg font-semibold text-center mb-4">Service Distribution (%)</h4>
              <div className="w-full h-[400px]">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>
          </div>

          {/* Stats Blocks */}
          <div className="mt-12">
            <h3 className="text-green-400 text-xl font-bold text-center mb-6">⚡ Quick Glance Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg text-white ${stat.color} shadow-md transform hover:scale-105 transition-all duration-300`}
                >
                  <h4 className="text-lg font-semibold">{stat.title}</h4>
                  <p className="text-3xl font-extrabold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
