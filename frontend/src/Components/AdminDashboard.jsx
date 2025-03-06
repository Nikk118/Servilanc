import React, { useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore";

function AdminDashboard() {
  const { setServicesStats, servicesStats,setUserStats,userstats } = useAdminStore();

  useEffect(() => {
    setServicesStats();
    setUserStats();
  }, []); // Runs only once on mount

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Admin Dashboard</h3>
      
      {/* Show Loading State Until Data is Fetched */}
      {!servicesStats && !userstats ? (
        <p className="text-blue-400 text-lg">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <DashboardCard title="Total Users" value={userstats?.users} />
          <DashboardCard title="Total Professionals" value={userstats?.professionals} />
          <DashboardCard title="Total Services" value={servicesStats?.totalCount} />
          <DashboardCard title="Salon Services" value={servicesStats?.salon} />
          <DashboardCard title="Cleaning Services" value={servicesStats?.cleaning} />
          <DashboardCard title="Plumbing Services" value={servicesStats?.plumbing} />
        </div>
      )}
    </div>
  );
}

// Reusable Card Component
const DashboardCard = ({ title, value }) => (
  <div className="bg-gray-700 p-4 rounded-lg">
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="text-blue-400 text-xl">{value ?? 0}</p> {/* Default to 0 if undefined */}
  </div>
);

export default AdminDashboard;
