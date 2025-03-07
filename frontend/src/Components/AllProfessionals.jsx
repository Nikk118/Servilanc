import React, { useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { FaTrash } from "react-icons/fa"; // Importing delete icon

function ProfessionalStats() {
  const { professionalStats, fetchProfessionalStats, removeProfessional } = useAdminStore();

  useEffect(() => {
    fetchProfessionalStats();
    const interval = setInterval(fetchProfessionalStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!professionalStats) {
    return <div className="text-center text-gray-400">Loading stats...</div>;
  }

  const handleRemove = (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove ${name}?`);
    if (confirmDelete) {
      removeProfessional(id);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-400 uppercase">
        Elite Professional Dashboard
      </h2>

      {professionalStats.map((pro) => (
        <div
          key={pro.professional}
          className="bg-gray-800 p-6 rounded-xl shadow-lg mb-4 relative transition-transform transform hover:scale-105"
        >
          <div className="absolute top-2 right-2">
            <button
              onClick={() => handleRemove(pro.professional, pro.name)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center gap-2 transition"
            >
              <FaTrash />
              Remove
            </button>
          </div>

          <h3 className="text-xl font-semibold text-white">{pro.name}</h3>
          <p className="text-gray-400 text-sm">{pro.email} | 📞 {pro.phone}</p>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-600 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Total Engagements</h4>
              <p className="text-white text-xl">{pro.acceptedBookings}</p>
            </div>
            <div className="bg-green-600 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Successful Appointments</h4>
              <p className="text-white text-xl">{pro.completedBookings}</p>
            </div>
            <div className="bg-red-600 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Lost Opportunities</h4>
              <p className="text-white text-xl">{pro.cancelledBookings}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfessionalStats;
