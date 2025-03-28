import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";

function UserCancelServices() {
  const { setAllUserCancelServices, allUserCancelServices  } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
      setAllUserCancelServices();
  }, [setAllUserCancelServices]);

  
  const filteredServices = (allUserCancelServices || []).filter((cancel) =>
    cancel?.user?.username?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white">User Cancelled Services</h2>

      <p className="text-gray-300 mb-2">Total Cancelled Services: <span className="font-bold text-yellow-400">{filteredServices.length}</span></p>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by user name..."
        className="mb-4 p-2 w-full rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredServices.length === 0 ? (
        <p className="text-gray-300">No user cancelled services found.</p>
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
                Reason: <span className="text-yellow-400 font-medium">{cancel.reason || "No reason provided"}</span>
              </p>
              <p className="text-gray-300">
                Cancelled By: <span className="text-red-400 font-medium">User</span>
              </p>
              <p className="text-gray-300">
                User: <span className="text-blue-400 font-medium">{cancel.user?.username || "Unknown"}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Cancelled At: {cancel.cancelledAt ? new Date(cancel.cancelledAt).toLocaleString() : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserCancelServices;