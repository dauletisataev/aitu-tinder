import * as React from "react";
import cn from "classnames";

export interface IBadgeTextProps {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export function BadgeText(props: IBadgeTextProps) {
  return (
    <button
      className={cn(
        "rounded-full px-4 py-2 shadow focus:outline-none my-1 whitespace-nowrap",
        props.isActive ? "bg-primary text-white" : "bg-white text-title",
      )}
      type="button"
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  );
}
