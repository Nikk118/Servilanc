import React, { useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const { setServicesStats, servicesStats, setUserStats, userstats } = useAdminStore();

  useEffect(() => {
    setServicesStats();
    setUserStats();
  }, []);

  // Improved Data Representation for Readability
  const data = {
    labels: [
      "Users", 
      "Professionals", 
      "Total Services", 
      "Salon", 
      "Cleaning", 
      "Plumbing"
    ],
    datasets: [
      {
        label: "Users",
        data: [userstats?.users || 0, 0, 0, 0, 0, 0],
        borderColor: "#00E676",
        backgroundColor: "rgba(0, 230, 118, 0.2)",
        pointBackgroundColor: "#00E676",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
      {
        label: "Professionals",
        data: [0, userstats?.professionals || 0, 0, 0, 0, 0],
        borderColor: "#FF4081",
        backgroundColor: "rgba(255, 64, 129, 0.2)",
        pointBackgroundColor: "#FF4081",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
      {
        label: "Total Services",
        data: [0, 0, servicesStats?.totalCount || 0, 0, 0, 0],
        borderColor: "#FFD700",
        backgroundColor: "rgba(255, 215, 0, 0.2)",
        pointBackgroundColor: "#FFD700",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
      {
        label: "Salon Services",
        data: [0, 0, 0, servicesStats?.salon || 0, 0, 0],
        borderColor: "#FF5722",
        backgroundColor: "rgba(255, 87, 34, 0.2)",
        pointBackgroundColor: "#FF5722",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
      {
        label: "Cleaning Services",
        data: [0, 0, 0, 0, servicesStats?.cleaning || 0, 0],
        borderColor: "#3D5AFE",
        backgroundColor: "rgba(61, 90, 254, 0.2)",
        pointBackgroundColor: "#3D5AFE",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
      {
        label: "Plumbing Services",
        data: [0, 0, 0, 0, 0, servicesStats?.plumbing || 0],
        borderColor: "#00BCD4",
        backgroundColor: "rgba(0, 188, 212, 0.2)",
        pointBackgroundColor: "#00BCD4",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "white",
          font: { size: 14, weight: "bold" },
        },
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
        <p className="text-yellow-400 text-lg text-center animate-pulse">Loading data...</p>
      ) : (
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700">
          <div className="h-[450px] flex justify-center items-center">
            <Line data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
