import React, { useEffect } from "react";
import { useUserBookings } from "../store/useUserBookings"; // Use named import


function UserBookings() {
  const { userBookings, isCheckingUserBookings, getUserBookings } = useUserBookings()

  // Fetch bookings when the component mounts
  useEffect(() => {
    getUserBookings();
    console.log("gfiugs")
  }, [getUserBookings]);

  {console.log("bookings",userBookings)}

  // Cancel Booking Function
 
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>

      {isCheckingUserBookings ? (
        <p>Loading bookings...</p>
      ) : userBookings && userBookings.length > 0 ? (
        <ul className="space-y-4">
          {userBookings.map((booking) => (
            <li key={booking._id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p><strong>Service:</strong> {booking.service}</p>
                <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {booking.bookingTime}</p>
                <p><strong>Status:</strong> {booking.status || "Pending"}</p>
              </div>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}

export default UserBookings;
