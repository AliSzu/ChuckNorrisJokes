import axios from "axios";

export const jokesClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})