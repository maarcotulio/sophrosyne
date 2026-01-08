import { Settings, History } from "lucide-react";

interface PomodoroHeaderProps {
  title?: string;
  subtitle?: string;
}

export function PomodoroHeader({
  title = "Focus Mode",
  subtitle = "Maximize your productivity with the Pomodoro technique.",
}: PomodoroHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
          {title}
        </h1>
        <p className="text-slate-400 text-base">{subtitle}</p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e293b] border border-white/10 hover:bg-[#334155] transition-colors text-sm font-medium text-white">
          <Settings className="size-5" />
          Settings
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e293b] border border-white/10 hover:bg-[#334155] transition-colors text-sm font-medium text-white">
          <History className="size-5" />
          History
        </button>
      </div>
    </div>
  );
}
