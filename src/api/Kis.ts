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

  public register = (body) => {
    return this.instance.post("sign_up", body);
  };

  public topics = () => {
    return this.instance.get("topics");
  };

  public createTopic = (body) => {
    return this.instance.post("topics", body);
  };

  public tags = () => {
    return this.instance.get("tags");
  };

  public chats = () => {
    return this.instance.get('chats');
  }
}
