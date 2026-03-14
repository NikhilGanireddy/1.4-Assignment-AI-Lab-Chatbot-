import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 py-16">
      <section className="w-full rounded-3xl border border-white/12 bg-slate-900/72 p-8 text-center shadow-2xl shadow-black/30 sm:p-10">
        <p className="text-xs font-medium tracking-[0.14em] text-slate-400 uppercase">
          AI Lab Artifact
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
          CareerPrep AI
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          A focused interview-prep chatbot that helps users practice clearer
          behavioral and technical responses, explain projects effectively, and
          improve weak answers with structured feedback.
        </p>
        <Link
          href="/careerprep-ai"
          className="mt-8 inline-flex items-center justify-center rounded-xl border border-cyan-300/45 bg-cyan-300/18 px-5 py-3 text-sm font-semibold text-cyan-100 transition-all hover:bg-cyan-300/28"
        >
          Open CareerPrep AI
        </Link>
        <p className="mt-4 text-xs text-slate-500">
          Created by Deepak Prabhu Nikhil Ganireddy
        </p>
      </section>
    </main>
  );
}
