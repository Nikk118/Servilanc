import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstant } from "../lib/axios";

export const useContactStore = create((set,get) => ({
    contacts:null,

    createContact: async (data) => {
        try {
            const res = await axiosInstant.post("/contact/createContact", data);
            set({ contacts: res.data });
            toast.success("Contact created successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || " failed");

        }
    },

    getContact:async()=>{
        try{
            const res=await axiosInstant.get("/contact/getContact");
            console.log("in contact store",res.data)
            set({contacts:res.data.contact});
        }catch(error){
            console.log("error while getting contacts request",error)
            toast.error(res.data.error.message||"cannot fetch contacts");
        }
    },
    deleteContact:async(contactId)=>{
        try {
            const res = await axiosInstant.delete(`/contact/deleteContact/${contactId}`);
            console.log(res.data)
            toast.success("Contact deleted successfully");
            get().getContact();
        } catch (error) {
            console.log("error while deleting contact",error)
            toast.error(res.data.error.message||"cannot delete contact");
        }
    }
}
));

