import React from "react";
import { secondsToTime } from "../utils/seconds-to-time";

interface Props {
  mainTime: number;
}

export function Timer(props: Props): React.JSX.Element {
  return <div className="text-9xl">{secondsToTime(props.mainTime)}</div>;
}
