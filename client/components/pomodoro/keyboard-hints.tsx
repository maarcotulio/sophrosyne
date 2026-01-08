interface KeyboardShortcut {
  key: string;
  label: string;
}

interface KeyboardHintsProps {
  shortcuts?: KeyboardShortcut[];
}

const defaultShortcuts: KeyboardShortcut[] = [
  { key: "SPACE", label: "Start/Pause" },
  { key: "R", label: "Reset" },
  { key: "ESC", label: "Skip" },
];

export function KeyboardHints({ shortcuts = defaultShortcuts }: KeyboardHintsProps) {
  return (
    <div className="w-full flex justify-center gap-8 py-4 opacity-50 hover:opacity-100 transition-opacity">
      {shortcuts.map((shortcut) => (
        <div key={shortcut.key} className="flex items-center gap-2">
          <kbd className="px-2 py-0.5 rounded bg-[#334155] text-xs text-white font-mono">
            {shortcut.key}
          </kbd>
          <span className="text-xs text-slate-400">{shortcut.label}</span>
        </div>
      ))}
    </div>
  );
}
