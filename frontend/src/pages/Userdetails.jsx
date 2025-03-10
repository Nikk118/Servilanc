import React from "react";
import { useAuthStore } from "../store/useAuthStore";

function Userdetails() {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <p className="text-lg font-semibold animate-pulse">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border border-gray-300 text-gray-900 mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center flex items-center justify-center gap-2">
         User Profile
      </h2>

      <div className="space-y-4 text-lg">
        <p>
          <span className="font-semibold text-blue-600">Name:</span> {authUser.username || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-blue-600">Email:</span> {authUser.email || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-blue-600">Joined:</span>{" "}
          {new Date(authUser.createdAt).toLocaleDateString()}
        </p>
        <p className="flex items-center gap-2">
          <span className="font-semibold text-blue-600">Account Type:</span>
          <span className="bg-blue-500 px-4 py-1 rounded-full shadow-sm text-white text-sm font-medium">
            User
          </span>
        </p>
      </div>
    </div>
  );
}

export default Userdetails;
