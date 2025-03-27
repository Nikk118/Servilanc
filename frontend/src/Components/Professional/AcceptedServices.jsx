import React, { useEffect, useState } from "react";
import { useProfessionalStore } from "../../store/useProfessionalStore";

const AcceptedServices = () => {
  const { acceptedBooking, setAcceptedBooking, completeBooking, setPaymentPaid, professionalCancelBooking,isProfessionalCancelBooking } =
    useProfessionalStore();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    const fetchAcceptedBookings = async () => {
      await setAcceptedBooking();
      setLoading(false);
    };
    fetchAcceptedBookings();
  }, []);

  const handleCompleteBooking = (id) => {
    completeBooking(id);
  };

  // Open the cancellation modal
  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Close the cancellation modal
  const closeCancelModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setCancelReason("");
  };

  // Handle cancellation submission
  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) return alert("Please enter a cancellation reason.");

    await professionalCancelBooking(selectedBooking._id, cancelReason);
    closeCancelModal();
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Accepted Bookings</h2>

      {/* Show Loading State */}
      {loading ? (
        <p className="text-gray-400">Loading accepted bookings...</p>
      ) : acceptedBooking && acceptedBooking.length > 0 ? (
        <div className="space-y-4">
          {acceptedBooking.map((booking) => {
            const bookingDate = new Date(booking.bookingDate);
            const today = new Date();
            const isExpired = bookingDate < today.setHours(0, 0, 0, 0);

            return (
              <div key={booking._id} className="bg-gray-800 p-4 rounded-lg shadow-md relative">
                {/* Cancel Button (Top Right) */}
                <button
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow-md text-sm"
                  onClick={() => openCancelModal(booking)}
                >
                  ❌ Cancel
                </button>

                <h3 className="text-lg font-semibold">{booking.user.username}</h3>
                <p className="text-gray-400">City: {booking.user.address.city}</p>
                <p className="text-gray-400">Street: {booking.user.address.street}</p>
                <p className="text-gray-400">Mobile: {booking.user.address.mobileNumber}</p>
                <p className="text-gray-400">Service: {booking.service.name}</p>

                {/* Booking Time and Date */}
                <p className="text-yellow-400 font-semibold text-lg">
                  Booking Time: <span className="text-blue-400">{booking.bookingTime}</span>
                </p>
                <p className="text-yellow-400 font-semibold text-lg">
                  Booking Date:{" "}
                  <span className={`text-lg ${isExpired ? "text-red-500 font-bold" : "text-green-400"}`}>
                    {bookingDate.toDateString()}
                  </span>
                </p>

                {/* Expired Label */}
                {isExpired && <p className="text-red-500 font-semibold">⏳ Expired Booking</p>}

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
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400">No accepted bookings.</p>
      )}

      {/* Cancellation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Cancel Booking</h2>
            <p className="text-gray-300 mb-2">Why are you cancelling this booking?</p>
            <textarea
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter reason..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows="3"
            ></textarea>

            <div className="flex justify-end mt-4">
              { !isProfessionalCancelBooking && <button
                className="mr-2 bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white"
                onClick={closeCancelModal}
              >
                Close
              </button>}
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white"
                onClick={handleCancelBooking}
              >
                 {isProfessionalCancelBooking ? "Cancelling.." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedServices;
