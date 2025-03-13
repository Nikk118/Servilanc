import React, { useEffect, useState } from "react";

import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { useProfessionalStore } from "../../store/useProfessionalStore";

const CompletedRequests = () => {
  const { completedBooking, setCompletedBooking } = useProfessionalStore();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCompletedBookings = async () => {
      await setCompletedBooking();
      setLoading(false); 
    };
    
    fetchCompletedBookings();
    const interval = setInterval(setCompletedBooking, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-100">✅ Completed Services</h2>

      {/* Show Loading Indicator */}
      {loading ? (
        <p className="text-gray-400 text-center">Loading completed services...</p>
      ) : completedBooking?.length === 0 ? (
        <p className="text-gray-400 text-center">No completed services.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {completedBooking?.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-800 bg-opacity-90 backdrop-blur-lg border border-gray-700 p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl relative"
            >
              <div className="absolute top-3 right-3">
                {booking.paymentStatus === "Pending" ? (
                  <FaTimesCircle className="text-red-500 text-xl" title="Payment Pending" />
                ) : (
                  <FaCheckCircle className="text-green-500 text-xl" title="Payment Completed" />
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-200">{booking.user.username}</h3>
              <p className="text-gray-400">
                <span className="font-medium text-white">Service:</span> {booking.service.name}
              </p>
              <p className="text-gray-400">
                <span className="font-medium text-white">Location:</span> {booking.user.address.street},{" "}
                {booking.user.address.city}
              </p>
              <p className="text-gray-400 flex items-center">
                <FaClock className="text-gray-300 mr-2" />
                Completed At: {new Date(booking.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedRequests;
