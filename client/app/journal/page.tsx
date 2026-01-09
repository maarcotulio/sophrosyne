"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard";
import {
  JournalStatCard,
  FilterTabs,
  MomentCard,
  LogMomentForm,
  JournalHeader,
} from "@/components/journal";
import type { MomentData } from "@/components/journal";
import {
  Sparkles,
  Flame,
  CalendarDays,
  PersonStanding,
  Brain,
  Droplets,
  ChevronDown,
} from "lucide-react";

const categories = [
  "All",
  "Achievements",
  "Reflections",
  "Running",
  "Meditation",
];

const mockMoments: MomentData[] = [
  {
    id: "1",
    date: "Oct 24, 2023",
    title: "Ran my first 5k without stopping",
    description:
      "I honestly didn't think I could do it, but the weather was perfect. Around the 3km mark, I hit a wall, but I remembered my breathing technique and pushed through. Feeling incredibly proud of this milestone!",
    tag: "Achievement",
    icon: PersonStanding,
    iconBgColor: "bg-blue-500/20",
    iconColor: "text-blue-500",
    imageUrl: "/running-shoes.jpg",
  },
  {
    id: "2",
    date: "Oct 22, 2023",
    title: "Clarity during morning meditation",
    description:
      'Sat for 20 minutes today. Realized that I\'ve been holding onto a lot of anxiety about the upcoming project launch. It helps to just name the feeling. "Anxiety is present."',
    tag: "Reflection",
    icon: Brain,
    iconBgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    id: "3",
    date: "Oct 20, 2023",
    title: "Hit hydration goal for 7 days straight",
    description:
      "My skin feels clearer and I have way fewer headaches in the afternoon. It's amazing what 3 liters of water a day can do. Buying that large bottle was the key.",
    tag: "Habit Win",
    icon: Droplets,
    iconBgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMoments =
    activeCategory === "All"
      ? mockMoments
      : mockMoments.filter((moment) => {
          const categoryMap: Record<string, string[]> = {
            Achievements: ["Achievement", "Habit Win"],
            Reflections: ["Reflection"],
            Running: ["Achievement"],
            Meditation: ["Reflection"],
          };
          return categoryMap[activeCategory]?.includes(moment.tag);
        });

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-[#0f172a] p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 space-y-8">
            {/* Header */}
            <JournalHeader />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <JournalStatCard
                icon={Sparkles}
                label="Total Moments"
                value="42"
                trend="+2% this week"
              />
              <JournalStatCard
                icon={Flame}
                label="Current Streak"
                value="12 days"
                trend="Personal best!"
              />
              <JournalStatCard
                icon={CalendarDays}
                label="Reflection Days"
                value="28"
                trend="+5% vs last month"
              />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column - Moments List */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Filter Tabs */}
              <FilterTabs
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              {/* Moment Cards */}
              {filteredMoments.map((moment) => (
                <MomentCard key={moment.id} moment={moment} />
              ))}

              {/* Load More Button */}
              <div className="flex justify-center pt-4">
                <button className="text-slate-400 hover:text-white font-medium text-sm flex items-center gap-2 transition-colors">
                  Load previous entries
                  <ChevronDown className="size-4" />
                </button>
              </div>
            </div>

            {/* Right Column - Log Form */}
            <div className="lg:col-span-4 sticky top-8 hidden lg:block">
              <LogMomentForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
