import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedbackStore } from "../store/useFeedbackStore.js";

import { FaWrench, FaBroom, FaCut, FaPlus,FaBug,FaHammer,FaBolt } from "react-icons/fa";
import OurProfessional from "../Components/homepage/OurProfessional.jsx";

export default function Home() {
  const navigate = useNavigate();
  const { feedbacks, getFeedbacks, addFeedback,isAddingFeedback } = useFeedbackStore();
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  


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
    <div className="bg-gray-900 text-gray-100 min-h-screen pt-20">
      {/* Hero Section */}
      <header 
        className="relative h-[50vh] sm:h-[60vh] flex flex-col justify-center items-center bg-cover bg-center shadow-md"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1570993414854-047f3a2a6f68?auto=format&fit=crop&w=1920&q=80')` }}
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
  
      {/* Services Section */}
      <section className="p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
        {/* Service Cards */}
        {[
          {
            title: "Plumbing",
            icon: <FaWrench size={40} className="text-blue-400" />,
            image: "https://images.unsplash.com/photo-1543674892-7d64d45df18b?auto=format&fit=crop&w=1930&q=80",
            path: "/plumbing"
          },
          {
            title: "Cleaning",
            icon: <FaBroom size={40} className="text-blue-400" />,
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6959?auto=format&fit=crop&w=1930&q=80",
            path: "/cleaning"
          },
          {
            title: "Salon",
            icon: <FaCut size={40} className="text-blue-400" />,
            image: "https://images.unsplash.com/photo-1517940310602-7100e3b75da9?auto=format&fit=crop&w=1930&q=80",
            path: "/salon"
          },
          {
            title: "Electrician",
            icon: <FaBolt size={40} className="text-yellow-400" />,
            image: "https://images.unsplash.com/photo-1581090464774-0e04a9e883dc?auto=format&fit=crop&w=1930&q=80",
            path: "/electrician"
          },
          {
            title: "Carpentry",
            icon: <FaHammer size={40} className="text-brown-600" />,
            image: "https://images.unsplash.com/photo-1571175443142-7af255b11de7?auto=format&fit=crop&w=1930&q=80",
            path: "/carpentry"
          },
          {
            title: "Pest Control",
            icon: <FaBug size={40} className="text-red-500" />,
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1930&q=80",
            path: "/pest control"
          }
        ].map((service, index) => (
          <div key={index}
            className="relative w-full h-64 sm:h-72 bg-cover bg-center rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            style={{ backgroundImage: `url('${service.image}')` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-4 sm:p-6 text-center">
              {service.icon}
              <h3 className="text-2xl sm:text-3xl font-semibold mt-2 sm:mt-4 text-white">
                {service.title}
              </h3>
              <p className="text-gray-300 mt-2 sm:mt-3 text-sm sm:text-base">
                Get expert professionals at your doorstep.
              </p>
              <button
                onClick={() => navigate(service.path)}
                className="mt-4 sm:mt-5 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-lg font-medium rounded-lg hover:bg-blue-500 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </section>
  
      <OurProfessional />
  
      {/* Customer Feedback Section */}
      <section className="bg-gray-800 p-4 sm:p-6 md:p-8 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          Customer Feedback
        </h2>
  
        {/* Auto-scrolling feedback container */}
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
  
        {/* Feedback Form (Popup) */}
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
                  name="comment"
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
                    {isAddingFeedback?"Submitting...":"Submit"}
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
