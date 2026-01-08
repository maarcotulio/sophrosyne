import { Sidebar } from "@/components/dashboard";

export default function PomodoroPage() {
  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-[#0f172a] p-4 md:p-6">
        <div className="mx-auto flex max-w-[960px] flex-col gap-6">
          {/* Page content will be added in subsequent commits */}
        </div>
      </main>
    </div>
  );
}
