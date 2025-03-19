import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-600 hover:underline text-lg font-medium">
        Go to Home
      </Link>
    </div>
  );
}
