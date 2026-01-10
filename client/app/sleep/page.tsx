"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard";
import {
  SleepHeader,
  SleepStatCard,
  TimeRangeTabs,
  DurationChart,
  SleepStagesDonut,
  SleepInsightCard,
  SleepHistoryTable,
} from "@/components/sleep";
import { Gauge, Clock, Bed, Waves, Lightbulb, TrendingUp } from "lucide-react";

export default function SleepPage() {
  const [activeRange, setActiveRange] = useState("1 Week");

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-[#0f172a] p-4 md:p-8">
        <div className="mx-auto max-w-[1400px] flex flex-col gap-8">
          {/* Header */}
          <SleepHeader />

          {/* Time Range Tabs */}
          <TimeRangeTabs
            activeRange={activeRange}
            onRangeChange={setActiveRange}
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SleepStatCard
              icon={Gauge}
              label="Sleep Score"
              value="85"
              badge="+5%"
              badgeColor="blue"
              description="Excellent quality"
              progress={85}
            />
            <SleepStatCard
              icon={Clock}
              label="Avg. Duration"
              value="7h 42m"
              badge="+12m"
              badgeColor="blue"
              description="Goal: 8h 00m"
              progress={92}
            />
            <SleepStatCard
              icon={Bed}
              label="Avg. Bedtime"
              value="11:30 PM"
              badge="On Track"
              badgeColor="green"
              description="Consistency: High"
              progress={95}
            />
            <SleepStatCard
              icon={Waves}
              label="Deep Sleep"
              value="1h 15m"
              badge="-5%"
              badgeColor="red"
              description="Goal: 1h 30m"
              progress={70}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DurationChart className="lg:col-span-2" />
            <SleepStagesDonut />
          </div>

          {/* Insights and History */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Insights */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white">Insights</h3>
              <SleepInsightCard
                icon={Lightbulb}
                title="Weekly Pattern"
                description={
                  <>
                    You tend to sleep{" "}
                    <span className="text-white font-semibold">
                      30 minutes less
                    </span>{" "}
                    on Thursdays. Try going to bed earlier tonight.
                  </>
                }
                variant="highlighted"
              />
              <SleepInsightCard
                icon={TrendingUp}
                title="Consistency Streak"
                description={
                  <>
                    You&apos;ve hit your bedtime goal for{" "}
                    <span className="text-white font-semibold">4 days</span> in
                    a row. Keep it up!
                  </>
                }
              />
            </div>

            {/* History Table */}
            <SleepHistoryTable className="lg:col-span-2" />
          </div>
        </div>
      </main>
    </div>
  );
}
