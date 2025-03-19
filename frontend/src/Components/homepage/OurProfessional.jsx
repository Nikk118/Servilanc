import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { FaUserCircle } from "react-icons/fa"; // Import user icon

function OurProfessional() {
  const { fetchProfessionalStats, professionalStats } = useAdminStore();

  useEffect(() => {
    fetchProfessionalStats();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-3xl font-extrabold text-center text-white mb-12 tracking-wide">
        Our Professionals
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {professionalStats?.slice(0, 3).map((pro, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700 
            transition-transform transform hover:scale-105 hover:border-indigo-500 hover:shadow-indigo-500/50 text-center"
          >
            {/* User Icon */}
            <div className="flex justify-center mb-4">
              <FaUserCircle className="text-gray-300 text-6xl" />
            </div>

            {/* Name */}
            <h4 className="text-2xl font-bold text-white">{pro.name}</h4>

            {/* Category */}
            <p className="text-yellow-400 text-lg font-medium mt-2">
              🏷 Category: {pro.catagory}
            </p>

            {/* Completed Services */}
            <p className="text-green-400 text-lg font-semibold mt-1">
              ✅ Completed Services: {pro.completedBookings}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurProfessional;
