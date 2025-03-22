import React from 'react';
import { useProfessionalStore } from '../../store/useProfessionalStore';

function Profile() {
    const { authProfessional } = useProfessionalStore();
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 sm:px-10">
        <div className="w-full max-w-lg bg-gray-700 shadow-xl rounded-2xl overflow-hidden p-6 sm:p-10 text-center">
          
          {/* Profile Image / Initials */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-semibold text-gray-300">
              {authProfessional?.name?.charAt(0) || "P"}
            </div>
          </div>
    
          {/* Name & Category */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {authProfessional?.name || "Loading..."}
          </h2>
          <p className="text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg">
            {authProfessional?.category || "Professional"}
          </p>
    
          {/* Contact Details */}
          <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-lg">
            <p className="flex items-center justify-center gap-2 sm:gap-3 font-medium break-words">
              📧 <span className="truncate">{authProfessional?.email || "N/A"}</span>
            </p>
            <p className="flex items-center justify-center gap-2 sm:gap-3 font-medium">
              📞 <span>{authProfessional?.phone || "N/A"}</span>
            </p>
            <p className="text-gray-400 text-xs sm:text-md">
              Joined: {authProfessional?.createdAt ? new Date(authProfessional.createdAt).toLocaleDateString() : "N/A"}
            </p>
            <p className="text-gray-400 text-xs sm:text-md">
              Updated: {authProfessional?.updatedAt ? new Date(authProfessional.updatedAt).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>
      </div>
    );
    
}

export default Profile;
