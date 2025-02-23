import { create } from "zustand";
import { axiosInstant } from "../lib/axios.js";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/api";
// http://localhost:3000/api/user/login

export const useAuthStore = create((set) => ({
  authUser: null,
  isSignUp: false,
  isLogin: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  
  // ✅ Check authentication status
  checkAuth: async () => {
    try {
      const res = await axiosInstant.get("/user/getCurrentUser");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Authentication error:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ Signup function
  signup: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axiosInstant.post("/user/signup", data);
      set({ authUser: res.data });
      toast.success("Signed up successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSignUp: false });
    }
  },

  // ✅ Login function
  login: async (data) => {
    set({ isLogin: true });
    
    try {
      const res = await axiosInstant.post("/user/login", data);
      set({ authUser: res.data });
      
      console.log("Login response data:", res.data);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLogin: false });
    }
  },

  // ✅ Logout function
  logout: async () => {
    try {
      await axiosInstant.get("/user/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  // ✅ Update Profile function
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstant.patch("/user/updateProfile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
