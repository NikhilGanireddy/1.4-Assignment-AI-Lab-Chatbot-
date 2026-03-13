import { TEST_SCENARIOS, type ScenarioType } from "@/lib/careerprep-data";

function scenarioTone(type: ScenarioType): string {
  if (type === "safety") {
    return "border-rose-300/35 bg-rose-300/10 text-rose-100";
  }

  if (type === "feedback") {
    return "border-amber-300/35 bg-amber-300/10 text-amber-100";
  }

  return "border-cyan-300/35 bg-cyan-300/10 text-cyan-100";
}

function scenarioLabel(type: ScenarioType): string {
  if (type === "safety") {
    return "Safety";
  }

  if (type === "feedback") {
    return "Feedback";
  }

  return "Coaching";
}

export function TestScenarios() {
  return (
    <section className="rounded-3xl border border-white/12 bg-slate-900/70 p-5 shadow-2xl shadow-black/25">
      <div>
        <p className="text-xs font-medium tracking-[0.13em] text-slate-400 uppercase">
          Evaluation Set
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-100">
          Test Scenarios
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Representative prompts used to validate coaching quality, feedback
          precision, and safety compliance.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {TEST_SCENARIOS.map((scenario) => (
          <article
            key={scenario.id}
            className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-100">
                {scenario.title}
              </h3>
              <span
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${scenarioTone(scenario.scenarioType)}`}
              >
                {scenarioLabel(scenario.scenarioType)}
              </span>
            </div>

            <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-slate-900/45 p-3">
              <p className="text-xs font-medium tracking-[0.08em] text-slate-500 uppercase">
                Sample Input
              </p>
              <p className="text-sm leading-6 text-slate-300">{scenario.userMessage}</p>
            </div>

            <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-slate-900/45 p-3">
              <p className="text-xs font-medium tracking-[0.08em] text-slate-500 uppercase">
                Expected Behavior
              </p>
              <p className="text-sm leading-6 text-slate-300">
                {scenario.expectedBehavior}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
