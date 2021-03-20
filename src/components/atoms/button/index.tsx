import * as React from "react";
import LoadingSpinner, { Size } from "../LoadingSpinner";
import cn from "classnames";
interface IButtonProps {
  loading?: boolean;
  kind?: "primary" | "indigo";
}

const Button: React.FunctionComponent<
  IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ loading, className, kind, ...props }) => {
  return (
    <button
      className={cn(
        "flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none",
        kind == "primary" &&
          !props.disabled &&
          "bg-primary hover:bg-primary-alt",
        kind == "indigo" && !props.disabled && "bg-indigo-700",
        props.disabled && "bg-gray-300",
        className,
      )}
      {...props}
    >
      {loading ? <LoadingSpinner size={Size.s} whiteMode /> : props.children}
    </button>
  );
};

Button.defaultProps = {
  loading: false,
  kind: "primary",
};

export default Button;
