import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";

export const useElectricianStore = create((set, get) => ({
  services: [],
  isAddingService: false,

  fetchServices: async () => {
    try {
      const response = await axiosInstant.get("/electrician/allElectricianService");
      set({ services: response.data.electricians });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching electrician services:", error);
    }
  },

  addService: async (serviceData) => {
    try {
      set({ isAddingService: true });

      const response = await axiosInstant.post("/electrician/addElectricianService", serviceData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      get().fetchServices();
      set({ isAddingService: false });

      toast.success("Electrician service added successfully");
    } catch (error) {
      console.error("Error adding electrician service:", error);
      toast.error("Failed to add electrician service");
      set({ isAddingService: false });
    }
  },

  updateService: async (serviceData, serviceId) => {
    set({ isAddingService: true });

    try {
      await axiosInstant.patch(`/electrician/updateElectricianService/${serviceId}`, serviceData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      get().fetchServices();
      toast.success("Electrician service updated successfully");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred while updating the service.");
      }
      console.error("Error updating electrician service:", error);
    } finally {
      set({ isAddingService: false });
    }
  },

  removeService: async (serviceId) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this service?");
  if (!isConfirmed) return;
    try {
      await axiosInstant.delete(`/electrician/removeElectricianService/${serviceId}`);
      set((state) => ({
        services: state.services.filter((service) => service._id !== serviceId),
      }));
      toast.success("Electrician service removed successfully");
    } catch (error) {
      console.error("Error removing electrician service:", error);
    }
  },
}));
