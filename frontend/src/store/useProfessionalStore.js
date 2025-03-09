import { create } from "zustand";
import { axiosInstant } from "../lib/axios.js";
import toast from "react-hot-toast";



export const useProfessionalStore = create((set,get) => ({
  authProfessional: null,
  isProfessionalLogin: false,
  isCheckingAuthProfessional: true,
  acceptedBooking:null,
  newBooking: null,
  completedBooking:null,
  professionalStats:null,

  setProfessionalStats: async () => {
    try {
      const res = await axiosInstant.get("/professional/getProfessionalStats");
      set({ professionalStats: res.data.stats });
    } catch (error) {
      console.error("Error fetching professional stats:", error);
    }
  },

  setCompletedBooking: async () => {
    try {
      const res = await axiosInstant.get("/professional/getCompletedBooking");
      set({ completedBooking: res.data.completedBookings });
    } catch (error) {
      console.error("Error fetching completed bookings:", error);
    }
  },

  completeBooking: async (bookingId) => {
    try {
      const res = await axiosInstant.patch(`/booking/completeBooking/${bookingId}`);
      toast.success("Booking completed successfully");
      set((state)=>({...state,acceptedBooking:state.acceptedBooking.filter((booking)=>booking._id!==bookingId)}))
      // get().();
    } catch (error) {
      console.error("Error accepting booking:", error);
      toast.error("Failed to accept booking");
    }
  },
  accpetBooking: async (bookingId) => {
    try { 
      const res = await axiosInstant.patch(`/booking/accpetBooking/${bookingId}`); // Fixed typo
      toast.success("Booking accepted successfully");

      set((state) => ({
        ...state,
        newBooking: state.newBooking?.filter((booking) => booking._id !== bookingId) ?? [],
        // refreshTrigger: Date.now(),
      }));

      await get().setNewBooking(); // Ensure state updates properly
    } catch (error) {
      console.error("Error accepting booking:", error);
      toast.error("Failed to accept booking");
    }
  },

  setNewBooking: async () => {
    try {
      const res = await axiosInstant.get("/professional/getNewBooking");
      console.log("Response Data:", res.data); // Check if data is received
      if (res.data.newBookings) {
        set((state) => ({ ...state, newBooking: res.data.newBookings }));
        console.log("NewBooking Updated:", res.data.newBookings);
      } else {
        console.error("newBookings is undefined in response");
      }
    } catch (error) {
      console.error("Error fetching new bookings:", error);
    }
  },
  setAcceptedBooking: async () => {
    try {
      const res = await axiosInstant.get("/professional/getAcceptedBooking");
      console.log("Response Data:", res.data); // Check if data is received
      if (res.data.acceptedBookings) {
        set((state) => ({ ...state, acceptedBooking: res.data.acceptedBookings }));
        console.log("AcceptedBooking Updated:", res.data.acceptedBookings);
      } else {
        console.error("acceptedBookings is undefined in response");
      }
    } catch (error) {
      console.error("Error fetching accepted bookings:", error);
    }
  },

 setPaymentPaid: async (bookingId) => {
  try {
    const res = await axiosInstant.patch(`/professional/paymentPaid/${bookingId}`);
    
    toast.success("Payment marked as paid successfully");
    get().setAcceptedBooking();
  } catch (error) {
    console.error("Error accepting booking:", error);
    toast.error("Failed to mark payment as paid");
 }
},

  

  checkProfessional: async () => {
    try {
      const res = await axiosInstant.get(
        "/professional/getCurrentprofessional"
      );
      set({ authProfessional: res.data.professional });
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
      set({ authProfessional: res.data.professional });
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
