import React, { useEffect, useState } from "react";
import { useElectricianStore } from "../store/useElectricianStore";

function Electrician() {
  const {
    services,
    addService,
    removeService,
    fetchServices,
    isAddingService,
  } = useElectricianStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    image_url: "",
    category: "Electrician",
  });

  useEffect(() => {
    
    fetchServices()

  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "image_url" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate price input
    if (isNaN(formData.price) || formData.price < 0) {
      alert("Please enter a valid price.");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    await addService(formDataToSend);
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      image_url: "",
      category: "Electrician",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-6"
      >
        Add Service
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          aria-hidden="true"
        >
          <div className="bg-gray-800 p-6 rounded-lg w-96 relative">
            {!isAddingService && (
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
              >
                ✕
              </button>
            )}

            <h3 className="text-xl font-semibold mb-4">
              Add New Electrician Service
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Service Name"
                className="p-2 rounded bg-gray-700 text-white"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Service Description"
                className="p-2 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Service Price"
                className="p-2 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration (optional)"
                className="p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="file"
                name="image_url"
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white"
                accept="image/*"
                required
              />

              <button
                type="submit"
                className={`py-2 rounded text-white ${
                  isAddingService
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isAddingService}
              >
                {isAddingService ? "Adding..." : "Add Service"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">
          Total Electrician Services
        </h3>
        <ul className="space-y-4">
          {console.log("log1",services)}
          {services && services.length > 0 ? (
            services.map((service) => (
              <li
                key={service._id}
                className="flex justify-between items-center bg-gray-800 p-4 rounded"
              >
                <div>
                  <h4 className="text-lg font-semibold">{service.name}</h4>
                  <p className="text-gray-400">{service.description}</p>
                  <p className="text-gray-400">Price: ${service.price}</p>
                  {service.duration && (
                    <p className="text-gray-400">
                      Duration: {service.duration}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeService(service._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center">
              No Electrician services available
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Electrician;
