import React from 'react'
import { useNavigate } from 'react-router-dom';

function BookingSuccess({booking}) {
  const navigate=useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-5">
      <div className="bg-white text-center shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-green-600">🎉 Booking Confirmed!</h2>
        <p className="text-gray-600 mt-2">
          Your service is scheduled for {booking.bookingDate} at {booking.bookingTime}.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          *If a professional does not accept your request, it will be automatically canceled.
        </p>
        <button
          onClick={() => navigate("/profile/userBookings")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          See Bookings
        </button>
      </div>
    </div>
  )
}

export default BookingSuccess
