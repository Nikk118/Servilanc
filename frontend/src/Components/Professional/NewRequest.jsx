import React, { useEffect, useState } from "react";
import { useProfessionalStore } from "../../store/useProfessionalStore"; // Import store

const NewRequest = () => {
  const { newBooking, setNewBooking, accpetBooking } = useProfessionalStore();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBookings = async () => {
      await setNewBooking(); // Fetch new bookings on component mount
      setLoading(false); // Set loading to false after fetching
    };
    fetchBookings();
  }, []);

  const handleAcceptBooking = (id) => {
    accpetBooking(id);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-white">New Booking Requests</h2>

      {/* Show Loading State */}
      {loading ? (
        <p className="text-gray-400">Loading booking requests...</p>
      ) : newBooking && newBooking.length > 0 ? (
        newBooking.map((booking) => (
          <div
            key={booking._id}
            className="border rounded-lg p-5 mb-5 shadow-md bg-gray-800 text-white"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold">{booking.service.name}</h3>
              <span className="text-sm text-gray-400">
                {new Date(booking.bookingDate).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-300">
              <strong>Customer:</strong> {booking.user.username} ({booking.user.email})
            </p>

            <p className="text-gray-300 mt-1">
              <strong>Address:</strong> {booking.user.address?.street},{" "}
              {booking.user.address?.city}, {booking.user.address?.state} -{" "}
              {booking.user.address?.pincode}
            </p>

            <p className="text-gray-300 mt-1">
              <strong>Time:</strong> {booking.bookingTime}
            </p>

            <p className="text-gray-300 mt-1">
              <strong>paymentStatus:</strong> ₹{booking.paymentStatus}
            </p>

            <p className="text-gray-300 mt-1">
              <strong>Amount:</strong> ₹{booking.totalAmount}
            </p>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
              onClick={() => handleAcceptBooking(booking._id)}
            >
              Accept Booking
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No new booking requests available.</p>
      )}
    </div>
  );
};

export default NewRequest;
