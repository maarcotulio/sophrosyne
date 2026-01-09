"use client";

import { Image as ImageIcon, Smile, Maximize2 } from "lucide-react";

interface LogMomentFormProps {
  className?: string;
}

export function LogMomentForm({ className }: LogMomentFormProps) {
  return (
    <div className={className}>
      <div className="bg-[#1e293b] rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Log a Moment</h3>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Maximize2 className="size-5" />
          </button>
        </div>
        <form className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Title
            </label>
            <input
              type="text"
              placeholder="E.g. First morning run"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Tag
              </label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer">
                <option>General</option>
                <option>Achievement</option>
                <option>Reflection</option>
                <option>Running</option>
                <option>Meditation</option>
                <option>Habit Win</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Date
              </label>
              <input
                type="date"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Reflection
            </label>
            <textarea
              placeholder="What happened today? Capture your thoughts..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[160px] resize-none"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-full hover:bg-white/5"
              >
                <ImageIcon className="size-5" />
              </button>
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-full hover:bg-white/5"
              >
                <Smile className="size-5" />
              </button>
            </div>
            <button
              type="button"
              className="flex items-center justify-center rounded-lg h-10 px-6 bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
      <div className="mt-6 p-4 rounded-xl border border-dashed border-white/10 bg-transparent text-center">
        <p className="text-sm text-slate-400">
          💡 Tip: Reflecting daily increases habit retention by 40%.
        </p>
      </div>
    </div>
  );
}
