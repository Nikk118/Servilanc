import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-gray-400">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div>
            <h2 className="text-2xl font-bold text-white">Servielliance</h2>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white">About us</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy policy</Link></li>
             
            </ul>
          </div>

          {/* For Customers */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-3">For customers</h3>
            <ul className="space-y-2">
              <li><Link to="/reviews" className="hover:text-white">Reviews</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact us</Link></li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h3 className="font-semibold text-lg text-white mb-3">For partners</h3>
            <ul className="space-y-2">
              <li><Link to="/register" className="hover:text-white">Register as a professional</Link></li>
            </ul>
          </div>
        </div>

        {/* Social & App Links */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-10">
          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 border rounded-full text-gray-400 hover:text-white hover:border-white transition">
              <FaTwitter className="text-xl" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 border rounded-full text-gray-400 hover:text-white hover:border-white transition">
              <FaFacebookF className="text-xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 border rounded-full text-gray-400 hover:text-white hover:border-white transition">
              <FaInstagram className="text-xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 border rounded-full text-gray-400 hover:text-white hover:border-white transition">
              <FaLinkedin className="text-xl" />
            </a>
          </div>

         
          
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-6">
          © 2025 Servielliance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
