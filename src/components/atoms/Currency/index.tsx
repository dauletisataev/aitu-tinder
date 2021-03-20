import * as React from "react";

export interface ICurrencyProps {
  amount: Number;
  className?: string;
}

export function Currency(props: ICurrencyProps) {
  return (
    <div className={props.className}>
      {props.amount}
      <span>₸</span>
    </div>
  );
}
