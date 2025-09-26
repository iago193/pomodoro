import React, { useState } from "react";
import useInterval from "../hooks/user-interval";
import { Button } from "./button";
import { Timer } from "./timer";

interface props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number
}

export function PomodoroTime(props: props): React.JSX.Element {
  const [mainTime, setMainTime] = useState(() => props.pomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <section className="bg-blue-100 h-150 w-150 flex flex-col items-center rounded-2xl shadow-2xl pt-5">
          <h2>You are: working</h2>
          <Timer mainTime={mainTime} />
          <div className="flex flex-wrap gap-4 mt-5">
            <Button text="teste" />
            <Button text="teste" />
            <Button text="teste" />
          </div>

          <div className="mt-auto mr-auto m-10 text-3xl">
            <p>details</p>
            <p>details</p>
            <p>details</p>
          </div>
        </section>
      </main>
    </>
  );
}
