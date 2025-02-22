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
        {[
          { label: "Login as User", color: "blue-500", path: "/login-user" },
          { label: "Login as Professional", color: "green-500", path: "/login-professional" },
          { label: "Login as Admin", color: "red-500", path: "/login-admin" },
          { label: "Sign Up", color: "purple-500", path: "/signup" },
        ].map((button, index) => (
          <motion.button
            key={index}
            onClick={() => navigate(button.path)}
            className={`relative px-6 py-3 rounded-xl text-lg font-semibold bg-${button.color} hover:bg-opacity-80 shadow-lg transition-all transform hover:scale-105`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {button.label}
            {/* Glow Effect */}
            <span className={`absolute inset-0 bg-${button.color} opacity-20 blur-3xl rounded-full`}></span>
          </motion.button>
        ))}
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
