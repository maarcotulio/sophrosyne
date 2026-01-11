"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface HabitsSearchBarProps {
  className?: string;
}

export function HabitsSearchBar({ className }: HabitsSearchBarProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-4 bg-[#1e293b]/50 p-2 rounded-xl border border-slate-700/50 ${className || ""}`}
    >
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 size-5" />
        <input
          className="w-full bg-[#0f172a] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-blue-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all"
          placeholder="Search habits..."
          type="text"
        />
      </div>
      <div className="flex items-center gap-2">
        <select className="bg-[#0f172a] border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer">
          <option>Sort by: Newest</option>
          <option>Sort by: Alphabetical</option>
          <option>Sort by: Frequency</option>
        </select>
        <button className="p-2.5 rounded-lg border border-slate-700 bg-[#0f172a] text-white hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center">
          <SlidersHorizontal className="size-5" />
        </button>
      </div>
    </div>
  );
}
