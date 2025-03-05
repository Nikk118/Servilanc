import React from "react";
import { useAuthStore } from "../store/useAuthStore";

function Userdetails() {
  const { authUser } = useAuthStore();

  console.log("user", authUser); // ✅ Move outside JSX

  if (!authUser) {
    return <p>Loading user details...</p>; // Handle cases where user data is not yet loaded
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">User Details</h2>

      <div className="space-y-2 text-gray-700">
        <p><strong>Name:</strong> {authUser.username || "N/A"}</p>
        <p><strong>Email:</strong> {authUser.email || "N/A"}</p>
        <p><strong>Joined:</strong> {new Date(authUser.createdAt).toLocaleDateString()}</p>
        <p><strong>Account Type:</strong> User</p>
      </div>
    </div>
  );
}

export default Userdetails;
