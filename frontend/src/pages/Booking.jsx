import React from "react";
import { useLocation } from "react-router-dom";

function Booking() {
  const location = useLocation();
  const selectedService = location.state?.service;

  if (!selectedService) {
    return <h2 className="text-center mt-10 text-red-500">No service selected</h2>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row w-full max-w-4xl">
        
        {/* Left Side - Address & Booking Form */}
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book Your Service</h2>

          {/* Address Form */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Your Address</h3>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
              <textarea
                placeholder="Enter your address"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                rows="3"
              ></textarea>
            </form>
          </div>

          {/* Booking Date Form */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Booking Date & Time</h3>
            <form className="space-y-3">
              <input
                type="date"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
              <select className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300">
                <option value="10:00 AM">10:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="06:00 PM">06:00 PM</option>
              </select>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Selected Service Details (Vertically Centered) */}
        <div className="md:w-1/2 p-4 flex flex-col items-center justify-center text-center">
          <img
            src={selectedService.image_url}
            alt={selectedService.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">{selectedService.name}</h3>
          <p className="text-gray-600">{selectedService.description}</p>
          <p className="text-sm text-gray-500 mt-1">{selectedService.duration}</p>
          <p className="text-lg font-bold text-green-600 mt-2">₹{selectedService.price}</p>
        </div>
      </div>
    </div>
  );
}

export default Booking;
