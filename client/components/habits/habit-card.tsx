"use client";

import { Flame, Pencil, Trash2, Bell, BellOff, Flag } from "lucide-react";
import type { HabitData } from "./types";

interface HabitCardProps {
  habit: HabitData;
}

export function HabitCard({ habit }: HabitCardProps) {
  const Icon = habit.icon;

  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-slate-700 bg-[#1e293b] p-5 hover:border-blue-500/50 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.05)]">
      <div className="flex justify-between items-start">
        <div
          className={`size-12 rounded-full ${habit.iconBgColor} ${habit.iconColor} flex items-center justify-center border ${habit.iconBgColor.replace("/20", "/30")}`}
        >
          <Icon className="size-6" />
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 rounded-md hover:bg-white/10 text-blue-300 hover:text-white transition-colors">
            <Pencil className="size-5" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-red-500/20 text-blue-300 hover:text-red-400 transition-colors">
            <Trash2 className="size-5" />
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-white text-lg font-bold leading-tight">
          {habit.name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/5 text-blue-300 border border-white/10">
            {habit.category}
          </span>
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/5 text-blue-300 border border-white/10">
            {habit.frequency}
          </span>
        </div>
      </div>
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5 text-blue-300">
          {habit.reminder ? (
            <>
              <Bell className="size-4" />
              <span>{habit.reminder}</span>
            </>
          ) : habit.goal ? (
            <>
              <Flag className="size-4" />
              <span>{habit.goal}</span>
            </>
          ) : (
            <>
              <BellOff className="size-4 opacity-50" />
              <span className="opacity-50">No reminder</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1 text-blue-500">
          <Flame className="size-4" />
          <span className="font-bold">{habit.streak}</span>
        </div>
      </div>
    </div>
  );
}
