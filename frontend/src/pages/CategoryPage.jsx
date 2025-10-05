import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useServiceStore } from "../store/useServiceStore.js";
import { useBookingStore } from "../store/useBookingStore.js";

export default function CategoryPage() {
  const { category } = useParams(); // URL param
  const navigate = useNavigate();
  const { services, fetchServices } = useServiceStore();
  const { setSelectedService } = useBookingStore();
  const [categoryServices, setCategoryServices] = useState([]);

  const toSlug = (text) => text.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    if (!services || services.length === 0) fetchServices();
  }, [fetchServices, services]);

  useEffect(() => {
    const filtered = services.filter(
      (s) => toSlug(s.category) === category.toLowerCase()
    );
    setCategoryServices(filtered);
  }, [category, services]);

  // Loading state
  if (!services || services.length === 0)
    return <p className="text-white text-center mt-20">Loading services...</p>;

  const handleBooking = (service) => {
    setSelectedService(service);
    navigate("/booking");
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-900 text-white">
      <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-center">
        {category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Services
      </h1>

      {categoryServices.length === 0 ? (
        <p className="text-gray-400 text-center mt-20 text-lg">
          No services available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryServices.map((service) => (
            <div
              key={service._id}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              <img
                src={service.image_url || "/default-service.jpg"}
                alt={service.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold">{service.name}</h2>
                <p className="text-gray-300 mt-2">{service.description || "Get expert professionals at your doorstep."}</p>
                <p className="text-blue-400 mt-2 font-medium">Price: ₹{service.price}</p>
                {service.duration && (
                  <p className="text-blue-400 mt-1 font-medium">Duration: {service.duration} mins</p>
                )}
                <button
                  onClick={() => handleBooking(service)}
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
