"use client";

import { cn } from "@/lib/utils";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export function FilterTabs({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: FilterTabsProps) {
  return (
    <div
      className={cn(
        "flex gap-2 flex-wrap pb-2 border-b border-white/5",
        className
      )}
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "flex h-9 items-center justify-center px-4 rounded-full text-sm font-medium transition-all",
              isActive
                ? "bg-blue-500 text-white font-bold shadow-sm shadow-blue-500/20 hover:scale-105"
                : "bg-[#1e293b] hover:bg-white/10 text-slate-300 border border-white/10 hover:scale-105"
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
