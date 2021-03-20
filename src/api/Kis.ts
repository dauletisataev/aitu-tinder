// Kytpe Integrate System
import { IUser } from "@src/interfaces/IUser";
import { HttpClient } from "./HttpClient";

const api_domain = "https://wastezero-backend.herokuapp.com/api/v1";

const endpoint = (path) => `${api_domain}/${path}`;

type response<T> = T;
type error = {
  message: string;
};

export type ApiResponse<T> = response<T> | error;

export class Api extends HttpClient {
  public constructor() {
    super(api_domain);
  }

  public login = (body) => {
    return this.instance.post<IUser>("login", body);
  };

  public whoAmI = () => {
    return this.instance.get<IUser>("who_am_i");
  };
}
