import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfessionalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
    phone: "",
    profilePicture: null,
  });

  const [professionals, setProfessionals] = useState([]);

  // Fetch professionals in real-time
  const fetchProfessionals = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/professionals");
      setProfessionals(response.data);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  };

  useEffect(() => {
    fetchProfessionals();
    const interval = setInterval(fetchProfessionals, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("profilePicture", formData.profilePicture);

    try {
      await axios.post("http://localhost:5000/api/professionals/register", formDataToSend);
      fetchProfessionals(); // Refresh professionals list
      setFormData({ name: "", email: "", password: "", category: "", phone: "", profilePicture: null });
    } catch (error) {
      console.error("Error registering professional:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Professional Registration</h1>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 bg-gray-700 rounded focus:outline-none" required />

        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 bg-gray-700 rounded focus:outline-none" required />

        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-3 bg-gray-700 rounded focus:outline-none" required />

        {/* Category Dropdown */}
        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded focus:outline-none" required>
          <option value="">Select Category</option>
          <option value="Salon">Salon</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Cleaning">Cleaning</option>
        </select>

        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-3 bg-gray-700 rounded focus:outline-none" required />

        <input type="file" name="profilePicture" onChange={handleChange} className="w-full p-3 bg-gray-700 rounded focus:outline-none" accept="image/*" required />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded">Register</button>
      </form>

      {/* Display Professionals */}
      <h2 className="text-2xl font-bold mt-8">Registered Professionals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {professionals.map((prof) => (
          <div key={prof._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            {prof.profilePicture && <img src={`data:image/png;base64,${prof.profilePicture}`} alt="Profile" className="w-16 h-16 rounded-full mx-auto mb-2" />}
            <h3 className="text-lg font-semibold">{prof.name}</h3>
            <p className="text-gray-400">{prof.category}</p>
            <p className="text-gray-400">{prof.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalForm;

