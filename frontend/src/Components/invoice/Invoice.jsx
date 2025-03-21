import React from "react";

const Invoice = ({ service, price, date, time, status, transactionId, paymentStatus }) => {
  const isValidTransaction = transactionId && transactionId !== "N/A";
  const paymentMethod = isValidTransaction ? "Online" : "Offline";

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-300 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Invoice</h2>
      <hr className="mb-4 border-gray-400" />

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Service:</span> {service || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {date || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Time:</span> {time || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Booking Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-lg text-sm font-semibold ${
              status === "Completed"
                ? "bg-green-100 text-green-600"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-600"
                : status === "Cancelled"
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {status || "N/A"}
          </span>
        </p>

        <p>
          <span className="font-semibold">Payment Status:</span> {paymentStatus || "N/A"}
        </p>

        <p>
          <span className="font-semibold">Payment Method:</span> {paymentMethod}
        </p>

        {isValidTransaction && (
          <p>
            <span className="font-semibold">Transaction ID:</span> {transactionId}
          </p>
        )}

        <hr className="my-4 border-gray-400" />

        <p className="text-lg font-semibold">
          Total Amount: <span className="text-blue-600">₹{price || 0}</span>
        </p>

        <p className="text-sm text-center text-gray-500 mt-4 italic">
          Thank you for using Servielliance! We appreciate your business.
        </p>
      </div>

      <button
        onClick={() => window.print()}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-all shadow-md"
      >
        Print Invoice
      </button>
    </div>
  );
};

export default Invoice;
