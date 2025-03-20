import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { FaCheckCircle, FaTimesCircle, FaClock, FaClipboardList, FaTrash } from "react-icons/fa";

function AllUsers() {
  const { userStats, fetchUserStats, removeUser } = useAdminStore();

  useEffect(() => {
    fetchUserStats();
    const interval = setInterval(fetchUserStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      removeUser(userId);
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-3xl font-extrabold mb-6 text-white text-center uppercase tracking-wide">
        User Booking Stats 📊
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(userStats || []).length > 0 ? (
          userStats.map((user) => (
            <div
              key={user.user}
              className="relative bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-600 text-white transition-transform transform hover:scale-105"
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-700 px-4 py-2 rounded-full text-sm font-semibold text-blue-300 shadow-lg">
                {user.username}
              </div>

              <h4 className="text-lg font-medium text-yellow-400 text-center mt-4">
                {user.email}
              </h4>

              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center justify-between text-blue-300">
                  <FaClipboardList className="text-xl" />
                  <p>
                    <strong>Total Bookings:</strong> {user.totalBookings}
                  </p>
                </div>
                <div className="flex items-center justify-between text-yellow-300">
                  <FaClock className="text-xl" />
                  <p>
                    <strong>Pending:</strong> {user.pendingBookings}
                  </p>
                </div>
                <div className="flex items-center justify-between text-green-300">
                  <FaCheckCircle className="text-xl" />
                  <p>
                    <strong>Completed:</strong> {user.completedBookings}
                  </p>
                </div>
                <div className="flex items-center justify-between text-red-400">
                  <FaTimesCircle className="text-xl" />
                  <p>
                    <strong>Cancelled:</strong> {user.cancelledBookings}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(user.user)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <FaTrash /> Delete User
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-3 text-lg">
            No user stats available 🚀
          </p>
        )}
      </div>
    </div>
  );
}

export default AllUsers;
