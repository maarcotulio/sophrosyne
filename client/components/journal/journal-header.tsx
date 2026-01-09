import { Plus } from "lucide-react";

interface JournalHeaderProps {
  className?: string;
}

export function JournalHeader({ className }: JournalHeaderProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
            Your Journey
          </h1>
          <p className="text-slate-400 text-lg font-normal leading-relaxed max-w-xl">
            Reflect on your wins and insights. Every small step counts towards
            the bigger picture.
          </p>
        </div>
        <button className="md:hidden flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-blue-500 text-white text-base font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors">
          <Plus className="size-5" />
          Add Moment
        </button>
      </div>
    </div>
  );
}
