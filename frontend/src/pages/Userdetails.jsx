import React from "react";

function Userdetails() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      
      <div className="space-y-2 text-gray-700">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Phone:</strong> +91 9876543210</p>
        <p><strong>Joined:</strong> March 2024</p>
        <p><strong>Account Type:</strong> User</p>
      </div>
    </div>
  );
}

export default Userdetails;
