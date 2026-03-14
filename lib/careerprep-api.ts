import type { FeedbackPayload, InterviewMode } from "@/lib/careerprep-data";

export interface CareerPrepHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export interface CareerPrepChatRequest {
  message: string;
  mode: InterviewMode;
  history?: CareerPrepHistoryMessage[];
}

export interface CareerPrepChatSuccess {
  reply: string;
  error: null;
  feedback?: FeedbackPayload | null;
}

export interface CareerPrepChatError {
  reply: null;
  error: string;
}

export type CareerPrepChatResponse = CareerPrepChatSuccess | CareerPrepChatError;
