import { IUser } from "@src/interfaces/IUser";
import { Action } from "easy-peasy";

export interface IUserStore {
  state?: {};
  setUser: Action<IUserStore, IUser | null>;
}
