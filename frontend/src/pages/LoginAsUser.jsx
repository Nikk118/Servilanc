import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore"; // Import Zustand store
import { motion } from "framer-motion";

export default function LoginUser() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login, isLogin } = useAuthStore(); // Zustand store


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <motion.div
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">
          User Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLogin} // Disable button during login
          >
            {isLogin ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <span
              className="text-purple-500 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            login as others?{" "}
            <span
              className="text-purple-500 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              LandingPage
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
