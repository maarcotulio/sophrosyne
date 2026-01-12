"use client";

import { Plus } from "lucide-react";

interface CreateGoalCardProps {
  className?: string;
  onClick?: () => void;
}

export function CreateGoalCard({ className, onClick }: CreateGoalCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center bg-[#1e293b]/30 rounded-2xl border-2 border-dashed border-slate-700 hover:border-blue-500 hover:bg-[#1e293b]/50 transition-all duration-300 min-h-[300px] group cursor-pointer ${className || ""}`}
    >
      <div className="size-16 rounded-full bg-[#1e293b] border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Plus className="size-8 text-blue-500" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Create New Goal</h3>
      <p className="text-sm text-slate-400 text-center max-w-[200px]">
        Define a new milestone and link your daily habits.
      </p>
    </button>
  );
}
