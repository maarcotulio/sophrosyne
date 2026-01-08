import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgClass: string;
  iconColorClass: string;
  trendIcon?: LucideIcon;
  trendText?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconBgClass,
  iconColorClass,
  trendIcon: TrendIcon,
  trendText,
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-[#1e293b] p-5 ring-1 ring-white/5 transition-transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
        <span
          className={cn(
            "flex size-8 items-center justify-center rounded-lg",
            iconBgClass,
            iconColorClass
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>
      {trendText && (
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-500">
          {TrendIcon && <TrendIcon className="size-4" />}
          <span>{trendText}</span>
        </div>
      )}
    </div>
  );
}
