import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface JournalStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  className?: string;
}

export function JournalStatCard({
  icon: Icon,
  label,
  value,
  trend,
  className,
}: JournalStatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-[#1e293b] shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="size-6 text-blue-500" />
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
          {label}
        </p>
      </div>
      <p className="text-white tracking-tight text-3xl font-bold">{value}</p>
      <p className="text-blue-500 text-sm font-medium">{trend}</p>
    </div>
  );
}
