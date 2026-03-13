import type { InterviewMode, StarterPrompt } from "@/lib/careerprep-data";

interface PromptChipsProps {
  prompts: StarterPrompt[];
  activeMode: InterviewMode;
  onPromptSelect: (prompt: StarterPrompt) => void;
}

export function PromptChips({
  prompts,
  activeMode,
  onPromptSelect,
}: PromptChipsProps) {
  const modePrompts = prompts.filter(
    (prompt) => !prompt.mode || prompt.mode === activeMode,
  );

  return (
    <section className="rounded-3xl border border-white/12 bg-slate-900/70 p-5 shadow-2xl shadow-black/25">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium tracking-[0.13em] text-slate-400 uppercase">
          Starter Prompts
        </p>
        <span className="text-xs text-slate-500">Tap to run in chat</span>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {modePrompts.map((prompt) => (
          <button
            key={prompt.id}
            type="button"
            onClick={() => onPromptSelect(prompt)}
            className="group rounded-2xl border border-white/12 bg-slate-950/55 px-4 py-3 text-left text-sm text-slate-200 transition-all hover:border-cyan-300/55 hover:bg-cyan-300/10"
          >
            <span className="inline-flex items-center gap-2 leading-6">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-200/80 transition-all group-hover:scale-125" />
              {prompt.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
