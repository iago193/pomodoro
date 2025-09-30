import React, { useEffect, useState } from "react";
import useInterval from "../hooks/user-interval";
import { FiBell, FiBellOff } from "react-icons/fi";
import { Button } from "./button";
import { Timer } from "./timer";
import soundStart from "../sounds/start.mp3";
import soundFinish from "../sounds/finish.mp3";
import { secondsToTime } from "../utils/seconds-to-time";

const startAudio = new Audio(soundStart);
const finishAudio = new Audio(soundFinish);

interface props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTime(props: props): React.JSX.Element {
  const [mainTime, setMainTime] = useState(() => props.pomodoroTime);
  const [restTime, setRestTime] = useState(() => props.shortRestTime);
  const [longRestTime, setLongRestTime] = useState(() => props.longRestTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [longResting, setlongResting] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [status, setStatus] = useState("idle");
  const [cycles, setCycles] = useState(props.cycles);
  const [fullTimeWorking, setFullTimeWorking] = useState(0);


  useEffect(() => {
    if (working) {
      document.documentElement.style.setProperty("--PrimaryColor", "#dd7819");
    } else if (resting || longResting) {
      document.documentElement.style.setProperty("--PrimaryColor", "#1abeca");
    } else {
      document.documentElement.style.setProperty("--PrimaryColor", "#1c1652");
    }
  }, [working, resting, longResting]);

  useEffect(() => {
    setStatus(
      working
        ? "working"
        : resting
        ? "resting"
        : longResting
        ? "long resting"
        : "idle"
    );
  }, [working, resting, longResting]);

  const playSound = (Audio: HTMLAudioElement) => {
    if (alertsEnabled) Audio.play();
  };

  useInterval(
    () => {
      if (working) {
        setMainTime((prev) => {
          if (prev === 0) {
            playSound(finishAudio);
            setWorking(false);

            if (cycles >= 1) {
              setResting(true);
              setFullTimeWorking((prev) => prev + props.pomodoroTime);
              setRestTime(props.shortRestTime);
            } else {
              setResting(false);
              setlongResting(true);
              setLongRestTime(props.longRestTime);
            }
            return 0;
          }
          return prev - 1;
        });
      } else if (resting) {
        setRestTime((prev) => {
          if (prev === 0) {
            playSound(startAudio);
            setResting(false);
            setWorking(true);
            setCycles((prevCycles) => prevCycles - 1);

            setMainTime(props.pomodoroTime);
            return 0;
          }
          return prev - 1;
        });
      } else if (longResting) {
        setLongRestTime((prev) => {
          if (prev === 0) {
            playSound(startAudio);
            setlongResting(false);
            setWorking(true);
            setCycles(props.cycles);
            setMainTime(props.pomodoroTime);
            return props.longRestTime;
          }
          return prev - 1;
        });
      }
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = (status: boolean) => {
    setTimeCounting(status);
    setWorking(status);
    playSound(startAudio);
  };

  const finishWorking = () => {
    if (!working) return;
    setTimeCounting(false);
    setWorking(false);
    setMainTime(props.pomodoroTime);
    playSound(finishAudio);
  };

  const restart = () => {
    if (!working) return;
    setMainTime(props.pomodoroTime);
    configureWork(true);
  };

  return (
    <>
      <main
        className={`flex justify-center relative items-center h-screen transition-colors duration-700 ${
          working ? "isWorking" : ""
        }`}
      >
        <section className="bg-blue-100 h-150 w-150 flex relative flex-col items-center rounded-2xl shadow-2xl pt-5">
          <p>Are you: {status}</p>
          <button
            className="absolute right-5 top-5"
            onClick={() => setAlertsEnabled((prev) => !prev)}
          >
            {alertsEnabled ? (
              <FiBell className="p-1" size={28} color="green" />
            ) : (
              <FiBellOff className="p-1" size={28} color="red" />
            )}
          </button>
          <Timer
            mainTime={
              mainTime !== 0 ? mainTime : longResting ? longRestTime : restTime
            }
          />
          <div className={"flex flex-wrap gap-4 mt-5"}>
            {timeCounting ? (
              <Button
                setClassName={"bg-amber-600"}
                onClick={() => setTimeCounting(false)}
                text="Pause"
              />
            ) : (
              <Button onClick={() => configureWork(true)} text="Work" />
            )}
            <Button onClick={() => restart()} text="Restart" />
            <Button onClick={() => finishWorking()} text="Finish" />
          </div>
          <div className="mt-auto mr-auto m-10 text-3xl">
            <p className="text-2xl">Full time working: {secondsToTime(fullTimeWorking)} </p>
          </div>
        </section>
      </main>
    </>
  );
}
