import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";

export const useServiceStore = create((set, get) => ({
  services: [],
  isAddingService: false,
  isUpdatingService: false,

  fetchServices: async () => {
    try {
      const response = await axiosInstant.get("/service/allServices");
      set({ services: response.data.services });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services");
    }
  },

  addService: async (serviceData) => {
    try {
      set({ isAddingService: true });

      const response = await axiosInstant.post("/service/addService", serviceData);

      get().fetchServices();
      set({ isAddingService: false });

      toast.success("Service added successfully");
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
      set({ isAddingService: false });
    }
  },

  updateService: async (serviceId, updatedData) => {
    try {
      set({ isUpdatingService: true });

      const response = await axiosInstant.patch(`/service/updateService/${serviceId}`, updatedData);

      set((state) => ({
        services: state.services.map((service) =>
          service._id === serviceId ? { ...service, ...response.data.service } : service
        ),
        isUpdatingService: false,
      }));

      toast.success("Service updated successfully");
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
      set({ isUpdatingService: false });
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
      toast.error("Failed to remove service");
    }
  },
}));
