import React, { useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// ✅ Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const { setServicesStats, servicesStats, setUserStats, userstats } = useAdminStore();

  useEffect(() => {
    setServicesStats();
    setUserStats();
  }, []);

  // Prepare data for the Line Chart
  const data = {
    labels: ["Total Users", "Total Professionals", "Total Services", "Salon Services", "Cleaning Services", "Plumbing Services"],
    datasets: [
      {
        label: "Total Users",
        data: [userstats?.users || 0, 0, 0, 0, 0, 0],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        pointBackgroundColor: "#4CAF50",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
      {
        label: "Total Professionals",
        data: [0, userstats?.professionals || 0, 0, 0, 0, 0],
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        pointBackgroundColor: "#2196F3",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
      {
        label: "Total Services",
        data: [0, 0, servicesStats?.totalCount || 0, 0, 0, 0],
        borderColor: "#FFC107",
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        pointBackgroundColor: "#FFC107",
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
        borderColor: "#9C27B0",
        backgroundColor: "rgba(156, 39, 176, 0.2)",
        pointBackgroundColor: "#9C27B0",
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

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { color: "white", font: { size: 14 } }
      },
      title: {
        display: true,
        text: "Admin Dashboard Overview",
        color: "white",
        font: { size: 18 }
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
      <h3 className="text-xl font-semibold text-white mb-4">Admin Dashboard</h3>

      {!servicesStats && !userstats ? (
        <p className="text-blue-400 text-lg">Loading...</p>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="h-[400px]">
            <Line data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
