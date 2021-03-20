import { createStore, action, computed, useStoreActions } from "easy-peasy";
import { IStore } from "./IStore";

export default createStore<IStore>(
  {
    user: {
      state: null,
      setUser: action((store, user) => {
        store.state = user;
      }),
    },
  },
  {
    devTools: true,
  },
);
