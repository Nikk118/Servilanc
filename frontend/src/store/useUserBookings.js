import { create } from "zustand";
import { axiosInstant } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/api";

export const useUserBookings = create((set) => ({
    userBookings: null,
    isCheckingUserBookings: true,
    getUserBookings: async () => {
        set({ isCheckingUserBookings: true });
        try {
            console.log("gfiugs")
            const res = await axiosInstant.get("/booking/getBookings");
            set({ userBookings: res.data });

            // toast.success("Logged in successfully");
        } catch (error) {
            console.error("Authentication error:", error);
            set({ userBookings: null });
        } finally {
            set({ isCheckingUserBookings: false });
        }
    },
}));
    
