import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "@src/utils/utils";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(null, this._handleError);

    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    const token = getCookie("kis_token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  };

  protected _handleError = (error: any) => Promise.reject(error);
}
