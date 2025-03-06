import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";




export const useAdminStore = create((set) => ({
    authAdmin: null,
    isCheckingAuthAdmin: true,
    isAdminLogin: false,   
    servicesStats:null ,
    userstats:null,
    bookingsStats :null,
    
    checkAdmin: async () => {
      set({ isCheckingAuthAdmin: true });
    
      try {
        const res = await axiosInstant.get("/admin/getAdmin");
        console.log("Admin API Response:", res.data);
    
        if (res.data && res.data.admin) {
          set({ authAdmin: res.data.admin });
          console.log("Updated authAdmin:", res.data.admin);
        } else {
          set({ authAdmin: null });
          console.log("No admin data found, setting authAdmin to null");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        set({ authAdmin: null });
      } finally {
        set({ isCheckingAuthAdmin: false });
      }
    }
,      
      adminLogin: async (data) => {
        set({ isAdminLogin: true });
        try {
          const res = await axiosInstant.post("/admin/login", data);
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
          await axiosInstant.get("/admin/logout");
          set({ authAdmin: null });
          toast.success("Logged out successfully");
        } catch (error) {
          console.error("Logout error:", error);
          toast.error(error?.response?.data?.message || "Logout failed");
        }
      },
      setServicesStats:async()=>{
        try {
            const res = await axiosInstant.get("/admin/totalServices");
            set({ servicesStats: res.data.Services });
            console.log("admin store",res.data.Services)
          } catch (error) {
            console.error("Error fetching admin stats:", error);
          }
      },

      setUserStats:async()=>{
        try {
            const res = await axiosInstant.get("/admin/userstats");
            set({ userstats: res.data });
            console.log("admin users",res.data)
          } catch (error) {
            console.error("Error fetching admin stats:", error);
          }
      },

      setBookingsStats:async()=>{
        try {
            const res = await axiosInstant.get("/admin/bookingsStats");
            set({ bookingsStats: res.data });
            console.log("admin booking stats",res.data)
          } catch (error) {
            console.error("Error fetching admin stats:", error);
          }
      },
  }));      
    