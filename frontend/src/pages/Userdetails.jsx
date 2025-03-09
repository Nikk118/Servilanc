import React from "react";
import { useAuthStore } from "../store/useAuthStore";

function Userdetails() {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg font-semibold animate-pulse">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 text-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">
        👤 User Profile
      </h2>

      <div className="space-y-3 text-gray-300 text-md">
        <p>
          <span className="font-semibold text-blue-400">Name:</span> {authUser.username || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-blue-400">Email:</span> {authUser.email || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-blue-400">Joined:</span> {new Date(authUser.createdAt).toLocaleDateString()}
        </p>
        <p className="flex items-center gap-2">
          <span className="font-semibold text-blue-400">Account Type:</span>
          <span className="bg-blue-600 px-3 py-1 rounded-md shadow-sm text-white text-sm">
            User
          </span>
        </p>
      </div>

      <button className="mt-5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2 rounded-md transition shadow-md hover:scale-105 w-full">
        Edit Profile
      </button>
    </div>
  );
}

export default Userdetails;
