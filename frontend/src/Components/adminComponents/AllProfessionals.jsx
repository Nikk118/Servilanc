import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { FaTrash, FaClock, FaSearch } from "react-icons/fa";

function ProfessionalStats() {
  const { professionalStats, fetchProfessionalStats, removeProfessional } = useAdminStore();
  const [expandedPro, setExpandedPro] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    fetchProfessionalStats();
    const interval = setInterval(fetchProfessionalStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!professionalStats) {
    return <div className="text-center text-gray-400">Loading stats...</div>;
  }

  const handleRemove = (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove ${name}?`);
    if (confirmDelete) {
      removeProfessional(id);
    }
  };

  const toggleWorkDetails = (id) => {
    setExpandedPro(expandedPro === id ? null : id);
  };

  // 🔹 Filter professionals based on search query
  const filteredProfessionals = professionalStats.filter((pro) =>
    pro.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-blue-400 uppercase">
        Elite Professional Dashboard
      </h2>
  
      {/* 🔹 Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by professional name..."
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute top-3 right-4 text-gray-400" />
        </div>
      </div>
  
      {filteredProfessionals.length > 0 ? (
        filteredProfessionals.map((pro) => (
          <div
            key={pro.professional}
            className="bg-gray-800 p-6 rounded-xl shadow-lg mb-4 relative transition-transform transform hover:scale-105"
          >
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleRemove(pro.professional, pro.name)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center gap-2 transition"
              >
                <FaTrash />
                Remove
              </button>
            </div>
  
            <h3 className="text-lg md:text-xl font-semibold text-white">{pro.name}</h3>
            <p className="text-gray-400 text-sm">{pro.email} | 📞 {pro.phone}</p>
  
            <p className="text-blue-400 font-semibold mt-2 uppercase bg-gray-700 px-2 py-1 rounded-md inline-block">
              {pro.catagory}
            </p>
  
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-600 p-4 rounded-lg">
                <h4 className="text-lg font-semibold">Total Engagements</h4>
                <p className="text-white text-xl">{pro.acceptedBookings}</p>
              </div>
              <div className="bg-green-600 p-4 rounded-lg">
                <h4 className="text-lg font-semibold">Successful Appointments</h4>
                <p className="text-white text-xl">{pro.completedBookings}</p>
              </div>
              <div className="bg-red-600 p-4 rounded-lg">
                <h4 className="text-lg font-semibold">Lost Opportunities</h4>
                <p className="text-white text-xl">{pro.cancelledBookings}</p>
              </div>
            </div>
  
            {/* Next Work Button */}
            {pro.acceptedBookingDetails.length > 0 && (
              <button
                onClick={() => toggleWorkDetails(pro.professional)}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md flex items-center gap-2 transition"
              >
                <FaClock />
                Next Work
              </button>
            )}
  
            {/* Expandable Work Details */}
            {expandedPro === pro.professional && pro.acceptedBookingDetails.length > 0 && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg text-sm md:text-base">
                <h4 className="text-lg font-semibold text-yellow-400">Next Scheduled Work</h4>
                <div className="mt-2">
                  <p className="text-white"><strong>Service:</strong> {pro.acceptedBookingDetails[0].service.name}</p>
                  <p className="text-white"><strong>Description:</strong> {pro.acceptedBookingDetails[0].service.description}</p>
                  <p className="text-white"><strong>Scheduled Date:</strong> {new Date(pro.acceptedBookingDetails[0].booking.bookingDate).toDateString()}</p>
                  <p className="text-white"><strong>Time:</strong> {pro.acceptedBookingDetails[0].booking.bookingTime}</p>
                  <p className="text-white"><strong>Location:</strong> 
                    {pro.acceptedBookingDetails[0].address[0].street}, 
                    {pro.acceptedBookingDetails[0].address[0].city}, 
                    {pro.acceptedBookingDetails[0].address[0].state} - 
                    {pro.acceptedBookingDetails[0].address[0].pincode}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No professionals found.</p>
      )}
    </div>
  );
  
}

export default ProfessionalStats;
