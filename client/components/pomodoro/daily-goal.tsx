import { Volume2 } from "lucide-react";

interface DailyGoalProps {
  completed: number;
  total: number;
  totalFocusTime: string;
  streakDays: number;
  soundEnabled?: boolean;
  onSoundToggle?: () => void;
}

export function DailyGoal({
  completed,
  total,
  totalFocusTime,
  streakDays,
  soundEnabled = true,
  onSoundToggle,
}: DailyGoalProps) {
  return (
    <div className="bg-[#1e293b] rounded-xl border border-white/10 p-5 flex flex-col gap-4 flex-grow">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="text-white font-bold text-lg">Daily Goal</h3>
        <span className="text-blue-500 font-bold bg-blue-500/10 px-2 py-1 rounded text-xs">
          {completed}/{total} COMPLETED
        </span>
      </div>

      <div className="flex flex-col gap-4 py-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Total Focus Time</span>
          <span className="text-white font-bold">{totalFocusTime}</span>
        </div>

        {/* Session bars - placeholder */}
        <div className="flex gap-1.5 h-10 items-end">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-blue-500/20 h-full rounded-sm relative"
              title={i < completed ? `Session ${i + 1}` : "Pending"}
            >
              {i < completed && (
                <div className="absolute bottom-0 w-full h-full bg-blue-500 rounded-sm opacity-80" />
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 text-center mt-2">
          You&apos;re on a {streakDays}-day streak! Keep it up.
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Volume2 className="text-slate-400 size-5" />
          <span className="text-sm font-medium">Alarm Sound</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={onSoundToggle}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-[#334155] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500" />
        </label>
      </div>
    </div>
  );
}
