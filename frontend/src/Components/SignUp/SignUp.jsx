import React, { useState } from "react";

export default function SignUpUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Submit the form or perform any action
    console.log("Form submitted", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <label className="block mb-2 text-left text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-xl"
          placeholder="Enter your name"
          required
        />

        <label className="block mb-2 text-left text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-xl"
          placeholder="Enter your email"
          required
        />

        <label className="block mb-2 text-left text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-xl"
          placeholder="Enter your password"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}