// Kytpe Integrate System
import { IUser } from "@src/interfaces/IUser";
import { HttpClient } from "./HttpClient";

const api_domain = "https://aitu-tinder.herokuapp.com/";

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

  public topics = () => {
    return this.instance.get('topics');
  }

  public createTopic = (body) => {
    return this.instance.post('topics', body);
  }

  public tags = () => {
    return this.instance.get('tags');
  }
}
