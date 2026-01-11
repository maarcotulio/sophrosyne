"use client";

import { Plus } from "lucide-react";

interface HabitsHeaderProps {
  className?: string;
}

export function HabitsHeader({ className }: HabitsHeaderProps) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-4 ${className || ""}`}>
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
          Manage Habits
        </h1>
        <p className="text-blue-300 text-base font-normal leading-normal">
          View, edit, and organize your daily routines.
        </p>
      </div>
      <button className="lg:hidden flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-blue-500 text-slate-900 text-sm font-bold leading-normal tracking-wide hover:bg-blue-400 transition-colors">
        <Plus className="size-5 mr-2" />
        <span>New Habit</span>
      </button>
    </div>
  );
}
