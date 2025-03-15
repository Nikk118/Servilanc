import React from 'react';
import { useProfessionalStore } from '../../store/useProfessionalStore';

function Profile() {
    const { authProfessional } = useProfessionalStore();
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-10">
        <div className="w-full max-w-lg bg-gray-700 shadow-xl rounded-2xl overflow-hidden p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center text-3xl font-semibold text-gray-300">
              {authProfessional.name.charAt(0)}
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">{authProfessional.name}</h2>
          <p className="text-gray-400 mb-6 text-lg">{authProfessional.category}</p>
          <div className="space-y-4 text-gray-300 text-lg">
            <p className="flex items-center justify-center gap-3 font-medium">📧 <span>{authProfessional.email}</span></p>
            <p className="flex items-center justify-center gap-3 font-medium">📞 <span>{authProfessional.phone}</span></p>
            <p className="text-gray-400 text-md">Joined: {new Date(authProfessional.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-400 text-md">Updated: {new Date(authProfessional.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    );
}

export default Profile;
