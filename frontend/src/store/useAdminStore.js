import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/api";

export const useAdminStore = create((set) => ({
    authAdmin: null,
    isCheckingAuthAdmin: true,
    isAdminLogin: false,    
    
    checkAdmin: async () => {
        set({ isCheckingAuthAdmin: true });
        try {
          const res = await axiosInstant.get("/api/admin/getAdmin");
          set({ authAdmin: res.data });
          toast.success("Logged in successfully");
        } catch (error) {
          console.error("Authentication error:", error);
          set({ authAdmin: null }); 
        } finally {
          set({ isCheckingAuthAdmin: false });
        }
      },   
      adminLogin: async (data) => {
        set({ isAdminLogin: true });
        try {
          const res = await axiosInstant.post("/api/admin/login", data);
          set({ authAdmin: res.data });
          toast.success("Logged in successfully");
        } catch (error) {
          console.error(error.response.data.message);
          toast.error(error?.response?.data.message || "Login failed");
        } finally {
          set({ isAdminLogin: false });
        }
      } ,
      adminLogout: async () => {
        try {
          await axiosInstant.get("/api/admin/logout");
          set({ authAdmin: null });
          toast.success("Logged out successfully");
        } catch (error) {
          console.error("Logout error:", error);
          toast.error(error?.response?.data?.message || "Logout failed");
        }
      },
  }));      
    