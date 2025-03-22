import React, { useState } from "react";
import ProfessionalSidebar from "../Components/Professional/SidebarProfessional";
import NewRequests from "../Components/Professional/NewRequest";
// import  from "../Components/Professional/AcceptedBookings";
import AcceptedServices from "../Components/Professional/AcceptedServices";
import CompletedServices from "../Components/Professional/CompletedServices";
import { useProfessionalStore } from "../store/useProfessionalStore";
import ProfessionalDashboard from "../Components/Professional/ProfessionalDashboard";
import Profile from "../Components/Professional/Profile";

function ProfessionalHome() {
  const { professionalLogout, authProfessional } = useProfessionalStore();
  const [selectedMenu, setSelectedMenu] = useState("Professional Dashboard");

  const renderContent = () => {
    switch (selectedMenu) {
      case "Professional Dashboard":
        return <ProfessionalDashboard/>;
      case "New Requests":
        return <NewRequests />;
      case "Accepted Services":
        return <AcceptedServices />;
      case "Completed Services":
        return <CompletedServices />;
      case "Profile":
        return <Profile/>
      default:
        return <ProfessionalDashboard/>;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-900 text-white">
      {/* Sidebar (Unchanged) */}
      <div className="w-full sm:w-1/4 md:w-1/5 bg-gray-800 h-screen shadow-lg">
        <ProfessionalSidebar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
      </div>
  
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Navbar */}
        <div className="bg-gray-800 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center shadow-lg border-b border-gray-700">
          <h2 className="text-base sm:text-lg font-bold text-blue-400 tracking-wide uppercase text-center sm:text-left">
            {selectedMenu}
          </h2>
  
          <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
            <div className="bg-gray-700 px-3 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 shadow-md">
              <span className="text-gray-300 text-xs sm:text-sm">Welcome,</span>
              <span className="text-sm sm:text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {authProfessional?.name || "Loading..."}
              </span>
              <span className="bg-green-500 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-white font-bold">
                Professional
              </span>
            </div>
  
            <button
              onClick={professionalLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition shadow-md"
            >
              Logout 🚀
            </button>
          </div>
        </div>
  
      {/* Page Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-full h-screen">

      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md w-full max-h-full overflow-y-auto break-words">

    {renderContent()}
  </div>
</div>

      </div>
    </div>
  );
  
  
  
  
}

export default ProfessionalHome;
