"use client";

import { cn } from "@/lib/utils";

interface TimeRangeTabsProps {
  ranges?: string[];
  activeRange: string;
  onRangeChange: (range: string) => void;
  className?: string;
}

export function TimeRangeTabs({
  ranges = ["1 Week", "1 Month", "3 Months", "6 Months", "1 Year"],
  activeRange,
  onRangeChange,
  className,
}: TimeRangeTabsProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-2 scrollbar-hide",
        className
      )}
    >
      {ranges.map((range) => {
        const isActive = range === activeRange;
        return (
          <button
            key={range}
            onClick={() => onRangeChange(range)}
            className={cn(
              "whitespace-nowrap h-9 px-5 rounded-full font-medium text-sm transition-colors",
              isActive
                ? "bg-blue-500 text-white font-bold"
                : "border border-white/10 text-slate-300 hover:bg-white/5"
            )}
          >
            {range}
          </button>
        );
      })}
    </div>
  );
}
