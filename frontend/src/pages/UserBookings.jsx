import React, { useEffect, useState } from "react";
import { useUserBookings } from "../store/useUserBookings";
import { useNavigate } from "react-router-dom";

function UserBookings() {
  const { userBookings, isCheckingUserBookings, getUserBookings, cancelBooking } = useUserBookings();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All"); // Default filter

  useEffect(() => {
    getUserBookings();
  }, [getUserBookings]);

  // Filtering bookings based on selected status
  const filteredBookings = (userBookings || []).filter(booking => 
    filter === "All" || booking.status === filter
  );
  

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg border border-gray-300 w-full max-w-2xl">
      
      {/* Heading and Filter in One Row */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-blue-600">Your Bookings</h2>
        
        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {isCheckingUserBookings ? (
        <p className="text-center text-lg font-semibold animate-pulse">
          Loading your bookings...
        </p>
      ) : filteredBookings.length > 0 ? (
        <div className="max-h-80 overflow-y-auto space-y-6 border border-gray-300 rounded-lg p-4">
          <ul className="space-y-6">
            {filteredBookings.map((booking) => (
              <li key={booking._id} className="p-5 bg-gray-100 rounded-xl flex flex-col space-y-3 shadow-md border border-gray-300">
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold text-blue-600">Service:</span> {booking.service?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600">Price:</span> ₹{booking.service?.price || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600">paymentStatus:</span> {booking.paymentStatus || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600">Date:</span>{" "}
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600">Time:</span> {booking.bookingTime}
                  </p>
                  <p className="font-semibold">
                    <span className="text-blue-600">Status:</span>{" "}
                    <span className={`px-3 py-1 rounded-md text-sm shadow ${
                      booking.status === "Accepted"
                        ? "bg-green-500 text-white"
                        : booking.status === "Completed"
                        ? "bg-blue-500 text-white"
                        : booking.status === "Cancelled"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-400 text-black"
                    }`}>
                      {booking.status}
                    </span>
                  </p>
                </div>

                {booking.status !== "Completed" && booking.status !== "Cancelled" && (
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    className="mt-2 self-end px-5 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-400 transition"
                  >
                    Cancel
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-6">
          <p className="text-lg font-semibold">No {filter !== "All" ? filter.toLowerCase() : ""} bookings found!</p>
          <p className="text-sm">It looks like you haven't booked any services yet.</p>
          <button
            onClick={() => navigate("/home")}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition shadow-md"
          >
            Browse Services
          </button>
        </div>
      )}
    </div>
  );
}

export default UserBookings;
