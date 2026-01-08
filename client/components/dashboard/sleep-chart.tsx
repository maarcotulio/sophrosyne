export function SleepChart() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex flex-col rounded-2xl bg-[#1e293b] p-6 ring-1 ring-white/5 lg:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Sleep Analysis</h3>
          <p className="text-sm text-slate-400">Last 7 Days Performance</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold text-white">
            7.5 <span className="text-sm font-normal text-slate-400">hrs avg</span>
          </span>
        </div>
      </div>

      <div className="relative flex h-64 w-full flex-col justify-end gap-2">
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 478 150"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d="M0 109C18.15 109 18.15 21 36.3 21C54.46 21 54.46 41 72.6 41C90.77 41 90.77 93 108.9 93C127.08 93 127.08 33 145.2 33C163.38 33 163.38 101 181.5 101C199.7 101 199.7 61 217.8 61C236 61 236 45 254.1 45C272.3 45 272.3 121 290.4 121C308.6 121 308.6 149 326.7 149C344.9 149 344.9 1 363 1C381.2 1 381.2 81 399.4 81C417.5 81 417.5 129 435.7 129C453.8 129 453.8 25 472 25V150H0V109Z"
            fill="url(#chartGradient)"
          />

          {/* Line */}
          <path
            d="M0 109C18.15 109 18.15 21 36.3 21C54.46 21 54.46 41 72.6 41C90.77 41 90.77 93 108.9 93C127.08 93 127.08 33 145.2 33C163.38 33 163.38 101 181.5 101C199.7 101 199.7 61 217.8 61C236 61 236 45 254.1 45C272.3 45 272.3 121 290.4 121C308.6 121 308.6 149 326.7 149C344.9 149 344.9 1 363 1C381.2 1 381.2 81 399.4 81C417.5 81 417.5 129 435.7 129C453.8 129 453.8 25 472 25"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Data points */}
          <circle cx="36.3" cy="21" r="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="145.2" cy="33" r="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="254.1" cy="45" r="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="363" cy="1" r="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
        </svg>

        {/* Day labels */}
        <div className="flex justify-between px-2 pt-4">
          {days.map((day) => (
            <span key={day} className="text-xs font-bold text-slate-400">
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
