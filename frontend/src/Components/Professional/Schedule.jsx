import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useProfessionalStore } from "../../store/useProfessionalStore";

function Schedule() {
  const { acceptedBooking = [], setAcceptedBooking } = useProfessionalStore();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (typeof setAcceptedBooking === "function") {
      setAcceptedBooking();
    }
  }, [setAcceptedBooking]);

  const bookingDates = acceptedBooking?.map((booking) => {
    const formattedDate = new Date(booking.bookingDate).toDateString(); // Use local date format
    return {
      date: new Date(booking.bookingDate),
      formattedDate,
      details: booking,
    };
  });

  const isBookedDate = (date) => {
    const formattedDate = date.toDateString(); // Compare using local date
    return bookingDates?.some((booking) => booking.formattedDate === formattedDate);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">
        Professional Schedule
      </h2>

      <div className="flex justify-center">
        <Calendar
          onClickDay={(value) => setSelectedDate(value)}
          tileClassName={({ date }) => {
            const formattedDate = date.toDateString(); // Convert to local date
            const today = new Date().toDateString();  // Local today’s date

            if (formattedDate === today) {
              return "highlighted-today";
            }
            if (isBookedDate(date)) {
              return "highlighted-booking";
            }
            return "";
          }}
          className="bg-white text-black rounded-lg shadow-md p-4"
        />
      </div>

      {selectedDate && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-yellow-400">Booking Details</h3>
          {isBookedDate(selectedDate) ? (
            bookingDates
              .filter((booking) => booking.formattedDate === selectedDate.toDateString())
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

<style jsx>{`
  .highlighted-booking {
    background-color: #facc15 !important;
    color: #000 !important;
    font-weight: bold;
    border-radius: 10px;
    padding: 5px; 
    margin: 3px; 
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .highlighted-today {
    background-color: #3b82f6 !important;
    color: #fff !important;
    font-weight: bold;
    border-radius: 10px;
  }
`}</style>

    </div>
  );
}

export default Schedule;
