import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";

function ProfessionalServicesCanceled() {
  const { setAllCancelServices, allProfessionlCancelServices = [] } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    const fetchCanceledServices = async () => {
      await setAllCancelServices();
    };

    fetchCanceledServices();
  }, [setAllCancelServices]);

  // 🔍 Filter the cancelled services based on the professional's name
  const filteredServices = allProfessionlCancelServices.filter((cancel) =>
    cancel.professional?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white">Cancelled Services</h2>

      {/* 🔎 Search Input */}
      <input
        type="text"
        placeholder="Search by professional name..."
        className="mb-4 p-2 w-full rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredServices.length === 0 ? (
        <p className="text-gray-300">No cancelled services found.</p>
      ) : (
        <div className="space-y-4">
          {filteredServices.map((cancel) => (
            <div
              key={cancel._id}
              className="border border-gray-700 p-4 rounded-lg shadow-md bg-gray-800"
            >
              <h3 className="text-lg font-semibold text-white">
                Service: {cancel.service?.name || "N/A"}
              </h3>
              <p className="text-gray-300">
                Reason: <span className="text-yellow-400 font-medium">{cancel.reason}</span>
              </p>
              <p className="text-gray-300">
                Cancelled By: <span className="text-blue-400 font-medium">{cancel.cancelledBy}</span>
              </p>
              <p className="text-gray-300">
                Professional: <span className="text-green-400 font-medium">{cancel.professional?.name || "Unknown"}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Cancelled At: {new Date(cancel.cancelledAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfessionalServicesCanceled;
