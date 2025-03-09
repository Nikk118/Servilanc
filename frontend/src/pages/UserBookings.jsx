import React, { useEffect } from "react";
import { useUserBookings } from "../store/useUserBookings";
import { useNavigate } from "react-router-dom";

function UserBookings() {
  const { userBookings, isCheckingUserBookings, getUserBookings, cancelBooking } = useUserBookings();
  const navigate = useNavigate();

  useEffect(() => {
    getUserBookings();
  }, [getUserBookings]);

  // Filter bookings that are not canceled
  const activeBookings = userBookings?.filter(booking => booking.status !== "Cancelled") || [];

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg border border-gray-700 w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-5 text-blue-400 text-center">📅 Your Bookings</h2>

      {isCheckingUserBookings ? (
        <p className="text-center text-lg font-semibold animate-pulse">Loading your bookings...</p>
      ) : activeBookings.length > 0 ? (
        <ul className="space-y-4">
          {activeBookings.map((booking) => (
            <li key={booking._id} className="p-4 bg-gray-700 rounded-lg flex justify-between items-center shadow-md">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold text-blue-400">Service:</span> {booking.service?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-blue-400">Price:</span> ₹{booking.service?.price || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-blue-400">Date:</span>{" "}
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold text-blue-400">Time:</span> {booking.bookingTime}
                </p>
                <p className="font-semibold">
                  <span className="text-blue-400">Status:</span>{" "}
                  <span className={`px-3 py-1 rounded-md text-sm shadow-sm ${
                    booking.status === "Confirmed"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}>
                    {booking.status }
                  </span>
                </p>
              </div>

              {booking.status !== "Completed" && <button
                onClick={() => cancelBooking(booking._id)}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-500 transition"
              >
                Cancel
              </button>}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-300 mt-6">
          <p className="text-lg font-semibold">No active bookings found!</p>
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
