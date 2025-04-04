import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";

export const usePestControlStore = create((set, get) => ({
  services: [],
  isAddingService: false,
  isUpdatingService: false,

  fetchServices: async () => {
    try {
      const response = await axiosInstant.get("/pestcontrol/allPestControlService");
      set({ services: response.data.pestControl });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching pest control services:", error);
    }
  },

  addService: async (serviceData) => {
    try {
      set({ isAddingService: true });

      await axiosInstant.post("/pestcontrol/addPestControlService", serviceData);

      get().fetchServices();
      set({ isAddingService: false });

      toast.success("Pest control service added successfully");
    } catch (error) {
      console.error("Error adding pest control service:", error);
      toast.error("Failed to add pest control service");
      set({ isAddingService: false });
    }
  },

  updateService: async (serviceId, updatedData) => {
    try {
      set({ isUpdatingService: true });

      const response = await axiosInstant.patch(`/pestcontrol/updatePestControlService/${serviceId}`, updatedData);

      set((state) => ({
        services: state.services.map((service) =>
          service._id === serviceId ? { ...service, ...response.data.pestControl } : service
        ),
        isUpdatingService: false,
      }));

      toast.success("Pest control service updated successfully");
    } catch (error) {
      console.error("Error updating pest control service:", error);
      toast.error("Failed to update pest control service");
      set({ isUpdatingService: false });
    }
  },

  removeService: async (serviceId) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this service?");
  if (!isConfirmed) return;
    try {
      await axiosInstant.delete(`/pestcontrol/removePestControlService/${serviceId}`);
      set((state) => ({
        services: state.services.filter((service) => service._id !== serviceId),
      }));
      toast.success("Pest control service removed successfully");
    } catch (error) {
      console.error("Error removing pest control service:", error);
    }
  },
}));
