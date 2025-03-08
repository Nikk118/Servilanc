import React, { useEffect, useState } from "react";
import axios from "axios";

const CompletedServices = ({ professionalCategory }) => {
  const [completedServices, setCompletedServices] = useState([]);

  const fetchCompletedServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/services/completed");
      const filteredServices = response.data.filter(
        (service) => service.category === professionalCategory
      );
      setCompletedServices(filteredServices);
    } catch (error) {
      console.error("Error fetching completed services:", error);
    }
  };

  useEffect(() => {
    fetchCompletedServices();
    const interval = setInterval(fetchCompletedServices, 5000);
    return () => clearInterval(interval);
  }, [professionalCategory]);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Completed Services</h2>

      {completedServices.length === 0 ? (
        <p className="text-gray-400">No completed services.</p>
      ) : (
        <div className="space-y-4">
          {completedServices.map((service) => (
            <div key={service._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{service.customerName}</h3>
              <p className="text-gray-400">Service: {service.service}</p>
              <p className="text-gray-400">Location: {service.location}</p>
              <p className="text-gray-400 text-sm">Completed at: {new Date(service.completedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedServices;
