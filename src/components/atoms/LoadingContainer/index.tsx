import * as React from "react";
import cn from "classnames";
import LoadingSpinner from "../LoadingSpinner";

interface IToggleProps {
  loading: boolean;
  children: React.ReactElement;
}

const LoadingContainer: React.FunctionComponent<IToggleProps> = (props) => {
  return !props.loading ? props.children : <LoadingSpinner />;
};

export default LoadingContainer;
