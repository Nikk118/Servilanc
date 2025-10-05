import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useServiceStore } from "../store/useServiceStore.js";
import { useFeedbackStore } from "../store/useFeedbackStore.js";
import { FaPlus } from "react-icons/fa";
import OurProfessional from "../Components/homepage/OurProfessional.jsx";

export default function Home() {
  const navigate = useNavigate();
  const { services, fetchServices } = useServiceStore();
  const { feedbacks, getFeedbacks, addFeedback, isAddingFeedback } = useFeedbackStore();

  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");

  // Fetch services and feedbacks
  useEffect(() => {
    if (!services || services.length === 0) fetchServices();
    getFeedbacks();
  }, [fetchServices, getFeedbacks, services]);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = [...new Set(services.map((s) => s.category))];
    setCategories(uniqueCategories);
  }, [services]);

  const toSlug = (text) => text.toLowerCase().replace(/\s+/g, "-");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    await addFeedback({ comment });
    setComment("");
    setShowForm(false);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen pt-20">
      {/* Hero Section */}
      <header
        className="relative h-[50vh] sm:h-[60vh] flex flex-col justify-center items-center bg-cover bg-center shadow-md"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1570993414854-047f3a2a6f68?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="bg-black bg-opacity-70 p-6 sm:p-10 rounded-lg text-center shadow-xl max-w-lg sm:max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            Premium Home Services at Your Fingertips
          </h2>
          <p className="text-gray-300 mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed">
            Book trusted professionals instantly with ease.
          </p>
        </div>
      </header>

      {/* Categories Section */}
      <section className="p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div
              key={index}
              className="relative w-full h-64 sm:h-72 bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex flex-col justify-center items-center p-4"
            >
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                {category}
              </h3>
              <button
                onClick={() => navigate(`/category/${toSlug(category)}`)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-lg font-medium rounded-lg hover:bg-blue-500 transition"
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">No categories available yet.</p>
        )}
      </section>

      <OurProfessional />

      {/* Customer Feedback Section */}
      <section className="bg-gray-800 p-4 sm:p-6 md:p-8 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          Customer Feedback
        </h2>

        <div className="overflow-hidden relative w-full">
          <div className="flex space-x-4 sm:space-x-6 animate-scroll">
            {(feedbacks ?? []).length > 0 ? (
              [...feedbacks].map((feedback, index) => (
                <div
                  key={index}
                  className="bg-gray-700 bg-opacity-90 p-4 sm:p-6 min-w-[250px] sm:min-w-[300px] max-w-[350px] rounded-xl shadow-md"
                >
                  <p className="italic break-words text-sm sm:text-base">
                    "{feedback.comment}"
                  </p>
                  <span className="block mt-3 sm:mt-4 text-blue-400 font-medium text-sm sm:text-base">
                    - {feedback.user?.username || "Anonymous"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No feedback available yet.</p>
            )}
          </div>
        </div>

        {/* Add Feedback Button */}
        <div className="text-center mt-6 sm:mt-8">
          <button
            className="px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center bg-blue-600 text-white text-sm sm:text-lg font-medium rounded-lg hover:bg-blue-500 transition"
            onClick={() => setShowForm(true)}
          >
            <FaPlus className="mr-2" /> Add Feedback
          </button>
        </div>

        {/* Feedback Form Popup */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4">
            <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
                Leave a Feedback
              </h3>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="w-full p-2 sm:p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Write your feedback here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-3 sm:mt-4">
                  <button
                    type="button"
                    className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg mr-2 hover:bg-gray-500"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                  >
                    {isAddingFeedback ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
