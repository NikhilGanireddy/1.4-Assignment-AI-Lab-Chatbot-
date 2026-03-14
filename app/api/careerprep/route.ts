import OpenAI, { APIError } from "openai";
import { NextResponse } from "next/server";

import type {
  CareerPrepChatRequest,
  CareerPrepChatResponse,
  CareerPrepHistoryMessage,
} from "@/lib/careerprep-api";
import { buildCareerPrepInstructions } from "@/lib/careerprep-prompt";
import type { FeedbackPayload, InterviewMode } from "@/lib/careerprep-data";

export const runtime = "nodejs";

const DEFAULT_MODEL = "gpt-5-mini";
const DEFAULT_FALLBACK_MODEL = "gpt-4.1-mini";
const MAX_HISTORY = 8;
const MAX_MESSAGE_CHARS = 2400;
const MAX_HISTORY_ITEM_CHARS = 1200;

const MISSING_INPUT_ERROR = "Request must include a valid message and mode.";
const INVALID_JSON_ERROR = "Invalid JSON payload.";
const INVALID_BODY_ERROR = "Request body must be a JSON object.";
const MESSAGE_TOO_LONG_ERROR =
  "Message is too long. Please keep it under 2400 characters.";
const GENERIC_UPSTREAM_ERROR =
  "CareerPrep AI is temporarily unavailable. Please try again in a moment.";
const RATE_LIMIT_ERROR =
  "CareerPrep AI is receiving high traffic. Please try again in a few moments.";
const AUTH_ERROR =
  "CareerPrep AI is not configured correctly on the server. Please try again later.";
const CONFIG_ERROR =
  "CareerPrep AI server setup is incomplete. Add a valid OPENAI_API_KEY and restart the server.";
const METHOD_NOT_ALLOWED_ERROR = "Use POST /api/careerprep.";

const VALID_MODES: InterviewMode[] = [
  "behavioral",
  "technical",
  "resume",
  "project",
  "confidence",
];

function jsonError(status: number, error: string) {
  const response: CareerPrepChatResponse = {
    reply: null,
    error,
  };

  return NextResponse.json(response, { status });
}

function isInterviewMode(value: unknown): value is InterviewMode {
  return typeof value === "string" && VALID_MODES.includes(value as InterviewMode);
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeHistory(history: unknown): CareerPrepHistoryMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((item): item is CareerPrepHistoryMessage => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const role = (item as CareerPrepHistoryMessage).role;
      const content = (item as CareerPrepHistoryMessage).content;

      return (
        (role === "user" || role === "assistant") &&
        typeof content === "string" &&
        content.trim().length > 0
      );
    })
    .slice(-MAX_HISTORY)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, MAX_HISTORY_ITEM_CHARS),
    }));
}

function parseRequestPayload(raw: unknown): {
  data?: { message: string; mode: InterviewMode; history: CareerPrepHistoryMessage[] };
  error?: string;
  status: number;
} {
  if (!isObjectRecord(raw)) {
    return { status: 400, error: INVALID_BODY_ERROR };
  }

  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  const mode = raw.mode;

  if (!message || !isInterviewMode(mode)) {
    return { status: 400, error: MISSING_INPUT_ERROR };
  }

  if (message.length > MAX_MESSAGE_CHARS) {
    return { status: 400, error: MESSAGE_TOO_LONG_ERROR };
  }

  return {
    status: 200,
    data: {
      message,
      mode,
      history: normalizeHistory(raw.history),
    },
  };
}

function clampScore(value: number): number {
  return Math.max(1, Math.min(10, Math.round(value)));
}

function parseReviewFeedback(reply: string): FeedbackPayload | null {
  // Keep parser tolerant so feedback cards still render even if spacing varies.
  const reviewPattern =
    /1\.\s*What worked[:\s]*([\s\S]*?)\n\s*2\.\s*What needs improvement[:\s]*([\s\S]*?)\n\s*3\.\s*Stronger version[:\s]*([\s\S]*?)\n\s*4\.\s*Clarity score[:\s]*([0-9]{1,2})(?:\s*\/\s*10)?[\s\S]*?\n\s*5\.\s*Confidence score[:\s]*([0-9]{1,2})(?:\s*\/\s*10)?[\s\S]*?\n\s*6\.\s*Suggested next step[:\s]*([\s\S]*)/i;

  const match = reply.match(reviewPattern);

  if (!match) {
    return null;
  }

  const [, whatWorked, needsImprovement, strongerVersion, clarity, confidence, nextStep] =
    match;

  return {
    whatWorked: whatWorked.trim(),
    needsImprovement: needsImprovement.trim(),
    strongerVersion: strongerVersion.trim(),
    clarityScore: clampScore(Number(clarity)),
    confidenceScore: clampScore(Number(confidence)),
    nextStep: nextStep.trim(),
  };
}

function extractReplyText(response: OpenAI.Responses.Response): string {
  return response.output_text?.trim() || "";
}

function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey || apiKey === "your_openai_api_key_here") {
    return null;
  }

  return new OpenAI({ apiKey });
}

function getUpstreamErrorDetails(error: unknown): { status: number; message: string } {
  if (error instanceof APIError) {
    if (error.status === 401 || error.status === 403) {
      return { status: 500, message: AUTH_ERROR };
    }

    if (error.status === 429) {
      return { status: 429, message: RATE_LIMIT_ERROR };
    }

    return { status: 502, message: GENERIC_UPSTREAM_ERROR };
  }

  if (!(error instanceof Error)) {
    return { status: 502, message: GENERIC_UPSTREAM_ERROR };
  }

  const normalized = error.message.toLowerCase();
  if (normalized.includes("rate")) {
    return { status: 429, message: RATE_LIMIT_ERROR };
  }

  return { status: 502, message: GENERIC_UPSTREAM_ERROR };
}

function isModelAccessError(error: unknown): boolean {
  if (!(error instanceof APIError)) {
    return false;
  }

  if (![400, 403, 404].includes(error.status ?? -1)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return message.includes("model") || message.includes("not found");
}

export async function POST(request: Request) {
  let rawPayload: CareerPrepChatRequest | unknown;

  try {
    rawPayload = (await request.json()) as CareerPrepChatRequest;
  } catch {
    return jsonError(400, INVALID_JSON_ERROR);
  }

  const parsed = parseRequestPayload(rawPayload);
  if (parsed.error || !parsed.data) {
    return jsonError(parsed.status, parsed.error || MISSING_INPUT_ERROR);
  }

  const { message, mode, history } = parsed.data;

  const client = getOpenAIClient();
  if (!client) {
    return jsonError(500, CONFIG_ERROR);
  }

  const configuredModel = process.env.OPENAI_MODEL?.trim();
  const model = configuredModel || DEFAULT_MODEL;
  const allowFallbackModel = !configuredModel && model === DEFAULT_MODEL;

  const input = [...history, { role: "user" as const, content: message }];

  try {
    const instructions = buildCareerPrepInstructions(mode, message);

    let response: OpenAI.Responses.Response;

    try {
      response = await client.responses.create({
        model,
        instructions,
        input,
        store: false,
        metadata: {
          product: "careerprep-ai",
          mode,
        },
      });
    } catch (error) {
      if (!allowFallbackModel || !isModelAccessError(error)) {
        throw error;
      }

      response = await client.responses.create({
        model: DEFAULT_FALLBACK_MODEL,
        instructions,
        input,
        store: false,
        metadata: {
          product: "careerprep-ai",
          mode,
          model_fallback: DEFAULT_FALLBACK_MODEL,
        },
      });
    }

    const replyText = extractReplyText(response);

    if (!replyText) {
      return jsonError(502, GENERIC_UPSTREAM_ERROR);
    }

    const success: CareerPrepChatResponse = {
      reply: replyText,
      error: null,
      feedback: parseReviewFeedback(replyText),
    };

    return NextResponse.json(success);
  } catch (error: unknown) {
    const mappedError = getUpstreamErrorDetails(error);
    return jsonError(mappedError.status, mappedError.message);
  }
}

export async function GET() {
  return jsonError(405, METHOD_NOT_ALLOWED_ERROR);
}

export async function PUT() {
  return jsonError(405, METHOD_NOT_ALLOWED_ERROR);
}

export async function PATCH() {
  return jsonError(405, METHOD_NOT_ALLOWED_ERROR);
}

export async function DELETE() {
  return jsonError(405, METHOD_NOT_ALLOWED_ERROR);
}
