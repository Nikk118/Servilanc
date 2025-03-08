import { create } from "zustand";
import { axiosInstant } from "../lib/axios.js";
import toast from "react-hot-toast";


const BASE_URL = "http://localhost:3000/api";

export const useBookingStore = create((set,get) => ({
    booking: null,
    selectedService:null,
    userAddress:null,

    getAddress: async () => {
        try {
            const res = await axiosInstant.get("/address/getAddress");
            set({ userAddress: res.data.address });
        } catch (error) {
            console.error("Error while fetching address:", error);
           
        }
    },

    setSelectedService: (services) => set({ selectedService: services }),

    craeteAddress: async(data)=>{
        try {
            const res = await axiosInstant.post("/address/createAddress", data);
            set({ userAddress: res.data });
            toast.success("Address created successfully");
        } catch (error) {
            console.error("Error while creating address:", error);
            toast.error("Failed to create address");
        }
    },
    updateAddress: async(data)=>{
        try {
            const res = await axiosInstant.patch("/address/updateAddress", data);
            set({ userAddress: res.data });
            toast.success("Address updated successfully");
        } catch (error) {
            console.error("Error while updating address:", error);
            toast.error("Failed to update address");
        }
    },
    createBooking: async (data) => {
        try {
            const { selectedService } = get();
    
            if (!selectedService) {
                toast.error("No service selected for booking");
                return;
            }
    
            const res = await axiosInstant.post(`/booking/addBooking/${selectedService._id}`, data);
            set({ booking: res.data });
            toast.success("Booking created successfully");
        } catch (error) {
            console.error("Error while creating booking:", error);
            toast.error(error?.response?.data?.message||"Failed to create booking");
        }
    },
}))
   