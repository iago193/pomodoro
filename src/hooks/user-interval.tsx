import { useEffect, useRef } from "react";

export default function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<() => void>(() => {});

  // Armazena a função mais recente
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Configura o intervalo
  useEffect(() => {
    if (delay === null) return;

    const tick = () => savedCallback.current();

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
