import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useProfessionalStore } from "../../store/useProfessionalStore";

function Schedule() {
  const { acceptedBooking = [], setAcceptedBooking } = useProfessionalStore(); // Ensure it's always an array
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch bookings when component mounts (Ensure it's fetching data correctly)
  useEffect(() => {
    if (typeof setAcceptedBooking === "function") {
      setAcceptedBooking(); 
    }
  }, []);

  console.log("Accepted Bookings:", acceptedBooking); // Debugging log

  // Extract dates from accepted bookings (Ensure bookingDate exists)
  const bookingDates = acceptedBooking
    ?.filter((booking) => booking?.bookingDate)
    .map((booking) => ({
      date: new Date(booking.bookingDate), // Convert to Date object
      formattedDate: booking.bookingDate.split("T")[0], // Extract YYYY-MM-DD
      details: booking,
    }));

  console.log("Processed Booking Dates:", bookingDates); // Debugging log

  // Function to check if a date has an accepted booking
  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
    return bookingDates?.some((booking) => booking.formattedDate === formattedDate)
      ? "bg-yellow-500 text-black font-bold rounded-md"
      : "";
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">
        Professional Schedule
      </h2>

      {/* Calendar Component */}
      <div className="flex justify-center">
      <Calendar
  onClickDay={(value) => setSelectedDate(value)}
  tileClassName={({ date }) => {
    const formattedDate = date.toISOString().split("T")[0]; 
    return bookingDates?.some((booking) => booking.formattedDate === formattedDate)
      ? "bg-yellow-500 text-black font-bold rounded-md"
      : "text-black";  // Ensure all dates are visible
  }}
  className="bg-white text-black rounded-lg shadow-md p-4"
/>

      </div>

      {/* Booking Details Section */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-yellow-400">Booking Details</h3>
          {bookingDates?.some(
            (booking) =>
              booking.formattedDate === selectedDate.toISOString().split("T")[0]
          ) ? (
            bookingDates
              .filter(
                (booking) =>
                  booking.formattedDate === selectedDate.toISOString().split("T")[0]
              )
              .map((booking, index) => (
                <div key={index} className="mt-3 p-3 bg-gray-700 rounded-md">
                  <p className="text-white">
                    <strong>User:</strong> {booking.details?.user?.username || "N/A"}
                  </p>
                  <p className="text-gray-400">
                    <strong>Service:</strong> {booking.details?.service?.name || "N/A"}
                  </p>
                  <p className="text-gray-400">
                    <strong>Category:</strong> {booking.details?.service?.category || "N/A"}
                  </p>
                  <p className="text-gray-400">
                    <strong>City:</strong> {booking.details?.user?.address?.city || "N/A"}
                  </p>
                  <p className="text-gray-400">
                    <strong>Street:</strong> {booking.details?.user?.address?.street || "N/A"}
                  </p>
                  <p className="text-gray-400">
                    <strong>Mobile:</strong> {booking.details?.user?.address?.mobileNumber || "N/A"}
                  </p>
                  <p className="text-yellow-300">
                    <strong>Time:</strong> {booking.details?.bookingTime || "N/A"}
                  </p>
                </div>
              ))
          ) : (
            <p className="text-gray-400 text-center">No bookings on this date.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Schedule;
