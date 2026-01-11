"use client";

import { Plus } from "lucide-react";

interface CreateHabitCardProps {
  className?: string;
  onClick?: () => void;
}

export function CreateHabitCard({ className, onClick }: CreateHabitCardProps) {
  return (
    <button
      onClick={onClick}
      className={`hidden md:flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-slate-700/50 bg-transparent p-5 hover:border-blue-500 hover:bg-[#1e293b]/30 transition-all cursor-pointer group h-full min-h-[180px] ${className || ""}`}
    >
      <div className="size-12 rounded-full bg-[#1e293b] flex items-center justify-center group-hover:bg-blue-500 group-hover:text-slate-900 text-blue-300 transition-colors">
        <Plus className="size-6" />
      </div>
      <span className="text-blue-300 font-medium group-hover:text-white">
        Create another habit
      </span>
    </button>
  );
}
