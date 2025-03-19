import React, { useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const { setServicesStats, servicesStats, setUserStats, userstats } = useAdminStore();

  useEffect(() => {
    setServicesStats();
    setUserStats();
  }, []);

  const data = {
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
          "#00E676", // Users
          "#FF4081", // Professionals
          "#FFD700", // Total Services
          "#FF5722", // Salon
          "#3D5AFE", // Cleaning
          "#00BCD4", // Plumbing
          "#FFA500", // Electrician
          "#8E44AD", // Pest Control
          "#2ECC71", // Carpentry
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Admin Dashboard - Statistics Overview",
        color: "#FFD700",
        font: { size: 20, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#A7FFEB", font: { size: 14, weight: "bold" } },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
      },
      y: {
        ticks: { color: "#A7FFEB", font: { size: 14, weight: "bold" } },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        📊 Admin Dashboard
      </h3>

      {!servicesStats && !userstats ? (
        <p className="text-yellow-400 text-lg text-center animate-pulse">
          Loading data...
        </p>
      ) : (
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700">
          <div className="h-[450px] flex justify-center items-center">
            <Bar data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
