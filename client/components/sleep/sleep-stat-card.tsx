import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SleepStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  badge: string;
  badgeColor?: "blue" | "green" | "red";
  description: string;
  progress: number;
  className?: string;
}

export function SleepStatCard({
  icon: Icon,
  label,
  value,
  badge,
  badgeColor = "blue",
  description,
  progress,
  className,
}: SleepStatCardProps) {
  const badgeColors = {
    blue: "bg-blue-500/10 text-blue-500",
    green: "bg-green-500/10 text-green-500",
    red: "bg-red-500/10 text-red-500",
  };

  const progressColors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl p-5 bg-[#1e293b] border border-white/5 shadow-sm",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 text-slate-400">
          <Icon className="size-5" />
          <p className="text-sm font-semibold">{label}</p>
        </div>
        <span
          className={cn(
            "px-2 py-1 text-xs font-bold rounded",
            badgeColors[badgeColor]
          )}
        >
          {badge}
        </span>
      </div>
      <div>
        <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      </div>
      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
        <div
          className={cn("h-full rounded-full", progressColors[badgeColor])}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
