import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalServices = ({ professionalCategory }) => {
  const [totalServices, setTotalServices] = useState(0);

  const fetchTotalServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/services/total");
      const filteredCount = response.data.filter(
        (service) => service.category === professionalCategory
      ).length;
      setTotalServices(filteredCount);
    } catch (error) {
      console.error("Error fetching total services:", error);
    }
  };

  useEffect(() => {
    fetchTotalServices();
    const interval = setInterval(fetchTotalServices, 5000);
    return () => clearInterval(interval);
  }, [professionalCategory]);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Total Services</h2>
      <div className="text-center text-4xl font-bold text-blue-400">{totalServices}</div>
    </div>
  );
};

export default TotalServices;
