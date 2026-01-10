"use client";

import { Calendar, Download, Plus } from "lucide-react";

interface SleepHeaderProps {
  dateRange?: string;
}

export function SleepHeader({
  dateRange = "Oct 24 - Oct 30, 2023",
}: SleepHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
          Sleep Analysis
        </h1>
        <p className="text-slate-400 font-medium flex items-center gap-2">
          <Calendar className="size-4" />
          {dateRange}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="h-10 px-4 rounded-lg border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors flex items-center gap-2">
          <Download className="size-4" />
          Export Data
        </button>
        <button className="h-10 px-5 rounded-lg bg-blue-500 text-white font-bold text-sm shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all flex items-center gap-2">
          <Plus className="size-4" />
          Log Sleep
        </button>
      </div>
    </header>
  );
}
