import { useState } from "react";
import { useRegistersStore } from "../../store/useRegistersStore";
import { CheckCircle } from "lucide-react";

const JoinUs = () => {
  const [submitted,setSubmitted]=useState(false)
    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
  });

  const {createRegister}=useRegistersStore()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createRegister(formData);
    setSubmitted(true)
    setFormData(
      {
        fullName: "",
        email: "",
        phone: "",
        category: "",
      }
    )
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 pt-30">
       {submitted ? (
        <div className="text-center p-6 bg-green-100 border border-green-300 rounded-lg">
          <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            Thank You for Registering!
          </h2>
          <p className="text-gray-600 mt-2">
            Your registration was successful. Our team will contact you soon.
          </p>
        </div>
      ) : (
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg border border-gray-300"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Join Us!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Fill in your details to become a part of our community.
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Phone Number (No Country Code) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Salon">Salon</option>
            <option value="Plumber">Plumber</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpentry">Carpentry</option>
            <option value="PestControl">PestControl</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Join Us
        </button>
      </form>)}
    </div>
  );
};

export default JoinUs;
