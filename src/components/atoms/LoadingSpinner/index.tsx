import * as React from "react";
import cn from "classnames";
import { relative } from "path";

export enum Size {
  s,
  m,
}

interface ILoadingSpinnerProps {
  size?: Size;
  whiteMode?: boolean;
  className?: string;
}

const LoadingSpinner: React.FunctionComponent<ILoadingSpinnerProps> = (
  props,
) => {
  let sizeClass = (size) => {
    switch (size) {
      case Size.m:
        return "w-8 h-8 border-4";
      case Size.s:
        return "w-4 h-4 border-2";
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div
        className={cn(
          "d pointer-events-none border-solid border-transparent border-t-current animate-spin rounded-full",
          sizeClass(props.size),
          props.whiteMode
            ? "border-transparent text-white"
            : "border-gray-300 text-blue-500",
          props.className,
        )}
      />
    </div>
  );
};

LoadingSpinner.defaultProps = {
  size: Size.m,
  whiteMode: false,
};

export default LoadingSpinner;
