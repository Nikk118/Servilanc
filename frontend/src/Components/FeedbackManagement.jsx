import React, { useEffect } from "react";
import { useFeedbackStore } from "../store/useFeedbackStore";
import toast from "react-hot-toast";

const FeedbackManagement = () => {
  const { allFeedback, getAllFeedback, deleteFeedback } = useFeedbackStore();

  useEffect(() => {
    getAllFeedback();
  }, [getAllFeedback]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      await deleteFeedback(id);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Feedback Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {allFeedback?.map((feedback) => (
              <tr key={feedback._id} className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {feedback.user?.username || "Anonymous"}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-200">
                  {feedback.comment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(feedback._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackManagement;