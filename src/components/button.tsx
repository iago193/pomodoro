import React from "react";

interface Props {
  text: string;
  onclick?: () => void;
  className?: string;
}

export function Button(props: Props): React.JSX.Element {
  return (
    <button className="p-2" onClick={props.onclick}>
      {props.text}
    </button>
  );
}
