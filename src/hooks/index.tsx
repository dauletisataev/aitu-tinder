import { createTypedHooks } from "easy-peasy";
import * as React from "react";
import { IStore } from "../store/IStore";

const {
  useStoreActions,
  useStoreState,
  useStoreDispatch,
} = createTypedHooks<IStore>();

const useWindowScrollTop = () => {
  const [y, setY] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setY(pageYOffset);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return y;
};

export { useStoreActions, useStoreState, useStoreDispatch, useWindowScrollTop };
