import axios, { AxiosInstance } from "axios";
import storage from "../state/storage";
import { config } from "../config";

export const createAxiosInstance = () => {
  let axiosInstance: AxiosInstance;
  const commonConfigs = {
    headers: {
      "Content-Type": "application/json"
    },
    responseType: "json"
  };

  if (config.API_ORIGIN !== "") {
    axiosInstance = axios.create({
      ...commonConfigs,
      baseURL: config.API_ORIGIN,
      withCredentials: true
    });
  } else {
    axiosInstance = axios.create({
      ...commonConfigs
    });
  }

  return axiosInstance;
};

export const setRedirectLoginPageInterceptor = (
  axiosInstance: AxiosInstance
) => {
  axiosInstance.interceptors.response.use(
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
  return axiosInstance;
};
