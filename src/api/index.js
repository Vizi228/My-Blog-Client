import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_KEY,
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('mern-token') || '';
  return config
});


 