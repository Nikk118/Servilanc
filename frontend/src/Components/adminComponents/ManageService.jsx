// src/pages/services/ManageService.jsx
import React, { useEffect, useState } from "react";
import { useServiceStore } from "../../store/useServiceStore";

function ManageService({ initialCategory }) {
  const {
    services,
    addService,
    removeService,
    fetchServices,
    updateService,
    isAddingService,
    isUpdatingService,
  } = useServiceStore();

  const [category, setCategory] = useState(initialCategory || ""); 
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    image_url: null,
    category: initialCategory || "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (services && services.length > 0) {
      const uniqueCategories = Array.from(
        new Set(services.map((s) => s.category))
      );
      setCategories(uniqueCategories);
    }
  }, [services]);

  const filteredServices = category
    ? services.filter((service) => service.category === category)
    : [];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image_url" ? files[0] : value,
    }));
  };

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      alert("Please enter a category");
      return;
    }

    const titleCaseCategory = toTitleCase(formData.category);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        formDataToSend.append(
          key,
          key === "category" ? titleCaseCategory : formData[key]
        );
      }
    });

    if (isUpdateMode) {
      await updateService(selectedServiceId, formDataToSend);
    } else {
      await addService(formDataToSend);
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      image_url: null,
      category: "",
    });
    setIsModalOpen(false);
    setIsUpdateMode(false);
    setCategory(titleCaseCategory); // auto-select the new category
    setIsAddingNewCategory(false);
  };

  const handleUpdateClick = (service) => {
    setIsUpdateMode(true);
    setSelectedServiceId(service._id);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration || "",
      image_url: null,
      category: service.category,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Category Selector */}
      <div className="mb-6">
        <label className="text-white font-semibold mr-2">Select Category:</label>
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={isAddingNewCategory ? "add-new" : category}
          onChange={(e) => {
            if (e.target.value === "add-new") {
              setIsAddingNewCategory(true);
              setFormData((prev) => ({ ...prev, category: "" }));
            } else {
              setIsAddingNewCategory(false);
              setCategory(e.target.value);
              setFormData((prev) => ({ ...prev, category: e.target.value }));
            }
          }}
        >
          <option value="">-- Select --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="add-new">+ Add New Category</option>
        </select>
      </div>

      <button
        onClick={() => {
          if (!category && !isAddingNewCategory) {
            alert("Select a category first or choose 'Add New Category'!");
            return;
          }
          setIsModalOpen(true);
          setIsUpdateMode(false);
          setFormData({
            name: "",
            description: "",
            price: "",
            duration: "",
            image_url: null,
            category: isAddingNewCategory ? "" : category,
          });
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-6 w-full sm:w-auto"
      >
        Add {isAddingNewCategory ? "New Service" : category || "Service"}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4 text-white">
              {isUpdateMode ? `Update Service` : `Add New Service`}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Category Field */}
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category (e.g., Salon, Plumbing)"
                className="p-2 rounded bg-gray-700 text-white w-full"
                required
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Service Name"
                className="p-2 rounded bg-gray-700 text-white w-full"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Service Description"
                className="p-2 rounded bg-gray-700 text-white w-full"
                required
              />
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Service Price"
                className="p-2 rounded bg-gray-700 text-white w-full"
                required
              />
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration (optional)"
                className="p-2 rounded bg-gray-700 text-white w-full"
              />
              {!isUpdateMode && (
                <input
                  type="file"
                  name="image_url"
                  onChange={handleChange}
                  className="p-2 rounded bg-gray-700 text-white w-full"
                  accept="image/*"
                />
              )}
              <button
                type="submit"
                className={`py-2 rounded text-white w-full ${
                  isAddingService || isUpdatingService
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isAddingService || isUpdatingService}
              >
                {isAddingService || isUpdatingService
                  ? "Processing..."
                  : isUpdateMode
                  ? "Update Service"
                  : "Add Service"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Services List */}
      {category && (
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Total {category} Services</h3>
          <ul className="space-y-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <li
                  key={service._id}
                  className="flex flex-wrap sm:flex-nowrap items-center bg-gray-800 p-4 rounded-lg shadow-lg gap-4"
                >
                  <img
                    src={service.image_url || "/default-service.jpg"}
                    alt={service.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white">{service.name}</h4>
                    <p className="text-gray-400">{service.description}</p>
                    <p className="text-gray-400">Price: ₹{service.price}</p>
                    {service.duration && <p className="text-gray-400">Duration: {service.duration}</p>}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleUpdateClick(service)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-all duration-300 text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => removeService(service._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-all duration-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-center">No {category} services available</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ManageService;
