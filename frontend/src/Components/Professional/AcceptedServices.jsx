import React, { useEffect } from "react";
import { useProfessionalStore } from "../../store/useProfessionalStore";

const AcceptedServices = () => {
  const { acceptedBooking, setAcceptedBooking } = useProfessionalStore();

  useEffect(() => {
    if (setAcceptedBooking) {
      setAcceptedBooking();
    } else {
      console.error("setAcceptedBooking is not defined");
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Accepted Bookings</h2>
      {acceptedBooking && acceptedBooking.length > 0 ? (
        <div className="space-y-4">
          {acceptedBooking.map((booking) => (
            <div key={booking._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{booking.user.username}</h3>
              <p className="text-gray-400">City: {booking.user.address.city}</p>
              <p className="text-gray-400">Street: {booking.user.address.street}</p>
              <p className="text-gray-400">Mobile: {booking.user.address.mobileNumber}</p>
              <p className="text-gray-400">Service: {booking.service.name}</p>
              <p className="text-gray-400">Booking Time: {booking.bookingTime}</p>
              <p className="text-gray-400">Booking Date: {new Date(booking.bookingDate).toDateString()}</p>
              <p className="text-gray-400">Payment Status: {booking.paymentStatus}</p>
              <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Complete
              </button>
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
