import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";

export const useCarpentryStore = create((set, get) => ({
  services: [],
  isAddingService: false,

  fetchServices: async () => {
    try {
      const response = await axiosInstant.get("/carpentry/allCarpentryService");
      set({ services: response.data.carpentry });
    } catch (error) {
      console.error("Error fetching carpentry services:", error);
    }
  },

  addService: async (serviceData) => {
    try {
      set({ isAddingService: true });

      const response = await axiosInstant.post("/carpentry/addCarpentryService", serviceData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set((state) => ({
        services: [...state.services, response.data.carpentry],
        isAddingService: false,
      }));

      toast.success("Carpentry service added successfully");
    } catch (error) {
      console.error("Error adding carpentry service:", error);
      toast.error("Failed to add carpentry service");
      set({ isAddingService: false });
    }
  },

  updateService: async (serviceData, serviceId) => {
    set({ isAddingService: true });

    try {
      await axiosInstant.patch(`/carpentry/updateCarpentryService/${serviceId}`, serviceData);

      get().fetchServices(); // Refresh services after update
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
  },

  removeService: async (serviceId) => {
    try {
      await axiosInstant.delete(`/carpentry/removeCarpentryService/${serviceId}`);
      set((state) => ({
        services: state.services.filter((service) => service._id !== serviceId),
      }));
      toast.success("Carpentry service removed successfully");
    } catch (error) {
      console.error("Error removing carpentry service:", error);
    }
  },
}));
