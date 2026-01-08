"use client";

import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerControlsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function TimerControls({
  isRunning,
  onStartPause,
  onReset,
  onSkip,
}: TimerControlsProps) {
  return (
    <div className="flex items-center gap-6">
      {/* Reset Button */}
      <button
        onClick={onReset}
        aria-label="Reset Timer"
        className="size-12 rounded-full bg-[#1e293b] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#334155] transition-all"
      >
        <RotateCcw className="size-6" />
      </button>

      {/* Start/Pause Button */}
      <button
        onClick={onStartPause}
        aria-label={isRunning ? "Pause Timer" : "Start Timer"}
        className={cn(
          "h-16 px-10 rounded-full text-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105",
          "bg-blue-500 hover:bg-blue-600 text-[#0f172a]",
          "shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        )}
      >
        {isRunning ? (
          <>
            <Pause className="size-7 fill-current" />
            PAUSE
          </>
        ) : (
          <>
            <Play className="size-7 fill-current" />
            START
          </>
        )}
      </button>

      {/* Skip Button */}
      <button
        onClick={onSkip}
        aria-label="Skip to Break"
        className="size-12 rounded-full bg-[#1e293b] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#334155] transition-all"
      >
        <SkipForward className="size-6" />
      </button>
    </div>
  );
}
