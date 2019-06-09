import axios from "axios";
import storage from "./storage";

// TODO use only dev
const api = axios.create({
  withCredentials: true
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (401 === error.response.status) {
      storage.deleteLoginUser();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
