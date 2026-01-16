"use client";

import {
  Sidebar,
  StatCard,
  XPProgress,
  SleepChart,
  TodaysFocus,
} from "@/components/dashboard";
import {
  Flame,
  CheckCircle,
  PieChart,
  Trophy,
  TrendingUp,
  Plus,
  ArrowUp,
  ChevronsUp,
} from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: "Alex",
    email: "alex@example.com",
    avatar: "https://i.pravatar.cc/150?u=1",
  })

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-[#0f172a] p-4 md:p-8">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                Welcome back, {user.name}
              </h2>
              <p className="text-slate-400">Let&apos;s crush your goals today.</p>
            </div>
            <button className="group flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 hover:shadow-blue-500/40">
              <Plus className="size-5" />
              <span>Add New Habit</span>
            </button>
          </div>

          {/* XP Progress */}
          <XPProgress
            level={12}
            title="Consistency Master"
            currentXP={1250}
            maxXP={1500}
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Daily Streak"
              value="14 Days"
              icon={Flame}
              iconBgClass="bg-orange-500/10"
              iconColorClass="text-orange-500"
              trendIcon={TrendingUp}
              trendText="+1 from yesterday"
            />
            <StatCard
              title="Habits Done"
              value="5/8"
              icon={CheckCircle}
              iconBgClass="bg-blue-500/10"
              iconColorClass="text-blue-400"
              trendIcon={Plus}
              trendText="2 completed recently"
            />
            <StatCard
              title="Completion Rate"
              value="62%"
              icon={PieChart}
              iconBgClass="bg-purple-500/10"
              iconColorClass="text-purple-400"
              trendIcon={ArrowUp}
              trendText="+5% this week"
            />
            <StatCard
              title="Global Rank"
              value="#4205"
              icon={Trophy}
              iconBgClass="bg-yellow-500/10"
              iconColorClass="text-yellow-400"
              trendIcon={ChevronsUp}
              trendText="Top 15%"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <SleepChart />
            <TodaysFocus />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-slate-400 opacity-60">
            <p>© 2025 Sophrosyne Inc.</p>
            <p>Last synced: 2 mins ago</p>
          </div>
        </div>
      </main>
    </div>
  );
}
