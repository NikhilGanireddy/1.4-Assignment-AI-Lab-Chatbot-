import type { FeedbackPayload } from "@/lib/careerprep-data";

interface FeedbackCardProps {
  feedback: FeedbackPayload;
}

function scoreTone(score: number): string {
  if (score >= 8) {
    return "text-emerald-300";
  }

  if (score >= 6) {
    return "text-amber-300";
  }

  return "text-rose-300";
}

function scoreBar(score: number): string {
  if (score >= 8) {
    return "bg-emerald-400";
  }

  if (score >= 6) {
    return "bg-amber-400";
  }

  return "bg-rose-400";
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <article className="mt-3 rounded-2xl border border-cyan-200/30 bg-slate-950/80 p-4 text-sm text-slate-200">
      <div className="space-y-4">
        <section>
          <h4 className="font-semibold text-cyan-200">1. What worked</h4>
          <p className="mt-1 leading-6 text-slate-300">{feedback.whatWorked}</p>
        </section>

        <section>
          <h4 className="font-semibold text-cyan-200">
            2. What needs improvement
          </h4>
          <p className="mt-1 leading-6 text-slate-300">{feedback.needsImprovement}</p>
        </section>

        <section>
          <h4 className="font-semibold text-cyan-200">3. Stronger version</h4>
          <p className="mt-1 leading-6 whitespace-pre-line text-slate-300">
            {feedback.strongerVersion}
          </p>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-3">
            <h4 className="font-semibold text-cyan-200">4. Clarity score</h4>
            <p className={`mt-1 text-base font-semibold ${scoreTone(feedback.clarityScore)}`}>
              {feedback.clarityScore}/10
            </p>
            <div className="mt-2 h-1.5 rounded-full bg-slate-700">
              <div
                className={`h-full rounded-full ${scoreBar(feedback.clarityScore)}`}
                style={{ width: `${feedback.clarityScore * 10}%` }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-3">
            <h4 className="font-semibold text-cyan-200">5. Confidence score</h4>
            <p
              className={`mt-1 text-base font-semibold ${scoreTone(feedback.confidenceScore)}`}
            >
              {feedback.confidenceScore}/10
            </p>
            <div className="mt-2 h-1.5 rounded-full bg-slate-700">
              <div
                className={`h-full rounded-full ${scoreBar(feedback.confidenceScore)}`}
                style={{ width: `${feedback.confidenceScore * 10}%` }}
              />
            </div>
          </div>
        </section>

        <section>
          <h4 className="font-semibold text-cyan-200">6. Suggested next step</h4>
          <p className="mt-1 leading-6 text-slate-300">{feedback.nextStep}</p>
        </section>
      </div>
    </article>
  );
}
