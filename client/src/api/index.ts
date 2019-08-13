import { AxiosRequestConfig } from "axios";
import { GET, POST, PATCH, DELETE } from "./schema";
import {
  createAxiosInstance,
  setRedirectLoginPageInterceptor
} from "./axios-base";

const axiosInstance = createAxiosInstance();
const axiosInstanceWith401Handler = setRedirectLoginPageInterceptor(
  createAxiosInstance()
);
type ApiRequestConfig = AxiosRequestConfig & {
  disable401Handler?: boolean;
  enableConvertJsonToForm?: boolean;
};

export const apiGet = <T extends keyof GET>(
  urlTemplate: T,
  req?: GET[T]["req"],
  config?: ApiRequestConfig
) => {
  const { url, config: axiosConfig } = buildAxiosRequestArgs(
    urlTemplate,
    req,
    config
  );

  if (config != null && config.disable401Handler === true) {
    return axiosInstance.get<GET[T]["res"]>(url, axiosConfig);
  } else {
    return axiosInstanceWith401Handler.get<GET[T]["res"]>(url, axiosConfig);
  }
};

export const apiPost = <T extends keyof POST>(
  urlTemplate: T,
  req?: POST[T]["req"],
  config?: ApiRequestConfig
) => {
  const { url, data, config: axiosConfig } = buildAxiosRequestArgs(
    urlTemplate,
    req,
    config
  );

  if (config != null && config.disable401Handler === true) {
    return axiosInstance.post<POST[T]["res"]>(url, data, axiosConfig);
  } else {
    return axiosInstanceWith401Handler.post<POST[T]["res"]>(
      url,
      data,
      axiosConfig
    );
  }
};

export const apiPatch = <T extends keyof PATCH>(
  urlTemplate: T,
  req?: PATCH[T]["req"],
  config?: ApiRequestConfig
) => {
  const { url, data, config: axiosConfig } = buildAxiosRequestArgs(
    urlTemplate,
    req,
    config
  );

  if (config != null && config.disable401Handler === true) {
    return axiosInstance.patch<PATCH[T]["res"]>(url, data, axiosConfig);
  } else {
    return axiosInstanceWith401Handler.patch<PATCH[T]["res"]>(
      url,
      data,
      axiosConfig
    );
  }
};

export const apiDelete = <T extends keyof DELETE>(
  urlTemplate: T,
  req?: DELETE[T]["req"],
  config?: ApiRequestConfig
) => {
  const { url, config: axiosConfig } = buildAxiosRequestArgs(
    urlTemplate,
    req,
    config
  );

  if (config != null && config.disable401Handler === true) {
    return axiosInstance.delete(url, axiosConfig);
  } else {
    return axiosInstanceWith401Handler.delete(url, axiosConfig);
  }
};

const buildAxiosRequestArgs = (
  urlTemplate: string,
  req?: {
    vars?: { [key: string]: string };
    params?: { [key: string]: string };
    body?: any;
  },
  config?: ApiRequestConfig
) => {
  let url: string;
  if (req != null && req.vars != null) {
    url = renderPath(urlTemplate, req.vars);
  } else {
    url = urlTemplate;
  }

  if (req != null && req.params != null) {
    if (config != null) {
      config.params = req.params;
    } else {
      config = { params: req.params };
    }
  }

  // "enableConvertJsonToForm" will be removed in the future and the followings will be removed at the same time.
  let data: any;
  if (req != null && req.body != null) {
    if (config != null && config.enableConvertJsonToForm === true) {
      const params = new URLSearchParams();
      for (let [key, value] of Object.entries(req.body)) {
        params.append(key, value as string);
      }
      config.headers = {
        ...config.headers,
        "Content-Type": "application/x-www-form-urlencoded"
      };
      data = params;
    } else {
      data = req.body;
    }
  } else {
    data = undefined;
  }

  return {
    url,
    data,
    config
  };
};

const renderPath = (
  pathTemplate: string,
  pathVariables: { [key: string]: string }
): string => {
  const splitedPath = pathTemplate.split("/");
  const rendered: string[] = [];
  for (let item of splitedPath) {
    if (item.charAt(0) === ":") {
      const key = item.substring(1);
      const value = pathVariables[key];
      if (value === undefined) {
        throw new Error(`path render error: "${key}" param is undefined`);
      }
      rendered.push(value);
    } else {
      rendered.push(item);
    }
  }

  return rendered.join("/");
};
