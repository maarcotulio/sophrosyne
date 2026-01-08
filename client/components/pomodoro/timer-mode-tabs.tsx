"use client";

import { cn } from "@/lib/utils";

export type TimerMode = "focus" | "short-break" | "long-break";

interface TimerModeTabsProps {
  activeMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

const modes: { id: TimerMode; label: string }[] = [
  { id: "focus", label: "Focus" },
  { id: "short-break", label: "Short Break" },
  { id: "long-break", label: "Long Break" },
];

export function TimerModeTabs({ activeMode, onModeChange }: TimerModeTabsProps) {
  return (
    <div className="w-full max-w-md bg-[#0f172a] p-1.5 rounded-xl flex justify-between border border-white/10">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={cn(
            "flex-1 py-2 px-4 rounded-lg text-sm font-medium text-center transition-all",
            activeMode === mode.id
              ? "bg-[#1e293b] text-white shadow-sm font-bold"
              : "text-slate-400 hover:text-white"
          )}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
