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

    cancelBooking: async (bookingId) => {
        try {
            const res=await axiosInstant.patch(`/booking/cancleBooking/${bookingId}`);
            toast.success("Booking cancle successfully");
            get().getUserBookings();
        } catch (error) {
            console.error("Authentication error:", error);
            set({ userBookings: null });
        }
    }
}));
    
