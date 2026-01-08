"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard";
import {
  PomodoroHeader,
  TimerModeTabs,
  TimerDisplay,
  TimerControls,
  TaskSelector,
  DailyGoal,
  KeyboardHints,
  type TimerMode,
} from "@/components/pomodoro";

const mockTasks = [
  { id: "1", name: "Reading (30m)" },
  { id: "2", name: "Coding Project" },
  { id: "3", name: "Meditation" },
  { id: "4", name: "Workout" },
];

export default function PomodoroPage() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTask, setSelectedTask] = useState("1");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Static demo values
  const minutes = 25;
  const seconds = 0;
  const progress = 75;

  const handleStartPause = () => setIsRunning(!isRunning);
  const handleReset = () => setIsRunning(false);
  const handleSkip = () => setMode("short-break");

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-[#0f172a] p-4 md:p-6">
        <div className="mx-auto flex max-w-[960px] flex-col gap-6">
          <PomodoroHeader />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Timer Panel */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="bg-[#1e293b] rounded-2xl border border-white/10 p-6 md:p-10 flex flex-col items-center justify-between shadow-xl relative overflow-hidden h-full min-h-[500px]">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Mode Tabs */}
                <div className="z-10 mb-8">
                  <TimerModeTabs activeMode={mode} onModeChange={setMode} />
                </div>

                {/* Timer Display */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <TimerDisplay
                    minutes={minutes}
                    seconds={seconds}
                    progress={progress}
                    statusLabel={mode === "focus" ? "Focusing" : "Break"}
                  />
                </div>

                {/* Controls */}
                <div className="z-10 w-full flex flex-col items-center gap-6 mt-8">
                  <TimerControls
                    isRunning={isRunning}
                    onStartPause={handleStartPause}
                    onReset={handleReset}
                    onSkip={handleSkip}
                  />
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <TaskSelector
                tasks={mockTasks}
                selectedTaskId={selectedTask}
                onTaskChange={setSelectedTask}
                onAddNew={() => {}}
              />
              <DailyGoal
                completed={4}
                total={8}
                totalFocusTime="1h 40m"
                streakDays={5}
                soundEnabled={soundEnabled}
                onSoundToggle={() => setSoundEnabled(!soundEnabled)}
              />
            </div>
          </div>

          <KeyboardHints />
        </div>
      </main>
    </div>
  );
}
