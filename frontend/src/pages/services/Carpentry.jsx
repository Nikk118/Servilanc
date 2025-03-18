import React, { useEffect, useState } from "react";
import { axiosInstant } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../../store/useBookingStore";

function Carpentry() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { setSelectedService } = useBookingStore();

  const handleSubmit = (service) => {
    setSelectedService(service);
    navigate("/booking");
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosInstant.get(
          "http://localhost:3000/api/carpentry/allCarpentryService"
        );
        setServices(res.data.carpentry);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchServices();
  }, []);
  

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 px-20 bg-white min-h-screen">
      <h1 className="text-4xl text-center text-gray-900 font-extrabold mb-8">
      Carpentry Services
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-gray-100 text-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                    ₹{service.price}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold">{service.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                  <p className="text-gray-700 text-sm mt-2">
                    ⏳ <span className="font-semibold">{service.duration}</span>
                  </p>

                  <button
                    onClick={() => handleSubmit(service)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-2 rounded-lg font-semibold shadow-md"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-600 text-lg">
              No matching services found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Carpentry;
