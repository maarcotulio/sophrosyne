import { ChevronDown, Lightbulb } from "lucide-react";

interface Task {
  id: string;
  name: string;
}

interface TaskSelectorProps {
  tasks: Task[];
  selectedTaskId?: string;
  onTaskChange: (taskId: string) => void;
  onAddNew: () => void;
}

export function TaskSelector({
  tasks,
  selectedTaskId,
  onTaskChange,
  onAddNew,
}: TaskSelectorProps) {
  return (
    <div className="bg-[#1e293b] rounded-xl border border-white/10 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-lg">Current Task</h3>
        <button
          onClick={onAddNew}
          className="text-blue-500 text-sm font-medium hover:underline"
        >
          Add New
        </button>
      </div>

      <label className="flex flex-col gap-2 relative">
        <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">
          Select Habit
        </span>
        <div className="relative">
          <select
            value={selectedTaskId}
            onChange={(e) => onTaskChange(e.target.value)}
            className="appearance-none w-full bg-[#0f172a] border border-white/10 text-white text-base rounded-lg h-12 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
          >
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
            <ChevronDown className="size-5" />
          </div>
        </div>
      </label>

      <div className="p-3 bg-[#0f172a]/50 rounded-lg border border-white/5">
        <div className="flex items-start gap-3">
          <Lightbulb className="text-blue-500 mt-0.5 size-[18px]" />
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-white">Tip:</strong> Break your task down
            into smaller chunks if you find yourself procrastinating.
          </p>
        </div>
      </div>
    </div>
  );
}
