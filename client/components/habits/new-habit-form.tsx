"use client";

import { useState } from "react";
import { X, Star, Dumbbell, Code, BookOpen, Plus } from "lucide-react";

interface NewHabitFormProps {
  className?: string;
  onClose?: () => void;
}

export function NewHabitForm({ className, onClose }: NewHabitFormProps) {
  const [frequency, setFrequency] = useState<"Daily" | "Weekly" | "Specific">(
    "Daily"
  );
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(0);

  const icons = [Star, Dumbbell, Code, BookOpen, Plus];

  return (
    <div
      className={`rounded-2xl bg-[#1e293b] border border-slate-700 p-6 shadow-xl ${className || ""}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">New Habit</h2>
        <button
          onClick={onClose}
          className="text-blue-300 hover:text-white transition-colors"
        >
          <X className="size-6" />
        </button>
      </div>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Habit Name
          </label>
          <input
            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="e.g. Learn Spanish"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Icon & Color
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {icons.map((Icon, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIcon(index)}
                className={`shrink-0 size-10 rounded-full flex items-center justify-center transition-all ${
                  selectedIcon === index
                    ? "bg-blue-500 text-slate-900 ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0f172a]"
                    : "bg-[#0f172a] border border-slate-700 text-blue-300 hover:text-white hover:border-blue-500/50"
                }`}
              >
                <Icon className="size-5" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Frequency
          </label>
          <div className="flex rounded-lg bg-[#0f172a] p-1 border border-slate-700">
            {(["Daily", "Weekly", "Specific"] as const).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setFrequency(freq)}
                className={`flex-1 py-1.5 text-sm font-medium rounded transition-colors ${
                  frequency === freq
                    ? "bg-blue-500 text-slate-900 shadow-sm"
                    : "text-blue-300 hover:text-white"
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4 rounded-lg bg-[#0f172a] border border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">🔔</span>
              <span className="text-sm font-medium text-white">Reminders</span>
            </div>
            <button
              type="button"
              onClick={() => setReminderEnabled(!reminderEnabled)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                reminderEnabled ? "bg-blue-500" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                  reminderEnabled ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
          {reminderEnabled && (
            <div className="flex gap-2">
              <input
                className="w-full bg-[#1e293b] border border-slate-700 rounded px-3 py-2 text-white text-sm focus:border-blue-500 focus:ring-0 habit-time-input"
                type="time"
                defaultValue="09:00"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Daily Goal
          </label>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center bg-[#0f172a] border border-slate-700 rounded-lg px-3">
              <input
                className="w-full bg-transparent border-0 text-white focus:ring-0 p-2.5 text-sm"
                type="number"
                defaultValue="1"
              />
              <span className="text-blue-300 text-xs whitespace-nowrap">
                times / day
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Category
          </label>
          <select className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
            <option>Health & Fitness</option>
            <option>Productivity</option>
            <option>Mindfulness</option>
            <option>Learning</option>
          </select>
        </div>
        <div className="flex gap-3 mt-4 pt-4 border-t border-slate-700">
          <button
            type="button"
            className="flex-1 py-3 px-4 rounded-lg border border-transparent text-white font-bold text-sm hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 py-3 px-4 rounded-lg bg-blue-500 text-slate-900 font-bold text-sm hover:bg-blue-400 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            Save Habit
          </button>
        </div>
      </form>
    </div>
  );
}
