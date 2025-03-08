import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingServices = ({ professionalCategory }) => {
  const [pendingServices, setPendingServices] = useState([]);

  const fetchPendingServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/services/pending");
      const filteredServices = response.data.filter(
        (service) => service.category === professionalCategory
      );
      setPendingServices(filteredServices);
    } catch (error) {
      console.error("Error fetching pending services:", error);
    }
  };

  useEffect(() => {
    fetchPendingServices();
    const interval = setInterval(fetchPendingServices, 5000);
    return () => clearInterval(interval);
  }, [professionalCategory]);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Pending Services</h2>

      {pendingServices.length === 0 ? (
        <p className="text-gray-400">No pending services.</p>
      ) : (
        <div className="space-y-4">
          {pendingServices.map((service) => (
            <div key={service._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{service.customerName}</h3>
              <p className="text-gray-400">Service: {service.service}</p>
              <p className="text-gray-400">Location: {service.location}</p>
              <p className="text-gray-400 text-sm">Requested at: {new Date(service.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingServices;
