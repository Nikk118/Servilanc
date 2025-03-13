import React, { useEffect, useState } from "react";
import { useProfessionalStore } from "../../store/useProfessionalStore";

const AcceptedServices = () => {
  const { acceptedBooking, setAcceptedBooking, completeBooking, setPaymentPaid } = useProfessionalStore();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchAcceptedBookings = async () => {
      await setAcceptedBooking(); // Fetch accepted bookings
      setLoading(false); // Set loading to false after fetching
    };
    fetchAcceptedBookings();
  }, []);

  const handleCompleteBooking = (id) => {
    completeBooking(id);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Accepted Bookings</h2>

      {/* Show Loading State */}
      {loading ? (
        <p className="text-gray-400">Loading accepted bookings...</p>
      ) : acceptedBooking && acceptedBooking.length > 0 ? (
        <div className="space-y-4">
          {acceptedBooking.map((booking) => (
            <div key={booking._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{booking.user.username}</h3>
              <p className="text-gray-400">City: {booking.user.address.city}</p>
              <p className="text-gray-400">Street: {booking.user.address.street}</p>
              <p className="text-gray-400">Mobile: {booking.user.address.mobileNumber}</p>
              <p className="text-gray-400">Service: {booking.service.name}</p>

              {/* Highlighted Booking Time and Date */}
              <p className="text-yellow-400 font-semibold text-lg">
                Booking Time: <span className="text-blue-400">{booking.bookingTime}</span>
              </p>
              <p className="text-yellow-400 font-semibold text-lg">
                Booking Date: <span className="text-green-400">{new Date(booking.bookingDate).toDateString()}</span>
              </p>

              <p className="text-gray-400">Payment Status: {booking.paymentStatus}</p>

              {booking.paymentStatus === "Paid" ? (
                <button
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md transition-transform transform hover:scale-105"
                  onClick={() => handleCompleteBooking(booking._id)}
                >
                  ✅ Complete
                </button>
              ) : (
                <button
                  className="mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white px-5 py-2 rounded-full shadow-lg font-semibold text-lg animate-pulse transition-transform transform hover:scale-110"
                  onClick={() => setPaymentPaid(booking._id)}
                >
                  💰 Payment Paid
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No accepted bookings.</p>
      )}
    </div>
  );
};

export default AcceptedServices;
