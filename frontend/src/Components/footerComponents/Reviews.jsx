import React, { useEffect } from "react";
import { useFeedbackStore } from "../../store/useFeedbackStore";

function Reviews() {
  const { allFeedback, getAllFeedback } = useFeedbackStore();

  useEffect(() => {
    getAllFeedback();
  }, [getAllFeedback]);

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

        {allFeedback === null ? (
          <p className="text-gray-600">Loading reviews...</p>
        ) : allFeedback.length === 0 ? (
          <p className="text-gray-600">No reviews available.</p>
        ) : (
          <div className="max-h-[500px] overflow-y-auto space-y-6 p-2 border border-gray-300 rounded-lg">
            {allFeedback.map((feedback) => (
              <div key={feedback._id} className="bg-white shadow-lg rounded-lg p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-800">
                  {feedback.user.username}
                </h3>
                <p className="text-gray-600 mt-2">"{feedback.comment}"</p>
                <p className="text-gray-400 text-sm mt-2">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Reviews;
