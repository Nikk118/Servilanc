import React from "react";
import { useAuthStore } from "../store/useAuthStore";

function UserDetails() {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
        <p className="text-lg font-semibold animate-pulse">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white pt-20">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-gray-900">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold rounded-full shadow">
            {authUser.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">User Profile</h2>
        </div>
  
        {/* User Details */}
        <div className="mt-6 space-y-5 text-lg">
          <p>
            <span className="font-semibold text-gray-700">Name:</span> {authUser.username || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Email:</span> {authUser.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Joined:</span>{" "}
            {new Date(authUser.createdAt).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Account Type:</span>
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full shadow-sm text-sm font-semibold border border-blue-400">
              User
            </span>
          </p>
        </div>
  
      </div>
    </div>
  );
  
}

export default UserDetails;
