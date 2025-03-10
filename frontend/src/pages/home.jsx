import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedbackStore } from "../store/useFeedbackStore.js";
import { FaWrench, FaBroom, FaCut, FaPlus } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const { feedbacks, getFeedbacks, addFeedback } = useFeedbackStore();
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");

  // Fetch feedbacks when component mounts
  React.useEffect(() => {
    if (!feedbacks) {
      
      getFeedbacks();
    }
  }, [getFeedbacks]);

 

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    await addFeedback({comment});
    setComment("");
    setShowForm(false);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <header 
        className="relative h-[60vh] flex flex-col justify-center items-center bg-cover bg-center shadow-md"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1570993414854-047f3a2a6f68?auto=format&fit=crop&w=1920&q=80')` }}
      >
        <div className="bg-black bg-opacity-70 p-10 rounded-lg text-center shadow-xl max-w-2xl">
          <h2 className="text-5xl font-bold text-white">
            Premium Home Services at Your Fingertips
          </h2>
          <p className="text-gray-300 mt-4 text-lg leading-relaxed">
            Book trusted professionals instantly with ease.
          </p>
        </div>
      </header>

      {/* Services Section */}
      <section className="p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Service Cards */}
        {[{
          title: "Plumbing",
          icon: <FaWrench size={45} className="text-blue-400" />,
          image: "https://images.unsplash.com/photo-1543674892-7d64d45df18b?auto=format&fit=crop&w=1930&q=80",
          path: "/plumbing"
        },
        {
          title: "Cleaning",
          icon: <FaBroom size={45} className="text-blue-400" />,
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6959?auto=format&fit=crop&w=1930&q=80",
          path: "/cleaning"
        },
        {
          title: "Salon",
          icon: <FaCut size={45} className="text-blue-400" />,
          image: "https://images.unsplash.com/photo-1517940310602-7100e3b75da9?auto=format&fit=crop&w=1930&q=80",
          path: "/salon"
        }].map((service, index) => (
          <div key={index}
            className="relative w-full h-72 bg-cover bg-center rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            style={{ backgroundImage: `url('${service.image}')` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-6 text-center">
              {service.icon}
              <h3 className="text-3xl font-semibold mt-4 text-white">{service.title}</h3>
              <p className="text-gray-300 mt-3">
                Get expert professionals at your doorstep.
              </p>
              <button
                onClick={() => navigate(service.path)}
                className="mt-5 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-500 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Customer Feedback Section */}
      <section className="relative bg-gray-800 p-12 text-white">
  <h2 className="text-3xl font-bold text-center mb-6">Customer Feedback</h2>

  {/* Auto-scrolling feedback container */}
  <div className="overflow-hidden relative w-full">
  <div className="flex space-x-6 animate-scroll">
    {(feedbacks ?? []).length > 0 ? ( // Ensure feedbacks is always an array
      [...feedbacks, ...feedbacks].map((feedback, index) => ( // Duplicate for infinite scrolling
        <div 
  key={index} 
  className="bg-gray-700 bg-opacity-90 p-6 min-w-[300px] max-w-[350px] rounded-xl shadow-md"
>
<p 
  className="italic break-words"
  style={{
    wordBreak: "break-all", 
    overflowWrap: "break-word", 
    whiteSpace: "normal"
  }}
>
  "{feedback.comment}"
</p>

  <span className="block mt-4 text-blue-400 font-medium">
    - {feedback.user?.username || "Anonymous"}
  </span>
</div>

      ))
    ) : (
      <p className="text-gray-400">No feedback available yet.</p>
    )}
  </div>
</div>


  {/* Add Feedback Button */}
  <div className="text-center mt-8">
    <button
      className="px-6 py-3 flex items-center justify-center bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-500 transition"
      onClick={() => setShowForm(true)}
    >
      <FaPlus className="mr-2" /> Add Feedback
    </button>
  </div>

  {/* Feedback Form (Popup) */}
  {showForm && (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold mb-4 text-white">Leave a Feedback</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write your feedback here..."
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg mr-2 hover:bg-gray-500"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</section>


      {/* Footer */}
      <footer className="bg-black p-10 text-center text-gray-400 mt-10 shadow-xl">
        <p className="text-lg">&copy; {new Date().getFullYear()} Servielliance. All rights reserved.</p>
        <p className="mt-2 text-gray-500">Your trusted home service provider.</p>
      </footer>
    </div>
  );
}
