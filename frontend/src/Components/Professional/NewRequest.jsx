import React, { useEffect, useState } from "react";
import axios from "axios";

const NewRequest = ({ category }) => {
  const [newRequests, setNewRequests] = useState([]);

  // Fetch new requests in real-time
  const fetchNewRequests = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/requests/new");
      const filteredRequests = response.data.filter(
        (request) => request.category === category
      );
      setNewRequests(filteredRequests);
    } catch (error) {
      console.error("Error fetching new requests:", error);
    }
  };

  useEffect(() => {
    fetchNewRequests();
    const interval = setInterval(fetchNewRequests, 5000);
    return () => clearInterval(interval);
  }, [category]);

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">New Requests</h2>
      {newRequests.length === 0 ? (
        <p className="text-gray-400">No new requests available.</p>
      ) : (
        <ul className="space-y-4">
          {newRequests.map((request) => (
            <li key={request._id} className="p-4 bg-gray-700 rounded-md">
              <h3 className="text-lg font-semibold">{request.service}</h3>
              <p className="text-gray-300">Customer: {request.customerName}</p>
              <p className="text-gray-300">Location: {request.location}</p>
              <p className="text-gray-300">Requested on: {new Date(request.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewRequest;
