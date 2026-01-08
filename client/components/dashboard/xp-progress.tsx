import { Award } from "lucide-react";

interface XPProgressProps {
  level: number;
  title: string;
  currentXP: number;
  maxXP: number;
}

export function XPProgress({ level, title, currentXP, maxXP }: XPProgressProps) {
  const percentage = Math.round((currentXP / maxXP) * 100);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#1e293b] p-6 shadow-inner ring-1 ring-white/5">
      {/* Background glow */}
      <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#334155] text-blue-500 shadow-sm ring-1 ring-white/10">
              <Award className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Level {level}</p>
              <p className="text-xs text-slate-400">{title}</p>
            </div>
          </div>
          <p className="text-lg font-bold text-white">{percentage}%</p>
        </div>

        {/* Progress bar */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-black/30">
          <div
            className="h-full rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-right text-xs font-medium text-slate-400">
          {currentXP} / {maxXP} XP to Level {level + 1}
        </p>
      </div>
    </div>
  );
}
