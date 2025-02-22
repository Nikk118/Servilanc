import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginUser() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
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
      const response = await axios.post('http://localhost:3000/api/user/login', formData);
      if (response.status === 200) {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">User Login</h2>

        {error && (
          <div className="mb-4 text-red-500 text-left">{error}</div>
        )}

        <label className="block mb-2 text-left text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-xl"
          placeholder="Enter your username"
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
          Login
        </button>
      </form>
    </div>
  );
}
