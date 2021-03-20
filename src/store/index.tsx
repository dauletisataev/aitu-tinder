import { createStore, action, computed, useStoreActions } from "easy-peasy";
import { IStore } from "./IStore";

export default createStore<IStore>(
  {
    id: "",
    setId: action((store, id) => {
      store.id = id;
    }),
  },
  {
    devTools: true,
  },
);
