import axios, { AxiosRequestConfig } from "axios";

const PORT = process.env.NEXT_PUBLIC_WEBSERVER_PORT || 5000;
const HOST = process.env.NEXT_PUBLIC_WEBSERVER_HOST || "localhost";

const BASE_URL = `http://${HOST}:${PORT}`;

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(axiosConfig);

export default api;
