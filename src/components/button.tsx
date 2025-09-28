import React from "react";

interface Props {
  text: string;
  onClick?: () => void;
  setClassName?: string;
}

export function Button(props: Props): React.JSX.Element {
  return (
    <button className={`p-2 ${props.setClassName}`} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
