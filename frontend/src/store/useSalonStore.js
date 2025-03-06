import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";

export const useSalonStore = create((set) => ({
  services: [],
  isAddingService: false, // New state for tracking loading status

  fetchServices: async () => {
    try {
      const response = await axiosInstant.get("/salon/allSalonService");
      set({ services: response.data.salon });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  },

  addService: async (serviceData) => {
    try {
      set({ isAddingService: true }); // Set loading to true before request

      const response = await axiosInstant.post("/salon/addSalonService", serviceData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set((state) => ({
        services: [...state.services, response.data.salon],
        isAddingService: false, // Set loading to false after success
      }));

      console.log(response.data);
      toast.success("Service added successfully");
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
      set({ isAddingService: false }); // Ensure loading is false on failure
    }
  },

  removeService: async (serviceId) => {
    try {
      await axiosInstant.delete(`/salon/removeSalonService/${serviceId}`);
      set((state) => ({
        services: state.services.filter((service) => service._id !== serviceId),
      }));
      toast.success("Service removed successfully");
    } catch (error) {
      console.error("Error removing service:", error);
    }
  },
}));
