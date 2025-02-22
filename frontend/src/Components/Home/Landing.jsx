import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-sm text-center space-y-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Our Service</h1>
        <div className="space-y-3">
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600"
            onClick={() => navigate('/api/user/login')}
          >
            Login as User
          </button>
          <button
            className="w-full bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600"
            onClick={() => navigate('/login-professional')}
          >
            Login as Professional
          </button>
          <button
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-xl hover:bg-yellow-600"
            onClick={() => navigate('/login-admin')}
          >
            Login as Admin
          </button>
        </div>
        <hr className="my-4" />
        <button
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-xl hover:bg-purple-600"
          onClick={() => navigate('/signup-user')}
        >
          Sign Up as User
        </button>
      </div>
    </div>
  );
}
