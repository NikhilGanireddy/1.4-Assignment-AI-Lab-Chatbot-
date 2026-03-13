"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { FeedbackCard } from "@/components/careerprep/FeedbackCard";
import { ModeSelector } from "@/components/careerprep/ModeSelector";
import { PromptChips } from "@/components/careerprep/PromptChips";
import {
  CHAT_EMPTY_STATE_ITEMS,
  INITIAL_GREETING,
  INTERVIEW_MODES,
  MODE_SWITCH_CONFIRMATIONS,
  STARTER_PROMPTS,
  type ChatMessage,
  type ChatRole,
  type FeedbackPayload,
  type InterviewMode,
  type StarterPrompt,
} from "@/lib/careerprep-data";
import { generateMockReply } from "@/lib/mock-chatbot";

const MOCK_RESPONSE_DELAY_MS = 780;

function createMessage(
  role: ChatRole,
  content: string,
  feedback?: FeedbackPayload,
): ChatMessage {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return {
    id,
    role,
    content,
    timestamp: new Date().toISOString(),
    feedback,
  };
}

function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function placeholderForMode(mode: InterviewMode): string {
  switch (mode) {
    case "behavioral":
      return "Paste a behavioral draft or ask for a question...";
    case "technical":
      return "Ask a technical question or paste your reasoning...";
    case "resume":
      return "Paste one resume bullet to refine...";
    case "project":
      return "Share your project problem, stack, and impact...";
    case "confidence":
      return "Share where interview confidence drops for you...";
  }
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-slate-400">Interview Coach</span>
      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-900/70 px-2 py-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-200" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-200 [animation-delay:120ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-200 [animation-delay:240ms]" />
      </span>
      <span className="text-xs text-slate-500">thinking...</span>
    </div>
  );
}

export function ChatWindow() {
  const [activeMode, setActiveMode] = useState<InterviewMode>("behavioral");
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage("assistant", INITIAL_GREETING),
  ]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const activeModeMeta = useMemo(
    () => INTERVIEW_MODES.find((mode) => mode.id === activeMode),
    [activeMode],
  );

  const userTurns = useMemo(
    () => messages.filter((message) => message.role === "user").length,
    [messages],
  );

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) {
      return;
    }

    scroller.scrollTo({
      top: scroller.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  function switchMode(nextMode: InterviewMode, announce = true) {
    if (nextMode === activeMode) {
      return;
    }

    setActiveMode(nextMode);

    if (announce) {
      const confirmation = createMessage(
        "assistant",
        MODE_SWITCH_CONFIRMATIONS[nextMode],
      );
      setMessages((current) => [...current, confirmation]);
    }
  }

  async function sendMessage(rawInput: string, modeOverride?: InterviewMode) {
    const trimmed = rawInput.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const selectedMode = modeOverride ?? activeMode;
    const userMessage = createMessage("user", trimmed);
    const nextHistory = [...messages, userMessage];

    setMessages(nextHistory);
    setDraft("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, MOCK_RESPONSE_DELAY_MS);
      });

      const reply = await generateMockReply(trimmed, selectedMode, nextHistory);
      const assistantMessage = createMessage(
        "assistant",
        reply.content,
        reply.feedback,
      );

      setMessages((currentMessages) => [...currentMessages, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function handlePromptSelect(prompt: StarterPrompt) {
    if (isLoading) {
      return;
    }

    if (prompt.mode && prompt.mode !== activeMode) {
      switchMode(prompt.mode, false);
    }

    void sendMessage(prompt.prompt, prompt.mode);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(draft);
  }

  return (
    <section className="space-y-4">
      <ModeSelector
        modes={INTERVIEW_MODES}
        activeMode={activeMode}
        onSelectMode={(mode) => switchMode(mode, true)}
      />

      <PromptChips
        prompts={STARTER_PROMPTS}
        activeMode={activeMode}
        onPromptSelect={handlePromptSelect}
      />

      <div className="rounded-3xl border border-white/12 bg-slate-900/78 p-5 shadow-2xl shadow-black/30 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-[0.13em] text-slate-400 uppercase">
              Coaching Session
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-100">
              {activeModeMeta?.label}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
              {activeModeMeta?.description}
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-right">
            <p className="text-[11px] font-medium tracking-[0.08em] text-cyan-100 uppercase">
              Interview Coach
            </p>
            <p className="mt-0.5 text-xs text-cyan-50">Focused on {activeModeMeta?.label}</p>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-5 h-[28rem] space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/45 p-3 sm:h-[33rem] sm:p-4"
        >
          {userTurns === 0 ? (
            <article className="rounded-2xl border border-dashed border-cyan-300/35 bg-cyan-300/8 p-4">
              <p className="text-sm font-semibold text-cyan-100">
                Start a practice round
              </p>
              <div className="mt-3 grid gap-2">
                {CHAT_EMPTY_STATE_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-slate-900/60 p-3"
                  >
                    <p className="text-xs font-semibold tracking-[0.08em] text-slate-300 uppercase">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <article
                key={message.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[93%] rounded-2xl border px-4 py-3 sm:max-w-[80%] ${
                    isUser
                      ? "border-cyan-300/35 bg-cyan-400/18 text-slate-100"
                      : "border-white/10 bg-slate-900/85 text-slate-200"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="text-[11px] font-medium tracking-[0.08em] text-slate-400 uppercase">
                      {isUser ? "You" : "Interview Coach"}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>

                  <p className="text-sm leading-6 whitespace-pre-line">
                    {message.content}
                  </p>

                  {message.feedback ? (
                    <FeedbackCard feedback={message.feedback} />
                  ) : null}
                </div>
              </article>
            );
          })}

          {isLoading ? (
            <article className="flex justify-start">
              <div className="max-w-[93%] rounded-2xl border border-white/10 bg-slate-900/85 px-4 py-3 sm:max-w-[80%]">
                <TypingIndicator />
              </div>
            </article>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={placeholderForMode(activeMode)}
            className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/45"
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={isLoading || !draft.trim()}
            className="rounded-xl border border-cyan-300/45 bg-cyan-300/20 px-5 py-3 text-sm font-semibold text-cyan-100 transition-all hover:bg-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </form>

        <p className="mt-3 text-xs text-slate-500">
          Tip: include one real example and one metric for sharper feedback.
        </p>
      </div>
    </section>
  );
}
