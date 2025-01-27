import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8080",
    headers: {
        "Content-type": "application/json"
    }
});

export const getEvents = () => axiosInstance.get("/events/");

export const getEvent = (id: string) => axiosInstance.get(`/events/${id}`);

export const createEvent = (data: {
    title: string;
    date: string;
    cover: string;
    media: any[];
}) => axiosInstance.post("/events/", data);


export default axiosInstance;