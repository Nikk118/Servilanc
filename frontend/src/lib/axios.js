import axios from "axios"

export const axiosInstant=axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials:true,
})