import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "@src/utils/utils";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  protected id = "";
  public constructor(baseURL: string, id: string) {
    this.instance = axios.create({
      baseURL,
    });
    this.id = id;
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
    config.headers["Authorization"] = this.id;

    return config;
  };

  protected _handleError = (error: any) => Promise.reject(error);
}
