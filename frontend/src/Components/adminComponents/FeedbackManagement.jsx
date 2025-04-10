import React, { useEffect, useState } from "react";
import { useFeedbackStore } from "../../store/useFeedbackStore";

const FeedbackManagement = () => {
  const { allFeedback, getAllFeedback, deleteFeedback } = useFeedbackStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // loading state
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllFeedback();
      setLoading(false);
    };
    fetchData();
  }, [getAllFeedback]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      await deleteFeedback(id);
    }
  };

  const totalPages = Math.ceil((allFeedback?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFeedback = allFeedback?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Feedback Management</h2>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center text-gray-300 text-lg">Loading...</div>
      ) : allFeedback?.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-6">No feedback available.</div>
      ) : (
        <>
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
                {paginatedFeedback.map((feedback) => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-4 py-2 bg-gray-700 text-white rounded">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackManagement;
