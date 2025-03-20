import React, { useEffect, useState } from "react";
import { useSalonStore } from "../../store/useSalonStore";

function Salon() {
  const { services, addService, removeService, fetchServices, updateService, isAddingService, isupdatingService } = useSalonStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    image_url: null,
    category: "Salon",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image_url") {
      setFormData({ ...formData, image_url: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (isUpdateMode) {
      // If updating, call updateService
      await updateService(formDataToSend, selectedServiceId);
      console.log("here ")
    } else {
      // If adding a new service, call addService
      await addService(formDataToSend);
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      image_url: null,
      category: "Salon",
    });

    setIsModalOpen(false);
    setIsUpdateMode(false);
  };

  const handleUpdateClick = (service) => {
    setIsUpdateMode(true);
    setSelectedServiceId(service._id);
    console.log("here update")
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration || "",
      image_url: null,
      category: "Salon",
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => {
          setIsModalOpen(true);
          setIsUpdateMode(false);
          setFormData({ name: "", description: "", price: "", duration: "", image_url: null, category: "Salon" });
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-6"
      >
        Add Service
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4">{isUpdateMode ? "Update Salon Service" : "Add New Salon Service"}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Service Name" className="p-2 rounded bg-gray-700 text-white" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Service Description" className="p-2 rounded bg-gray-700 text-white" required></textarea>
              <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Service Price" className="p-2 rounded bg-gray-700 text-white" required />
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (optional)" className="p-2 rounded bg-gray-700 text-white" />
              <input type="file" name="image_url" onChange={handleChange} className="p-2 rounded bg-gray-700 text-white" accept="image/*" />

              <button
                type="submit"
                className={`py-2 rounded text-white ${isAddingService ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                disabled={isAddingService}

              >
                {isAddingService ? "Processing..." : isUpdateMode ? "Update Service" : "Add Service"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Total Salon Services</h3>
        <ul className="space-y-4">
          {services && services.length > 0 ? (
            services.map((service) => (
              <li key={service._id} className="flex items-center bg-gray-800 p-4 rounded-lg shadow-lg">

                {/* Service Image */}
                <img
                  src={service.image_url || "/default-salon.jpg"}
                  alt={service.name}
                  className="w-20 h-20 rounded-lg object-cover mr-4"
                />

                {/* Service Details */}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white">{service.name}</h4>
                  <p className="text-gray-400">{service.description}</p>
                  <p className="text-gray-400">Price: ${service.price}</p>
                  {service.duration && (
                    <p className="text-gray-400">Duration: {service.duration}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleUpdateClick(service)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-all duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => removeService(service._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-all duration-300"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center">No salon services available</p>
          )}
        </ul>
      </div>

    </div>
  );
}

export default Salon;
