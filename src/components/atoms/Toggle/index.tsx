import * as React from "react";
import cn from "classnames";

interface IToggleProps {
  toggled?: boolean;
  onToggle?: () => void;
}

const Toggle: React.FunctionComponent<IToggleProps> = (props) => {
  return (
    <button
      type="button"
      aria-pressed="false"
      className="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none"
      onClick={props.onToggle}
    >
      <span className="sr-only">Menu mode</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bg-white w-full h-full rounded-md"
      ></span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200",
          props.toggled ? "bg-primary" : "bg-gray-200",
        )}
      ></span>
      {/* <!-- On: "translate-x-5", Off: "translate-x-0" --> */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200",
          props.toggled ? "translate-x-5" : "translate-x-0",
        )}
      ></span>
    </button>
  );
};

Toggle.defaultProps = {
  toggled: false,
  onToggle: () => {},
};

export default Toggle;
