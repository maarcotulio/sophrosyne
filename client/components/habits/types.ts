import type { LucideIcon } from "lucide-react";

export interface HabitData {
  id: string;
  name: string;
  category: string;
  frequency: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  reminder?: string;
  goal?: string;
  streak: number;
}
