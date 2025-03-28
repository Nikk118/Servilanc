import React, { useEffect, useState } from "react";
import { useUserBookings } from "../store/useUserBookings";
import { useNavigate } from "react-router-dom";
import Invoice from "../Components/invoice/Invoice";

function UserBookings() {
  const {
    userBookings,
    isCheckingUserBookings,
    getUserBookings,
    cancelBooking,
  } = useUserBookings();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    getUserBookings();
  }, [getUserBookings]);

  const handleCancel = (bookingId) => {
    setBookingToCancel(bookingId);
    setIsCancelModalOpen(true);
  };

  const confirmCancel = async () => {
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation.");
      return;
    }

    await cancelBooking(bookingToCancel, cancelReason);
    setIsCancelModalOpen(false);
    setCancelReason("");
  };

  const filteredBookings = (userBookings || []).filter(
    (booking) => filter === "All" || booking.status === filter
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-20 px-4">
      <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 w-full max-w-3xl">
        {/* Heading and Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            Your Bookings
          </h2>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none mt-3 sm:mt-0"
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
          <div className="max-h-96 overflow-y-auto space-y-4 border border-gray-200 rounded-lg p-4">
            <ul className="space-y-4">
              {filteredBookings.map((booking) => (
                <li
                  key={booking._id}
                  className="p-4 bg-gray-50 rounded-xl shadow-md border border-gray-200 flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-3 sm:space-y-0"
                >
                  {/* Image on the Left */}
                  <img
                    src={booking.service?.image_url || "/default-image.jpg"}
                    alt="service"
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                  />

                  {/* Details */}
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <p>
                      <span className="font-semibold text-gray-700">
                        Service:
                      </span>{" "}
                      {booking.service?.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Price:
                      </span>{" "}
                      ₹{booking.service?.price || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Payment Status:
                      </span>{" "}
                      {booking.paymentStatus || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">Date:</span>{" "}
                      {booking.bookingDate
                        ? new Date(booking.bookingDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">Time:</span>{" "}
                      {booking.bookingTime || "N/A"}
                    </p>
                    {booking.cancelledBy === "Professional" && (
                      <p className="text-red-500 font-semibold">
                        Booking Cancelled by Professional. Check your email for
                        the reason.
                      </p>
                    )}

                    <p className="font-semibold">
                      <span className="mr-2 text-gray-700">Status:</span>
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          booking.status === "Accepted"
                            ? "bg-green-100 text-green-600 border border-green-400"
                            : booking.status === "Completed"
                            ? "bg-blue-100 text-blue-600 border border-blue-400"
                            : booking.status === "Cancelled"
                            ? "bg-red-100 text-red-600 border border-red-400"
                            : "bg-yellow-100 text-yellow-600 border border-yellow-400"
                        }`}
                      >
                        {booking.status || "N/A"}
                      </span>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3">
                    {booking.status !== "Completed" &&
                      booking.status !== "Cancelled" && (
                        <button
                        onClick={() => handleCancel(booking._id)}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                      >
                        Cancel
                      </button>
                      
                      )}

                    {booking.paymentStatus === "Paid" && (
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all shadow-md"
                      >
                        View Invoice
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-6">
            <p className="text-lg font-semibold">
              No {filter !== "All" ? filter.toLowerCase() : ""} bookings found!
            </p>
            <p className="text-sm">
              It looks like you haven't booked any services yet.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all shadow-md"
            >
              Browse Services
            </button>
          </div>
        )}
        {isCancelModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-lg font-semibold mb-3">
                Enter Reason for Cancellation
              </h3>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Write your reason here..."
              />
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <Invoice
              service={selectedBooking.service?.name || "N/A"}
              price={selectedBooking.service?.price || "N/A"}
              date={
                selectedBooking.bookingDate
                  ? new Date(selectedBooking.bookingDate).toLocaleDateString()
                  : "N/A"
              }
              time={selectedBooking.bookingTime || "N/A"}
              status={selectedBooking.status || "N/A"}
              paymentStatus={selectedBooking.paymentStatus || "N/A"}
              transactionId={selectedBooking.transactionId || "N/A"}
            />
            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded w-full hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserBookings;
