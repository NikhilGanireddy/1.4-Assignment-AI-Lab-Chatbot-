import type { Metadata } from "next";

import { ChatWindow } from "@/components/careerprep/ChatWindow";
import { DesignThinkingNotes } from "@/components/careerprep/DesignThinkingNotes";
import { HeroSection } from "@/components/careerprep/HeroSection";
import { TestScenarios } from "@/components/careerprep/TestScenarios";

export const metadata: Metadata = {
  title: "CareerPrep AI",
  description:
    "Portfolio-quality interview preparation chatbot for students and early-career developers.",
};

export default function CareerPrepAIPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[86rem] px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10">
      <HeroSection />

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.85fr)_minmax(21rem,1fr)] xl:items-start">
        <ChatWindow />

        <aside className="space-y-6 xl:sticky xl:top-6">
          <DesignThinkingNotes />
          <TestScenarios />
        </aside>
      </div>
    </main>
  );
}
