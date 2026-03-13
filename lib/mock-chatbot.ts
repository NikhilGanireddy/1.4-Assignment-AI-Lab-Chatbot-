import {
  type ChatMessage,
  type FeedbackPayload,
  type InterviewMode,
} from "@/lib/careerprep-data";

interface MockReply {
  content: string;
  feedback?: FeedbackPayload;
}

const DISHONEST_REQUEST_PATTERN =
  /(?:fake|lie|invent|fabricate|make up|made up|pretend).{0,30}(?:experience|resume|project|internship|job|story)|(?:add|put).{0,20}(?:fake|made up).{0,20}(?:resume|experience)/i;

const GUARANTEE_REQUEST_PATTERN =
  /(?:guarantee|guaranteed|100%|surefire|certainly).{0,25}(?:hired|job|offer|success)|(?:get|make).{0,15}me.{0,10}(?:hired|offer)/i;

const OUT_OF_SCOPE_PATTERN =
  /legal advice|lawsuit|medical advice|diagnose|prescription|therapy|therapist|depression treatment|anxiety treatment|financial advice|investment advice|stock pick|tax advice/i;

const ANSWER_REVIEW_PATTERN =
  /review this|improve my answer|feedback on my answer|rate my answer|score my answer|answer\s*:/i;

const METRIC_PATTERN =
  /\b\d+(?:\.\d+)?%\b|\b\d+\s*(?:users|customers|students|projects|weeks|months|days|tickets|features|bugs|ms|hours|requests|components)\b/i;

const GENERIC_TRAIT_PATTERN =
  /\b(hardworking|passionate|team player|quick learner|good communicator|dedicated|motivated)\b/i;

function clampScore(value: number): number {
  return Math.max(1, Math.min(10, Math.round(value)));
}

function buildFollowUpQuestion(mode: InterviewMode): string {
  switch (mode) {
    case "behavioral":
      return [
        "I can make this much stronger with context.",
        "Share the target role, one real scenario, and the result you achieved.",
      ].join("\n");
    case "technical":
      return [
        "Give me your target role (frontend or full-stack), your level, and one topic you expect.",
        "I will tailor the mock question and a high-signal answer structure.",
      ].join("\n");
    case "resume":
      return [
        "Paste one real resume bullet exactly as written.",
        "If possible, include a metric so we can make it interviewer-ready.",
      ].join("\n");
    case "project":
      return [
        "Share your project name, user problem, stack, and one measurable result.",
        "I will turn it into a concise interview narrative.",
      ].join("\n");
    case "confidence":
      return [
        "Tell me where confidence drops most: opening answer, technical deep dive, or follow-up pressure.",
        "I will give you a specific practice script.",
      ].join("\n");
  }
}

function needsMoreContext(input: string): boolean {
  const words = input.trim().split(/\s+/).filter(Boolean);

  if (words.length <= 4) {
    return true;
  }

  return /^(help me|can you help|not sure|what should i say|idk)$/i.test(
    input.trim(),
  );
}

function isAnswerReviewRequest(input: string): boolean {
  if (!ANSWER_REVIEW_PATTERN.test(input)) {
    return false;
  }

  const answerSection = input.split(/answer\s*:/i)[1];
  if (answerSection) {
    return answerSection.trim().split(/\s+/).length >= 8;
  }

  return /review this interview answer/i.test(input);
}

function extractAnswerText(input: string): string {
  const answerSection = input.split(/answer\s*:/i)[1];
  if (answerSection) {
    return answerSection.trim();
  }

  return input
    .replace(/review this interview answer/i, "")
    .replace(/improve my answer/i, "")
    .trim();
}

function buildBehavioralResponse(input: string): string {
  const lowered = input.toLowerCase();

  if (lowered.includes("tell me about yourself")) {
    return [
      "Use this 45-60 second structure:",
      "1) Present: current focus + strongest relevant skill.",
      "2) Past: one concrete project/internship example.",
      "3) Future: why this role is your next step.",
      "",
      "Template:",
      '"I am a [student/early-career developer] focused on [area]. Recently, I [specific project/action], which led to [result]. I am excited about this role because it lets me apply that experience to [team objective]."',
      "",
      "If you share your background, I will personalize this for your target internship.",
    ].join("\n");
  }

  if (lowered.includes("why should we hire you")) {
    return [
      "Strong structure for this question:",
      "1) Role fit (what you are strongest at)",
      "2) Proof (real project/coursework example)",
      "3) Impact (metric or outcome)",
      "4) Close (how you will contribute in this role)",
      "",
      "Avoid: generic traits without evidence.",
      "Share your draft and I will score it with a sharper rewrite.",
    ].join("\n");
  }

  if (lowered.includes("ask me a behavioral interview question")) {
    return [
      "Behavioral prompt:",
      "Tell me about a time you received critical feedback and had to improve quickly.",
      "",
      "When you answer, I will evaluate:",
      "- Story clarity (Situation and Task)",
      "- Ownership (specific actions you took)",
      "- Impact (result and what changed)",
    ].join("\n");
  }

  return [
    "For behavioral questions, keep this sequence:",
    "Situation -> Task -> Action -> Result -> Reflection.",
    "",
    "Paste one real experience, and I will transform it into a concise STAR answer.",
  ].join("\n");
}

function buildTechnicalResponse(input: string): string {
  const lowered = input.toLowerCase();

  if (
    lowered.includes("mock interview") ||
    lowered.includes("frontend internship") ||
    lowered.includes("full-stack") ||
    lowered.includes("fullstack")
  ) {
    return [
      "Mock technical question (frontend/full-stack internship level):",
      "Design a search-and-filter UI for 10k records with a paginated API. How would you make it fast, accessible, and debuggable?",
      "",
      "High-signal answer outline:",
      "1) Clarify constraints: latency target, filtering behavior, accessibility requirements.",
      "2) UI strategy: controlled inputs, debounce, optimistic loading states.",
      "3) Data strategy: query params, cache keys, request cancellation, stale-state handling.",
      "4) Quality: keyboard navigation, ARIA labels, empty/error states, test cases.",
      "",
      "Reply with your answer and I will review it in the 6-part format.",
    ].join("\n");
  }

  if (lowered.includes("react") || lowered.includes("component")) {
    return [
      "For React interview answers, avoid jumping straight to code.",
      "Explain in this order: state model -> rendering strategy -> performance risks -> test approach.",
      "",
      "If you share your exact question, I will craft a concise 60-second response.",
    ].join("\n");
  }

  if (lowered.includes("algorithm") || lowered.includes("data structure")) {
    return [
      "Interviewers want reasoning, not only final code.",
      "Use: baseline approach -> bottleneck -> optimization -> complexity -> edge cases.",
      "",
      "Send the prompt and I will coach you through a clear interview narrative.",
    ].join("\n");
  }

  return [
    "Technical answer structure for junior candidates:",
    "1) Clarify assumptions",
    "2) Propose approach",
    "3) Explain tradeoffs",
    "4) Cover edge cases",
    "5) Mention testing plan",
    "",
    "Share a real question and I will tailor this to your role.",
  ].join("\n");
}

function buildResumeResponse(input: string): string {
  const lowered = input.toLowerCase();

  if (lowered.includes("bullet") || lowered.includes("resume")) {
    return [
      "Use this interview-ready bullet formula:",
      "Action verb + scope + technical approach + measurable impact.",
      "",
      "Example:",
      'Weak: "Built dashboard"',
      'Stronger: "Built a React analytics dashboard for 120 student users, cutting report lookup time by 35% through server-side filtering and caching."',
      "",
      "Paste one real bullet and I will rewrite it without inventing details.",
    ].join("\n");
  }

  return [
    "I can help convert resume bullets into interview talking points.",
    "Share one bullet and I will improve clarity, ownership, and measurable impact.",
  ].join("\n");
}

function buildProjectResponse(input: string): string {
  const lowered = input.toLowerCase();

  if (
    lowered.includes("project") ||
    lowered.includes("capstone") ||
    lowered.includes("portfolio")
  ) {
    return [
      "Use this project explanation template (60-90 seconds):",
      "1) Problem: what user pain existed and who experienced it.",
      "2) Solution: what you built and core workflow.",
      "3) Tech stack: why you chose these tools and what tradeoffs you accepted.",
      "4) Impact: what improved, with metrics if possible.",
      "",
      "Example starter line:",
      '"I built [project] for [users] because [problem]. I implemented [solution] using [stack] since [rationale]. As a result, [impact]."',
      "",
      "Share your project details and I will draft a polished version for interviews.",
    ].join("\n");
  }

  return [
    "For project interviews, prioritize clarity over feature lists.",
    "Tell me your project problem, stack, and result, and I will structure the answer.",
  ].join("\n");
}

function buildConfidenceResponse(input: string): string {
  const lowered = input.toLowerCase();

  if (lowered.includes("nervous") || lowered.includes("confidence")) {
    return [
      "Use this confidence routine before answering:",
      "1) One-breath pause",
      "2) One-sentence summary answer",
      "3) One concrete example",
      "",
      "Delivery rule: short sentences, no filler words, finish with impact.",
      "Send one answer you feel shaky about and I will tighten the script.",
    ].join("\n");
  }

  return [
    "Confidence improves with structure and repetition.",
    "Choose one weak answer and we will build a practice-ready script in two iterations.",
  ].join("\n");
}

function buildStrongerVersion(mode: InterviewMode): string {
  switch (mode) {
    case "behavioral":
      return "In my [class/internship/project], we needed to [task/challenge]. I took ownership of [actions]. This led to [specific measurable result], and it prepared me to contribute quickly in this role.";
    case "technical":
      return "I would confirm constraints first, then propose a baseline design. Next I would improve performance with caching/request cancellation, explain accessibility and edge cases, and close with how I would test the solution.";
    case "resume":
      return "I led [task] for [scope], used [tools/approach], and delivered [measurable impact]. This is relevant because it shows I can execute technical work and communicate outcomes clearly.";
    case "project":
      return "I built [project] for [target users] to solve [problem]. I chose [stack] based on [tradeoff rationale]. The result was [impact metric], and my next iteration would be [improvement].";
    case "confidence":
      return "My strongest fit is [skill area], shown when I [real example]. I can contribute immediately by [specific value], and I am actively improving [growth area] through [practice approach].";
  }
}

function buildFeedback(answer: string, mode: InterviewMode): {
  feedback: FeedbackPayload;
  weaknessReason: string;
} {
  const lowered = answer.toLowerCase();
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;

  const positives: string[] = [];
  const improvements: string[] = [];

  let clarity = 8;
  let confidence = 8;

  const hasMetric = METRIC_PATTERN.test(answer);
  const hasOwnership = /\b(i|my|we)\b/i.test(answer);
  const hasStructure =
    /\b(first|then|because|result|so|therefore|after|before|impact)\b/i.test(
      lowered,
    );

  if (wordCount >= 22) {
    positives.push("You provided enough detail for a full interview-level response.");
  } else {
    improvements.push(
      "The answer is too short, so your decision-making and impact are unclear.",
    );
    clarity -= 2;
    confidence -= 1;
  }

  if (hasOwnership) {
    positives.push("You used ownership language, which makes your contribution credible.");
  } else {
    improvements.push("Use first-person ownership so interviewers know exactly what you did.");
    clarity -= 1;
  }

  if (hasMetric) {
    positives.push("You included measurable evidence, which strengthens credibility.");
    clarity += 1;
  } else {
    improvements.push("Add one measurable result to prove the outcome of your work.");
    clarity -= 1;
  }

  if (!hasStructure) {
    improvements.push("Organize the answer in a clear sequence instead of one long statement.");
    clarity -= 1;
  }

  if (/\b(maybe|probably|i guess|i think|kind of|sort of)\b/i.test(lowered)) {
    improvements.push("Remove hedging words so your delivery sounds more confident.");
    confidence -= 2;
  }

  if (GENERIC_TRAIT_PATTERN.test(lowered)) {
    improvements.push(
      "Replace generic traits with one concrete example that proves the claim.",
    );
    clarity -= 2;
  }

  if (/\b(i don't know|not sure)\b/i.test(lowered)) {
    improvements.push("Avoid uncertainty phrases and anchor your answer in evidence.");
    confidence -= 2;
  }

  const selectedPositives = positives.slice(0, 2);
  const selectedImprovements = improvements.slice(0, 2);

  const whatWorked =
    selectedPositives.join(" ") ||
    "You answered directly and stayed on-topic, which is a useful starting point.";

  const needsImprovement =
    selectedImprovements.join(" ") ||
    "Tighten structure and add specific evidence so interviewers can trust your claims.";

  const weaknessReason =
    selectedImprovements[0]?.toLowerCase() ||
    "it lacks concrete evidence and a clear structure interviewers can follow.";

  const feedback: FeedbackPayload = {
    whatWorked,
    needsImprovement,
    strongerVersion: buildStrongerVersion(mode),
    clarityScore: clampScore(clarity),
    confidenceScore: clampScore(confidence),
    nextStep:
      "Rewrite this answer using one real example and one metric, then practice it aloud twice with a 60-second time limit.",
  };

  return { feedback, weaknessReason };
}

export async function generateMockReply(
  input: string,
  mode: InterviewMode,
  history: ChatMessage[],
): Promise<MockReply> {
  const trimmed = input.trim();
  const lowered = trimmed.toLowerCase();
  const previousUserTurns = history.filter(
    (message) => message.role === "user",
  ).length;

  if (!trimmed) {
    return {
      content:
        "Share your question or draft answer, and I will coach it step by step.",
    };
  }

  if (DISHONEST_REQUEST_PATTERN.test(lowered)) {
    return {
      content:
        "I can’t help with fake experience or invented resume details. I can help you frame real coursework, projects, and learning outcomes into a credible interview answer.",
    };
  }

  if (GUARANTEE_REQUEST_PATTERN.test(lowered)) {
    return {
      content:
        "I can’t guarantee hiring outcomes. I can help you improve answer quality, structure, and delivery so you maximize your odds.",
    };
  }

  if (OUT_OF_SCOPE_PATTERN.test(lowered)) {
    return {
      content:
        "I focus on interview preparation only. I can’t provide legal, medical, financial, or therapy advice.",
    };
  }

  if (isAnswerReviewRequest(trimmed)) {
    const answer = extractAnswerText(trimmed);
    const { feedback, weaknessReason } = buildFeedback(answer, mode);

    return {
      content: `Your draft is currently weak because ${weaknessReason}\n\nI rewrote it below with clearer structure and stronger evidence signals.`,
      feedback,
    };
  }

  if (needsMoreContext(trimmed)) {
    const prompt = buildFollowUpQuestion(mode);

    return {
      content:
        previousUserTurns > 1
          ? `${prompt}\n\nKeep your reply to 2-3 sentences so I can give fast, targeted feedback.`
          : prompt,
    };
  }

  switch (mode) {
    case "behavioral":
      return { content: buildBehavioralResponse(trimmed) };
    case "technical":
      return { content: buildTechnicalResponse(trimmed) };
    case "resume":
      return { content: buildResumeResponse(trimmed) };
    case "project":
      return { content: buildProjectResponse(trimmed) };
    case "confidence":
      return { content: buildConfidenceResponse(trimmed) };
    default:
      return {
        content:
          "I can help with behavioral practice, technical practice, resume answers, project explanations, and confidence coaching.",
      };
  }
}
