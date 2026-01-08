import { cn } from "@/lib/utils";

interface Session {
  id: string;
  time: string;
  completed: boolean;
}

interface SessionBarsProps {
  sessions: Session[];
  totalSlots?: number;
}

export function SessionBars({ sessions, totalSlots = 8 }: SessionBarsProps) {
  const completedCount = sessions.filter((s) => s.completed).length;
  const emptySlots = Math.max(0, totalSlots - sessions.length);

  return (
    <div className="flex gap-1.5 h-10 items-end">
      {sessions.map((session) => (
        <div
          key={session.id}
          className={cn(
            "flex-1 h-full rounded-sm relative group cursor-pointer",
            session.completed ? "bg-blue-500/20" : "bg-[#334155]/30"
          )}
          title={session.completed ? `Session: ${session.time}` : "Incomplete"}
        >
          {session.completed && (
            <div className="absolute bottom-0 w-full h-full bg-blue-500 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      ))}
      {/* Empty slots for remaining goal */}
      {Array.from({ length: emptySlots }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="flex-1 bg-[#334155]/30 h-full rounded-sm"
          title="Pending session"
        />
      ))}
    </div>
  );
}
