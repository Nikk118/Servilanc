import React, { useEffect, useState } from 'react';
import { useRegistersStore } from '../../store/useRegistersStore';

const NewRegistration = () => {
    const { registers, getRegisters, deleteRegister } = useRegistersStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRegisters().then(() => setLoading(false));
    }, []);

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h2 className="text-2xl font-bold text-center mb-6">New Registrations</h2>
            
            {loading ? (
                <div className="text-center text-gray-400">Loading...</div>
            ) : registers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300">
                                <th className="px-6 py-3 text-left">Full Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4">Phone</th>
                                <th className="px-4">Category</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registers.map((register) => (
                                <tr key={register._id} className="border-b border-gray-600">
                                    <td className="p-3">{register.fullName}</td>
                                    <td className="p-3">{register.email}</td>
                                    <td className="p-3">{register.phone}</td>
                                    <td className="p-3">{register.category}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => deleteRegister(register._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center text-gray-400 py-4">No new registrations</div>
            )}
        </div>
    );
};

export default NewRegistration;
