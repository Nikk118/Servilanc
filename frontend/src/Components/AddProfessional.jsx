import React, { useEffect, useState } from "react";
import axios from "axios";

function AddProfessional() {
  const [stats, setStats] = useState({
    totalServices: 0,
    completedServices: 0,
    pendingServices: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Admin Dashboard</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Total Services</h4>
          <p className="text-blue-400 text-xl">{stats.totalServices}</p>
        </div>
        <div className="bg-green-700 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Completed Services</h4>
          <p className="text-green-300 text-xl">{stats.completedServices}</p>
        </div>
        <div className="bg-red-700 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Pending Services</h4>
          <p className="text-red-300 text-xl">{stats.pendingServices}</p>
        </div>
      </div>
    </div>
  );
}

export default AddProfessional;
