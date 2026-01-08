import { ProgressRing } from "./progress-ring";

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  progress: number; // 0-100
  statusLabel: string;
}

export function TimerDisplay({
  minutes,
  seconds,
  progress,
  statusLabel,
}: TimerDisplayProps) {
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="relative size-64 md:size-80">
      <ProgressRing progress={progress} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-7xl md:text-8xl font-black tracking-tighter text-white tabular-nums">
          {formattedTime}
        </span>
        <span className="text-slate-400 font-medium mt-2 uppercase tracking-widest text-sm">
          {statusLabel}
        </span>
      </div>
    </div>
  );
}
