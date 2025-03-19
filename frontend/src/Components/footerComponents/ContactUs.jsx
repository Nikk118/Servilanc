import React, { useState } from "react";
import { useContactStore } from "../../store/useContactStore";
import { CheckCircle } from "lucide-react";

function ContactUs() {
  const [submitted,setSubmitted]=useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const {createContact}=useContactStore()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(formData);
    setSubmitted(true)

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
  });
  };

  return (
    <section className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg pt-30">
      {submitted ? (
        <div className="text-center p-6 bg-green-100 border border-green-300 rounded-lg">
          <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            Thank You for Message!
          </h2>
          <p className="text-gray-600 mt-2">
           Our team will contact you soon.
          </p>
        </div>
      ) : (
        <>
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Contact Us
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-medium">Enter Phone Number</label>
          <div className="flex">
            
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 font-medium">Enter Message</label>
          <textarea
            name="message"
            rows="4"
            placeholder="Enter message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-medium py-3 rounded-lg hover:bg-purple-700 transition duration-300"
          >
          Submit
        </button>
      </form>
      </>
      )}
    </section>
  );
}

export default ContactUs;
