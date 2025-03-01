import React, { useEffect, useState } from "react";
import { axiosInstant } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

function Salon() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosInstant.get("http://localhost:3000/api/salon/allSalonService");
        setServices(res.data.salon); 
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="py-10 px-5 bg-gray-100">
      <h1 className="text-4xl text-center text-black mb-10 font-semibold">
        Available Salon services:
      </h1>

      <div className="min-h-[80vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-100">
        {services.length > 0 ? (
          services.map((service) => (
            
            <div
            key={service._id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105"
          >
            {/* Image First */}
            <img
              src={service.image_url}
              alt={service.name}
              className="w-full h-48 object-cover"
            />

            {/* Service Details */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">{service.name}</h2>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-sm text-gray-500 mt-1">{service.duration}</p>
              <p className="text-lg font-bold text-green-600 mt-2">₹{service.price}</p>
              <button
  onClick={() => navigate("/booking", { state: { service } })}
  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
>
  Book Now
</button>;
             
            </div>
          </div>
          ))
        ) : (
          <p className="col-span-4 text-center">No services available</p>
        )}
      </div>
    </div>
  );
}

export default Salon;
