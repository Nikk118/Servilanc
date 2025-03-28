import { create } from "zustand";
import { axiosInstant } from "../lib/axios";

import toast from "react-hot-toast";




export const useUserBookings = create((set,get) => ({
    userBookings: null,
    isCheckingUserBookings: true,
    getUserBookings: async () => {
        set({ isCheckingUserBookings: true });
        try {
            console.log("in store")
            const res = await axiosInstant.get("/booking/getBookings");
            set({ userBookings: res.data.bookings });
            console.log("Updated userBookings:", res.data.bookings);

            
        } catch (error) {
            console.error("Authentication error:", error);
            set({ userBookings: null });
        } finally {
            set({ isCheckingUserBookings: false });
        }
    },

    cancelBooking: async (bookingId, reason) => {
        try {
            if (!reason) {
                toast.error("Cancellation reason is required.");
                return;
            }
    
            const res = await axiosInstant.patch(`/booking/cancleBooking/${bookingId}`, { reason });
    
            if (res.status === 200) {
                toast.success("Booking cancelled successfully");
                get().getUserBookings();
            } else {
                toast.error("Failed to cancel booking. Please try again.");
            }
        } catch (error) {
            console.error("Error cancelling booking:", error);
            
            if (error.response) {
                toast.error(error.response.data.message || "Cancellation failed.");
            } else {
                toast.error("Network error. Please check your connection.");
            }
    
            set({ userBookings: null });
        }
    }
    
}));
    
