import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";

export const useServiceStore = create((set, get) => ({
  services: [],
  isAddingService: false,

  fetchServices: async (category) => {
    try {
      const response = await axiosInstant.get(`/service/allServices${category ? `?category=${category}` : ""}`);
      set({ services: response.data.services });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  },

  addService: async (serviceData) => {
    try {
      set({ isAddingService: true });

      const response = await axiosInstant.post("/service/addService", serviceData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set((state) => ({
        services: [...state.services, response.data.service],
        isAddingService: false,
      }));

      toast.success("Service added successfully");
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
      set({ isAddingService: false });
    }
  },

  updateService: async (serviceData, serviceId) => {
    set({ isAddingService: true });

    try {
      await axiosInstant.patch(`/service/updateService/${serviceId}`, serviceData);

      get().fetchServices(serviceData.category); // Refresh services after update
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
    const isConfirmed = window.confirm("Are you sure you want to remove this service?");
    if (!isConfirmed) return;
    try {
      await axiosInstant.delete(`/service/removeService/${serviceId}`);
      set((state) => ({
        services: state.services.filter((service) => service._id !== serviceId),
      }));
      toast.success("Service removed successfully");
    } catch (error) {
      console.error("Error removing service:", error);
    }
  },
}));