import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useProfessionalStore } from "../store/useProfessionalStore";

const ProfessionalHome = () => {
  const navigate = useNavigate();
  const { authProfessional, professionalLogout, fetchProfessionalData } = useProfessionalStore();
  const [stats, setStats] = useState({
    totalServices: 0,
    completedServices: 0,
    pendingServices: 0,
    totalEarnings: 0,
    newRequests: [],
  });

  // Get the authenticated professional's ID
  const professionalId = authProfessional?.professional?._id;

  useEffect(() => {
    if (!authProfessional) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      fetchProfessionalData();
      fetchStats();
      const interval = setInterval(fetchStats, 5000); // Refresh stats every 5 seconds
      return () => clearInterval(interval);
    }
  }, [authProfessional, navigate]);

  // Fetch stats for the authenticated professional
  const fetchStats = async () => {
    if (!professionalId) return;
    try {
      const response = await axios.get(`http://localhost:3000/professional/stats/${professionalId}`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Cancel a service request
  const cancelService = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/booking/cancel/${id}`);
      fetchStats(); // Refresh stats after canceling
    } catch (error) {
      console.error("Error canceling service:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <div className="space-y-4">
          <div className="bg-blue-600 p-4 rounded">
            <h3 className="text-lg">Total Services</h3>
            <p className="text-2xl">{stats.totalServices}</p>
          </div>
          <div className="bg-green-600 p-4 rounded">
            <h3 className="text-lg">Completed</h3>
            <p className="text-2xl">{stats.completedServices}</p>
          </div>
          <div className="bg-yellow-500 p-4 rounded">
            <h3 className="text-lg">Pending</h3>
            <p className="text-2xl">{stats.pendingServices}</p>
          </div>
          <div className="bg-purple-600 p-4 rounded">
            <h3 className="text-lg">Earnings</h3>
            <p className="text-2xl">₹{stats.totalEarnings}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={professionalLogout}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">New Service Requests</h1>
        {stats.newRequests.length === 0 ? (
          <p className="text-gray-400">No new requests</p>
        ) : (
          <div className="space-y-4">
            {stats.newRequests.map((req) => (
              <div key={req._id} className="bg-gray-800 p-4 rounded flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{req.serviceType}</h3>
                  <p className="text-gray-400">Date: {new Date(req.date).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => cancelService(req._id)}
                  className="bg-red-600 px-3 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfessionalHome;
