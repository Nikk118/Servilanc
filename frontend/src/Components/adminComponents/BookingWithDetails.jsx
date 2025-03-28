import React, { useState, useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";

function BookingWithDetails() {
  const { BookingDeatils, setBookingDeatils } = useAdminStore();
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    setBookingDeatils();
  }, []);

  
  const filteredBookings = BookingDeatils
    ? BookingDeatils.filter((booking) =>
        filter === "All" ? true : booking.status === filter
      )
    : [];

 
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto p-4 bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-300">All Bookings</h2>

      {/* Filter Dropdown */}
      <div className="mb-4 flex items-center space-x-4">
        <label className="font-semibold text-gray-100">Filter by Status:</label>
        <select
          className="border rounded p-2 bg-gray-600 text-white shadow-md"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // Reset page on filter change
          }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-md max-h-[500px] overflow-y-auto w-full">
        <table className="min-w-full border border-gray-700 text-gray-300">
          <thead className="bg-gray-800 text-white sticky top-0">
            <tr>
              <th className="py-2 px-4 border border-gray-700">User</th>
              <th className="py-2 px-4 border border-gray-700">Service</th>
              <th className="py-2 px-4 border border-gray-700">Professional</th>
              <th className="py-2 px-4 border border-gray-700">Booking Date</th>
              <th className="py-2 px-4 border border-gray-700">Booking Time</th>
              <th className="py-2 px-4 border border-gray-700">Status</th>
              <th className="py-2 px-4 border border-gray-700">Payment</th>
              <th className="py-2 px-4 border border-gray-700">Payment Mode</th>
              <th className="py-2 px-4 border border-gray-700">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBookings.map((booking) => (
              <tr key={booking._id} className="border border-gray-700 hover:bg-gray-800">
                <td className="py-2 px-4 border border-gray-700">{booking.user?.username ?? "Unknown User"}</td>
                <td className="py-2 px-4 border border-gray-700">{booking.service?.name ?? "Unknown Service"}</td>
                <td className="py-2 px-4 border border-gray-700">{booking.professional?.name ?? "Unknown Professional"}</td>
                <td className="py-2 px-4 border border-gray-700">{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "No Date"}</td>
                <td className="py-2 px-4 border border-gray-700">{booking.bookingTime ?? "No Time"}</td>
                <td className="py-2 px-4 border border-gray-700 font-bold text-blue-400">{booking.status ?? "No Status"}</td>
                <td className={`py-2 px-4 border border-gray-700 font-semibold ${booking.paymentStatus === "Pending" ? "text-red-400" : "text-green-400"}`}>
                  {booking.paymentStatus ?? "No Payment Status"}
                </td>
                <td className="py-2 px-4 border border-gray-700">{booking.transactionId ? "Online" : "Cash"}</td>
                <td className="py-2 px-4 border border-gray-700 font-semibold">₹{booking.totalAmount ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2 bg-gray-700 text-white rounded">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingWithDetails;
