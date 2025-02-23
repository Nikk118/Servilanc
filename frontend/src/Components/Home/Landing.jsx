import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>
      </div>

      {/* Title Section */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Surveillance Services
      </motion.h1>

      <motion.p
        className="text-lg text-gray-400 mb-10 text-center px-6 md:w-2/3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Your security, our priority. Protect your home, business, and loved ones with state-of-the-art surveillance technology.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="grid grid-cols-2 gap-6 md:flex md:gap-8 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.button
          onClick={() => navigate("/api/user/login")}
          className="relative px-6 py-3 rounded-xl text-lg font-semibold bg-blue-500 hover:bg-blue-600 shadow-lg transition-all transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Login as User
          <span className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl rounded-full"></span>
        </motion.button>

        <motion.button
          onClick={() => navigate("/login-professional")}
          className="relative px-6 py-3 rounded-xl text-lg font-semibold bg-green-500 hover:bg-green-600 shadow-lg transition-all transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Login as Professional
          <span className="absolute inset-0 bg-green-500 opacity-20 blur-3xl rounded-full"></span>
        </motion.button>

        <motion.button
          onClick={() => navigate("/api/admin/login")}
          className="relative px-6 py-3 rounded-xl text-lg font-semibold bg-red-500 hover:bg-red-600 shadow-lg transition-all transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Login as Admin
          <span className="absolute inset-0 bg-red-500 opacity-20 blur-3xl rounded-full"></span>
        </motion.button>

        <motion.button
          onClick={() => navigate("/api/user/signup")}
          className="relative px-6 py-3 rounded-xl text-lg font-semibold bg-purple-500 hover:bg-purple-600 shadow-lg transition-all transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
          <span className="absolute inset-0 bg-purple-500 opacity-20 blur-3xl rounded-full"></span>
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-6 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        &copy; 2025 Surveillance Services. All Rights Reserved.
      </motion.footer>
    </div>
  );
}
