import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function LoginAsAdmin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/login",
        formData
      );
      if (response.status === 200) {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}

        <label className="block mb-2 text-left text-gray-400">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring focus:ring-[#ff4c29]"
          placeholder="Enter admin username"
          required
        />

        <label className="block mb-2 text-left text-gray-400">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring focus:ring-[#ff4c29]"
          placeholder="Enter password"
          required
        />

        <motion.button
          type="submit"
          className="w-full bg-[#ff4c29] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#e04325] transition-all duration-200 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
}
