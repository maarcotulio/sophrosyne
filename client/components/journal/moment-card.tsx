import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface MomentData {
  id: string;
  date: string;
  title: string;
  description: string;
  tag: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  imageUrl?: string;
}

interface MomentCardProps {
  moment: MomentData;
  className?: string;
}

export function MomentCard({ moment, className }: MomentCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 p-6 rounded-2xl bg-[#1e293b] border border-white/10 hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer transform hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex items-center justify-center size-10 rounded-full",
              moment.iconBgColor
            )}
          >
            <moment.icon className={cn("size-5", moment.iconColor)} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {moment.date}
            </p>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-500 transition-colors">
              {moment.title}
            </h3>
          </div>
        </div>
        <div className="flex gap-1">
          <span className="px-2.5 py-1 rounded-md bg-white/5 text-xs font-medium text-slate-300 border border-white/10">
            {moment.tag}
          </span>
        </div>
      </div>
      <p className="text-slate-300 leading-relaxed">{moment.description}</p>
      {moment.imageUrl && (
        <div className="flex items-center gap-4 mt-2">
          <div
            className="h-24 w-32 rounded-lg bg-cover bg-center border border-white/10"
            style={{ backgroundImage: `url('${moment.imageUrl}')` }}
          />
        </div>
      )}
    </article>
  );
}
