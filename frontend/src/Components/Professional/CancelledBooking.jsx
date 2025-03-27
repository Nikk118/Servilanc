import React, { useEffect } from "react";
import { useProfessionalStore } from "../../store/useProfessionalStore";

function CancelledBooking() {
  const { cancelledBookings, setCancelledBookings } = useProfessionalStore();

  useEffect(() => {
    setCancelledBookings();
  }, [setCancelledBookings]);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-2 text-center text-gray-200">Cancelled Bookings</h2>
      <p className="text-center text-gray-400 mb-4">
        Total: <span className="font-bold text-gray-300">{cancelledBookings?.length || 0}</span>
      </p>

      {cancelledBookings?.length === 0 ? (
        <p className="text-center text-gray-400">No cancelled bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {cancelledBookings?.map((booking) => (
            <div key={booking._id} className="border border-gray-700 rounded-lg p-4 shadow-md bg-gray-800">
              <h3 className="text-lg font-bold text-gray-100">{booking.service?.name || "Unknown Service"}</h3>
             
              <p className="text-gray-400">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p className="text-gray-400">Time: {booking.bookingTime}</p>
              
              {/* Address Section */}
              <p className="text-gray-400">
                Address: {booking.user.address.street}, {booking.user.address.city}, {booking.user.address.state} - {booking.user.address.pincode}
              </p>
              
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CancelledBooking;
