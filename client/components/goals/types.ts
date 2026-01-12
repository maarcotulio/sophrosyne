import type { LucideIcon } from "lucide-react";

export interface LinkedHabit {
  name: string;
  status: string;
  isActive: boolean;
}

export interface GoalData {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "Long Term" | "Short Term";
  deadline?: string;
  progress: number;
  progressLabel?: string;
  progressColor?: string;
  linkedHabits: LinkedHabit[];
  imageUrl?: string;
}

export interface GoalStatData {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  isHighlighted?: boolean;
}
