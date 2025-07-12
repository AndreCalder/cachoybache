import axios from "axios";

//
const axiosInstance = axios.create({
  baseURL: "https://cachoybache-dot-mlai-434520.uc.r.appspot.com",
  headers: {
    "Content-type": "application/json",
  },
});

export const getEvents = (id?: string) =>
  axiosInstance.get("/events/", { params: { creativx: id } });

export const getEvent = (id: string) => axiosInstance.get(`/events/${id}`);

export const createEvent = (data: {
  title: string;
  date: string;
  cover: string;
  media: any[];
}) => axiosInstance.post("/events/", data);

export const updateEvent = (
  id: string,
  data: {
    title: string;
    date: string;
    cover: string;
    media: any[];
  }
) => axiosInstance.put(`/events/${id}`, data);

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

export default axiosInstance;
