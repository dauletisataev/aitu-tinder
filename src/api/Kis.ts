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
  public constructor(id) {
    super(api_domain, id);
  }

  public register = (body) => {
    return this.instance.post("sign_up", body);
  };

  public who_am_i = () => {
    return this.instance.get("who_am_i");
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
    return this.instance.get("chats");
  };

  public createChats = (body) => {
    return this.instance.post("chats", body);
  };

  public messages = (chatId) => {
    return this.instance.get(`messages?chat_id=${chatId}`);
  };

  public sendMessage = (body) => {
    return this.instance.post(`messages`, body);
  };

  public userInfo = (userId) => {
    return this.instance.get(`hacknu_users/${userId}`);
  };

  public matches = () => {
    return this.instance.get(`matched_users`);
  };
  public userspoll = () => {
    return this.instance.get("hacknu_users");
  };

  public likeUser = (id, body) => {
    return this.instance.put(`hacknu_users/${id}`, body);
  };

  public getRandomUser = () => {
    return this.instance.get("random_user");
  };
}
