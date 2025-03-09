import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";





export const useAdminStore = create((set,get) => ({
    authAdmin: null,
    isCheckingAuthAdmin: true,
    isAdminLogin: false,   
    servicesStats:null ,
    userstats:null,
    bookingsStats :null,
    isAddingProfessional: false,
    professionalStats: null,

    
    removeUser: async (userId) => {
      try {
        await axiosInstant.delete(`/admin/removeUser/${userId}`);
    
        // Optimistically update the state
        set((state) => ({
          userStats: state.userStats ? state.userStats.filter(user => user.user !== userId) : [],
        }));
    
        toast.success("User removed successfully");
    
        // Fetch updated user stats to ensure state consistency
        get().fetchUserStats();
      } catch (error) {
        console.error(error);
        toast.error("User removal failed");
      }
    },
    
    
    removeProfessional: async (professionalId) => {
      try {
        await axiosInstant.delete(`/admin/removeProfessional/${professionalId}`);
    
        
        set((state) => ({
          professionalStats: state.professionalStats.filter(
            (pro) => pro.professional !== professionalId
          ),
        }));
    
        toast.success("Professional removed successfully");
      } catch (error) {
        console.error(error);
        toast.error("Professional removal failed");
      }
    },
    
    fetchProfessionalStats: async () => {
      try {
        const res = await axiosInstant.get("/admin/getAllProfessionalStats");
        set({ professionalStats: res.data.professionalStats });
        console.log("professionalStats", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    fetchUserStats: async () => {
      try {
        const res = await axiosInstant.get("/admin/getAllUsersStats");
        set({ userStats: res.data.userStats });
        console.log("userStats", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    addProfessional: async (data) => {
      set({ isAddingProfessional: true });
      try {
        const res = await axiosInstant.post("/admin/addProfessional", data);
        toast.success("Professional added successfully");
      } catch (error) {
        console.error(error.response.data.message);
        toast.error(error?.response?.data.message || "Professional addition failed");
    }finally {
      set({ isAddingProfessional: false });
    }
  },
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
          set({ authAdmin: res.data.admin });
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
    