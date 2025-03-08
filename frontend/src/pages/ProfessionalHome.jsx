import React, { useState } from "react";
import ProfessionalSidebar from "../Components/Professional/SidebarProfessional";
import NewRequests from "../Components/Professional/NewRequest";
import PendingServices from "../Components/Professional/PendingServices";
import CompletedServices from "../Components/Professional/CompletedServices";
import TotalServices from "../Components/Professional/TotalServices";
import { useProfessionalStore } from "../store/useProfessionalStore";

function ProfessionalHome() {
  const { professionalLogout, authProfessional } = useProfessionalStore();
  const [selectedMenu, setSelectedMenu] = useState("New Requests");

  const renderContent = () => {
    switch (selectedMenu) {
      case "New Requests":
        return <NewRequests />;
      case "Pending Services":
        return <PendingServices />;
      case "Completed Services":
        return <CompletedServices />;
      case "Total Services":
        return <TotalServices />;
      default:
        return <NewRequests />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 min-h-screen shadow-lg">
        <ProfessionalSidebar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
      </div>

      {/* Main Content */}
      <div className="w-4/5 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-800 px-6 py-4 flex justify-between items-center shadow-lg border-b border-gray-700">
          <h2 className="text-lg font-bold text-blue-400 tracking-wide uppercase">{selectedMenu}</h2>
          
          <div className="flex items-center gap-4">
            <div className="bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
              <span className="text-gray-300 text-sm">Welcome,</span>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {authProfessional.username}
              </span>
              <span className="bg-green-500 text-xs px-2 py-1 rounded-full text-white font-bold">Professional</span>
            </div>
            
            <button
              onClick={professionalLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-md"
            >
              Logout 🚀
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalHome;
