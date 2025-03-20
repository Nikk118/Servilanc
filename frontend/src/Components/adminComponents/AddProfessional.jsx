import React, { useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";

function AddProfessional() {

  const {isAddingProfessional,addProfessional}=useAdminStore()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    category: "Salon",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addProfessional(formData);
    setFormData({ name: "", email: "", password: "", phone: "", category: "Salon" });
   
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-900 text-white rounded-lg shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-center">Onboard a Professional</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Secure Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Contact Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
          required
        >
          <option value="Salon">Salon</option>
          <option value="Cleaner">Cleaner</option>
          <option value="Plumber">Plumber</option>
          <option value="Electrician">Electrician</option>
          <option value="PestControl">pestControl</option>
          <option value="Carpentry">Carpenty</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          disabled={isAddingProfessional}
        >
          {isAddingProfessional ? "Onboarding..." : "Onboard Professional"}
        </button>
      </form>
    </div>
  );
}

export default AddProfessional;