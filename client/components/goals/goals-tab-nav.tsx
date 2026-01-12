"use client";

import { useState } from "react";

interface GoalsTabNavProps {
  className?: string;
  tabs?: string[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
}

const defaultTabs = ["Active Goals", "Long-Term", "Short-Term", "Completed"];

export function GoalsTabNav({
  className,
  tabs = defaultTabs,
  defaultTab = "Active Goals",
  onTabChange,
}: GoalsTabNavProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div
      className={`flex border-b border-slate-700 gap-8 overflow-x-auto scrollbar-hide ${className || ""}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`flex flex-col items-center justify-center border-b-[3px] pb-3 px-2 transition-colors whitespace-nowrap ${
            activeTab === tab
              ? "border-b-blue-500 text-white"
              : "border-b-transparent text-slate-400 hover:text-white"
          }`}
        >
          <span className="text-sm font-bold leading-normal tracking-wide">
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
}
