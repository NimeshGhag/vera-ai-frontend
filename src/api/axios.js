import axios from "axios";

const instance = axios.create({
  // Use a relative path so Vite dev server can proxy requests to the backend
  baseURL: '/api/',
});

export default instance;