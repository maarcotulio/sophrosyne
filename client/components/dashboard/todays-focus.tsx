"use client";

import { cn } from "@/lib/utils";
import { Flame, MoreHorizontal, Plus, Check } from "lucide-react";
import { useState } from "react";

interface HabitItem {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  streak?: boolean;
}

const initialHabits: HabitItem[] = [
  { id: "1", title: "Morning Meditation", subtitle: "10 mins • Mind", completed: true },
  { id: "2", title: "Drink 1L Water", subtitle: "Hydration", completed: true },
  { id: "3", title: "Read 30 pages", subtitle: "Self Improvement", completed: false, streak: true },
  { id: "4", title: "No Sugar", subtitle: "Health", completed: false },
];

export function TodaysFocus() {
  const [habits, setHabits] = useState<HabitItem[]>(initialHabits);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <div className="flex flex-col rounded-2xl bg-[#1e293b] p-6 ring-1 ring-white/5">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Today&apos;s Focus</h3>
        <button className="rounded-full p-1 text-slate-400 hover:bg-white/5 hover:text-white">
          <MoreHorizontal className="size-5" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {habits.map((habit) => (
          <label
            key={habit.id}
            className={cn(
              "group flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 p-3 transition-all",
              habit.completed
                ? "bg-[#334155]/30 hover:border-blue-500/30"
                : "bg-[#334155]/40 hover:bg-[#334155]"
            )}
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
                className={cn(
                  "peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 transition-all",
                  habit.completed
                    ? "border-blue-500 bg-blue-500"
                    : "border-slate-400 bg-transparent"
                )}
              />
              <Check
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-3.5 text-white font-bold transition-opacity",
                  habit.completed ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <span
                className={cn(
                  "text-sm font-medium text-white",
                  habit.completed && "line-through decoration-slate-400 decoration-2 opacity-50"
                )}
              >
                {habit.title}
              </span>
              <span className="text-xs text-slate-400">{habit.subtitle}</span>
            </div>
            {habit.streak && !habit.completed && (
              <Flame className="size-5 text-orange-400" />
            )}
          </label>
        ))}

        <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 p-3 text-sm font-medium text-slate-400 transition-colors hover:border-blue-500/50 hover:bg-white/5 hover:text-blue-500">
          <Plus className="size-4" />
          Add Quick Habit
        </button>
      </div>
    </div>
  );
}
