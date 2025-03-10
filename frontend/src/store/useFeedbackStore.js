import {create} from "zustand";
import {axiosInstant} from "../lib/axios";
import toast from "react-hot-toast";

export const useFeedbackStore = create((set,get) => ({
    feedbacks: null,
    isCheckingFeedbacks: true,
    isAddingFeedback: false,

    getFeedbacks: async () => {
        set({ isCheckingFeedbacks: true });
        try {   
            const res = await axiosInstant.get("/feedback/getAllFeedback");
            console.log("Full API Response:", res.data); // Log the entire response
    
            if (res.data && res.data.feedback) {
                set({ feedbacks: res.data.feedback });
            } else {
                console.error("Unexpected API response structure:", res.data);
                set({ feedbacks: [] }); // Set an empty array instead of null
            }
        } catch (error) {
            console.error("Authentication error:", error);
            set({ feedbacks: null });
        } finally {
            set({ isCheckingFeedbacks: false });
        }    
    },
    
    addFeedback: async (feedbackData) => {
        try {
            set({ isAddingFeedback: true });
    
            const response = await axiosInstant.post("/feedback/createFeedback", feedbackData);
            get().getFeedbacks();
           
            toast.success("Feedback added successfully");
        } catch (error) {
            console.error("Error adding feedback:", error);
            toast.error("Failed to add feedback");
            set({ isAddingFeedback: false });
        }
    },
    
}))    