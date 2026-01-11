"use client";

import { Sidebar } from "@/components/dashboard";
import {
  HabitsHeader,
  HabitsSearchBar,
  HabitCard,
  NewHabitForm,
  CreateHabitCard,
} from "@/components/habits";
import type { HabitData } from "@/components/habits";
import {
  PersonStanding,
  BookOpen,
  Droplets,
  Sparkles,
} from "lucide-react";

const mockHabits: HabitData[] = [
  {
    id: "1",
    name: "Morning Jog",
    category: "Health",
    frequency: "Daily",
    icon: PersonStanding,
    iconBgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
    reminder: "7:00 AM",
    streak: 12,
  },
  {
    id: "2",
    name: "Read Book",
    category: "Mind",
    frequency: "3x Week",
    icon: BookOpen,
    iconBgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
    streak: 5,
  },
  {
    id: "3",
    name: "Drink Water",
    category: "Health",
    frequency: "Daily",
    icon: Droplets,
    iconBgColor: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    goal: "Goal: 8x",
    streak: 42,
  },
  {
    id: "4",
    name: "Meditation",
    category: "Wellness",
    frequency: "Daily",
    icon: Sparkles,
    iconBgColor: "bg-orange-500/20",
    iconColor: "text-orange-400",
    reminder: "8:00 PM",
    streak: 20,
  },
];

export default function HabitsPage() {
  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-[#0f172a] p-4 md:p-8">
        <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full gap-8">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-8 min-w-0">
            <HabitsHeader />
            <HabitsSearchBar />

            {/* Habits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockHabits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
              <CreateHabitCard />
            </div>
          </div>

          {/* Sidebar Form - Desktop only */}
          <aside className="hidden lg:flex w-full max-w-[400px] flex-col gap-6">
            <div className="sticky top-8">
              <NewHabitForm />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
