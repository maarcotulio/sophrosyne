import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressRing({
  progress,
  size = 320,
  strokeWidth = 3,
  className,
}: ProgressRingProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className={cn("size-full -rotate-90 transform", className)}
      viewBox="0 0 100 100"
      style={{ width: size, height: size }}
    >
      {/* Background circle */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="#334155"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="#3b82f6"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-all duration-300 ease-out"
      />
    </svg>
  );
}
