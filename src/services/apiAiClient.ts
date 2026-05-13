import axios from "axios";

export const apiAiClient = axios.create({
    baseURL: import.meta.env.VITE_AI_ENDPOINT,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});


