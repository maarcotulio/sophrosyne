"use client";

import { Plus } from "lucide-react";

interface GoalsHeaderProps {
  className?: string;
  progressPercent?: number;
}

export function GoalsHeader({
  className,
  progressPercent = 12,
}: GoalsHeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-slate-700 ${className || ""}`}
    >
      <div className="flex flex-col gap-3 max-w-2xl">
        <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
          Goals Overview
        </h1>
        <p className="text-slate-400 text-lg font-normal leading-relaxed">
          You are{" "}
          <span className="text-blue-500 font-bold">
            {progressPercent}% closer
          </span>{" "}
          to your goals this week. Your consistency is building momentum. Keep
          pushing!
        </p>
      </div>
      <button className="flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-blue-500 hover:bg-blue-600 transition-colors text-white text-base font-bold leading-normal tracking-wide gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        <Plus className="size-5" />
        <span>New Goal</span>
      </button>
    </div>
  );
}
