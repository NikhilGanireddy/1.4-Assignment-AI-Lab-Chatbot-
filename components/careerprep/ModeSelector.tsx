import type { InterviewMode, InterviewModeOption } from "@/lib/careerprep-data";

interface ModeSelectorProps {
  modes: InterviewModeOption[];
  activeMode: InterviewMode;
  onSelectMode: (mode: InterviewMode) => void;
}

export function ModeSelector({
  modes,
  activeMode,
  onSelectMode,
}: ModeSelectorProps) {
  const activeLabel = modes.find((mode) => mode.id === activeMode)?.label;

  return (
    <section className="rounded-3xl border border-white/12 bg-slate-900/70 p-5 shadow-2xl shadow-black/25">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium tracking-[0.13em] text-slate-400 uppercase">
          Coaching Mode
        </p>
        <span className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium text-cyan-100">
          Active: {activeLabel}
        </span>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
        {modes.map((mode) => {
          const isActive = mode.id === activeMode;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelectMode(mode.id)}
              className={`group rounded-2xl border px-4 py-3 text-left transition-all ${
                isActive
                  ? "border-cyan-300/55 bg-cyan-300/12 shadow-sm shadow-cyan-500/25"
                  : "border-white/10 bg-slate-950/45 hover:border-white/25 hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-slate-100">{mode.label}</p>
                <span
                  className={`mt-1 h-2.5 w-2.5 rounded-full ${
                    isActive ? "bg-cyan-200" : "bg-slate-600 group-hover:bg-slate-400"
                  }`}
                />
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                {mode.coachingFocus}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
