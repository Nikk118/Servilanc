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

  const totalServices = servicesStats?.totalCount || 1; // Avoid division by zero

  const barData = {
    labels: [
      "Users",
      "Professionals",
      "Total Services",
      "Salon",
      "Cleaning",
      "Plumbing",
      "Electrician",
      "Pest Control",
      "Carpentry",
    ],
    datasets: [
      {
        label: "Statistics",
        data: [
          userstats?.users || 0,
          userstats?.professionals || 0,
          servicesStats?.totalCount || 0,
          servicesStats?.salon || 0,
          servicesStats?.cleaning || 0,
          servicesStats?.plumbing || 0,
          servicesStats?.electrician || 0,
          servicesStats?.pestControl || 0,
          servicesStats?.carpentry || 0,
        ],
        backgroundColor: [
          "#00E676", "#FF4081", "#FFD700", "#FF5722", "#3D5AFE",
          "#00BCD4", "#FFA500", "#8E44AD", "#2ECC71"
        ],
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Salon", "Cleaning", "Plumbing", "Electrician", "Pest Control", "Carpentry"],
    datasets: [
      {
        data: [
          (servicesStats?.salon / totalServices) * 100,
          (servicesStats?.cleaning / totalServices) * 100,
          (servicesStats?.plumbing / totalServices) * 100,
          (servicesStats?.electrician / totalServices) * 100,
          (servicesStats?.pestControl / totalServices) * 100,
          (servicesStats?.carpentry / totalServices) * 100,
        ],
        backgroundColor: ["#FF5722", "#3D5AFE", "#00BCD4", "#FFA500", "#8E44AD", "#2ECC71"],
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

  const stats = [
    { title: "Users", value: userstats?.users || 0, color: "bg-green-600" },
    { title: "Professionals", value: userstats?.professionals || 0, color: "bg-pink-500" },
    { title: "Total Services", value: servicesStats?.totalCount || 0, color: "bg-yellow-500" },
    { title: "Salon", value: servicesStats?.salon || 0, color: "bg-red-500" },
    { title: "Cleaning", value: servicesStats?.cleaning || 0, color: "bg-blue-600" },
    { title: "Plumbing", value: servicesStats?.plumbing || 0, color: "bg-cyan-500" },
    { title: "Electrician", value: servicesStats?.electrician || 0, color: "bg-orange-500" },
    { title: "Pest Control", value: servicesStats?.pestControl || 0, color: "bg-purple-700" },
    { title: "Carpentry", value: servicesStats?.carpentry || 0, color: "bg-green-500" },
  ];

  const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16, // Increase label size
            weight: "bold",
          },
          color: "#FFFFFF", // Ensure visibility on dark backgrounds
        },
        position: "top", // Adjust position if needed
      },
    },
  };
  

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">📊 Admin Dashboard</h3>

      {!servicesStats && !userstats ? (
        <p className="text-yellow-400 text-lg text-center animate-pulse">Loading data...</p>
      ) : (
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700">
        {/* Bar Chart - Service Stats Breakdown */}
        <div className="h-[450px] flex flex-col justify-center items-center">
          <h3 className="text-yellow-400 text-xl font-bold mb-4">📊 Service Stats Breakdown</h3>
          <Bar data={barData} options={chartOptions} />
        </div>
      
        {/* Pie Chart - Service Share Pie */}
        <div className="flex flex-col items-center my-20">
  <h3 className="text-pink-400 text-2xl font-bold mb-6 text-center">
    🍰 Service Share Pie
  </h3>
  <div className="w-[400px] h-[400px] bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 
              overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col items-center">
    <h4 className="text-white text-lg font-semibold text-center mb-4">
      Service Distribution (%)
    </h4>
    <div className="w-[350px] h-[350px]">
    <Pie data={pieData} options={{ ...pieOptions, maintainAspectRatio: false }} />

    </div>
  </div>
</div>


      
        {/* Stats Blocks - Quick Glance Metrics */}
        <div className="mt-12">
          <h3 className="text-green-400 text-xl font-bold text-center mb-6">⚡ Quick Glance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className={`p-6 rounded-lg text-white ${stat.color} shadow-md transform hover:scale-105 transition-all duration-300`}>
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
