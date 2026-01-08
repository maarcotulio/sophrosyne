"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ListChecks,
  BarChart3,
  Settings,
  LogOut,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  className?: string;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: ListChecks, label: "Habits", href: "/habits", active: false },
  { icon: BarChart3, label: "Analytics", href: "/analytics", active: false },
  { icon: Settings, label: "Settings", href: "/settings", active: false },
];

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden md:flex w-64 flex-col border-r border-white/10 bg-[#0f172a]",
        className
      )}
    >
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
              <Image
                src="/avatar-placeholder.png"
                alt="User profile"
                width={48}
                height={48}
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-bold leading-tight">
                Sophrosyne
              </h1>
              <p className="text-slate-400 text-xs font-medium">Level 12</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                  item.active
                    ? "bg-blue-500/20 text-blue-500"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="size-6" />
                <span
                  className={cn(
                    "text-sm",
                    item.active ? "font-semibold" : "font-medium"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4">
          {/* Goal Progress */}
          <div className="rounded-xl bg-[#1e293b] p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">
                Next Goal
              </span>
              <span className="text-xs font-bold text-white">80%</span>
            </div>
            <div className="text-sm font-medium text-white mb-2">
              Read 10 Books
            </div>
            <div className="h-1.5 w-full rounded-full bg-black/40">
              <div
                className="h-1.5 rounded-full bg-blue-500"
                style={{ width: "80%" }}
              />
            </div>
          </div>

          {/* Logout */}
          <button className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-400 transition-colors hover:text-white">
            <LogOut className="size-5" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
