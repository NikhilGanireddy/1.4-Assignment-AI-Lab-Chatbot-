import { DESIGN_THINKING_NOTES } from "@/lib/careerprep-data";

export function DesignThinkingNotes() {
  return (
    <section className="rounded-3xl border border-white/12 bg-slate-900/70 p-5 shadow-2xl shadow-black/25">
      <div>
        <p className="text-xs font-medium tracking-[0.13em] text-slate-400 uppercase">
          Design Record
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-100">
          Design Thinking Notes
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Concise rationale for audience selection, user problem framing,
          constraints, and success criteria.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {DESIGN_THINKING_NOTES.map((section, index) => (
          <article
            key={section.title}
            className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-100">
                {index + 1}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-cyan-200">
                  {section.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {section.summary}
                </p>
              </div>
            </div>

            <ul className="mt-3 list-disc space-y-1.5 pl-10 text-sm leading-6 text-slate-300">
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
