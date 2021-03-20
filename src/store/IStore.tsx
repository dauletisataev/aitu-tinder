import { Action } from "easy-peasy";

export type IStore = {
  id: string;
  setId: Action<IStore, string>;
};
