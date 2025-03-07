import { create } from "zustand";
import { axiosInstant } from "../lib/axios.js";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/api";

export const useProfessionalStore = create((set) => ({
  authProfessional: null,
  isProfessionalLogin: false,
  isCheckingAuthProfessional: true,

  // Fetch Professional Data
  fetchProfessionalData: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(
        "http://localhost:3000/api/professional/me",
        { withCredentials: true }
      );
      set({ authProfessional: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch data",
        loading: false,
      });
    }
  },

  checkProfessional: async () => {
    try {
      const res = await axiosInstant.get(
        "/professional/getCurrentprofessional"
      );
      set({ authProfessional: res.data });
    } catch (error) {
      console.error("Authentication error:", error);
      set({ authProfessional: null });
    } finally {
      set({ isCheckingAuthProfessional: false });
    }
  },

  professionalLogin: async (data) => {
    set({ isProfessionalLogin: true });
    try {
      const res = await axiosInstant.post("/professional/login", data);
      set({ authProfessional: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error?.response?.data.message || "Login failed");
    } finally {
      set({ isProfessionalLogin: false });
    }
  },
  professionalLogout: async () => {
    try {
      await axiosInstant.get("/professional/logout");
      set({ authProfessional: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },
}));
