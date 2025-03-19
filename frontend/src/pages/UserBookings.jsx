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
  const [selectedBooking, setSelectedBooking] = useState(null); // 2️⃣ State for selected booking

  useEffect(() => {
    getUserBookings();
  }, [getUserBookings]);

  const filteredBookings = (userBookings || []).filter(
    (booking) => filter === "All" || booking.status === filter
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-white pt-20">
      <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-3xl">
        {/* Heading and Filter */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Your Bookings
          </h2>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
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
          <div className="max-h-80 overflow-y-auto space-y-6 border border-gray-200 rounded-lg p-4">
            <ul className="space-y-6">
              {filteredBookings.map((booking) => (
                <li
                  key={booking._id}
                  className="p-4 bg-gray-50 rounded-xl shadow-md border border-gray-200 flex items-center space-x-4"
                >
                  {/* Image on the Left */}
                  <img
                    src={booking.service?.image_url}
                    alt="image"
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                  />

                  {/* Details on the Right */}
                  <div className="flex-1 space-y-2">
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
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">Time:</span>{" "}
                      {booking.bookingTime}
                    </p>
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
                        {booking.status}
                      </span>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3">
                    {/* Cancel Button */}
                    {booking.status !== "Completed" &&
                      booking.status !== "Cancelled" && (
                        <button
                          onClick={() => cancelBooking(booking._id)}
                          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition-all shadow-md"
                        >
                          Cancel
                        </button>
                      )}

                    {/* View Invoice Button (Only for Paid Bookings) */}
                    {booking.paymentStatus === "Paid" && (
                      <button
                        onClick={() => setSelectedBooking(booking)} // 3️⃣ Set booking for invoice
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
      </div>

      {/* Invoice Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Invoice
              service={selectedBooking.service?.name}
              price={selectedBooking.service?.price}
              date={new Date(selectedBooking.bookingDate).toLocaleDateString()}
              time={selectedBooking.bookingTime}
              status={selectedBooking.status}
              paymentStatus={selectedBooking.paymentStatus}
              transactionId={selectedBooking.transactionId}  
            />
            <button
              onClick={() => setSelectedBooking(null)} // Close invoice
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded w-full"
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
