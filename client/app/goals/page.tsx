"use client";

import { Sidebar } from "@/components/dashboard";
import {
  GoalsHeader,
  GoalsStatCard,
  GoalsTabNav,
  GoalCard,
  CreateGoalCard,
} from "@/components/goals";
import type { GoalData, GoalStatData } from "@/components/goals";
import { Flag, Hourglass, CheckCircle, Flame } from "lucide-react";

const mockStats: GoalStatData[] = [
  {
    label: "Total Goals",
    value: "12",
    trend: "+2 this month",
    icon: Flag,
  },
  {
    label: "In Progress",
    value: "8",
    trend: "66% active",
    icon: Hourglass,
  },
  {
    label: "Completed",
    value: "4",
    trend: "+5% rate",
    icon: CheckCircle,
  },
  {
    label: "Best Streak",
    value: "15 Days",
    trend: "Personal Best",
    icon: Flame,
    isHighlighted: true,
  },
];

const mockGoals: GoalData[] = [
  {
    id: "1",
    title: "Run a Marathon",
    description:
      '"To prove to myself that I can push beyond my limits and improve cardiovascular health."',
    category: "Fitness",
    type: "Long Term",
    deadline: "Dec 2024",
    progress: 45,
    linkedHabits: [
      { name: "Morning 5k Run", status: "4/5 this week", isActive: true },
      { name: "Stretching Routine", status: "1/7 this week", isActive: false },
    ],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFT0Cw_3AYJC3WaKTiNLbjVd-aDATwaDj1NEUjRFlIrEsLh9SZh1kHwIDJde9tx8Rtd2wbygfymqvK0uSSKcFtxUhFp0bi9tbizbkO4n-Ul6ANjjj2aaSnSVINJg8iW5HUwFjPmoA4oLxg4P8MG_Kox0zGn78NmbvQ5L_5oeDHt6XvHpdHpdkfbZcy2zJ827i2XMHu868_kQhfPt4XoBVh9W03XDR16DVehHkrfo7eluEXiuEtpTrq28s1EVmGAfIwPV2i9AgRiHs",
  },
  {
    id: "2",
    title: "Save $10,000",
    description:
      '"Building an emergency fund for peace of mind and future investments."',
    category: "Finance",
    type: "Short Term",
    deadline: "Oct 2024",
    progress: 72,
    linkedHabits: [
      { name: "No Takeout", status: "Streak: 12 days", isActive: true },
      { name: "Weekly Deposit", status: "Done", isActive: true },
    ],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3hugcbkolFT2pSfzzQ9i7VNkMnTVmxnpNjib-TLnBHmbjQ0ej5PQbKhMkN1w685Ll9i2evtgxcVmw6sk2JBpYG2108MngCPdbIWs81D7ENU17XmaSb2cYxJoTavEZd27LWVnW_fkysvrH8-mjOEC7yeuOufFbNbBN-TJHO7uPNljvTcZiWfdFbICnP7LNMeA0YSJRp3EAJJb6Gg-hAoGWuVRVvUXg9uODGhvOiqIaB_ByUZuCBc85drjT2Dh-lntl-OexeeNKMx0",
  },
  {
    id: "3",
    title: "Master Spanish",
    description:
      '"To travel through South America and converse fluently with locals."',
    category: "Skills",
    type: "Long Term",
    deadline: "No Deadline",
    progress: 30,
    progressLabel: "Proficiency Level",
    progressColor: "bg-yellow-500",
    linkedHabits: [
      { name: "15m Duolingo", status: "Streak: 45 days", isActive: true },
      { name: "Listen to Podcast", status: "0/3 this week", isActive: false },
    ],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIs0-kzCxpLrRVaDJ13cmfdemewNjvHhWdtRxY6iAvviXgVm1RY55BhqcesGADvBHwykqOamAsK-veLh6GfMIdR9kDzqpF5I4lP62__92_vMIwnoho1NSksbi7O5_L93J6RXB2-2Kp7kYYqu6JcNgnrxLqEM2Y8l1KQ-tXpgAaqigMEvSRN5Cy9kGBvleTTBS_vCnNmDe9py0l19WtMOckYyt1aeXlhEQH9lNlnhhlPkNHf9ebSMuLG0_TrRfxsJya21Tv9SSfJXo",
  },
];

export default function GoalsPage() {
  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-[#0f172a] p-4 md:p-8">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-8">
          {/* Header */}
          <GoalsHeader />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockStats.map((stat) => (
              <GoalsStatCard key={stat.label} stat={stat} />
            ))}
          </div>

          {/* Tab Navigation */}
          <GoalsTabNav className="mb-2" />

          {/* Section Header */}
          <h2 className="text-white tracking-tight text-2xl md:text-[28px] font-bold leading-tight flex items-center gap-3">
            <Flame className="size-6 text-blue-500" />
            Priority Focus
          </h2>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
            <CreateGoalCard />
          </div>
        </div>
      </main>
    </div>
  );
}
