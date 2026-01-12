"use client";

import type { GoalStatData } from "./types";

interface GoalsStatCardProps {
  stat: GoalStatData;
}

export function GoalsStatCard({ stat }: GoalsStatCardProps) {
  const Icon = stat.icon;

  return (
    <div
      className={`flex flex-col gap-2 rounded-xl p-6 border border-slate-700 bg-[#1e293b]/50 backdrop-blur-sm relative overflow-hidden group ${
        stat.isHighlighted ? "" : ""
      }`}
    >
      {stat.isHighlighted && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
      <div className="flex justify-between items-start relative z-10">
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
          {stat.label}
        </p>
        <Icon
          className={`size-5 ${stat.isHighlighted ? "text-blue-500 animate-pulse" : "text-slate-400"}`}
        />
      </div>
      <div className="flex items-baseline gap-2 relative z-10">
        <p className="text-white text-3xl font-bold leading-tight">
          {stat.value}
        </p>
        <p className="text-blue-500 text-sm font-medium">{stat.trend}</p>
      </div>
    </div>
  );
}
