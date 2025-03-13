import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstant } from "../lib/axios"


export const useRegistersStore=create((set,get)=>({
    registers:null,
    isRegistering:false,

    createRegister:async(data)=>{
        set({isRegistering:true})
        try {
            const res= await axiosInstant.post("/registers/createRegister",data)
            console.log(res.data)
            toast.success(res.data.message||"registered successfully")

        } catch (error) {
            console.log("error while registering",error)
            toast.error(res.error.data.message||"cannot registering now")
        }finally{
            set({isRegistering:false})
        }
    },
    getRegisters: async () => {
        try {
          const res = await axiosInstant.get("/registers/getRegister");
          console.log(res.data);
          set({ registers: res.data.register });
        } catch (error) {
          console.log("error while getting registers", error);
          toast.error(error.response?.data?.message || "cannot fetch registers");
        }
      },
      deleteRegister: async (registerId) => {
        try {
          console.log("id", registerId);
          const res = await axiosInstant.delete(`/registers/deleteRegister/${registerId}`);
          
          toast.success("Register deleted successfully");
          get().getRegisters();
        } catch (error) {
          console.log("error while deleting register", error);
          toast.error(res.data.error.message || "cannot delete register");
        }
      },
}))