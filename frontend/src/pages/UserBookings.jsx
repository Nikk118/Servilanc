import React, { useEffect } from "react";
import { useUserBookings } from "../store/useUserBookings";
import { useNavigate } from "react-router-dom"; // Import for navigation

function UserBookings() {
  const { userBookings, isCheckingUserBookings, getUserBookings, cancelBooking } = useUserBookings();
  const navigate = useNavigate();

  useEffect(() => {
    getUserBookings();
  }, [getUserBookings]);

  // Filter bookings that are not canceled
  const activeBookings = userBookings?.filter(booking => booking.status !== "Cancelled") || [];

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>

      {isCheckingUserBookings ? (
        <p>Loading bookings...</p>
      ) : activeBookings.length > 0 ? (
        <ul className="space-y-4">
          {activeBookings.map((booking) => (
            <li key={booking._id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p><strong>Service:</strong> {booking.service?.name || "Service Not Found"}</p>
                <p><strong>Price:</strong> {booking.service?.price || "Service Not Found"}</p>
                <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {booking.bookingTime}</p>
                <p><strong>Status:</strong> {booking.status || "Pending"}</p>
              </div>
              <button
                onClick={() => cancelBooking(booking._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-600 mt-6">
          <p className="text-lg font-semibold">No active bookings found!</p>
          <p className="text-sm">Looks like you haven't booked any services yet or all your bookings are canceled.</p>
          <button
            onClick={() => navigate("/home")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Browse Services
          </button>
        </div>
      )}
    </div>
  );
}

export default UserBookings;
