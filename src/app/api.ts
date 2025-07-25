import axios from "axios";
import { getAccessToken } from "./accessToken";

//https://cachoybache-dot-mlai-434520.uc.r.appspot.com
const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "Development"
      ? "http://localhost:8080"
      : "https://cachoybache-dot-mlai-434520.uc.r.appspot.com",
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = `${getAccessToken()}`;
  return config;
});

export const getAllEvents = () => axiosInstance.get("/events/");

export const getEvents = (id?: string) =>
  axiosInstance.get("/events/", { params: { creativx: id } });

export const getEvent = (id: string) => axiosInstance.get(`/events/${id}`);

export const createEvent = (data: {
  title: string;
  date: string;
  cover: string;
  location: string;
  creativxs: string[];
  media: any[];
}) => axiosInstance.post("/events/", data);

export const updateEvent = (
  id: string,
  data: {
    title: string;
    date: string;
    cover: string;
    location: string;
    creativxs: string[];
    media: any[];
  }
) => axiosInstance.put(`/events/${id}`, data);

export const deleteEvent = (id: string) =>
  axiosInstance.delete(`/events/${id}`);

export const makeEdition = (data: {
  title: string;
  covers: Array<{ url: string; color: string }>;
}) => {
  return axiosInstance.post("/editions/", data);
};

export const getEditions = () => axiosInstance.get("/editions/");

export const getEdition = (id: string) => axiosInstance.get(`/editions/${id}`);

export const addToEditionGallery = (
  id: string,
  data: {
    url: string;
    title: string;
    author: string;
    section: string;
  }
) => {
  return axiosInstance.patch(`/editions/${id}/gallery`, data);
};

export const updateEdition = (id: string, data: any) => {
  return axiosInstance.patch(`/editions/${id}`, data);
};

export const makeCreativx = (data: { name: string }) => {
  return axiosInstance.post("/creativx/", data);
};

export const getCreativxs = () => axiosInstance.get("/creativx/");

export const deleteCreativx = (id: string) =>
  axiosInstance.delete(`/creativx/${id}`);

export const getLocations = () => axiosInstance.get("/locations/");

export const getStates = () => axiosInstance.get("/locations/state");

export const makeLocation = (data: {
  name: string;
  address: string;
  zipCode: string;
  coords: string;
  state: string;
}) => {
  return axiosInstance.post("/locations/", data);
};

export const makeState = (data: { name: string }) => {
  return axiosInstance.post("/locations/state", data);
};

export const deleteLocation = (id: string) =>
  axiosInstance.delete(`/locations/${id}`);

export const deleteState = (id: string) =>
  axiosInstance.delete(`/locations/state/${id}`);

export default axiosInstance;
