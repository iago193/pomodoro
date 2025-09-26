export function secondsToTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  // garante sempre 2 dígitos
  const mm = String(min).padStart(2, "0");
  const ss = String(sec).padStart(2, "0");

  return `${mm}:${ss}`;
}
