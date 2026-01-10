import { cn } from "@/lib/utils";

interface StageData {
  label: string;
  percentage: number;
  duration: string;
  color: string;
}

interface SleepStagesDonutProps {
  totalSleep?: string;
  stages?: StageData[];
  className?: string;
}

const defaultStages: StageData[] = [
  { label: "Deep Sleep", percentage: 25, duration: "1h 55m", color: "#1e40af" },
  { label: "Light Sleep", percentage: 55, duration: "4h 14m", color: "#3b82f6" },
  { label: "REM", percentage: 20, duration: "1h 32m", color: "#93c5fd" },
];

export function SleepStagesDonut({
  totalSleep = "7h 42m",
  stages = defaultStages,
  className,
}: SleepStagesDonutProps) {
  // Build conic gradient from stages
  let accumulated = 0;
  const gradientStops = stages
    .map((stage) => {
      const start = accumulated;
      accumulated += stage.percentage;
      return `${stage.color} ${start}% ${accumulated}%`;
    })
    .join(", ");

  return (
    <div
      className={cn(
        "rounded-xl p-6 bg-[#1e293b] border border-white/5 shadow-sm flex flex-col",
        className
      )}
    >
      <h3 className="text-lg font-bold text-white mb-6">
        Last Night&apos;s Stages
      </h3>
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div
          className="w-48 h-48 rounded-full relative"
          style={{ background: `conic-gradient(${gradientStops})` }}
        >
          <div className="absolute inset-4 bg-[#1e293b] rounded-full flex flex-col items-center justify-center">
            <p className="text-xs text-slate-400 font-medium">Total Sleep</p>
            <p className="text-2xl font-black text-white">{totalSleep}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        {stages.map((stage) => (
          <div
            key={stage.label}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stage.color }}
              />
              <span className="text-slate-300">{stage.label}</span>
            </div>
            <span className="font-bold text-white">
              {stage.percentage}% ({stage.duration})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
