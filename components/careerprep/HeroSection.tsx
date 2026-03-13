export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/12 bg-slate-900/70 p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -top-14 h-48 w-48 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/12 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-cyan-100 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
          AI Lab Artifact
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-[2.8rem] lg:leading-tight">
          CareerPrep AI
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
          A design-thinking-driven interview coach for students and early-career
          developers. It improves answer quality through mode-specific prompts,
          structured rewrites, and explicit safety boundaries.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
            <p className="text-[11px] font-medium tracking-[0.12em] text-slate-500 uppercase">
              Target Users
            </p>
            <p className="mt-2 text-sm text-slate-200">
              College students, internship seekers, early-career developers
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
            <p className="text-[11px] font-medium tracking-[0.12em] text-slate-500 uppercase">
              Design Method
            </p>
            <p className="mt-2 text-sm text-slate-200">
              Audience framing, scenario testing, and iterative prompt design
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
            <p className="text-[11px] font-medium tracking-[0.12em] text-slate-500 uppercase">
              Success Signal
            </p>
            <p className="mt-2 text-sm text-slate-200">
              Clearer answers, stronger project narratives, safer coaching behavior
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
