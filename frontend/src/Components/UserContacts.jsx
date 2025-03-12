import React, { useEffect } from "react";
import { useContactStore } from "../store/useContactStore.js";

function UserContacts() {
  const { getContact, contacts, deleteContact } = useContactStore();

  useEffect(() => {
    getContact();
  }, []);

  const handleDelete = (id) => {
    deleteContact(id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg w-full max-w-5xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          User Messages
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Full Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(contacts) && contacts.length > 0 ? (
                [...contacts]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sorting by newest first
                  .map((contact, index) => (
                    <tr key={contact.id || index} className="text-gray-800">
                      <td className="p-3 border text-center">{index + 1}</td>
                      <td className="p-3 border">{contact.fullName}</td>
                      <td className="p-3 border">{contact.email}</td>
                      <td className="p-3 border">{contact.phone}</td>
                      <td className="message-column p-3 border">{contact.message}</td>

                      <td className="p-3 border text-center">
                        <button
                          onClick={() => handleDelete(contact._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-500">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserContacts;
