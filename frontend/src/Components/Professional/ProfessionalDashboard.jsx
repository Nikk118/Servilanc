import React from "react";
// Import store
import { FaClipboardList, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";
import { useProfessionalStore } from "../../store/useProfessionalStore";

const ProfessionalDashboard = () => {
  const { professionalStats, setProfessionalStats } = useProfessionalStore();

  React.useEffect(() => {
    setProfessionalStats(); // Fetch stats on mount
  }, []);

  const statCards = [
    { label: "New Bookings", value: professionalStats?.pending || 0, icon: <FaClipboardList />, color: "bg-yellow-500" },
    { label: "Accepted Bookings", value: professionalStats?.accepted || 0, icon: <FaHourglassHalf />, color: "bg-blue-500" },
    { label: "Completed Bookings", value: professionalStats?.completed || 0, icon: <FaCheckCircle />, color: "bg-green-500" },
    { label: "Cancelled Bookings", value: professionalStats?.cancelled || 0, icon: <FaTimesCircle />, color: "bg-red-500" },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Professional Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className={`p-6 rounded-lg shadow-lg flex items-center gap-4 ${card.color} transition-transform transform hover:scale-105`}>
            <div className="text-4xl">{card.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{card.label}</h3>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
