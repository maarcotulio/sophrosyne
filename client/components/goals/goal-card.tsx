"use client";

import { MoreHorizontal } from "lucide-react";
import type { GoalData } from "./types";

interface GoalCardProps {
  goal: GoalData;
}

export function GoalCard({ goal }: GoalCardProps) {
  return (
    <div className="flex flex-col bg-[#1e293b] rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group">
      {/* Header Image */}
      {goal.imageUrl && (
        <div
          className="h-32 w-full rounded-t-2xl bg-cover bg-center relative"
          style={{ backgroundImage: `url("${goal.imageUrl}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent" />
          {goal.deadline && (
            <div className="absolute top-4 right-4 bg-[#0f172a]/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700">
              <span className="text-xs font-bold text-white">
                {goal.deadline}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div
        className={`p-6 flex flex-col flex-1 gap-4 relative z-10 ${goal.imageUrl ? "-mt-6" : ""}`}
      >
        <div>
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-bold text-blue-500 tracking-wider uppercase mb-1 block">
              {goal.type} · {goal.category}
            </span>
            <button className="text-slate-400 hover:text-white">
              <MoreHorizontal className="size-5" />
            </button>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">
            {goal.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2">
            {goal.description}
          </p>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between text-xs font-medium text-slate-400">
            <span>{goal.progressLabel || "Progress"}</span>
            <span className="text-white">{goal.progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${goal.progressColor || "bg-blue-500"}`}
              style={{ width: `${goal.progress}%` }}
            />
          </div>
        </div>

        {/* Linked Habits */}
        {goal.linkedHabits.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-3">
              Linked Habits
            </p>
            <div className="flex flex-col gap-2">
              {goal.linkedHabits.map((habit, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 text-sm ${habit.isActive ? "text-white" : "text-white/60"}`}
                >
                  <div
                    className={`size-2 rounded-full ${habit.isActive ? "bg-blue-500" : "bg-slate-700"}`}
                  />
                  <span>{habit.name}</span>
                  <span className="ml-auto text-xs text-slate-400">
                    {habit.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
