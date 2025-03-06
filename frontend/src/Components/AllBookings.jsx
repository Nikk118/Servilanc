import React, { useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore";

function AllBookings() {
  const { bookingsStats, setBookingsStats } = useAdminStore();

  useEffect(() => {
    setBookingsStats(); // Fetch booking stats when the component mounts
  }, [setBookingsStats]);

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Bookings</h3>

      {/* Show Loading State Until Data is Fetched */}
      {!bookingsStats ? (
        <p className="text-blue-400 text-lg">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <DashboardCard title="Total Bookings" value={bookingsStats.totalBookings} />
          <DashboardCard title="Pending" value={bookingsStats.Pending} />
          <DashboardCard title="Cancelled" value={bookingsStats.Cancelled} />
          <DashboardCard title="Completed" value={bookingsStats.Completed} />
          <DashboardCard title="Accepted" value={bookingsStats.Accepted} />
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

export default AllBookings;
