import { cn } from "@/lib/utils";

interface SleepHistoryEntry {
  id: string;
  date: string;
  sleepTime: string;
  wakeTime: string;
  duration: string;
  score: number;
}

interface SleepHistoryTableProps {
  entries?: SleepHistoryEntry[];
  className?: string;
}

const defaultEntries: SleepHistoryEntry[] = [
  {
    id: "1",
    date: "Oct 30, Mon",
    sleepTime: "11:15 PM",
    wakeTime: "07:05 AM",
    duration: "7h 50m",
    score: 88,
  },
  {
    id: "2",
    date: "Oct 29, Sun",
    sleepTime: "11:45 PM",
    wakeTime: "08:15 AM",
    duration: "8h 30m",
    score: 92,
  },
  {
    id: "3",
    date: "Oct 28, Sat",
    sleepTime: "12:30 AM",
    wakeTime: "09:00 AM",
    duration: "8h 30m",
    score: 78,
  },
];

function getScoreColor(score: number) {
  if (score >= 85) return "bg-green-400/10 text-green-400 ring-green-400/20";
  if (score >= 70) return "bg-yellow-400/10 text-yellow-400 ring-yellow-400/20";
  return "bg-red-400/10 text-red-400 ring-red-400/20";
}

export function SleepHistoryTable({
  entries = defaultEntries,
  className,
}: SleepHistoryTableProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex justify-between items-end">
        <h3 className="text-lg font-bold text-white">Recent History</h3>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-400 font-medium"
        >
          View All
        </a>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/5">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-white/5 text-xs uppercase text-slate-300">
            <tr>
              <th className="px-6 py-4 font-semibold" scope="col">
                Date
              </th>
              <th className="px-6 py-4 font-semibold" scope="col">
                Sleep Time
              </th>
              <th className="px-6 py-4 font-semibold" scope="col">
                Wake Time
              </th>
              <th className="px-6 py-4 font-semibold" scope="col">
                Duration
              </th>
              <th className="px-6 py-4 font-semibold" scope="col">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#1e293b]">
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-white">
                  {entry.date}
                </td>
                <td className="px-6 py-4">{entry.sleepTime}</td>
                <td className="px-6 py-4">{entry.wakeTime}</td>
                <td className="px-6 py-4">{entry.duration}</td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                      getScoreColor(entry.score)
                    )}
                  >
                    {entry.score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
