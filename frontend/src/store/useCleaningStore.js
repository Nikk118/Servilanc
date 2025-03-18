import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";

export const useCleaningStore = create((set,get) => ({
  services: [],
  isAddingService: false, 

  updateService: async (serviceData, serviceId) => {
    set({ isAddingService: true });
  
    try {
      await axiosInstant.patch(`/cleaning/updateCleaningService/${serviceId}`, serviceData);
  
      get().fetchServices();
      toast.success("Service updated successfully");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred while updating the service.");
      }
      console.error("Error updating service:", error);
    } finally {
      set({ isAddingService: false });
    }
  }
  
  ,fetchServices: async () => {
    try {
      const response = await axiosInstant.get("/cleaning/allCleaningService");
      set({ services: response.data.cleaning });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  },

  addService: async (serviceData) => {
    try {
      set({ isAddingService: true }); // Set loading to true before request

      const response = await axiosInstant.post("/cleaning/addCleaningService", serviceData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set((state) => ({
        services: [...state.services, response.data.cleaning],
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
      await axiosInstant.delete(`/cleaning/removeCleaningService/${serviceId}`);
      set((state) => ({
        services: state.services.filter((service) => service._id !== serviceId),
      }));
      toast.success("Service removed successfully");
    } catch (error) {
      console.error("Error removing service:", error);
    }
  },
}));
