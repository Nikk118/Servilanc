import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { FaWrench, FaBroom, FaCut } from "react-icons/fa";


export default function Home() {
  
    const navigate=useNavigate()
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      

      {/* Hero Section */}
      <header className="relative bg-cover bg-center h-[50vh] flex flex-col justify-center items-center" style={{ backgroundImage: "url('hero-bg.jpg')" }}>
        <div className="bg-black bg-opacity-60 p-8 rounded-lg text-center">
          <h2 className="text-5xl font-bold">Premium Home Services at Your Fingertips</h2>
          <p className="text-gray-300 mt-4 text-lg">Book trusted professionals instantly with ease.</p>
        </div>
      </header>

      {/* Services Section */}
      <section className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  
  {/* Plumbing Service */}
  <div className="relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition">
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-6">
      <FaWrench size={40} className="text-blue-400" />
      <h3 className="text-2xl font-semibold mt-4">Plumbing</h3>
      <p className="text-gray-300 mt-2 text-center">Get expert plumbers for all your needs.</p>
      <button onClick={()=>navigate("/plumbing")} className="mt-4 px-5 py-3 bg-blue-500 text-lg rounded-xl hover:bg-blue-600 transition">
        Book Now
      </button>
    </div>
    <img src="/images/plumbing.jpg" alt="Plumbing" className="w-full h-64 object-cover" />
  </div>

  {/* Cleaning Service */}
  <div className="relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition">
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-6">
      <FaBroom size={40} className="text-blue-400" />
      <h3 className="text-2xl font-semibold mt-4">Cleaning</h3>
      <p className="text-gray-300 mt-2 text-center">Top-rated cleaners for your home and office.</p>
      <button onClick={()=>navigate("/cleaning")} className="mt-4 px-5 py-3 bg-blue-500 text-lg rounded-xl hover:bg-blue-600 transition">
        Book Now
      </button>
    </div>
    <img src="/images/cleaning.jpg" alt="Cleaning" className="w-full h-64 object-cover" />
  </div>

  {/* Salon Service */}
  <div className="relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition">
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-6">
      <FaCut size={40} className="text-blue-400" />
      <h3 className="text-2xl font-semibold mt-4">Salon</h3>
      <p className="text-gray-300 mt-2 text-center">Beauty & grooming services at your doorstep.</p>
      <button  onClick={()=>navigate("/salon")}className="mt-4 px-5 py-3 bg-blue-500 text-lg rounded-xl hover:bg-blue-600 transition">
        Book Now
      </button>
    </div>
    <img src="/images/salon.jpg" alt="Salon" className="w-full h-64 object-cover" />
  </div>

      </section>


      {/* Customer Feedback */}
      <section className="p-10">
        <h2 className="text-3xl font-bold text-center">Customer Feedback</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Great service! The plumber was on time and fixed everything perfectly.",
            "Loved the salon service. It felt like a luxury spa at home!",
            "The cleaning professionals did an amazing job. Highly recommended!"].map((feedback, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-md">
              <p className="text-gray-300">"{feedback}"</p>
              <span className="block mt-2 text-blue-400">- Customer {index + 1}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 p-8 text-center text-gray-400 mt-10">
        <p>&copy; {new Date().getFullYear()} Servielliance. All rights reserved.</p>
        <p className="mt-2">Your trusted home service provider.</p>
      </footer>
    </div>
  );
}