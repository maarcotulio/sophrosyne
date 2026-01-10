"use client";

import { cn } from "@/lib/utils";

interface DayData {
  day: string;
  hours: number;
  label?: string;
}

interface DurationChartProps {
  data?: DayData[];
  goalHours?: number;
  className?: string;
}

const defaultData: DayData[] = [
  { day: "Mon", hours: 5.5 },
  { day: "Tue", hours: 6.0 },
  { day: "Wed", hours: 7.8, label: "7h 50m" },
  { day: "Thu", hours: 4.5 },
  { day: "Fri", hours: 8.2 },
  { day: "Sat", hours: 8.5 },
  { day: "Sun", hours: 7.2 },
];

export function DurationChart({
  data = defaultData,
  goalHours = 8,
  className,
}: DurationChartProps) {
  const maxHours = 10;

  return (
    <div
      className={cn(
        "rounded-xl p-6 bg-[#1e293b] border border-white/5 shadow-sm flex flex-col",
        className
      )}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-bold text-white">Sleep Duration Trend</h3>
          <p className="text-sm text-slate-400">
            Last 7 Days vs Previous Week
          </p>
        </div>
        <div className="flex gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-slate-300">Duration</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white/20" />
            <span className="text-slate-300">Goal</span>
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-[250px] w-full flex items-end justify-between gap-2 px-2 pb-2 relative">
        {/* Goal line */}
        <div
          className="absolute w-full border-t border-dashed border-white/20 left-0"
          style={{ top: `${100 - (goalHours / maxHours) * 100}%` }}
        >
          <span className="absolute -top-3 right-0 text-[10px] text-slate-400">
            {goalHours}h Goal
          </span>
        </div>

        {data.map((item) => {
          const heightPercent = (item.hours / maxHours) * 100;
          return (
            <div
              key={item.day}
              className="flex flex-col items-center gap-2 flex-1 group cursor-pointer"
            >
              <div className="w-full max-w-[40px] bg-white/5 hover:bg-blue-500/20 transition-all rounded-t-lg relative flex flex-col justify-end h-[180px] overflow-hidden">
                {item.label && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.label}
                  </div>
                )}
                <div
                  className="bg-blue-500 w-full transition-all duration-500 group-hover:bg-blue-600"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-400 group-hover:text-white">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
