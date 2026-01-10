import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SleepInsightCardProps {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  variant?: "highlighted" | "default";
  className?: string;
}

export function SleepInsightCard({
  icon: Icon,
  title,
  description,
  variant = "default",
  className,
}: SleepInsightCardProps) {
  const isHighlighted = variant === "highlighted";

  return (
    <div
      className={cn(
        "p-4 rounded-xl flex gap-4 items-start",
        isHighlighted
          ? "bg-[#1e3a8a] border border-[#1e3a8a]"
          : "bg-[#1e293b] border border-white/5",
        className
      )}
    >
      <div
        className={cn(
          "p-2 rounded-lg shrink-0",
          isHighlighted ? "bg-white/10 text-blue-400" : "bg-white/5 text-slate-300"
        )}
      >
        <Icon className="size-5" />
      </div>
      <div>
        <p
          className={cn(
            "font-bold text-sm mb-1",
            isHighlighted ? "text-white" : "text-white"
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-sm leading-relaxed",
            isHighlighted ? "text-slate-300" : "text-slate-400"
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
